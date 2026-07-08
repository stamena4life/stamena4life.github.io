const resources = {
  "core-fear-test": {
    title: "Core Fear Test",
    filename: "core-fear-test.pdf",
    r2Key: "core-fear-test.pdf"
  },
  "communication-styles": {
    title: "Communication Styles",
    filename: "communication-styles.pdf",
    r2Key: "communication-styles.pdf"
  },
  "hop-lane-resource": {
    title: "H.O.P. Lane Resource",
    filename: "hop-lane-resource.pdf",
    r2Key: "hop-lane-resource.pdf"
  },
  "book-sneak-peek": {
    title: "Book Sneak Peek",
    filename: "book-sneak-peek.pdf",
    r2Key: "book-sneak-peek.pdf"
  }
};

const encoder = new TextEncoder();

export default {
  async fetch(request, env, ctx) {
    try {
      if (request.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders(request, env) });
      }

      const url = new URL(request.url);
      const path = url.pathname.replace(/\/$/, "") || "/";

      if (request.method === "GET" && path === "/health") {
        return json({ ok: true }, 200, request, env);
      }

      if (request.method === "POST" && path === "/auth/request-code") {
        return requestCode(request, env);
      }

      if (request.method === "POST" && path === "/auth/verify-code") {
        return verifyCode(request, env);
      }

      if (request.method === "GET" && path === "/me") {
        return currentMember(request, env);
      }

      if (request.method === "GET" && path === "/resources") {
        return protectedResources(request, env);
      }

      if (request.method === "GET" && path.startsWith("/download/")) {
        return downloadResource(request, env, path.split("/").pop());
      }

      if (request.method === "POST" && path === "/square/webhook") {
        return squareWebhook(request, env, ctx);
      }

      if (request.method === "POST" && path === "/admin/grant") {
        return adminGrant(request, env, true);
      }

      if (request.method === "POST" && path === "/admin/revoke") {
        return adminGrant(request, env, false);
      }

      return json({ message: "Not found." }, 404, request, env);
    } catch (error) {
      if (error instanceof HttpError) {
        return json({ message: error.message }, error.status, request, env);
      }
      console.error(JSON.stringify({ message: error.message, stack: error.stack }));
      return json({ message: "Server error." }, 500, request, env);
    }
  }
};

async function requestCode(request, env) {
  const { email } = await readJson(request);
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return json({ message: "Enter a valid subscriber email." }, 400, request, env);
  }

  const member = await getMember(env, normalizedEmail);
  const genericMessage = "If that email has an active subscription, a login code is on the way.";

  if (!isActiveMember(member)) {
    return json({ message: genericMessage }, 200, request, env);
  }

  const code = randomCode();
  const hash = await hmacBase64Url(env.SESSION_SECRET, `${normalizedEmail}:${code}`);
  await env.LOGIN_CODES.put(codeKey(normalizedEmail), JSON.stringify({
    hash,
    attempts: 0,
    createdAt: new Date().toISOString()
  }), { expirationTtl: 600 });

  const sent = await sendLoginEmail(env, normalizedEmail, code);
  const response = { message: sent ? genericMessage : "Login code created." };

  if (!sent && env.ALLOW_DEV_CODES === "true") {
    response.devCode = code;
  }

  return json(response, 200, request, env);
}

async function verifyCode(request, env) {
  const { email, code } = await readJson(request);
  const normalizedEmail = normalizeEmail(email);
  const normalizedCode = String(code || "").trim();

  if (!normalizedEmail || !normalizedCode) {
    return json({ message: "Enter your email and login code." }, 400, request, env);
  }

  const recordText = await env.LOGIN_CODES.get(codeKey(normalizedEmail));
  if (!recordText) {
    return json({ message: "That code expired. Request a new one." }, 401, request, env);
  }

  const record = JSON.parse(recordText);
  const hash = await hmacBase64Url(env.SESSION_SECRET, `${normalizedEmail}:${normalizedCode}`);

  if (!timingSafeEqual(hash, record.hash)) {
    const attempts = Number(record.attempts || 0) + 1;
    if (attempts >= 5) {
      await env.LOGIN_CODES.delete(codeKey(normalizedEmail));
    } else {
      await env.LOGIN_CODES.put(codeKey(normalizedEmail), JSON.stringify({ ...record, attempts }), { expirationTtl: 600 });
    }
    return json({ message: "That code did not match." }, 401, request, env);
  }

  const member = await getMember(env, normalizedEmail);
  if (!isActiveMember(member)) {
    return json({ message: "This email does not have an active subscription." }, 403, request, env);
  }

  await env.LOGIN_CODES.delete(codeKey(normalizedEmail));
  const token = await issueToken(env, {
    email: normalizedEmail,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12
  });

  return json({ email: normalizedEmail, token }, 200, request, env);
}

async function currentMember(request, env) {
  const session = await requireSession(request, env);
  return json({ email: session.email }, 200, request, env);
}

async function protectedResources(request, env) {
  await requireSession(request, env);
  return json({
    resources: Object.entries(resources).map(([id, resource]) => ({
      id,
      title: resource.title,
      filename: resource.filename
    }))
  }, 200, request, env);
}

async function downloadResource(request, env, resourceId) {
  const session = await requireSession(request, env);
  const resource = resources[resourceId];

  if (!resource) {
    return json({ message: "Resource not found." }, 404, request, env);
  }

  const member = await getMember(env, session.email);
  if (!isActiveMember(member)) {
    return json({ message: "This subscription is not active." }, 403, request, env);
  }

  const object = await env.RESOURCES.get(resource.r2Key);
  if (!object) {
    return json({ message: "This resource file has not been uploaded yet." }, 404, request, env);
  }

  const headers = new Headers(corsHeaders(request, env));
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("content-type", "application/pdf");
  headers.set("content-disposition", `attachment; filename="${resource.filename}"`);
  headers.set("cache-control", "private, no-store");

  return new Response(object.body, { headers });
}

async function squareWebhook(request, env, ctx) {
  const body = await request.text();
  const signature = request.headers.get("x-square-hmacsha256-signature") || "";

  if (!(await verifySquareSignature(env, request.url, body, signature))) {
    return json({ message: "Invalid signature." }, 401, request, env);
  }

  const event = JSON.parse(body);
  const subscription = findSubscription(event);
  const customerId = subscription?.customer_id || subscription?.customerId || null;
  let email = normalizeEmail(
    subscription?.buyer_email_address ||
    subscription?.email_address ||
    event?.data?.object?.customer?.email_address ||
    event?.data?.object?.customer?.emailAddress
  );

  if (!email && customerId) {
    email = await getSquareCustomerEmail(env, customerId);
  }

  if (!email) {
    ctx.waitUntil(env.MEMBERS.put(`pending-square:${event.event_id || crypto.randomUUID()}`, body, { expirationTtl: 60 * 60 * 24 * 30 }));
    return json({ ok: true, queued: true }, 200, request, env);
  }

  const status = String(subscription?.status || event.type || "ACTIVE").toUpperCase();
  const active = ["ACTIVE"].includes(status) || event.type === "subscription.created";

  await env.MEMBERS.put(memberKey(email), JSON.stringify({
    email,
    active,
    status,
    source: "square",
    squareCustomerId: customerId,
    squareSubscriptionId: subscription?.id || null,
    updatedAt: new Date().toISOString()
  }));

  return json({ ok: true }, 200, request, env);
}

async function adminGrant(request, env, active) {
  assertAdmin(request, env);
  const { email, expiresAt } = await readJson(request);
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return json({ message: "Enter a valid email." }, 400, request, env);
  }

  await env.MEMBERS.put(memberKey(normalizedEmail), JSON.stringify({
    email: normalizedEmail,
    active,
    expiresAt: active ? expiresAt || null : new Date().toISOString(),
    source: "admin",
    updatedAt: new Date().toISOString()
  }));

  return json({ ok: true, email: normalizedEmail, active }, 200, request, env);
}

async function requireSession(request, env) {
  const auth = request.headers.get("authorization") || "";
  const bearer = auth.toLowerCase().startsWith("bearer ") ? auth.slice(7) : "";
  const urlToken = new URL(request.url).searchParams.get("token") || "";
  const token = bearer || urlToken;

  if (!token) {
    throw new HttpError("Sign in to continue.", 401);
  }

  const session = await verifyToken(env, token);
  const member = await getMember(env, session.email);

  if (!isActiveMember(member)) {
    throw new HttpError("This subscription is not active.", 403);
  }

  return session;
}

async function issueToken(env, payload) {
  const header = base64UrlJson({ alg: "HS256", typ: "JWT" });
  const body = base64UrlJson(payload);
  const signature = await hmacBase64Url(env.SESSION_SECRET, `${header}.${body}`);
  return `${header}.${body}.${signature}`;
}

async function verifyToken(env, token) {
  const [header, body, signature] = token.split(".");
  if (!header || !body || !signature) {
    throw new HttpError("Invalid session.", 401);
  }

  const expected = await hmacBase64Url(env.SESSION_SECRET, `${header}.${body}`);
  if (!timingSafeEqual(signature, expected)) {
    throw new HttpError("Invalid session.", 401);
  }

  const payload = JSON.parse(decodeBase64Url(body));
  if (!payload.email || Number(payload.exp || 0) < Math.floor(Date.now() / 1000)) {
    throw new HttpError("Session expired.", 401);
  }

  return payload;
}

async function verifySquareSignature(env, notificationUrl, body, signature) {
  if (!env.SQUARE_WEBHOOK_SIGNATURE_KEY) return false;
  const payload = `${notificationUrl}${body}`;
  const digest = await hmacBase64(env.SQUARE_WEBHOOK_SIGNATURE_KEY, payload);
  return timingSafeEqual(digest, signature);
}

async function getSquareCustomerEmail(env, customerId) {
  if (!env.SQUARE_ACCESS_TOKEN || !customerId) return "";

  const response = await fetch(`${env.SQUARE_API_BASE || "https://connect.squareup.com"}/v2/customers/${customerId}`, {
    headers: {
      Authorization: `Bearer ${env.SQUARE_ACCESS_TOKEN}`,
      "Square-Version": env.SQUARE_VERSION || "2026-06-18"
    }
  });

  if (!response.ok) return "";
  const payload = await response.json();
  return normalizeEmail(payload?.customer?.email_address || payload?.customer?.emailAddress);
}

async function sendLoginEmail(env, email, code) {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM) {
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: env.RESEND_FROM,
      to: email,
      subject: "Your Stamena4Life member login code",
      text: `Your Stamena4Life member login code is ${code}. This code expires in 10 minutes.`
    })
  });

  return response.ok;
}

async function getMember(env, email) {
  const record = await env.MEMBERS.get(memberKey(email));
  return record ? JSON.parse(record) : null;
}

function isActiveMember(member) {
  if (!member?.active) return false;
  if (!member.expiresAt) return true;
  return new Date(member.expiresAt).getTime() > Date.now();
}

function assertAdmin(request, env) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.toLowerCase().startsWith("bearer ") ? auth.slice(7) : "";

  if (!env.ADMIN_TOKEN || !timingSafeEqual(token, env.ADMIN_TOKEN)) {
    throw new HttpError("Unauthorized.", 401);
  }
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function findSubscription(value) {
  if (!value || typeof value !== "object") return null;
  if ((value.customer_id || value.customerId) && value.status && (value.id || value.plan_variation_id || value.planVariationId)) {
    return value;
  }

  for (const child of Object.values(value)) {
    const found = findSubscription(child);
    if (found) return found;
  }

  return null;
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function memberKey(email) {
  return `member:${email}`;
}

function codeKey(email) {
  return `code:${email}`;
}

function randomCode() {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return String(values[0] % 1000000).padStart(6, "0");
}

async function hmacBase64(secret, value) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const digest = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return base64(digest);
}

async function hmacBase64Url(secret, value) {
  return toBase64Url(await hmacBase64(secret, value));
}

function base64UrlJson(value) {
  return toBase64Url(base64(encoder.encode(JSON.stringify(value))));
}

function decodeBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return atob(padded);
}

function base64(input) {
  const bytes = input instanceof ArrayBuffer ? new Uint8Array(input) : input;
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function toBase64Url(value) {
  return value.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function timingSafeEqual(a, b) {
  const aBytes = encoder.encode(String(a || ""));
  const bBytes = encoder.encode(String(b || ""));
  if (!aBytes.length || !bBytes.length) return false;

  let diff = aBytes.length ^ bBytes.length;
  const length = Math.max(aBytes.length, bBytes.length);

  for (let index = 0; index < length; index += 1) {
    diff |= aBytes[index % aBytes.length] ^ bBytes[index % bBytes.length];
  }

  return diff === 0;
}

function corsHeaders(request, env) {
  const origin = request.headers.get("origin") || "";
  const allowed = String(env.ALLOWED_ORIGIN || "*").split(",").map((item) => item.trim()).filter(Boolean);
  const allowOrigin = allowed.includes("*") ? "*" : allowed.includes(origin) ? origin : allowed[0] || origin;

  return {
    "access-control-allow-origin": allowOrigin,
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "Content-Type, Authorization",
    "access-control-expose-headers": "Content-Disposition",
    "access-control-max-age": "86400",
    vary: "Origin"
  };
}

function json(payload, status, request, env) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders(request, env),
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

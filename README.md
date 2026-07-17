# Stamena4Life Member Backend

Cloudflare Worker starter for subscriber-only Stamena4Life resources.

This backend is meant to protect the five PDF resources:

- `core-fear-test.pdf`
- `communication-styles.pdf`
- `hop-lane-resource.pdf`
- `book-sneak-peek.pdf`
- `rr-handbook.pdf`

The H.O.P. Lane promo video stays public on the main website.

## How It Works

1. A visitor subscribes through Square.
2. Square sends subscription webhook events to this Worker.
3. The Worker marks the subscriber email active in Cloudflare KV.
4. The member page requests a one-time login code.
5. The Worker verifies the code and returns a short-lived session token.
6. Downloads are streamed from a private Cloudflare R2 bucket only after the session and subscription are valid.

## Cloudflare Setup

Install Wrangler, then log in:

```bash
npm install -g wrangler
wrangler login
```

Create storage:

```bash
wrangler kv namespace create S4L_MEMBERS
wrangler kv namespace create S4L_LOGIN_CODES
wrangler r2 bucket create s4l-member-resources
```

Copy the returned KV IDs into `wrangler.jsonc`:

```jsonc
"kv_namespaces": [
  { "binding": "MEMBERS", "id": "YOUR_MEMBERS_ID" },
  { "binding": "LOGIN_CODES", "id": "YOUR_LOGIN_CODES_ID" }
]
```

Upload the protected PDFs to the R2 bucket with these exact object names:

```bash
wrangler r2 object put s4l-member-resources/core-fear-test.pdf --file ./core-fear-test.pdf
wrangler r2 object put s4l-member-resources/communication-styles.pdf --file ./communication-styles.pdf
wrangler r2 object put s4l-member-resources/hop-lane-resource.pdf --file ./hop-lane-resource.pdf
wrangler r2 object put s4l-member-resources/book-sneak-peek.pdf --file ./book-sneak-peek.pdf
wrangler r2 object put s4l-member-resources/rr-handbook.pdf --file ./rr-handbook.pdf
```

Set secrets:

```bash
wrangler secret put SESSION_SECRET
wrangler secret put ADMIN_TOKEN
wrangler secret put SQUARE_WEBHOOK_SIGNATURE_KEY
wrangler secret put SQUARE_ACCESS_TOKEN
```

Optional email delivery for login codes:

```bash
wrangler secret put RESEND_API_KEY
wrangler secret put RESEND_FROM
```

Deploy:

```bash
wrangler deploy
```

## Square Setup

Create a Square subscription or checkout payment link for the member resource library. Put that URL in `member/index.html`:

```js
window.S4L_MEMBER_CONFIG = {
  apiBase: "https://s4l-member-api.YOUR-SUBDOMAIN.workers.dev",
  subscribeUrl: "https://square.link/u/YOUR_SUBSCRIPTION_LINK"
};
```

In the Square Developer Dashboard, create a webhook subscription with this notification URL:

```text
https://s4l-member-api.YOUR-SUBDOMAIN.workers.dev/square/webhook
```

Subscribe it to Square subscription events. Copy the webhook signature key into the Cloudflare secret named `SQUARE_WEBHOOK_SIGNATURE_KEY`.

Square references:

- Webhook signature validation: https://developer.squareup.com/docs/webhooks/step3validate
- Subscriptions API: https://developer.squareup.com/reference/square/subscriptions-api
- Checkout/payment links: https://developer.squareup.com/reference/square/checkout-api/create-payment-link

Cloudflare references:

- Workers: https://developers.cloudflare.com/workers/
- KV: https://developers.cloudflare.com/kv/
- R2 with Workers: https://developers.cloudflare.com/r2/api/workers/workers-api-reference/

## Manual Access While Square Is Being Connected

You can manually grant access to an email:

```bash
curl -X POST "https://s4l-member-api.YOUR-SUBDOMAIN.workers.dev/admin/grant" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email":"subscriber@example.com"}'
```

Revoke access:

```bash
curl -X POST "https://s4l-member-api.YOUR-SUBDOMAIN.workers.dev/admin/revoke" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email":"subscriber@example.com"}'
```

## Local Development

Copy `.dev.vars.example` to `.dev.vars`, fill in development values, then run:

```bash
wrangler dev
```

With `ALLOW_DEV_CODES=true`, login code requests return the one-time code in the API response. Keep that set to `false` in production.

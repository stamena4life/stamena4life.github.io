(function () {
  const scriptUrl = document.currentScript && document.currentScript.src ? document.currentScript.src : "";
  const scriptBase = scriptUrl ? new URL("./", scriptUrl).href : "";
  const assetBase = scriptUrl ? new URL("../assets/", scriptUrl).href : "https://buddyjt.github.io/Stamena4Life/assets/";
  const memberUrl = scriptUrl ? new URL("../member/", scriptUrl).href : "https://buddyjt.github.io/Stamena4Life/member/";
  const baseScriptUrl = scriptBase ? new URL("s4l-wix-sections.js", scriptBase).href : "s4l-wix-sections.js";

  const defaults = {
    assetBase,
    memberUrl,
    contactUrl: "mailto:stamena4life@gmail.com?subject=Stamena4Life%20Inquiry",
    bookingUrl: "https://www.stamena4life.com/booking",
    donateUrl: "https://square.link/u/f1L6vId2",
    griefRegisterUrl: "https://square.link/u/TY92Agh4",
    bookPurchaseUrl: "https://square.link/u/frH4wGlB",
    bookAmazonUrl: "https://a.co/d/6Vjon2p",
    podcastUrl: "https://podcasters.spotify.com/pod/show/stamena4life",
    youtubeUrl: "https://www.youtube.com/@stamena4life882",
    seriesUrl: "https://youtu.be/mp3pswb0MGg?si=C71BJIsV4BhHX_65"
  };

  let baseLoadPromise;

  function ensureBaseSections() {
    if (customElements.get("s4l-hero-section")) {
      return Promise.resolve();
    }

    if (!baseLoadPromise) {
      baseLoadPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = baseScriptUrl;
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject(new Error("Could not load Stamena4Life section library."));
        document.head.append(script);
      });
    }

    return baseLoadPromise;
  }

  const styles = `
    :host {
      --ink: #17221f;
      --muted: #5f6f69;
      --deep: #0d332f;
      --green: #1f5e49;
      --gold: #c99a3d;
      --paper: #fffdf8;
      --soft: #f5f7f1;
      --line: #dfe5dc;
      --white: #ffffff;
      --radius: 8px;
      --max: 1180px;
      display: block;
      color: var(--ink);
      background: var(--paper);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.6;
      text-rendering: optimizeLegibility;
    }

    *, *::before, *::after { box-sizing: border-box; }
    img { display: block; max-width: 100%; }
    a { color: inherit; }
    p { margin-top: 0; }

    .site-header {
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 76px;
      padding: 12px clamp(18px, 4vw, 52px);
      background: rgba(255, 253, 248, 0.94);
      border-bottom: 1px solid rgba(223, 229, 220, 0.9);
      backdrop-filter: blur(16px);
    }

    .brand {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      color: var(--deep);
      font-weight: 900;
      letter-spacing: 0;
      text-decoration: none;
    }

    .brand img {
      width: 46px;
      height: 46px;
      object-fit: contain;
    }

    .site-nav {
      display: flex;
      align-items: center;
      gap: clamp(14px, 2vw, 24px);
      font-size: 0.93rem;
      font-weight: 750;
    }

    .site-nav a {
      color: var(--ink);
      text-decoration: none;
    }

    .site-nav .nav-cta {
      padding: 10px 16px;
      color: var(--white);
      background: var(--deep);
      border-radius: var(--radius);
    }

    .section {
      padding: clamp(58px, 8vw, 102px) clamp(18px, 4vw, 52px);
    }

    .section-header,
    .resource-showcase,
    .resource-video,
    .resource-grid,
    .media-grid,
    .tv-interviews {
      width: min(var(--max), 100%);
      margin-inline: auto;
    }

    .section-header {
      margin-bottom: 34px;
    }

    .eyebrow {
      margin: 0 0 12px;
      color: var(--gold);
      font-size: 0.78rem;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    h2 {
      margin: 0;
      color: var(--deep);
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(2rem, 5vw, 4.25rem);
      line-height: 0.98;
      letter-spacing: 0;
    }

    h3 {
      margin: 0 0 10px;
      color: var(--deep);
      font-size: 1.25rem;
      line-height: 1.2;
      letter-spacing: 0;
    }

    .section-header p:not(.eyebrow) {
      max-width: 790px;
      margin: 18px 0 0;
      color: var(--muted);
      font-size: 1.05rem;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 46px;
      padding: 12px 18px;
      border: 1px solid transparent;
      border-radius: var(--radius);
      font-weight: 850;
      text-decoration: none;
      cursor: pointer;
    }

    .button.primary {
      color: var(--ink);
      background: var(--gold);
      box-shadow: 0 12px 26px rgba(201, 154, 61, 0.24);
    }

    .button.secondary {
      color: var(--white);
      background: var(--green);
    }

    .button.quiet {
      color: var(--deep);
      background: var(--white);
      border-color: var(--line);
    }

    .inline-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
      margin-top: 26px;
    }

    .resource-section {
      background:
        linear-gradient(135deg, rgba(255, 253, 248, 0.95), rgba(239, 246, 232, 0.96)),
        var(--soft);
    }

    .resource-showcase {
      margin-top: -10px;
      margin-bottom: 24px;
      padding: 14px 18px;
      background: rgba(255, 255, 255, 0.78);
      border: 1px solid rgba(201, 154, 61, 0.28);
      border-left: 5px solid var(--gold);
      border-radius: var(--radius);
      box-shadow: 0 10px 26px rgba(23, 34, 31, 0.07);
    }

    .resource-showcase p {
      max-width: 620px;
      margin: 0;
      color: var(--ink);
      font-size: 1rem;
    }

    .resource-video {
      display: grid;
      grid-template-columns: minmax(0, 0.78fr) minmax(360px, 1.22fr);
      gap: clamp(20px, 4vw, 34px);
      align-items: center;
      margin-bottom: 24px;
      padding: 20px;
      background: var(--white);
      border: 1px solid rgba(201, 154, 61, 0.3);
      border-radius: var(--radius);
      box-shadow: 0 12px 30px rgba(23, 34, 31, 0.08);
    }

    .resource-video h3 {
      font-size: clamp(1.45rem, 3vw, 2rem);
    }

    .resource-video p:not(.eyebrow) {
      color: var(--muted);
    }

    .resource-video video {
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #050505;
      border-radius: var(--radius);
    }

    .resource-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 18px;
    }

    .resource-card {
      position: relative;
      display: flex;
      min-height: 260px;
      flex-direction: column;
      overflow: hidden;
      padding: 26px;
      background: var(--white);
      border: 1px solid rgba(201, 154, 61, 0.28);
      border-radius: var(--radius);
      box-shadow: 0 8px 22px rgba(23, 34, 31, 0.06);
      text-decoration: none;
    }

    .resource-card::before {
      content: "";
      position: absolute;
      inset: 0 0 auto;
      height: 6px;
      background: linear-gradient(90deg, var(--deep), var(--gold), var(--green));
    }

    .resource-card span {
      display: inline-flex;
      align-self: flex-start;
      padding: 4px 10px;
      margin-bottom: 30px;
      color: var(--deep);
      background: #f3dfb3;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 900;
      text-transform: uppercase;
    }

    .resource-card p,
    .media-card p {
      color: var(--muted);
    }

    .resource-card strong {
      display: inline-flex;
      margin-top: auto;
      color: var(--green);
      font-size: 0.92rem;
    }

    .media-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 20px;
    }

    .media-card {
      display: grid;
      grid-template-columns: 180px minmax(0, 1fr);
      gap: 22px;
      align-items: center;
      padding: 20px;
      background: var(--white);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      box-shadow: 0 8px 22px rgba(23, 34, 31, 0.06);
    }

    .book-card {
      grid-column: 1 / -1;
      grid-template-columns: 220px minmax(0, 1fr);
    }

    .media-card img {
      width: 100%;
      border-radius: var(--radius);
      background: var(--soft);
    }

    .tv-interviews {
      margin-top: 32px;
    }

    .tv-copy {
      margin-bottom: 18px;
      text-align: center;
    }

    .tv-copy h3 {
      margin: 0;
      color: var(--deep);
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(2rem, 4vw, 3.6rem);
      line-height: 1;
    }

    .tv-reel {
      display: flex;
      gap: 18px;
      overflow-x: auto;
      overscroll-behavior-inline: contain;
      padding: 2px 0 18px;
      scroll-snap-type: inline mandatory;
      scrollbar-color: var(--gold) rgba(13, 51, 47, 0.12);
    }

    .tv-video {
      min-width: clamp(300px, 30vw, 390px);
      margin: 0;
      overflow: hidden;
      background: #050505;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      box-shadow: 0 12px 28px rgba(23, 34, 31, 0.12);
      scroll-snap-align: start;
    }

    .tv-video iframe {
      display: block;
      width: 100%;
      aspect-ratio: 9 / 12;
      min-height: 430px;
      border: 0;
      background: #050505;
    }

    @media (max-width: 1040px) {
      .site-header {
        align-items: flex-start;
        flex-direction: column;
        gap: 12px;
      }

      .site-nav {
        flex-wrap: wrap;
      }

      .resource-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 860px) {
      .resource-video,
      .media-grid,
      .media-card,
      .book-card {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 620px) {
      .section {
        padding-left: 16px;
        padding-right: 16px;
      }

      .resource-grid {
        grid-template-columns: 1fr;
      }

      .button {
        width: 100%;
      }
    }
  `;

  class S4LFullSite extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      ensureBaseSections()
        .then(() => this.render())
        .catch((error) => {
          this.shadowRoot.innerHTML = `<p style="padding: 24px; font-family: sans-serif;">${error.message}</p>`;
        });
    }

    getConfig() {
      return {
        assetBase: this.getAttribute("asset-base") || defaults.assetBase,
        memberUrl: this.getAttribute("member-url") || defaults.memberUrl,
        contactUrl: this.getAttribute("contact-url") || defaults.contactUrl,
        bookingUrl: this.getAttribute("booking-url") || defaults.bookingUrl,
        donateUrl: this.getAttribute("donate-url") || defaults.donateUrl,
        griefRegisterUrl: this.getAttribute("grief-register-url") || defaults.griefRegisterUrl,
        bookPurchaseUrl: this.getAttribute("book-purchase-url") || defaults.bookPurchaseUrl,
        bookAmazonUrl: this.getAttribute("book-amazon-url") || defaults.bookAmazonUrl,
        podcastUrl: this.getAttribute("podcast-url") || defaults.podcastUrl,
        youtubeUrl: this.getAttribute("youtube-url") || defaults.youtubeUrl,
        seriesUrl: this.getAttribute("series-url") || defaults.seriesUrl
      };
    }

    asset(name) {
      return new URL(name, this.getConfig().assetBase).href;
    }

    renderResourceMedia(c) {
      const interviews = [
        ["Conquering The Crisis - Interview with Steven and Tamara Conway", "jEtvUpR1tl4"],
        ["Family Blessings - 3ABN television interview", "urJt7tnIFb4"],
        ["Relationship conversation television interview", "OgdpfVCX0x8"],
        ["Healing on purpose media interview", "u95oAVoO89M"],
        ["More from Stamena4Life television interview", "iM9JMtPBKrk"]
      ];

      return `
        <section class="section resource-section" id="resources">
          <div class="section-header">
            <p class="eyebrow">Resources</p>
            <h2>Practical tools you can use right away.</h2>
            <p>Keep moving from coping to healing with free resources, guided content, books, and media from Stamena4Life.</p>
          </div>
          <div class="resource-showcase">
            <p><strong>Start here:</strong> watch the H.O.P. Lane video, then sign in for the subscriber PDF library.</p>
          </div>
          <article class="resource-video">
            <div>
              <p class="eyebrow">Featured Video</p>
              <h3>H.O.P. Lane Promo</h3>
              <p>A short video from the original H.O.P. Lane resource gallery, restored here so visitors can watch it directly.</p>
            </div>
            <video controls playsinline preload="metadata" poster="https://static.wixstatic.com/media/7cebed_69610e2c255d4beb8bdb3029798952daf000.jpg">
              <source src="https://video.wixstatic.com/video/7cebed_69610e2c255d4beb8bdb3029798952da/720p/mp4/file.mp4" type="video/mp4">
            </video>
          </article>
          <div class="resource-grid">
            <a class="resource-card" href="${c.memberUrl}"><span>Members</span><h3>Core Fear Test</h3><p>A reflective subscriber tool from the H.O.P. Lane resource library.</p><strong>Member access</strong></a>
            <a class="resource-card" href="${c.memberUrl}"><span>Members</span><h3>Communication Styles</h3><p>Includes the cross-cultural communication tool from the live resource page.</p><strong>Member access</strong></a>
            <a class="resource-card" href="${c.memberUrl}"><span>Members</span><h3>H.O.P. Lane Resource</h3><p>A downloadable subscriber resource connected to the H.O.P. Lane page.</p><strong>Member access</strong></a>
            <a class="resource-card" href="${c.memberUrl}"><span>Members</span><h3>Book Sneak Peek</h3><p>Preview the opening chapters of <em>Kill The Girl</em>.</p><strong>Member access</strong></a>
          </div>
        </section>
        <section class="section" id="media">
          <div class="section-header">
            <p class="eyebrow">Books, Podcast &amp; Series</p>
            <h2>Media for the journey.</h2>
          </div>
          <div class="media-grid">
            <article class="media-card book-card">
              <img src="${this.asset("book-cover.webp")}" alt="Kill The Girl book cover">
              <div><p class="eyebrow">Book</p><h3>Kill The Girl: From Coping to Healing</h3><p>The foundation of our relationships begins far before marriage and family. Take a sneak peek into the first chapters of Tamara's book, which traces a journey from beginnings to healing some of life's deepest wounds.</p><div class="inline-actions"><a class="button primary" href="${c.bookPurchaseUrl}" target="_blank" rel="noreferrer">Purchase</a><a class="button quiet" href="${c.bookAmazonUrl}" target="_blank" rel="noreferrer">Amazon</a><a class="button quiet" href="${c.memberUrl}">Member Preview</a></div></div>
            </article>
            <article class="media-card"><img src="${this.asset("podcast.webp")}" alt="We're Still Talking podcast artwork"><div><p class="eyebrow">Podcast</p><h3>We're Still Talking</h3><p>Steven and Tamara speak openly about real-life challenges and victories with content centered around personal and relational growth.</p><a class="button secondary" href="${c.podcastUrl}" target="_blank" rel="noreferrer">Listen Now</a></div></article>
            <article class="media-card"><img src="${this.asset("series.webp")}" alt="3ABN series image"><div><p class="eyebrow">3ABN Series</p><h3>When We Talk</h3><p>Watch the 3ABN relationship series and related YouTube content from Stamena4Life.</p><div class="inline-actions"><a class="button secondary" href="${c.seriesUrl}" target="_blank" rel="noreferrer">Watch Series</a><a class="button quiet" href="${c.youtubeUrl}" target="_blank" rel="noreferrer">YouTube Channel</a></div></div></article>
          </div>
          <div class="tv-interviews">
            <div class="tv-copy"><p class="eyebrow">TV Interviews</p><h3>Explore live television interviews.</h3></div>
            <div class="tv-reel" aria-label="Live television interview videos">
              ${interviews.map(([title, id]) => `<article class="tv-video"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></article>`).join("")}
            </div>
          </div>
        </section>
      `;
    }

    render() {
      const c = this.getConfig();
      this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <header class="site-header">
          <a class="brand" href="#home" aria-label="Stamena4Life home">
            <img src="${this.asset("logo.png")}" alt="Stamena4Life logo">
            <span>Stamena4Life</span>
          </a>
          <nav class="site-nav" aria-label="Site navigation">
            <a href="#mission">Mission</a>
            <a href="#about">About</a>
            <a href="#hop">H.O.P. Lane</a>
            <a href="#resources">Resources</a>
            <a href="${c.memberUrl}">Members</a>
            <a href="#media">Media</a>
            <a href="#testimonials">Testimonies</a>
            <a href="#contact">Contact</a>
            <a class="nav-cta" href="${c.donateUrl}" target="_blank" rel="noreferrer">Donate</a>
          </nav>
        </header>
        <main>
          <div id="home">
            <s4l-hero-section asset-base="${c.assetBase}" member-url="#resources" contact-url="#contact"></s4l-hero-section>
          </div>
          <div id="mission">
            <div id="about">
              <s4l-mission-about-section asset-base="${c.assetBase}"></s4l-mission-about-section>
            </div>
          </div>
          <div id="hop">
            <s4l-hop-programs-section asset-base="${c.assetBase}" member-url="${c.memberUrl}" booking-url="${c.bookingUrl}" grief-register-url="${c.griefRegisterUrl}"></s4l-hop-programs-section>
          </div>
          ${this.renderResourceMedia(c)}
          <div id="testimonials">
            <s4l-testimonials-section asset-base="${c.assetBase}"></s4l-testimonials-section>
          </div>
          <div id="contact">
            <s4l-contact-footer-section asset-base="${c.assetBase}" member-url="${c.memberUrl}" contact-url="${c.contactUrl}" booking-url="${c.bookingUrl}" donate-url="${c.donateUrl}"></s4l-contact-footer-section>
          </div>
        </main>
      `;

      this.shadowRoot.addEventListener("click", (event) => {
        const link = event.composedPath().find((node) => {
          return node && node.tagName === "A" && node.getAttribute && node.getAttribute("href").startsWith("#");
        });
        if (!link) return;
        const target = this.shadowRoot.getElementById(link.getAttribute("href").slice(1));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  if (!customElements.get("s4l-full-site")) {
    customElements.define("s4l-full-site", S4LFullSite);
  }
})();

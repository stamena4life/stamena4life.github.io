(function () {
  const scriptUrl = document.currentScript && document.currentScript.src ? document.currentScript.src : "";
  const defaultAssetBase = scriptUrl ? new URL("../assets/", scriptUrl).href : "https://YOUR-GITHUB-PAGES-URL/assets/";

  const defaults = {
    assetBase: defaultAssetBase,
    memberUrl: "/member/",
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

  const sharedStyles = `
    :host {
      --ink: #17221f;
      --muted: #5f6f69;
      --deep: #0d332f;
      --green: #1f5e49;
      --moss: #6f8a56;
      --gold: #c99a3d;
      --rose: #8b3e46;
      --paper: #fffdf8;
      --soft: #f5f7f1;
      --line: #dfe5dc;
      --white: #ffffff;
      --shadow: 0 18px 45px rgba(23, 34, 31, 0.12);
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
    h1, h2, h3 { letter-spacing: 0; }

    .section {
      padding: clamp(58px, 8vw, 102px) clamp(18px, 4vw, 52px);
    }

    .section-header {
      width: min(var(--max), 100%);
      margin: 0 auto 34px;
    }

    .section-header.compact {
      width: min(900px, 100%);
      text-align: center;
    }

    .section h2,
    .member-copy h1,
    .hero h1 {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      line-height: 0.98;
    }

    .section h2 {
      color: var(--deep);
      font-size: clamp(2rem, 5vw, 4.25rem);
    }

    .section-header p:not(.eyebrow) {
      max-width: 790px;
      margin: 18px 0 0;
      color: var(--muted);
      font-size: 1.05rem;
    }

    .section-header.compact p:not(.eyebrow) {
      margin-left: auto;
      margin-right: auto;
    }

    .eyebrow {
      margin: 0 0 12px;
      color: var(--gold);
      font-size: 0.78rem;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    h3 {
      margin: 0 0 10px;
      color: var(--deep);
      font-size: 1.25rem;
      line-height: 1.2;
    }

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
      position: relative;
      color: var(--ink);
      text-decoration: none;
    }

    .nav-cta {
      padding: 10px 16px;
      color: var(--white) !important;
      background: var(--deep);
      border-radius: var(--radius);
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
      transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
    }

    .button:hover,
    .button:focus-visible {
      transform: translateY(-1px);
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

    .inline-actions,
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
      margin-top: 26px;
    }

    .text-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--green);
      font-weight: 850;
      text-decoration-color: rgba(31, 94, 73, 0.35);
      text-underline-offset: 4px;
    }

    .text-link::after {
      content: ">";
      color: var(--gold);
      font-weight: 900;
    }

    .meta {
      color: var(--muted);
      font-size: 0.9rem;
    }

    .hero {
      min-height: 78svh;
      color: var(--white);
      background:
        linear-gradient(90deg, rgba(8, 38, 35, 0.98) 0%, rgba(12, 51, 47, 0.88) 48%, rgba(12, 51, 47, 0.35) 100%),
        var(--hero-image) right bottom / min(45vw, 520px) auto no-repeat,
        var(--deep);
    }

    .hero-inner {
      width: min(var(--max), calc(100% - 36px));
      margin: 0 auto;
      padding: clamp(86px, 13vw, 150px) 0 clamp(48px, 8vw, 84px);
    }

    .hero h1 {
      max-width: 760px;
      font-size: clamp(3rem, 9vw, 7.5rem);
      line-height: 0.92;
    }

    .hero-lede {
      width: min(680px, 100%);
      margin: 24px 0 0;
      color: rgba(255, 255, 255, 0.9);
      font-size: clamp(1.08rem, 2vw, 1.35rem);
    }

    .hero-proof {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1px;
      width: min(700px, 100%);
      padding: 0;
      margin: clamp(42px, 8vw, 84px) 0 0;
      list-style: none;
      background: rgba(255, 255, 255, 0.24);
      border: 1px solid rgba(255, 255, 255, 0.24);
      border-radius: var(--radius);
      overflow: hidden;
    }

    .hero-proof li {
      padding: 18px;
      background: rgba(255, 255, 255, 0.08);
    }

    .hero-proof strong {
      display: block;
      font-size: clamp(1.2rem, 2vw, 1.55rem);
    }

    .hero-proof span {
      display: block;
      color: rgba(255, 255, 255, 0.78);
      font-size: 0.9rem;
    }

    .mission-band,
    .support-section {
      background: var(--soft);
    }

    .mission-grid,
    .bio-grid,
    .program-grid,
    .offering-grid,
    .resource-grid,
    .testimonial-grid,
    .contact-grid,
    .media-grid,
    .member-resource-grid {
      width: min(var(--max), 100%);
      margin: 0 auto;
    }

    .mission-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
      margin-top: 36px;
    }

    .card,
    .mission-grid article,
    .program-card,
    .offering-card,
    .resource-card,
    .testimonial-grid figure,
    .contact-card,
    .media-card,
    .library-card,
    .member-login-card {
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: var(--white);
      box-shadow: 0 8px 22px rgba(23, 34, 31, 0.06);
    }

    .mission-grid article,
    .program-card,
    .contact-card {
      padding: 24px;
    }

    .mission-grid span {
      color: var(--rose);
      font-weight: 900;
    }

    .about-feature {
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) minmax(260px, 0.8fr);
      gap: clamp(28px, 6vw, 72px);
      align-items: center;
      width: min(var(--max), 100%);
      margin: 0 auto 28px;
    }

    .about-feature p,
    .profile-card p,
    .program-card p,
    .offering-card p,
    .media-card p,
    .contact-card p {
      color: var(--muted);
    }

    .about-feature img {
      width: min(380px, 100%);
      justify-self: center;
    }

    .bio-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 20px;
    }

    .profile-card {
      display: grid;
      grid-template-columns: 170px minmax(0, 1fr);
      gap: 20px;
      align-items: start;
      padding: 18px;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: var(--white);
    }

    .profile-card img {
      width: 170px;
      aspect-ratio: 4 / 5;
      object-fit: cover;
      border-radius: var(--radius);
    }

    .program-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 20px;
    }

    .program-card.wide {
      display: grid;
      grid-column: 1 / -1;
      grid-template-columns: 240px minmax(0, 1fr);
      gap: 24px;
      align-items: center;
    }

    .program-image {
      display: grid;
      place-items: center;
      min-height: 220px;
      background: #eef3ea;
      border-radius: var(--radius);
    }

    .program-image img {
      width: min(180px, 80%);
    }

    .check-list {
      padding: 0;
      margin: 16px 0 0;
      list-style: none;
    }

    .check-list li {
      position: relative;
      padding-left: 26px;
      color: var(--ink);
    }

    .check-list li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.7em;
      width: 14px;
      height: 2px;
      background: var(--gold);
    }

    .offering-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
    }

    .offering-card {
      overflow: hidden;
    }

    .offering-card img {
      width: 100%;
      aspect-ratio: 16 / 10;
      object-fit: cover;
      background: var(--soft);
    }

    .offering-card h3,
    .offering-card p,
    .offering-card .text-link {
      margin-left: 20px;
      margin-right: 20px;
    }

    .offering-card h3 {
      margin-top: 20px;
    }

    .resource-section {
      background:
        linear-gradient(135deg, rgba(255, 253, 248, 0.95), rgba(239, 246, 232, 0.96)),
        var(--soft);
    }

    .resource-showcase {
      width: min(var(--max), 100%);
      margin: -10px auto 24px;
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
      width: min(var(--max), 100%);
      margin: 0 auto 24px;
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

    .resource-grid,
    .member-resource-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 18px;
    }

    .resource-card,
    .library-card {
      position: relative;
      display: flex;
      min-height: 260px;
      flex-direction: column;
      overflow: hidden;
      padding: 26px;
      border-color: rgba(201, 154, 61, 0.28);
      text-decoration: none;
    }

    .resource-card::before {
      content: "";
      position: absolute;
      inset: 0 0 auto;
      height: 6px;
      background: linear-gradient(90deg, var(--deep), var(--gold), var(--green));
    }

    .resource-card span,
    .library-card span {
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
    .library-card p {
      color: var(--muted);
    }

    .resource-card strong {
      display: inline-flex;
      align-items: center;
      gap: 8px;
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
      width: min(var(--max), 100%);
      margin: 32px auto 0;
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

    .testimonial-section {
      background: var(--deep);
      color: var(--white);
    }

    .testimonial-section h2 {
      color: var(--white);
    }

    .testimonial-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
    }

    .testimonial-grid figure {
      display: flex;
      min-height: 250px;
      flex-direction: column;
      gap: 18px;
      margin: 0;
      padding: 22px;
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.18);
    }

    blockquote {
      margin: 0;
      color: rgba(255, 255, 255, 0.9);
    }

    .testimonial-grid figcaption {
      display: flex;
      gap: 12px;
      align-items: center;
      margin-top: auto;
    }

    .testimonial-grid figcaption img {
      width: 64px;
      height: 64px;
      flex: 0 0 auto;
      object-fit: cover;
      border: 3px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
    }

    .testimonial-grid figcaption strong {
      color: var(--gold);
      font-weight: 900;
    }

    .support-panel {
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.8fr);
      gap: 28px;
      align-items: center;
      width: min(var(--max), 100%);
      margin: 0 auto;
      padding: clamp(26px, 5vw, 46px);
      color: var(--white);
      background: var(--deep);
      border-radius: var(--radius);
    }

    .support-panel h2 {
      color: var(--white);
    }

    .support-panel p {
      color: rgba(255, 255, 255, 0.82);
    }

    .support-actions {
      display: grid;
      gap: 12px;
      align-content: start;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 20px;
      align-items: start;
    }

    address {
      color: var(--muted);
      font-style: normal;
    }

    .site-footer {
      padding: 38px clamp(18px, 4vw, 52px);
      color: rgba(255, 255, 255, 0.78);
      background: #081f1d;
    }

    .footer-top,
    .footer-bottom,
    .disclaimer {
      width: min(var(--max), 100%);
      margin: 0 auto;
    }

    .footer-top,
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      gap: 18px;
      align-items: center;
    }

    .footer-brand {
      display: inline-flex;
      gap: 10px;
      align-items: center;
      color: var(--white);
      font-weight: 900;
      text-decoration: none;
    }

    .footer-brand img {
      width: 50px;
      height: 50px;
      padding: 6px;
      background: var(--paper);
      border: 1px solid rgba(201, 154, 61, 0.42);
      border-radius: 50%;
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.18);
      object-fit: contain;
    }

    .disclaimer {
      margin-top: 30px;
      padding-top: 26px;
      border-top: 1px solid rgba(255, 255, 255, 0.14);
    }

    .disclaimer h2 {
      margin: 0 0 10px;
      color: var(--gold);
      font-size: 0.9rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .disclaimer p {
      max-width: 1040px;
      margin: 0;
      font-size: 0.92rem;
    }

    .footer-bottom {
      margin-top: 24px;
      font-size: 0.86rem;
    }

    .member-hero {
      padding: clamp(58px, 8vw, 108px) clamp(18px, 4vw, 52px);
      background:
        linear-gradient(135deg, rgba(8, 38, 35, 0.98), rgba(31, 94, 73, 0.92)),
        var(--deep);
    }

    .member-hero-inner {
      display: grid;
      grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
      gap: clamp(28px, 5vw, 64px);
      align-items: center;
      width: min(var(--max), 100%);
      margin: 0 auto;
    }

    .member-copy h1 {
      max-width: 760px;
      color: var(--white);
      font-size: clamp(2.8rem, 7vw, 6.2rem);
      line-height: 0.94;
    }

    .member-copy p:not(.eyebrow) {
      max-width: 640px;
      margin: 22px 0 0;
      color: rgba(255, 255, 255, 0.86);
      font-size: clamp(1.04rem, 2vw, 1.24rem);
    }

    .member-login-card {
      padding: clamp(22px, 4vw, 34px);
      background: var(--paper);
      border-color: rgba(201, 154, 61, 0.32);
      box-shadow: var(--shadow);
    }

    .member-login-card h2 {
      margin: 0 0 10px;
      color: var(--deep);
      font-size: clamp(1.5rem, 3vw, 2rem);
    }

    .member-status {
      min-height: 52px;
      margin: 0 0 18px;
      padding: 12px 14px;
      color: var(--muted);
      background: rgba(245, 247, 241, 0.9);
      border: 1px solid var(--line);
      border-radius: var(--radius);
    }

    .member-form {
      display: grid;
      gap: 14px;
      margin-top: 14px;
    }

    label {
      display: grid;
      gap: 6px;
      color: var(--deep);
      font-weight: 850;
    }

    input {
      width: 100%;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      padding: 12px 13px;
      color: var(--ink);
      background: var(--white);
      font: inherit;
    }

    .is-hidden {
      display: none !important;
    }

    .library-card .button {
      width: 100%;
      margin-top: auto;
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

      .resource-grid,
      .offering-grid,
      .member-resource-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .contact-grid,
      .testimonial-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 860px) {
      .hero {
        min-height: auto;
        background:
          linear-gradient(180deg, rgba(8, 38, 35, 0.98) 0%, rgba(12, 51, 47, 0.92) 54%, rgba(12, 51, 47, 0.72) 100%),
          var(--hero-image) right bottom / 310px auto no-repeat,
          var(--deep);
      }

      .hero-inner {
        padding-top: 84px;
        padding-bottom: 220px;
      }

      .hero-proof,
      .mission-grid,
      .bio-grid,
      .program-grid,
      .about-feature,
      .resource-video,
      .support-panel,
      .media-grid,
      .member-hero-inner {
        grid-template-columns: 1fr;
      }

      .program-card.wide,
      .media-card,
      .book-card,
      .profile-card {
        grid-template-columns: 1fr;
      }

      .program-image {
        min-height: 180px;
      }

      .profile-card img {
        width: min(260px, 100%);
      }
    }

    @media (max-width: 620px) {
      .hero-proof,
      .resource-grid,
      .offering-grid,
      .member-resource-grid,
      .contact-grid,
      .testimonial-grid {
        grid-template-columns: 1fr;
      }

      .section {
        padding-left: 16px;
        padding-right: 16px;
      }

      .hero-actions,
      .inline-actions {
        align-items: stretch;
      }

      .button {
        width: 100%;
      }

      .footer-top,
      .footer-bottom {
        align-items: flex-start;
        flex-direction: column;
      }
    }
  `;

  class S4LBaseElement extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.render();
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

    page(content) {
      return `<style>${sharedStyles}</style>${content}`;
    }
  }

  class S4LHeroSection extends S4LBaseElement {
    render() {
      const c = this.getConfig();
      this.shadowRoot.innerHTML = this.page(`
        <section class="hero" style="--hero-image: url('${this.asset("hero-conways.webp")}');" aria-labelledby="s4l-hero-title">
          <div class="hero-inner">
            <p class="eyebrow">Tools for the journey</p>
            <h1 id="s4l-hero-title">Stamena4Life</h1>
            <p class="hero-lede">Helping individuals, couples, and families heal on purpose through faith-centered tools for emotional growth, grief recovery, communication, and healthy relationships.</p>
            <div class="hero-actions">
              <a class="button primary" href="${c.memberUrl}">Explore Resources</a>
              <a class="button secondary" href="${c.contactUrl}">Book or Contact</a>
            </div>
            <ul class="hero-proof" aria-label="Stamena4Life highlights">
              <li><strong>501(c)(3)</strong><span>Nonprofit ministry</span></li>
              <li><strong>20+ years</strong><span>Teaching and ministry</span></li>
              <li><strong>Global</strong><span>Couples, families, churches</span></li>
            </ul>
          </div>
        </section>
      `);
    }
  }

  class S4LMissionAboutSection extends S4LBaseElement {
    render() {
      this.shadowRoot.innerHTML = this.page(`
        <section class="section mission-band">
          <div class="section-header compact">
            <p class="eyebrow">Vision &amp; Mission</p>
            <h2>Healing tools for real life and relationships.</h2>
            <p>Stamena4Life is committed to helping people show up as the best versions of themselves. We share relationship tools for the journey of life centered around personal growth, mental health, emotional and relational development, and healing.</p>
          </div>
          <div class="mission-grid">
            <article><span>01</span><h3>The Mission</h3><p>Helping individuals and families to Heal On Purpose.</p></article>
            <article><span>02</span><h3>The Vision</h3><p>Introducing individuals and families to transformative tools that foster healing through life's changes and challenges.</p></article>
            <article><span>03</span><h3>The Work</h3><p>Seminars, coaching, books, media, group sessions, and practical resources built for communication, emotional resilience, and relationship repair.</p></article>
          </div>
        </section>
        <section class="section">
          <div class="section-header">
            <p class="eyebrow">About Us</p>
            <h2>Meet Steven and Tamara Conway.</h2>
            <p>Steven and Tamara Conway are the founders of Stamena4Life, a 501(c)(3) ministry dedicated to the healing of marriages and families. Married for 24 years, they are the proud parents of four children.</p>
          </div>
          <div class="about-feature">
            <div>
              <h3>A husband-and-wife ministry team</h3>
              <p>This dynamic team has over 20 years of experience empowering couples, families, and individuals around the world. Through their faith-centered approach, they have spoken across North America, Europe, South America, and the South Pacific.</p>
              <p>They are the creators and hosts of the 3ABN series <em>When We Talk</em> and co-hosts of the podcast <em>We're Still Talking</em>.</p>
            </div>
            <img src="${this.asset("hero-conways.webp")}" alt="Steven and Tamara Conway">
          </div>
          <div class="bio-grid">
            <article class="profile-card">
              <img src="${this.asset("tamara.webp")}" alt="Tamara Conway">
              <div><h3>Tamara Conway</h3><p>Tamara Conway is a faith-based speaker, certified Grief Recovery Specialist and Mental Health coach, co-founder of Stamena4Life Ministries, and author of <em>Kill The Girl: From Coping to Healing</em>.</p><p>Her teaching blends biblical wisdom with practical tools to help others heal from trauma, build emotional resilience, and communicate with purpose.</p></div>
            </article>
            <article class="profile-card">
              <img src="${this.asset("steven.webp")}" alt="Steven Conway">
              <div><h3>Steven Conway</h3><p>Steven Conway is a husband, father, educator, and pastor with over 23 years of ministry experience. He is known for his relatable approach to faith, relationships, and life transformation.</p><p>He is co-creator of the 3ABN relationship series <em>When We Talk</em> and co-host of <em>We're Still Talking</em>.</p></div>
            </article>
          </div>
        </section>
      `);
    }
  }

  class S4LHopProgramsSection extends S4LBaseElement {
    render() {
      const c = this.getConfig();
      this.shadowRoot.innerHTML = this.page(`
        <section class="section">
          <div class="section-header">
            <p class="eyebrow">H.O.P. Lane</p>
            <h2>Healing On Purpose through guided recovery and growth.</h2>
            <p>H.O.P. Lane centers on helping people identify and process change, forgive, release bitterness, uncover roots of addictive behaviors, loss of faith, grief, difficult memories, broken relationships, and more.</p>
          </div>
          <div class="program-grid">
            <article class="program-card wide">
              <div class="program-image"><img src="${this.asset("grief-recovery.webp")}" alt="Grief Recovery Method badge"></div>
              <div>
                <h3>Grief Recovery Method</h3>
                <p>Seven to eight online live group sessions or one-on-one support centered on helping people bring ongoing pain to an end with actionable tools.</p>
                <ul class="check-list">
                  <li>Individuals and married couples</li>
                  <li>Parents helping children with loss</li>
                  <li>Small groups, churches, schools, and communities</li>
                </ul>
                <div class="inline-actions">
                  <a class="button primary" href="${c.griefRegisterUrl}" target="_blank" rel="noreferrer">Register</a>
                  <a class="button quiet" href="${c.memberUrl}">Member Resources</a>
                </div>
              </div>
            </article>
            <article class="program-card">
              <h3>Helping Children Process Change</h3>
              <p>A four-session live online workshop for parents, teachers, caregivers, and mentors who want practical ways to support children and youth through grief, loss, and change.</p>
              <a class="text-link" href="mailto:stamena4life@gmail.com?subject=Helping%20Children%20With%20Loss%20Inquiry">Email for Info</a>
            </article>
            <article class="program-card">
              <h3>Current Listed Session Details</h3>
              <p>The current site lists March 5, 2026 Grief Recovery options in Troy, Michigan and virtual Zoom cohorts. Confirm current availability before promoting live dates.</p>
              <div class="inline-actions">
                <a class="text-link" href="https://forms.gle/8gWQ9AAsX1KKgWnbA" target="_blank" rel="noreferrer">In-person form</a>
                <a class="text-link" href="https://forms.gle/tBHqAz2xLCsfEH1A9" target="_blank" rel="noreferrer">Virtual form</a>
              </div>
            </article>
          </div>
        </section>
        <section class="section">
          <div class="section-header">
            <p class="eyebrow">Programs &amp; Coaching</p>
            <h2>Continue the journey with us.</h2>
          </div>
          <div class="offering-grid">
            <article class="offering-card"><img src="${this.asset("pmc.webp")}" alt="Pre-Marriage Coaching"><h3>PMC Pre-Marriage Coaching</h3><p>Couples coaching intended to help build strong foundations by exploring communication, conflict resolution, expectations, and faith-based principles for lasting love.</p><a class="text-link" href="${c.bookingUrl}" target="_blank" rel="noreferrer">Schedule sessions</a></article>
            <article class="offering-card"><img src="${this.asset("c3.webp")}" alt="C-3 Challenge"><h3>C-3 Challenge</h3><p>Three interactive lectures and group activities for communities, churches, schools, or businesses processing significant change, trauma, or loss.</p><p class="meta">Cost listed on current site: $1,000 + travel, lodging, and meals. Minimum 20 participants.</p><a class="text-link" href="mailto:stamena4life@gmail.com?subject=C-3%20Challenge%20Inquiry">Inquire</a></article>
            <article class="offering-card"><img src="${this.asset("six-pillars.webp")}" alt="The 6 Pillars of Powerful Relationships"><h3>The 6 Pillars of Powerful Relationships</h3><p>Six interactive in-person presentations focused on communication, conflict resolution, loss, emotional wounds, family dynamics, community, ministry, and the workplace.</p><a class="text-link" href="${c.bookingUrl}" target="_blank" rel="noreferrer">Book the series</a></article>
          </div>
        </section>
      `);
    }
  }

  class S4LResourcesMediaSection extends S4LBaseElement {
    render() {
      const c = this.getConfig();
      this.shadowRoot.innerHTML = this.page(`
        <section class="section resource-section">
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
        <section class="section">
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
              ${[
                ["Conquering The Crisis - Interview with Steven and Tamara Conway", "jEtvUpR1tl4"],
                ["Family Blessings - 3ABN television interview", "urJt7tnIFb4"],
                ["Relationship conversation television interview", "OgdpfVCX0x8"],
                ["Healing on purpose media interview", "u95oAVoO89M"],
                ["More from Stamena4Life television interview", "iM9JMtPBKrk"]
              ].map(([title, id]) => `<article class="tv-video"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></article>`).join("")}
            </div>
          </div>
        </section>
      `);
    }
  }

  class S4LTestimonialsSection extends S4LBaseElement {
    render() {
      const items = [
        ["Tamara is top notch in her care and teaching/helping others learn about or process grief. She, herself, has gone through a lot, so there is a deep understanding and compassion.", "Daniel T.", "testimonial-daniel.png"],
        ["Thank you for what you and your husband did to help me and my husband. We are together today because of your love. We are forever grateful.", "Denise H.", "testimonial-denise.jpg"],
        ["Words are not sufficient to express our gratitude for what you both poured into the people of our church this weekend...looking forward to hearing more soon.", "Lisa H.", "testimonial-lisa.png"],
        ["It was an authentic and informative experience! Thank you for blessing us with so many gems. Looking forward to what MORE God has in store for us all as we choose to Heal On Purpose together.", "Colleen M.", "testimonial-colleen.jpg"],
        ["God used The Journey programming and Tammy's guidance, to begin my healing process so that I can be a healthier and whole version of myself.", "Upuia F.", "testimonial-upuia.png"],
        ["My biggest takeaway was my past experiences do not have to define me and I do not have to carry the pain and baggage with me anymore.", "S.F.", "testimonial-sf.jpg"]
      ];

      this.shadowRoot.innerHTML = this.page(`
        <section class="section testimonial-section">
          <div class="section-header">
            <p class="eyebrow">Testimonies</p>
            <h2>What people are saying.</h2>
          </div>
          <div class="testimonial-grid">
            ${items.map(([quote, name, image]) => `<figure><blockquote>"${quote}"</blockquote><figcaption><img src="${this.asset(image)}" alt=""><strong>${name}</strong></figcaption></figure>`).join("")}
          </div>
        </section>
      `);
    }
  }

  class S4LContactFooterSection extends S4LBaseElement {
    render() {
      const c = this.getConfig();
      this.shadowRoot.innerHTML = this.page(`
        <section class="section support-section">
          <div class="support-panel">
            <div><p class="eyebrow">Support the mission</p><h2>Partner with Stamena4Life.</h2><p>Subscriptions, donations, book purchases, and merchandise purchases further the goal of reaching people who need hope and strengthening the foundations of families for generations to come.</p></div>
            <div class="support-actions"><a class="button primary" href="${c.donateUrl}" target="_blank" rel="noreferrer">Donate Online</a><a class="button secondary" href="${c.memberUrl}">Member Library</a><p>Stamena4Life is a 501(c)(3) nonprofit. Donations are tax-deductible as allowed by law.</p></div>
          </div>
        </section>
        <section class="section">
          <div class="section-header">
            <p class="eyebrow">Contact &amp; Booking</p>
            <h2>Ready to connect?</h2>
            <p>Use the booking inquiry for grief recovery seminars, preaching/speaking, the 6 Pillars series, pre-marriage coaching, and mental health coaching. You can also call or email directly.</p>
          </div>
          <div class="contact-grid">
            <div class="contact-card"><h3>Contact Us</h3><p><strong>Phone:</strong> <a href="tel:+13133431422">313-343-1422</a></p><p><strong>Email:</strong> <a href="mailto:stamena4life@gmail.com">stamena4life@gmail.com</a></p><p><strong>Booking:</strong> <a href="mailto:stevenconway@stamena4life.com">stevenconway@stamena4life.com</a></p><div class="inline-actions"><a class="button primary" href="${c.bookingUrl}" target="_blank" rel="noreferrer">Open Booking Form</a><a class="button quiet" href="${c.contactUrl}">Email Us</a></div></div>
          </div>
        </section>
        <footer class="site-footer">
          <div class="footer-top">
            <a class="footer-brand" href="#"><img src="${this.asset("logo.png")}" alt=""><span>STAMENA4LIFE</span></a>
          </div>
          <div class="disclaimer">
            <h2>Disclaimer</h2>
            <p>"The information provided within this website and it's resources, along with coaching services, are not to be used to take the place of any licensed Therapist, or Counselor. These resources are for educational and coaching purposes only. Marriage Coaching is not therapy or a form of treatment. We are not diagnosing or treating any conditions, psychological or otherwise. We do not seek to take the place of, or encourage the discontinuation of any work you are currently doing, or have done with a licensed therapist/counselor. You are solely responsible for what you do with this content." - S4L.</p>
          </div>
          <div class="footer-bottom"><p>&copy; 2026 STAMENA4LIFE. 501(c)(3) nonprofit.</p><p>Donations are tax-deductible as allowed by law.</p></div>
        </footer>
      `);
    }
  }

  class S4LMemberPortalSection extends S4LBaseElement {
    render() {
      const c = this.getConfig();
      this.shadowRoot.innerHTML = this.page(`
        <section class="member-hero">
          <div class="member-hero-inner">
            <div class="member-copy">
              <p class="eyebrow">Member Library</p>
              <h1>H.O.P. Lane subscriber resources.</h1>
              <p>Sign in to access the current PDF tools connected to H.O.P. Lane and the healing-on-purpose journey.</p>
              <div class="hero-actions"><a class="button primary" href="${c.memberUrl}">Subscribe</a><a class="button secondary" href="${c.memberUrl}">Member Login</a></div>
            </div>
            <aside class="member-login-card">
              <p class="eyebrow">Subscriber Login</p>
              <h2>Access your library</h2>
              <p class="member-status">Use this section as the Wix-facing mirror. Keep the real subscriber login connected through the GitHub/Cloudflare member page or replace this card with Wix Members/Pricing Plans.</p>
              <div class="inline-actions"><a class="button primary" href="${c.memberUrl}">Open Member Portal</a></div>
            </aside>
          </div>
        </section>
        <section class="section">
          <div class="section-header">
            <p class="eyebrow">Subscriber PDFs</p>
            <h2>Resource library.</h2>
            <p>These downloads are reserved for active subscribers. The H.O.P. Lane promo video remains public.</p>
          </div>
          <div class="member-resource-grid">
            <article class="library-card"><span>PDF</span><h3>Core Fear Test</h3><p>A reflective tool for naming the fears that shape reactions, decisions, and relationship patterns.</p><a class="button quiet" href="${c.memberUrl}">Unlock Download</a></article>
            <article class="library-card"><span>PDF</span><h3>Communication Styles</h3><p>A cross-cultural communication tool for healthier conversations and clearer repair after conflict.</p><a class="button quiet" href="${c.memberUrl}">Unlock Download</a></article>
            <article class="library-card"><span>PDF</span><h3>H.O.P. Lane Resource</h3><p>A downloadable companion resource connected to H.O.P. Lane and healing-on-purpose work.</p><a class="button quiet" href="${c.memberUrl}">Unlock Download</a></article>
            <article class="library-card"><span>PDF</span><h3>Book Sneak Peek</h3><p>Preview the opening chapters of <em>Kill The Girl</em> inside the subscriber library.</p><a class="button quiet" href="${c.memberUrl}">Unlock Download</a></article>
          </div>
        </section>
      `);
    }
  }

  class S4LFullSite extends S4LBaseElement {
    render() {
      const c = this.getConfig();
      const assetBase = c.assetBase;
      this.shadowRoot.innerHTML = this.page(`
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
            <s4l-hero-section asset-base="${assetBase}" member-url="#resources" contact-url="#contact"></s4l-hero-section>
          </div>
          <div id="mission">
            <div id="about">
              <s4l-mission-about-section asset-base="${assetBase}"></s4l-mission-about-section>
            </div>
          </div>
          <div id="hop">
            <s4l-hop-programs-section asset-base="${assetBase}" member-url="${c.memberUrl}" booking-url="${c.bookingUrl}" grief-register-url="${c.griefRegisterUrl}"></s4l-hop-programs-section>
          </div>
          <div id="resources">
            <div id="media">
              <s4l-resources-media-section asset-base="${assetBase}" member-url="${c.memberUrl}" book-purchase-url="${c.bookPurchaseUrl}" book-amazon-url="${c.bookAmazonUrl}" podcast-url="${c.podcastUrl}" youtube-url="${c.youtubeUrl}" series-url="${c.seriesUrl}"></s4l-resources-media-section>
            </div>
          </div>
          <div id="testimonials">
            <s4l-testimonials-section asset-base="${assetBase}"></s4l-testimonials-section>
          </div>
          <div id="contact">
            <s4l-contact-footer-section asset-base="${assetBase}" member-url="${c.memberUrl}" contact-url="${c.contactUrl}" booking-url="${c.bookingUrl}" donate-url="${c.donateUrl}"></s4l-contact-footer-section>
          </div>
        </main>
      `);
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

  const definitions = {
    "s4l-hero-section": S4LHeroSection,
    "s4l-mission-about-section": S4LMissionAboutSection,
    "s4l-hop-programs-section": S4LHopProgramsSection,
    "s4l-resources-media-section": S4LResourcesMediaSection,
    "s4l-testimonials-section": S4LTestimonialsSection,
    "s4l-contact-footer-section": S4LContactFooterSection,
    "s4l-member-portal-section": S4LMemberPortalSection,
    "s4l-full-site": S4LFullSite
  };

  Object.entries(definitions).forEach(([tag, klass]) => {
    if (!customElements.get(tag)) {
      customElements.define(tag, klass);
    }
  });
})();

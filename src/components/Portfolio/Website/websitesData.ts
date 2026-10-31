// To add a new website, add another object to this list.
// Screenshots are generated from the URL automatically — no image files needed.
// embeddable: false = the site blocks iframes (X-Frame-Options), so Live Preview opens in a new tab.
export const websites = [
  {
    id: 1,
    title: "Meer Tech Solutions",
    description:
      "A professional corporate website for an IT & technology services company. Built to present the company's services, expertise and portfolio with a clean, modern layout, clear calls-to-action and a fully responsive design that works smoothly on every device.",
    url: "https://meertechsolutions.com",
    embeddable: true,
  },
  {
    id: 2,
    title: "Maystone Digital",
    description:
      "A UK-based digital agency website designed to build trust and generate leads. Features a bold modern design, service showcases, smooth animations and a conversion-focused structure that guides visitors from first impression to enquiry.",
    url: "https://www.maystonedigital.co.uk",
    embeddable: true,
  },
  {
    id: 3,
    title: "Outfit By DK",
    description:
      "A complete online streetwear store for one of Pakistan's trending fashion brands. Includes product collections, filters, size variants, cart and a seamless checkout flow — custom-coded for speed, mobile shoppers and a strong brand look.",
    url: "https://outfitbydk.com",
    embeddable: false,
  },
  {
    id: 4,
    title: "Auntie Munaver's",
    description:
      "A premium online store for a family dessert brand that introduced Pakistan to its first official Tres Leches cake and artisanal shortbread. Elegant, appetizing visuals, product pages and easy online ordering that reflect the brand's heritage and quality.",
    url: "https://auntiemunavers.com",
    embeddable: false,
  },
  {
    id: 5,
    title: "Kids Care",
    description:
      "An e-commerce platform for kids' and baby care products. Organized categories, clear product details and a simple, friendly shopping experience designed for busy parents — fully responsive with a fast, secure checkout.",
    url: "https://kidscare.pk",
    embeddable: false,
  },
  {
    id: 6,
    title: "Garrard",
    description:
      "A luxury e-commerce experience for a fine jewellery house and UK Royal Warrant holder since 1735. Refined, high-end design with rich imagery, detailed collection pages and a polished shopping journey that matches the brand's heritage.",
    url: "https://www.garrard.com/en-us",
    embeddable: false,
  },
];

export type Website = (typeof websites)[number];

export const screenshot = (url: string) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800&screenshot.type=jpeg`;

export const domain = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

// Cache screenshots in the background on page load so they show instantly when the popup opens
export const preloadWebsiteScreenshots = () => {
  websites.forEach((site) => {
    const img = new Image();
    img.src = screenshot(site.url);
  });
};

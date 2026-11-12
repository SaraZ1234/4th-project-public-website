// Stand-in for the Admin Panel CMS (spec §22). Replace each export with a fetch to the CMS API.
// All copy is placeholder and must be replaced with client-approved text.
// Anything marked PLACEHOLDER must be confirmed by the client before launch.
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.example.com";

export const site = {
  name: "Fast Group",
  tagline:
    "Fast Group brings import and export, our own online store, a multi-vendor marketplace and printing services together in one organization.",
  // PLACEHOLDER contact details: replace with the client's real, approved details.
  email: "fastmediaagencyofficial@gmail.com",
  phone: "+1 (604) 239-6141",
  address: "101 Queen Street, West Toronto, ON M5H 2NI, Canada",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Businesses", href: "/businesses" },
  { label: "Import & Export", href: "/import-export" },
  { label: "Products / E-Commerce", href: "/products" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Printing Services", href: "/printing" },
  { label: "Countries / Markets", href: "/countries" },
  { label: "Contact Us", href: "/contact" },
];

export const businesses = [
  {
    slug: "import-export",
    name: "Import & Export",
    color: "var(--color-biz-trade)",
    tag: "Trade",
    text: "National and international trade with suppliers, buyers and trade partners across different markets.",
    href: "/import-export",
  },
  {
    slug: "products",
    name: "Own E-Commerce Store",
    color: "var(--color-biz-store)",
    tag: "Store",
    text: "Products sold directly by Fast Group through our online store.",
    href: "/products",
  },
  {
    slug: "marketplace",
    name: "Marketplace",
    color: "var(--color-biz-market)",
    tag: "Marketplace",
    text: "A platform where independent sellers offer their products to buyers.",
    href: "/marketplace",
  },
  {
    slug: "printing",
    name: "Printing Services",
    color: "var(--color-biz-print)",
    tag: "Printing",
    text: "Printing services for individuals and businesses, from enquiry and quotation to delivery.",
    href: "/printing",
  },
];

export type ProductOwner = "Sold by Fast Group" | "Marketplace Seller";

export type Product = {
  slug: string;
  name: string;
  desc: string;
  category: string;
  available?: string;
  price?: string; // show only when the client approves a price
  image?: string; // path to a real product photo, e.g. "/images/products/box.webp"
  sellerName?: string; // add: name of the independent seller (marketplace products only)
  owner: ProductOwner;
};

// True for products the organization sells itself (not marketplace sellers).
export const isOwnProduct = (p: Product) =>
  p.owner === "Sold by Fast Group";

// PLACEHOLDER: sample products. Replace with real products, descriptions and images from the CMS.
export const products: Product[] = [
  {
    slug: "eco-packaging-box",
    name: "Packaging Cartons",
    desc: "Heavy-duty corrugated boxes for shipping and storage.",
    category: "Packaging & Printing",
    available: "In Stock",
    owner: "Sold by Fast Group",
  },
  {
    slug: "textile-raw-cotton",
    name: "Raw Cotton Bales",
    desc: "Raw cotton bales for textile manufacturing.",
    category: "Raw Materials",
    available: "Available on Request",
    owner: "Marketplace Seller",
  },
  {
    slug: "smart-pos-terminal",
    name: "Retail POS System",
    desc: "Point-of-sale hardware terminal for retail checkout counters.",
    category: "Retail Tech",
    available: "Available on Request",
    owner: "Sold by Fast Group",
  },
  {
    slug: "kraft-paper-rolls",
    name: "Kraft Paper Rolls",
    desc: "Kraft paper rolls for wrapping and packaging.",
    category: "Paper & Packaging",
    available: "In Stock",
    owner: "Marketplace Seller",
  },
];

export type Country = {
  slug: string;
  name: string;
  group: "home" | "international";
  text: string;
};

// PLACEHOLDER: the client must confirm which countries to show and what is
// imported or exported in each. Pakistan always stays first and separate.
export const countries: Country[] = [
  {
    slug: "pakistan",
    name: "Pakistan",
    group: "home",
    text: "Pakistan is our home market. Here we run our own online store, our marketplace, our printing services and our trade activities, all in one place.",
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    group: "international",
    text: "We import goods from the United Arab Emirates and export goods there.",
  },
  {
    slug: "china",
    name: "China",
    group: "international",
    text: "We import goods from China and export goods there.",
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    group: "international",
    text: "We import goods from the United Kingdom and export goods there.",
  },
  {
    slug: "united-states",
    name: "United States",
    group: "international",
    text: "We import goods from the United States and export goods there.",
  },
  {
    slug: "turkey",
    name: "Türkiye",
    group: "international",
    text: "We import goods from Türkiye and export goods there.",
  },
];

export const sellerSteps = [
  "Learn about the marketplace",
  "Choose to join",
  "Go to registration",
  "Provide business information",
  "Platform onboarding",
];

export const whyUs = [
  "Several businesses through one organization",
  "A connected environment for buyers and sellers",
  "Opportunities for independent sellers",
  "Access to our products and services",
  "Business engagement across relevant markets",
  "One digital presence for multiple activities",
];

// Each question is written once and reused, so categories never drift out of sync.
const faq = {
  businesses: {
    q: "Which businesses do you operate?",
    a: "Fast Group operates four businesses: Import & Export, our Own E-Commerce Store, the Marketplace and Printing Services.",
  },
  buyOwn: {
    q: "How do I buy products sold directly by Fast Group?",
    a: "Browse products marked “Sold by Fast Group” in our online store and buy them through the shop.",
  },
  sell: {
    q: "Who can register to sell on the marketplace?",
    a: "Small and large businesses, manufacturers, wholesalers and independent sellers can apply to sell on our platform.",
  },
  printingQuote: {
    q: "How do I request a quotation for printing services?",
    a: "Submit your enquiry with your requirements, materials, quantity and artwork details, and you will receive a quotation.",
  },
  marketplaceRun: {
    q: "Is the marketplace run by the organization?",
    a: "The marketplace hosts independent sellers. Every product shows whether it is sold by the organization or by an independent seller.",
  },
  countries: {
    q: "Which countries do you work in?",
    a: "See the Countries / Markets page for the markets we work in.",
  },
  askProduct: {
    q: "How do I ask about a product?",
    a: "Use the Contact Us page and choose the Products category.",
  },
  support: {
    q: "Where can I get customer support?",
    a: "Use the Contact Us page, or the support email and phone number in the footer.",
  },
  printingDirect: {
    q: "Can I buy printed items directly?",
    a: "Printing starts with an enquiry. Quotations and printing orders are handled in the web application.",
  },
  whereBuy: {
    q: "Where do I buy products?",
    a: "Use Shop Now. Shopping happens in the web application.",
  },
  tradeEnquiry: {
    q: "How do I send a trade enquiry?",
    a: "Use Submit Trade Enquiry on the Import & Export page.",
  },
};

export const faqs = [
  faq.businesses,
  faq.buyOwn,
  faq.sell,
  faq.printingQuote,
  faq.marketplaceRun,
  faq.countries,
  faq.askProduct,
  faq.support,
  faq.printingDirect,
];

export const faqCategories: Record<string, { q: string; a: string }[]> = {
  General: [faq.businesses, faq.countries],
  "E-commerce and products": [faq.whereBuy, faq.buyOwn, faq.askProduct],
  "Marketplace seller participation": [faq.sell, faq.marketplaceRun],
  "Import and export": [faq.tradeEnquiry, faq.countries],
  "Printing services": [faq.printingQuote, faq.printingDirect],
  "General support": [faq.support],
};

export type Announcement = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  body: string;
};

// Add only real, approved announcements. Pages that show announcements must
// handle an empty list (Home and the Pakistan page already hide the section).
// Example shape:
// {
//   slug: "example-announcement",
//   title: "…",
//   category: "General",
//   date: "November 2026",
//   excerpt: "…",
//   body: "…",
// }
export const announcements: Announcement[] = [];

export const announcementCategories = [
  "New business",
  "New products",
  "Marketplace",
  "Printing",
  "Country or market",
  "General",
];

// Add only real, approved feedback. Sections hide themselves when this is empty.
export const testimonials: { quote: string; name: string; meta: string }[] = [];

type Block = { h: string; text?: string; items?: string[]; steps?: boolean };
export type PageDef = {
  slug: string;
  title: string;
  desc: string;
  intro: string;
  blocks: Block[];
  cta?: { label: string; href: string };
  cta2?: { label: string; href: string };
  json?: boolean;
};

export const pages: PageDef[] = [
  {
    slug: "about",
    title: "About Us",
    desc: "Who we are, our business concept, our vision and objectives, and how our businesses connect.",
    intro:
      "Learn who we are, how our four businesses fit together, and how we work with customers, sellers and partners.",
    blocks: [
      {
        h: "Who we are",
        text: "Fast Group is a Pakistan-based business group working in international trade, e-commerce, a multi-vendor marketplace and printing services. We bring these activities together under one organization so that customers, sellers and business partners can deal with us in one place.",
      },
      {
        h: "Business concept",
        text: "Several businesses, one ecosystem: trade, own store, marketplace and printing. We connect national and international trade with online selling and printing services, so buyers, sellers, suppliers and trade partners can work through one connected organization.",
      },
      {
        h: "Vision and objectives",
        text: "Our vision is to bring trade, retail, marketplace and printing together in one connected organization that serves customers, sellers and partners clearly and reliably.",
        items: [
          "Develop trade relationships across relevant markets",
          "Give independent sellers a reliable place to sell",
          "Offer printing services to individuals and businesses",
          "Add new business activities over time",
        ],
      },
      {
        h: "How our businesses connect",
        items: [
          "Import & Export: trade between Pakistan and other markets.",
          "Own Store: products sold directly by Fast Group.",
          "Marketplace: independent sellers offering their products to buyers.",
          "Printing: printing services for individuals and businesses.",
        ],
      },
      {
        h: "Our approach to customers and partners",
        text: "We aim to deal with every customer, seller and trade partner clearly and fairly. Whether you want to buy, sell, trade or order printing, our team supports your enquiry across all our businesses.",
      },
    ],
    cta: { label: "Contact Us", href: "/contact" },
    cta2: { label: "Explore Our Businesses", href: "/businesses" },
  },
  {
    slug: "businesses",
    title: "Our Businesses",
    desc: "Import and export, our own store, the marketplace and printing services.",
    intro: "Four businesses, one organization. Pick one to learn more.",
    blocks: [
      {
        h: "Import & Export",
        text: "National and international trade with suppliers, buyers and trade partners across different markets.",
        items: ["/import-export"],
      },
      {
        h: "Own Store",
        text: "Products sold directly by Fast Group through our online store.",
        items: ["/products"],
      },
      {
        h: "Marketplace",
        text: "A platform where independent sellers offer their products to buyers, separate from our own store.",
        items: ["/marketplace"],
      },
      {
        h: "Printing Services",
        text: "Printing services for individuals and businesses, from enquiry and quotation to delivery.",
        items: ["/printing"],
      },
    ],
    cta: { label: "Contact Us", href: "/contact" },
    cta2: { label: "About Us", href: "/about" },
  },
  {
    slug: "import-export",
    title: "Import & Export",
    desc: "National and international trade across countries and markets.",
    intro:
      "We trade nationally and internationally, with Pakistan shown separately from our other markets.",
    blocks: [
      {
        h: "Overview",
        text: "Our import and export business covers national and international trade. We work with suppliers, buyers and trade partners across different markets.",
      },
      {
        // PLACEHOLDER: replace with the goods categories the client confirms.
        h: "Goods we trade",
        items: [
          "Industrial raw materials and textiles",
          "Consumer electronics and retail hardware",
          "Packaging substrates and paper goods",
          "Agricultural commodities and produce",
        ],
      },
      {
        h: "How trade enquiries work",
        steps: true,
        items: [
          "Enquiry",
          "Quotation",
          "Order",
          "Documents",
          "Shipment",
          "Delivery",
        ],
      },
    ],
    cta: { label: "Submit Trade Enquiry", href: `${APP_URL}/trade/enquiry` },
    cta2: { label: "View countries", href: "/countries" },
  },
  {
    slug: "products",
    title: "Products / E-Commerce",
    desc: "Products sold directly by the organization through our online store.",
    intro:
      "Browse the products we sell directly. Shopping, checkout and orders happen in our online shop.",
    blocks: [
      {
        // PLACEHOLDER: replace with the client's real product categories.
        h: "Categories",
        items: [
          "Packaging & Printing Supplies",
          "Raw Materials & Textiles",
          "Retail Technology & POS Systems",
        ],
      },
      {
        h: "How buying works",
        steps: true,
        items: [
          "Browse in the shop",
          "Add to cart",
          "Check out",
          "Track your order",
        ],
      },
    ],
    cta: { label: "Shop Now", href: `${APP_URL}/shop` },
    json: true,
  },
  {
    slug: "marketplace",
    title: "Marketplace",
    desc: "Buy from the organization and independent sellers, or apply to become a seller.",
    intro:
      "A platform where independent sellers offer their products to buyers, alongside products sold by Fast Group.",
    blocks: [
      {
        h: "For buyers",
        text: "Browse products from different sellers. Every product shows who is selling it.",
      },
      {
        h: "Who sells what",
        items: [
          "Sold by Fast Group: products sold directly by us",
          "Marketplace Seller: products offered by independent sellers",
        ],
      },
      { h: "Become a seller", steps: true, items: sellerSteps },
    ],
    cta: { label: "Explore Marketplace", href: `${APP_URL}/marketplace` },
    cta2: { label: "Become a Seller", href: "/become-a-seller" },
  },
  {
    slug: "become-a-seller",
    title: "Become a Seller",
    desc: "How to join the marketplace as an independent seller.",
    intro:
      "Learn how to join the marketplace. Registration and onboarding happen in our web application.",
    blocks: [
      {
        h: "Who can sell",
        text: "Small and large businesses, manufacturers, wholesalers and independent sellers can apply to sell on the marketplace.",
      },
      { h: "The journey", steps: true, items: sellerSteps },
      {
        // PLACEHOLDER: the organization must confirm the real seller documents.
        h: "Documents you may need",
        items: [
          "Business registration and tax details",
          "Proof of business address",
          "Product certifications, where applicable",
          "Identification of the authorized representative",
        ],
      },
    ],
    cta: { label: "Become a Seller", href: `${APP_URL}/seller/register` },
  },
  {
    slug: "printing",
    title: "Printing Services",
    desc: "Printing services for individuals and businesses. Send an enquiry and receive a quotation.",
    intro:
      "Printing services for individuals and businesses. Tell us what you need, receive a quotation and follow your order through to delivery.",
    blocks: [
      {
        // PLACEHOLDER: replace with the services the client confirms.
        h: "Services",
        items: [
          "Corrugated packaging boxes",
          "Offset and digital printing",
          "Foil stamping, embossing and UV coatings",
          "Large format displays and labels",
        ],
      },
      {
        h: "How it works",
        steps: true,
        items: ["Enquiry", "Quotation", "Approval", "Production", "Delivery"],
      },
    ],
    cta: {
      label: "Submit Printing Enquiry",
      href: `${APP_URL}/printing/enquiry`,
    },
    cta2: { label: "Ask a question", href: "/contact?category=Printing" },
  },
  {
    // PLACEHOLDER: legal text must be written or approved by the organization's legal advisor.
    slug: "privacy-policy",
    title: "Privacy Policy",
    desc: "How we collect and handle personal and business information.",
    intro: "Last updated: [date]",
    blocks: [
      {
        h: "Information we collect",
        text: "[Text to be provided by the organization’s legal advisor.]",
      },
      {
        h: "How we use your information",
        text: "[Text to be provided by the organization’s legal advisor.]",
      },
    ],
  },
  {
    // PLACEHOLDER: legal text must be written or approved by the organization's legal advisor.
    slug: "terms",
    title: "Terms and Conditions",
    desc: "The terms for using our website, marketplace and services.",
    intro: "Last updated: [date]",
    blocks: [
      {
        h: "Acceptance of terms",
        text: "[Text to be provided by the organization’s legal advisor.]",
      },
      {
        h: "Limitation of liability",
        text: "[Text to be provided by the organization’s legal advisor.]",
      },
    ],
  },
];

export const printingServices = [
  "Corrugated packaging boxes",
  "Offset and digital printing",
  "Foil stamping, embossing and UV coatings",
  "Large format displays and labels",
];
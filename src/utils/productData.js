// All available products
export const products = [
  "Meta Ads", "Google Ads", "TikTok Ads", "SEO",
  "GBP Ranker", "Backlinks", "Content", "Social Posts"
];

// Pricing for each product and tier
export const pricing = {
  "Meta Ads": { Base: 770, Standard: 980, Premium: 1410 },
  "Google Ads": { Base: 770, Standard: 980, Premium: 1410 },
  "TikTok Ads": { Base: 770, Standard: 980, Premium: 1410 },
  "SEO": { Base: 790, Standard: 1000, Premium: 1450 },
  "GBP Ranker": { Base: 315, Standard: 420, Premium: 675 },
  "Backlinks": { Base: 420, Standard: 630, Premium: 990 },
  "Content": { Base: 210, Standard: 420, Premium: 760 },
  "Social Posts": { Base: 315, Standard: 525, Premium: 895 }
};

// Features for each product and tier
export const features = {
  "Backlinks": {
    Base: ["10 backlinks", "13 in-content links", "DA 10+"],
    Standard: ["15 backlinks", "23 in-content links", "DA 30+"],
    Premium: ["20 backlinks", "41 in-content links", "DA 50+"]
  },
  "Content": {
    Base: ["1 article/mo", "500 words", "AI GPT-4o written"],
    Standard: ["2 articles/mo", "1,000 words", "SEO keyword boost"],
    Premium: ["4 articles/mo", "2,000 words", "Advanced topic research"]
  },
  "GBP Ranker": {
    Base: ["1 image/wk optimized", "AI review replies", "Weekly Q&A"],
    Standard: ["3 images/wk optimized", "AI data training", "Bi-weekly Q&A"],
    Premium: ["Daily images + drip", "Human verification", "Custom AI tuning"]
  },
  "Google Ads": {
    Base: ["Search/display campaigns", "Basic targeting", "Pixel + conversion setup"],
    Standard: ["Keyword research", "Negative keywords", "Ad testing"],
    Premium: ["Keyword expansion", "Performance Max", "Dedicated strategist"]
  },
  "Meta Ads": {
    Base: ["3 graphics", "Basic campaign build", "Pixel + conversion setup"],
    Standard: ["6 graphics", "Ad copy & budget guidance", "Retargeting setup"],
    Premium: ["Unlimited creative sets", "Conversion testing", "Full funnel buildout"]
  },
  "SEO": {
    Base: ["10 keywords", "Google Analytics & GSC", "On-page audits"],
    Standard: ["20 keywords", "Schema setup", "Alt/title tag SEO"],
    Premium: ["40 keywords", "Backlink strategy", "Technical SEO audit"]
  },
  "Social Posts": {
    Base: ["1 post/week", "4 total posts", "1 channel"],
    Standard: ["4 posts/week", "16 total posts", "3 channels"],
    Premium: ["Posts every day", "28 total posts", "6 channels"]
  },
  "TikTok Ads": {
    Base: ["Basic campaign build", "Ad copy creation", "Pixel setup"],
    Standard: ["Audience targeting", "Conversion tracking", "Ad testing"],
    Premium: ["UGC creative coordination", "Advanced targeting", "Scaling strategy"]
  }
};

// Logo URLs for each product and tier
export const logos = {
  "Meta Ads": {
    Base: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/348f698a-51e1-445e-97cf-df704334cf82/Meta+logo.png?format=1000w",
    Standard: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/348f698a-51e1-445e-97cf-df704334cf82/Meta+logo.png?format=1000w",
    Premium: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/b420567e-72b1-4cec-adf2-c655a2d65b63/Meta+premium+logo.png?format=1000w"
  },
  "Google Ads": {
    Base: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/051181f0-7847-4b5e-8bbb-f1beb8c579c4/Google+logo.png?format=1000w",
    Standard: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/051181f0-7847-4b5e-8bbb-f1beb8c579c4/Google+logo.png?format=1000w",
    Premium: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/26113377-495f-4661-bc61-cd8c696853b6/google+premium+logo.png?format=1000w"
  },
  "TikTok Ads": {
    Base: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/13406429-467d-47bd-8e03-3d59a11aa68e/TikTok+logo.png?format=1000w",
    Standard: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/13406429-467d-47bd-8e03-3d59a11aa68e/TikTok+logo.png?format=1000w",
    Premium: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/a7eb2f8c-9226-4f75-af38-538f0e57656b/tik+tok+premium+logo.png?format=1000w"
  },
  "SEO": {
    Base: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/52dfb2a7-fc3a-4241-9702-f18e42f972a3/SEO+logo.png?format=1000w",
    Standard: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/52dfb2a7-fc3a-4241-9702-f18e42f972a3/SEO+logo.png?format=1000w",
    Premium: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/f1d3100c-0a5e-4f92-96b3-4ec1a656db04/SEO+premium+logo.png?format=1000w"
  },
  "GBP Ranker": {
    Base: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/9fa62907-9484-4b4e-8223-f8e2b90e5da4/GBP+ranker+logo.png?format=1000w",
    Standard: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/9fa62907-9484-4b4e-8223-f8e2b90e5da4/GBP+ranker+logo.png?format=1000w",
    Premium: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/ac40a8f7-f30b-4392-b744-83b786d004bf/GBP+premium+logo.png?format=1000w"
  },
  "Backlinks": {
    Base: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/b53aaa01-41a5-4934-8313-1518213bc0ae/Backlinks+logo.png?format=1000w",
    Standard: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/b53aaa01-41a5-4934-8313-1518213bc0ae/Backlinks+logo.png?format=1000w",
    Premium: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/20807f97-95fc-48a3-ad25-bc7f77e43b9d/backlinks+premium+logo.png?format=1000w"
  },
  "Content": {
    Base: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/f30eb3cb-36d8-4c1b-be73-4d791858ee53/Content+Design+logo.png?format=1000w",
    Standard: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/f30eb3cb-36d8-4c1b-be73-4d791858ee53/Content+Design+logo.png?format=1000w",
    Premium: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/5f9850bd-6df9-4294-86c9-980a41bf4da3/content+premium+logo.png?format=1000w"
  },
  "Social Posts": {
    Base: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/707f676b-7980-40d9-aa76-57d8561a167c/Social+Media+logo.png?format=1000w",
    Standard: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/707f676b-7980-40d9-aa76-57d8561a167c/Social+Media+logo.png?format=1000w",
    Premium: "https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/0302cd83-9ae7-4a6c-a6e1-636e1483e769/social+media+premium+logo.png?format=1000w"
  }
};

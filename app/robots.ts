import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/preview",
        "/thank-you",
        "/pool/controller",
        "/pool/tv",
      ],
    },
    sitemap: "https://www.heiyudigital.com/sitemap.xml",
  };
}

import type { MetadataRoute } from "next";

const baseUrl = "https://www.heiyudigital.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/heiyubudget", priority: 0.8 },
    { path: "/engagement", priority: 0.8 },
    { path: "/mvp", priority: 0.8 },
    { path: "/work/heiyubuild", priority: 0.9 },
    { path: "/work/dublin-radon-services", priority: 0.9 },
    { path: "/work/trinity-of-faith", priority: 0.9 },
    { path: "/contact", priority: 0.8 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}

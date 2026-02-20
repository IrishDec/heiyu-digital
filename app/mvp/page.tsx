import MVPClient from "./MVPClient";

export const metadata = {
  title: "MVP Development in 4–8 Weeks | Heiyu Digital",
  description:
    "Launch your startup MVP in 4–8 weeks. Full-stack product development including authentication, payments, dashboards and production deployment.",
  openGraph: {
    title: "Launch Your MVP in 4–8 Weeks | Heiyu Digital",
    description:
      "From idea to deployed product. Full-stack MVP builds for founders ready to launch fast.",
    url: "https://www.heiyudigital.com/mvp",
    siteName: "Heiyu Digital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MVP Development in 4–8 Weeks",
    description:
      "Full-stack MVP builds including auth, payments and deployment.",
  },
};

export default function Page() {
  return <MVPClient />;
}
    

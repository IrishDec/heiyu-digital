import EngagementClient from "./EngagementClient";

export const metadata = {
  title: "White Label Quiz Platform for Events & Corporate Training | Heiyu Digital",
  description:
    "Deploy fully branded AI-powered quiz experiences for corporate events, classrooms and marketing campaigns. Instant setup, real-time multiplayer and white-label options.",
  openGraph: {
    title: "Deploy Branded AI Quiz Experiences Anywhere",
    description:
      "White-label quiz platform for events, agencies and corporate teams. Fully branded and instantly playable.",
    url: "https://www.heiyudigital.com/engagement",
    siteName: "Heiyu Digital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "White Label AI Quiz Platform",
    description:
      "Fully branded quiz systems for events, classrooms and campaigns.",
  },
};

export default function Page() {
  return <EngagementClient />;
}

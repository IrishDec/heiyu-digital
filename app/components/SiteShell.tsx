"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  CaseStudyHeader,
  CaseStudyFooter,
} from "./CaseStudyChrome";

export default function SiteShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname() || "/";

  // Leave the interactive pool game screens alone.
  if (pathname === "/pool" || pathname.startsWith("/pool/")) {
    return <>{children}</>;
  }

  return (
    <>
      <CaseStudyHeader />
      <div data-heiyu-page={pathname}>
        {children}
      </div>
      <CaseStudyFooter />
    </>
  );
}

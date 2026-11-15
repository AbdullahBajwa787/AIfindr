"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackLiveEvent } from "@/lib/tools-store";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastPath = useRef("");

  useEffect(() => {
    // Avoid double counting same path consecutively
    if (pathname && pathname !== lastPath.current) {
      lastPath.current = pathname;
      let label = "Homepage";
      if (pathname.startsWith("/tools/")) {
        const slug = pathname.replace("/tools/", "");
        label = `Tool: ${slug}`;
      } else if (pathname === "/tools") {
        label = "Directory Browsing";
      } else if (pathname === "/categories") {
        label = "Categories View";
      } else if (pathname === "/about") {
        label = "About Page";
      } else if (pathname === "/support") {
        label = "Support Center";
      } else if (pathname === "/admin") {
        label = "Admin Console";
      }
      trackLiveEvent("Page Visit", label);
    }
  }, [pathname]);

  return null;
}

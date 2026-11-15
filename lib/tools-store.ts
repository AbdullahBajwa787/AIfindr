"use client";

import { useState, useEffect } from "react";
import { tools as initialTools, Tool } from "@/lib/tools";

export interface AnalyticsData {
  totalVisitors: number;
  todayVisitors: number;
  totalPageViews: number;
  activeBookmarks: number;
  liveVisitors: number;
  topCountries: { country: string; code: string; percent: number }[];
  visitorLogs: {
    id: string;
    action: string;
    toolName: string;
    location: string;
    time: string;
    device: string;
  }[];
}

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  type: string;
  subject: string;
  message: string;
  date: string;
  status: "Open" | "Resolved";
}

export interface SubmittedTool {
  id: string;
  name: string;
  url: string;
  category: string;
  price: "Free" | "Paid" | "Check pricing";
  description: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
}

const STORAGE_KEY_TOOLS = "aifindr_managed_tools";
const STORAGE_KEY_TICKETS = "aifindr_support_tickets";
const STORAGE_KEY_SUBMISSIONS = "aifindr_user_submissions";
const STORAGE_KEY_ANALYTICS = "aifindr_real_analytics";
const SESSION_KEY_VISITED = "aifindr_session_counted";

// Clean, realistic initial baseline for newly launched site
function getInitialRealAnalytics(): AnalyticsData {
  let initialBookmarks = 0;
  if (typeof window !== "undefined") {
    try {
      const saved = JSON.parse(localStorage.getItem("aifindr_saved_tools") || "[]");
      if (Array.isArray(saved)) initialBookmarks = saved.length;
    } catch {}
  }

  // Detect real visitor country/timezone
  let detectedCountry = "Pakistan (PK)";
  let countryName = "Pakistan";
  let countryCode = "PK";
  if (typeof window !== "undefined") {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (tz.includes("Karachi") || tz.includes("Pakistan")) {
        detectedCountry = "Pakistan (PK)";
        countryName = "Pakistan";
        countryCode = "PK";
      } else if (tz.includes("New_York") || tz.includes("Los_Angeles") || tz.includes("America")) {
        detectedCountry = "United States (US)";
        countryName = "United States";
        countryCode = "US";
      } else if (tz.includes("London") || tz.includes("Europe")) {
        detectedCountry = "United Kingdom (UK)";
        countryName = "United Kingdom";
        countryCode = "UK";
      } else {
        const parts = tz.split("/");
        countryName = parts[0] || "Global";
        detectedCountry = `${countryName}`;
      }
    } catch {}
  }

  return {
    totalVisitors: 1,
    todayVisitors: 1,
    totalPageViews: 1,
    activeBookmarks: initialBookmarks,
    liveVisitors: 1,
    topCountries: [
      { country: countryName, code: countryCode, percent: 100 },
    ],
    visitorLogs: [
      {
        id: "log-1",
        action: "Launched Website",
        toolName: "Homepage",
        location: detectedCountry,
        time: "Just now",
        device: typeof window !== "undefined" && window.innerWidth < 768 ? "Mobile Device" : "Desktop Browser",
      },
    ],
  };
}

export function getStoredTools(): Tool[] {
  if (typeof window === "undefined") return initialTools;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_TOOLS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Failed to load stored tools:", e);
  }
  return initialTools;
}

export function saveStoredTools(tools: Tool[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_TOOLS, JSON.stringify(tools));
    window.dispatchEvent(new Event("aifindr_tools_updated"));
  } catch (e) {
    console.error("Failed to save tools:", e);
  }
}

export function getStoredAnalytics(): AnalyticsData {
  if (typeof window === "undefined") return getInitialRealAnalytics();
  try {
    const saved = localStorage.getItem(STORAGE_KEY_ANALYTICS);
    if (saved) {
      const parsed: AnalyticsData = JSON.parse(saved);
      // Synchronize real bookmarks count with actual saved bookmarks
      try {
        const bookmarks = JSON.parse(localStorage.getItem("aifindr_saved_tools") || "[]");
        if (Array.isArray(bookmarks)) parsed.activeBookmarks = bookmarks.length;
      } catch {}
      return parsed;
    }
  } catch (e) {}

  const initial = getInitialRealAnalytics();
  saveStoredAnalytics(initial);
  return initial;
}

export function saveStoredAnalytics(data: AnalyticsData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_ANALYTICS, JSON.stringify(data));
    window.dispatchEvent(new Event("aifindr_analytics_updated"));
  } catch (e) {}
}

export function resetAnalyticsToZero() {
  if (typeof window === "undefined") return;
  const zeroData: AnalyticsData = {
    totalVisitors: 1,
    todayVisitors: 1,
    totalPageViews: 1,
    activeBookmarks: 0,
    liveVisitors: 1,
    topCountries: [{ country: "Live Visitors", code: "NOW", percent: 100 }],
    visitorLogs: [
      {
        id: `reset-${Date.now()}`,
        action: "Metrics Reset to Live",
        toolName: "Admin Dashboard",
        location: "Admin Session",
        time: "Just now",
        device: "Current Device",
      },
    ],
  };
  saveStoredAnalytics(zeroData);
}

// Track a real live event on the site
export function trackLiveEvent(action: string, toolName: string = "Directory") {
  if (typeof window === "undefined") return;
  try {
    const current = getStoredAnalytics();
    const isNewSession = !sessionStorage.getItem(SESSION_KEY_VISITED);
    if (isNewSession) {
      sessionStorage.setItem(SESSION_KEY_VISITED, "true");
      current.totalVisitors = (current.totalVisitors || 0) + 1;
      current.todayVisitors = (current.todayVisitors || 0) + 1;
    }

    current.totalPageViews = (current.totalPageViews || 0) + 1;

    // Detect actual bookmarks count
    try {
      const bookmarks = JSON.parse(localStorage.getItem("aifindr_saved_tools") || "[]");
      if (Array.isArray(bookmarks)) current.activeBookmarks = bookmarks.length;
    } catch {}

    // Detect user timezone/location
    let location = "Live Visitor";
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (tz.includes("Karachi") || tz.includes("Pakistan")) location = "Pakistan (PK)";
      else if (tz.includes("New_York") || tz.includes("America")) location = "United States (US)";
      else if (tz.includes("London") || tz.includes("Europe")) location = "United Kingdom (UK)";
      else if (tz) location = tz.split("/")[1]?.replace("_", " ") || tz;
    } catch {}

    const device = window.innerWidth < 768 ? "Mobile Device" : "Desktop Browser";

    const newLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      action,
      toolName,
      location,
      time: "Just now",
      device,
    };

    // Keep the latest 20 real activity logs
    current.visitorLogs = [newLog, ...(current.visitorLogs || []).slice(0, 19)];
    saveStoredAnalytics(current);
  } catch (e) {}
}

export function getStoredTickets(): SupportTicket[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY_TICKETS);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [];
}

export function saveTicket(ticket: Omit<SupportTicket, "id" | "date" | "status">) {
  if (typeof window === "undefined") return;
  const current = getStoredTickets();
  const newTicket: SupportTicket = {
    ...ticket,
    id: `TICK-${Math.floor(100 + Math.random() * 900)}`,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    status: "Open",
  };
  localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify([newTicket, ...current]));
  trackLiveEvent("Submitted Support Ticket", ticket.subject || "Support");
}

export function useTools() {
  const [toolsList, setToolsList] = useState<Tool[]>(initialTools);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setToolsList(getStoredTools());
    setIsLoaded(true);

    const handleUpdate = () => {
      setToolsList(getStoredTools());
    };

    window.addEventListener("aifindr_tools_updated", handleUpdate);
    return () => window.removeEventListener("aifindr_tools_updated", handleUpdate);
  }, []);

  return { tools: toolsList, isLoaded };
}

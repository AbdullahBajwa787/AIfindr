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
const STORAGE_KEY_ANALYTICS = "aifindr_analytics_metrics";

const defaultAnalytics: AnalyticsData = {
  totalVisitors: 18420,
  todayVisitors: 1240,
  totalPageViews: 43910,
  activeBookmarks: 894,
  liveVisitors: 18,
  topCountries: [
    { country: "United States", code: "US", percent: 42 },
    { country: "United Kingdom", code: "UK", percent: 18 },
    { country: "Pakistan", code: "PK", percent: 15 },
    { country: "Germany", code: "DE", percent: 12 },
    { country: "India", code: "IN", percent: 13 },
  ],
  visitorLogs: [
    { id: "1", action: "Viewed Tool", toolName: "Cursor", location: "San Francisco, US", time: "Just now", device: "Desktop / Chrome" },
    { id: "2", action: "Bookmarked", toolName: "Midjourney", location: "London, UK", time: "2 min ago", device: "Mobile / Safari" },
    { id: "3", action: "Searched 'Coding'", toolName: "GitHub Copilot", location: "Lahore, PK", time: "5 min ago", device: "Desktop / Windows" },
    { id: "4", action: "External Link Click", toolName: "ElevenLabs", location: "Berlin, DE", time: "8 min ago", device: "Desktop / Mac" },
    { id: "5", action: "Viewed Tool", toolName: "ChatGPT", location: "Mumbai, IN", time: "11 min ago", device: "Mobile / Android" },
  ],
};

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
  if (typeof window === "undefined") return defaultAnalytics;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_ANALYTICS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    // fallback
  }
  return defaultAnalytics;
}

export function saveStoredAnalytics(data: AnalyticsData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_ANALYTICS, JSON.stringify(data));
    window.dispatchEvent(new Event("aifindr_analytics_updated"));
  } catch (e) {
    // fallback
  }
}

export function getStoredTickets(): SupportTicket[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY_TICKETS);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [
    {
      id: "TICK-101",
      name: "Ali Khan",
      email: "ali@example.com",
      type: "Tool Update Request",
      subject: "Update pricing for Cursor",
      message: "Cursor now has a new pro hobbyist tier, please reflect in listing.",
      date: "Nov 15, 2026",
      status: "Open",
    },
    {
      id: "TICK-102",
      name: "Sarah Miller",
      email: "sarah@creator.ai",
      type: "Partnership",
      subject: "Featured listing partnership inquiry",
      message: "We would like to discuss featuring our new voice cloning tool on AIFindr.",
      date: "Nov 14, 2026",
      status: "Resolved",
    },
  ];
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

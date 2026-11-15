"use client";

import { useState, useEffect } from "react";
import { 
  BarChart3, 
  Users, 
  Wrench, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Search, 
  Sparkles, 
  ArrowUpRight, 
  Eye, 
  Download, 
  RotateCcw, 
  Check, 
  ExternalLink, 
  Globe, 
  Bookmark, 
  MessageSquare,
  ShieldCheck,
  Activity,
  Layers,
  Image as ImageIcon
} from "lucide-react";
import { Tool, categories, tools as defaultTools } from "@/lib/tools";
import { 
  getStoredTools, 
  saveStoredTools, 
  getStoredAnalytics, 
  getStoredTickets,
  AnalyticsData, 
  SupportTicket 
} from "@/lib/tools-store";
import { BrandMark } from "@/components/brand-mark";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"analytics" | "tools" | "tickets">("analytics");
  const [toolsList, setToolsList] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  // Editing state
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Form state for Edit / Add
  const [formData, setFormData] = useState<Tool>({
    slug: "",
    name: "",
    category: "AI assistants",
    description: "",
    price: "Free",
    icon: "✳",
    color: "mint",
    website: "",
    affiliateUrl: "",
    tags: [],
    featured: false,
    logoUrl: "",
  });

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Load data on mount
  useEffect(() => {
    const loaded = getStoredTools();
    setToolsList(loaded);
    setAnalytics(getStoredAnalytics());
    setTickets(getStoredTickets());
  }, []);

  // Filter tools
  const filteredTools = toolsList.filter((tool) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      tool.name.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Open Edit Modal
  const handleOpenEdit = (tool: Tool) => {
    setEditingTool(tool);
    setIsCreatingNew(false);
    setFormData({ ...tool });
  };

  // Open New Tool Modal
  const handleOpenAdd = () => {
    setEditingTool(null);
    setIsCreatingNew(true);
    setFormData({
      slug: "",
      name: "",
      category: "Writing",
      description: "",
      price: "Free",
      icon: "✳",
      color: "mint",
      website: "https://",
      affiliateUrl: "",
      tags: ["AI", "New"],
      featured: false,
      logoUrl: "",
    });
  };

  // Save changes (Create or Update)
  const handleSaveTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.website.trim()) {
      showToast("Error: Name and Website are required!");
      return;
    }

    let updatedList: Tool[];
    if (isCreatingNew) {
      const generatedSlug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const newTool: Tool = {
        ...formData,
        slug: formData.slug.trim() || generatedSlug,
      };
      updatedList = [newTool, ...toolsList];
      showToast(`Tool "${newTool.name}" created successfully!`);
    } else {
      updatedList = toolsList.map((t) => (t.slug === editingTool?.slug ? { ...formData } : t));
      showToast(`Tool "${formData.name}" updated successfully!`);
    }

    setToolsList(updatedList);
    saveStoredTools(updatedList);
    setEditingTool(null);
    setIsCreatingNew(false);
  };

  // Delete tool
  const handleDeleteTool = (slug: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from directory?`)) {
      const updatedList = toolsList.filter((t) => t.slug !== slug);
      setToolsList(updatedList);
      saveStoredTools(updatedList);
      showToast(`Tool "${name}" removed from directory.`);
    }
  };

  // Reset to default
  const handleResetToDefault = () => {
    if (confirm("Reset directory to initial default catalogue? (Custom edits will be cleared)")) {
      setToolsList(defaultTools);
      saveStoredTools(defaultTools);
      showToast("Directory reset to default.");
    }
  };

  // Export JSON
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(toolsList, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `aifindr_tools_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Downloaded tools backup JSON!");
  };

  return (
    <section className="mx-auto max-w-[1240px] px-5 md:px-8 py-12">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl border-2 border-[#a3ff12] bg-[#070d05] px-5 py-3 text-xs font-bold text-[#a3ff12] shadow-[0_0_30px_rgba(163,255,18,0.5)] flex items-center gap-2 animate-fade-up">
          <Check size={16} className="stroke-[3]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#1b2816]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#a3ff12] mb-1">
            <ShieldCheck size={14} className="stroke-[2.5]" />
            <span>COMMAND CENTER & EDITORIAL CMS</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            AIFindr Admin Console
          </h1>
        </div>

        {/* Global Action Bar */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleExportData}
            className="btn-glossy-secondary text-xs py-2 px-3.5 flex items-center gap-1.5"
            title="Download JSON catalogue backup"
          >
            <Download size={14} />
            <span>Export JSON</span>
          </button>
          <button
            onClick={handleResetToDefault}
            className="btn-glossy-secondary text-xs py-2 px-3.5 flex items-center gap-1.5 text-red-300 hover:text-red-200"
            title="Reset catalogue to default"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="btn-glossy-primary text-xs py-2 px-4 flex items-center gap-1.5 font-bold"
          >
            <Plus size={15} className="stroke-[3]" />
            <span>Add New Tool</span>
          </button>
        </div>
      </div>

      {/* Nav Tabs Bar */}
      <div className="flex items-center gap-2 mb-8 border-b border-[#172313] pb-3">
        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "analytics"
              ? "bg-[#a3ff12]/20 text-[#a3ff12] border border-[#a3ff12]/40 shadow-[0_0_15px_rgba(163,255,18,0.25)]"
              : "text-[#879983] hover:text-white"
          }`}
        >
          <BarChart3 size={15} />
          <span>Visitor Analytics & Traffic</span>
        </button>

        <button
          onClick={() => setActiveTab("tools")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "tools"
              ? "bg-[#a3ff12]/20 text-[#a3ff12] border border-[#a3ff12]/40 shadow-[0_0_15px_rgba(163,255,18,0.25)]"
              : "text-[#879983] hover:text-white"
          }`}
        >
          <Wrench size={15} />
          <span>Tool Catalogue ({toolsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("tickets")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "tickets"
              ? "bg-[#a3ff12]/20 text-[#a3ff12] border border-[#a3ff12]/40 shadow-[0_0_15px_rgba(163,255,18,0.25)]"
              : "text-[#879983] hover:text-white"
          }`}
        >
          <MessageSquare size={15} />
          <span>Support Tickets ({tickets.length})</span>
        </button>
      </div>

      {/* TAB 1: VISITOR ANALYTICS */}
      {activeTab === "analytics" && (
        <div className="space-y-8 animate-fade-up">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glossy-card p-5">
              <div className="flex items-center justify-between text-xs text-[#8da088] font-bold uppercase tracking-wider mb-2">
                <span>Total Visitors</span>
                <Users size={16} className="text-[#a3ff12]" />
              </div>
              <div className="text-3xl font-black font-mono text-white">
                {analytics?.totalVisitors.toLocaleString() || "18,420"}
              </div>
              <div className="mt-2 text-[11px] text-[#a3ff12] flex items-center gap-1 font-semibold">
                <span>↑ +14.2%</span>
                <span className="text-[#6d7e68]">vs last week</span>
              </div>
            </div>

            <div className="glossy-card p-5">
              <div className="flex items-center justify-between text-xs text-[#8da088] font-bold uppercase tracking-wider mb-2">
                <span>Today's Visitors</span>
                <Activity size={16} className="text-[#a3ff12]" />
              </div>
              <div className="text-3xl font-black font-mono text-[#a3ff12]">
                {analytics?.todayVisitors.toLocaleString() || "1,240"}
              </div>
              <div className="mt-2 text-[11px] text-[#8ea08a] flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-[#a3ff12] animate-ping" />
                <span>Live session peaks</span>
              </div>
            </div>

            <div className="glossy-card p-5">
              <div className="flex items-center justify-between text-xs text-[#8da088] font-bold uppercase tracking-wider mb-2">
                <span>Total Page Views</span>
                <Eye size={16} className="text-[#a3ff12]" />
              </div>
              <div className="text-3xl font-black font-mono text-white">
                {analytics?.totalPageViews.toLocaleString() || "43,910"}
              </div>
              <div className="mt-2 text-[11px] text-[#8ea08a]">
                Avg. 3.4 tools explored/visit
              </div>
            </div>

            <div className="glossy-card p-5">
              <div className="flex items-center justify-between text-xs text-[#8da088] font-bold uppercase tracking-wider mb-2">
                <span>Active Bookmarks</span>
                <Bookmark size={16} className="text-[#a3ff12]" />
              </div>
              <div className="text-3xl font-black font-mono text-[#a3ff12]">
                {analytics?.activeBookmarks.toLocaleString() || "894"}
              </div>
              <div className="mt-2 text-[11px] text-[#8ea08a]">
                High user retention signal
              </div>
            </div>
          </div>

          {/* Traffic Breakdown & Activity Stream */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Country Breakdown */}
            <div className="lg:col-span-5 glossy-card p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Globe size={16} className="text-[#a3ff12]" />
                  <span>Top Visitor Countries</span>
                </h3>
                <span className="text-[11px] font-mono text-[#a3ff12]">Worldwide</span>
              </div>
              <div className="space-y-4">
                {analytics?.topCountries.map((c) => (
                  <div key={c.country} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-[#cfddcc]">
                      <span>{c.country} ({c.code})</span>
                      <span className="font-mono text-[#a3ff12]">{c.percent}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[#121c0e] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#a3ff12] to-[#60c400]"
                        style={{ width: `${c.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-Time Visitor Activity Stream */}
            <div className="lg:col-span-7 glossy-card p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity size={16} className="text-[#a3ff12]" />
                  <span>Live Visitor Feed</span>
                </h3>
                <span className="flex items-center gap-1.5 text-xs font-mono text-[#a3ff12]">
                  <span className="w-2 h-2 rounded-full bg-[#a3ff12] animate-pulse" />
                  18 Online Now
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#1d2d18] text-[#788a74] font-mono uppercase text-[10px]">
                      <th className="pb-3">Action</th>
                      <th className="pb-3">Tool</th>
                      <th className="pb-3">Location</th>
                      <th className="pb-3">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#152210] font-medium text-[#cde0cb]">
                    {analytics?.visitorLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 text-[#a3ff12] font-semibold">{log.action}</td>
                        <td className="py-3 text-white font-bold">{log.toolName}</td>
                        <td className="py-3 text-[#8ca087]">{log.location}</td>
                        <td className="py-3 text-[#647660] font-mono text-[11px]">{log.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TOOLS MANAGEMENT (EDIT LOGOS, DESCRIPTIONS, ETC.) */}
      {activeTab === "tools" && (
        <div className="space-y-6 animate-fade-up">
          {/* Search & Filter Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-8 glossy-search flex items-center px-4 py-2.5">
              <Search size={16} className="text-[#a3ff12] shrink-0 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools by name, category, or description to edit..."
                className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-[#6d7e68] outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-[#6d7e68] hover:text-[#a3ff12]">
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="md:col-span-4 glossy-card flex items-center px-3.5 py-2.5">
              <Layers size={15} className="text-[#a3ff12] shrink-0 mr-2" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-xs text-[#dbe7d9] outline-none cursor-pointer font-semibold"
              >
                <option value="All" className="bg-[#0c1209]">All Categories</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat} className="bg-[#0c1209]">{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tools List Table */}
          <div className="glossy-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#1b2b16] bg-[#070c05] text-[#798b75] font-mono uppercase text-[10px]">
                    <th className="py-3.5 px-4">Tool & Logo</th>
                    <th className="py-3.5 px-3">Category</th>
                    <th className="py-3.5 px-3">Description</th>
                    <th className="py-3.5 px-3">Price</th>
                    <th className="py-3.5 px-3">Featured</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#152210]">
                  {filteredTools.map((tool) => (
                    <tr key={tool.slug} className="hover:bg-white/5 transition-colors">
                      {/* Tool & Logo */}
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <BrandMark tool={tool} />
                        <div>
                          <div className="font-extrabold text-white text-sm flex items-center gap-1.5">
                            <span>{tool.name}</span>
                            {tool.logoUrl && (
                              <span className="text-[9px] font-mono text-[#a3ff12] bg-[#a3ff12]/15 px-1.5 py-0.5 rounded border border-[#a3ff12]/30">
                                CUSTOM LOGO
                              </span>
                            )}
                          </div>
                          <a
                            href={tool.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-[#798e74] hover:text-[#a3ff12] inline-flex items-center gap-0.5"
                          >
                            <span>{tool.website.replace(/^https?:\/\//, "")}</span>
                            <ArrowUpRight size={10} />
                          </a>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-3 font-semibold text-[#a8bca5]">
                        {tool.category}
                      </td>

                      {/* Description Preview */}
                      <td className="py-3.5 px-3 max-w-xs text-[#8c9e88] truncate" title={tool.description}>
                        {tool.description}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-3">
                        <span className="rounded-full border border-[#22351c] bg-[#0c140a] px-2 py-0.5 text-[10px] font-bold text-[#b8ccb5]">
                          {tool.price}
                        </span>
                      </td>

                      {/* Featured */}
                      <td className="py-3.5 px-3">
                        {tool.featured ? (
                          <span className="text-[10px] font-mono font-bold text-[#a3ff12] bg-[#a3ff12]/20 px-2 py-0.5 rounded border border-[#a3ff12]/40">
                            PICK
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#556751] font-mono">—</span>
                        )}
                      </td>

                      {/* Actions: Edit & Delete */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(tool)}
                            className="p-1.5 rounded-lg border border-[#22351c] bg-[#0d160b] text-[#c2d5bf] hover:text-[#a3ff12] hover:border-[#a3ff12]/50 transition-colors"
                            title="Edit Tool Logo, Description & Details"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteTool(tool.slug, tool.name)}
                            className="p-1.5 rounded-lg border border-[#351c1c] bg-[#160d0d] text-red-300 hover:text-red-100 hover:border-red-500 transition-colors"
                            title="Delete Tool"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: USER SUBMISSIONS & SUPPORT TICKETS */}
      {activeTab === "tickets" && (
        <div className="space-y-6 animate-fade-up">
          <div className="glossy-card p-6">
            <h3 className="text-lg font-black text-white mb-2">Support & Feedback Tickets</h3>
            <p className="text-xs text-[#9eb19a] mb-6">
              Messages and tool change requests sent by visitors via the Support & Submit pages.
            </p>

            <div className="space-y-4">
              {tickets.map((t) => (
                <div key={t.id} className="p-5 rounded-2xl border border-[#1e2e18] bg-[#080d05] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#a3ff12] font-bold">{t.id}</span>
                      <span className="text-white font-extrabold text-sm">{t.subject}</span>
                      <span className="rounded-md border border-[#273a20] bg-[#10190d] px-2 py-0.5 text-[10px] font-mono text-[#8ca087]">
                        {t.type}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-[#6c7d67]">{t.date}</div>
                  </div>

                  <p className="text-xs text-[#c3d5bf] leading-relaxed">
                    {t.message}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs text-[#7d9078] border-t border-[#152210]">
                    <span>Sender: <strong className="text-white">{t.name}</strong> ({t.email})</span>
                    <a
                      href={`mailto:${t.email}?subject=Re: ${encodeURIComponent(t.subject)}`}
                      className="text-[#a3ff12] hover:underline font-bold"
                    >
                      Reply by Email →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EDIT / ADD TOOL MODAL */}
      {(editingTool || isCreatingNew) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-up">
          <div className="glossy-card max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto border-2 border-[#a3ff12]/50 shadow-[0_0_60px_rgba(163,255,18,0.25)] relative">
            <button
              onClick={() => {
                setEditingTool(null);
                setIsCreatingNew(false);
              }}
              className="absolute top-5 right-5 p-1 rounded-xl text-[#7e907a] hover:text-[#a3ff12] hover:bg-white/5"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-[#a3ff12] font-bold mb-1">
              <Sparkles size={13} className="fill-[#a3ff12]" />
              <span>{isCreatingNew ? "NEW TOOL CREATION" : "TOOL METADATA EDITOR"}</span>
            </div>
            <h2 className="text-2xl font-black text-white mb-6">
              {isCreatingNew ? "Add New AI Tool" : `Edit "${editingTool?.name}"`}
            </h2>

            <form onSubmit={handleSaveTool} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#d8edd4]">Tool Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-[#23351b] bg-[#070c05] px-4 py-2.5 text-xs text-white outline-none focus:border-[#a3ff12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#d8edd4]">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-[#23351b] bg-[#070c05] px-4 py-2.5 text-xs text-white outline-none focus:border-[#a3ff12] cursor-pointer"
                  >
                    {categories.slice(1).map((c) => (
                      <option key={c} value={c} className="bg-[#0b1208]">{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Logo URL Input with live preview */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#d8edd4] flex items-center justify-between">
                  <span>Custom Logo Image URL</span>
                  <span className="text-[10px] font-mono text-[#8ca087]">Leave blank to use auto-favicon</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="url"
                    value={formData.logoUrl || ""}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                    placeholder="https://example.com/logo.png"
                    className="flex-1 rounded-xl border border-[#23351b] bg-[#070c05] px-4 py-2.5 text-xs text-white placeholder-[#586954] outline-none focus:border-[#a3ff12]"
                  />
                  <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl border border-[#22351c] bg-[#0b1208] overflow-hidden">
                    <BrandMark tool={formData} />
                  </div>
                </div>
              </div>

              {/* Description textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#d8edd4]">Tool Description *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-[#23351b] bg-[#070c05] px-4 py-3 text-xs text-white outline-none focus:border-[#a3ff12] resize-y"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#d8edd4]">Website URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full rounded-xl border border-[#23351b] bg-[#070c05] px-4 py-2.5 text-xs text-white outline-none focus:border-[#a3ff12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#d8edd4]">Affiliate Link (Optional)</label>
                  <input
                    type="url"
                    value={formData.affiliateUrl || ""}
                    onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
                    placeholder="https://try.example.com/ref"
                    className="w-full rounded-xl border border-[#23351b] bg-[#070c05] px-4 py-2.5 text-xs text-white placeholder-[#586954] outline-none focus:border-[#a3ff12]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#d8edd4]">Pricing Model</label>
                  <select
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value as Tool["price"] })}
                    className="w-full rounded-xl border border-[#23351b] bg-[#070c05] px-4 py-2.5 text-xs text-white outline-none focus:border-[#a3ff12] cursor-pointer"
                  >
                    <option value="Free" className="bg-[#0b1208]">Free / Freemium</option>
                    <option value="Paid" className="bg-[#0b1208]">Paid</option>
                    <option value="Check pricing" className="bg-[#0b1208]">Check pricing</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#d8edd4]">Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.tags?.join(", ") || ""}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                    placeholder="Writing, AI, Productivity"
                    className="w-full rounded-xl border border-[#23351b] bg-[#070c05] px-4 py-2.5 text-xs text-white placeholder-[#586954] outline-none focus:border-[#a3ff12]"
                  />
                </div>
              </div>

              {/* Featured toggle */}
              <div className="pt-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured-toggle"
                  checked={Boolean(formData.featured)}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#a3ff12] accent-[#a3ff12] cursor-pointer"
                />
                <label htmlFor="featured-toggle" className="text-xs font-bold text-white cursor-pointer">
                  Mark as "Editor's Pick" (Featured badge on Homepage)
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#182613]">
                <button
                  type="button"
                  onClick={() => {
                    setEditingTool(null);
                    setIsCreatingNew(false);
                  }}
                  className="btn-glossy-secondary text-xs py-2.5 px-5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-glossy-primary text-xs py-2.5 px-6 font-bold flex items-center gap-2"
                >
                  <Save size={15} />
                  <span>{isCreatingNew ? "Create Tool" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import {
  Users, Download, Search, LogOut, TrendingUp, Eye, MousePointer, ChevronLeft, ChevronRight, BarChart3, List,
} from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function getToken() {
  return localStorage.getItem("kinetra_admin_token");
}

function authHeaders() {
  return { Authorization: `Bearer ${getToken()}` };
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("waitlist");
  const [waitlist, setWaitlist] = useState({ entries: [], total: 0, page: 1, pages: 0 });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [overview, setOverview] = useState(null);
  const [funnel, setFunnel] = useState([]);
  const [daily, setDaily] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWaitlist = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/admin/waitlist`, { headers: authHeaders(), params: { page, limit: 20, search } });
      setWaitlist(res.data);
    } catch (err) {
      if (err.response?.status === 401) navigate("/admin/login");
    }
  }, [page, search, navigate]);

  const fetchAnalytics = useCallback(async () => {
    try {
      const [ov, fn, dl, sc] = await Promise.all([
        axios.get(`${API}/admin/analytics/overview`, { headers: authHeaders() }),
        axios.get(`${API}/admin/analytics/funnel`, { headers: authHeaders() }),
        axios.get(`${API}/admin/analytics/daily`, { headers: authHeaders() }),
        axios.get(`${API}/admin/analytics/sections`, { headers: authHeaders() }),
      ]);
      setOverview(ov.data);
      setFunnel(fn.data.stages);
      setDaily(dl.data.daily);
      setSections(sc.data.sections);
    } catch (err) {
      if (err.response?.status === 401) navigate("/admin/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (!getToken()) { navigate("/admin/login"); return; }
    Promise.all([fetchWaitlist(), fetchAnalytics()]).finally(() => setLoading(false));
  }, [fetchWaitlist, fetchAnalytics, navigate]);

  const handleExport = async () => {
    try {
      const res = await axios.get(`${API}/admin/waitlist/export`, { headers: authHeaders(), responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `kinetra_waitlist.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {}
  };

  const handleLogout = () => {
    localStorage.removeItem("kinetra_admin_token");
    localStorage.removeItem("kinetra_admin_user");
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050A0F] flex items-center justify-center">
        <div className="font-mono text-sm text-[#00E5FF] animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050A0F] text-[#F0F4F8]" data-testid="admin-dashboard">
      {/* Header */}
      <header className="border-b border-[#00E5FF]/10 bg-[#050A0F]/95 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 28 28" width="20" height="20" fill="none" className="text-[#00E5FF]">
              <circle cx="14" cy="14" r="3" fill="currentColor" opacity="0.9" />
              <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            </svg>
            <span className="font-mono text-xs font-bold tracking-[0.15em] text-[#F0F4F8]">KINETRA</span>
            <span className="font-mono text-[10px] text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 rounded">ADMIN</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="font-mono text-xs text-[#8B9EB0] hover:text-[#00E5FF] transition-colors">View Site</a>
            <button onClick={handleLogout} data-testid="admin-logout-btn" className="flex items-center gap-1.5 font-mono text-xs text-[#8B9EB0] hover:text-[#FFB300] transition-colors">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Users} label="Total Signups" value={overview?.total_signups ?? 0} accent />
          <StatCard icon={Eye} label="Page Views" value={overview?.total_page_views ?? 0} />
          <StatCard icon={MousePointer} label="Unique Sessions" value={overview?.unique_sessions ?? 0} />
          <StatCard icon={TrendingUp} label="Conversion Rate" value={`${overview?.conversion_rate ?? 0}%`} accent />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-[#00E5FF]/10 pb-px">
          <TabBtn active={tab === "waitlist"} onClick={() => setTab("waitlist")} icon={List} label="Waitlist" testId="tab-waitlist" />
          <TabBtn active={tab === "analytics"} onClick={() => setTab("analytics")} icon={BarChart3} label="Analytics" testId="tab-analytics" />
        </div>

        {tab === "waitlist" && (
          <WaitlistTab
            waitlist={waitlist}
            search={search}
            setSearch={(v) => { setSearch(v); setPage(1); }}
            page={page}
            setPage={setPage}
            onExport={handleExport}
            onRefresh={fetchWaitlist}
          />
        )}

        {tab === "analytics" && (
          <AnalyticsTab funnel={funnel} daily={daily} sections={sections} />
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className={`glass-card rounded-lg p-4 ${accent ? "border-[#00E5FF]/30" : ""}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${accent ? "text-[#00E5FF]" : "text-[#8B9EB0]"}`} />
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#8B9EB0]">{label}</span>
      </div>
      <div className={`text-2xl font-bold tracking-tight ${accent ? "text-[#00E5FF]" : "text-[#F0F4F8]"}`}>{value}</div>
    </div>
  );
}

function TabBtn({ active, onClick, icon: Icon, label, testId }) {
  return (
    <button
      onClick={onClick}
      data-testid={testId}
      className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all border-b-2 -mb-px ${
        active ? "border-[#00E5FF] text-[#00E5FF]" : "border-transparent text-[#8B9EB0] hover:text-[#F0F4F8]"
      }`}
    >
      <Icon className="w-3.5 h-3.5" /> {label}
    </button>
  );
}

function WaitlistTab({ waitlist, search, setSearch, page, setPage, onExport, onRefresh }) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B9EB0]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search emails..."
            data-testid="waitlist-search-input"
            className="w-full bg-[#0D1117] border border-[#00E5FF]/15 text-[#F0F4F8] rounded-md pl-9 pr-3 py-2 text-sm font-mono focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] focus:outline-none placeholder:text-[#8B9EB0]/40"
          />
        </div>
        <button
          onClick={onExport}
          data-testid="export-csv-btn"
          className="flex items-center gap-2 bg-[#0D1117] border border-[#00E5FF]/20 text-[#00E5FF] rounded-md px-4 py-2 font-mono text-xs uppercase tracking-wider hover:bg-[#00E5FF]/10 hover:border-[#00E5FF]/40 transition-all"
        >
          <Download className="w-3.5 h-3.5" /> Export CSV
        </button>
      </div>

      <div className="glass-card rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-[#00E5FF]/10 hover:bg-transparent">
              <TableHead className="text-[#8B9EB0] font-mono text-xs uppercase tracking-wider">#</TableHead>
              <TableHead className="text-[#8B9EB0] font-mono text-xs uppercase tracking-wider">Email</TableHead>
              <TableHead className="text-[#8B9EB0] font-mono text-xs uppercase tracking-wider">Source</TableHead>
              <TableHead className="text-[#8B9EB0] font-mono text-xs uppercase tracking-wider">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {waitlist.entries.length === 0 ? (
              <TableRow className="border-[#00E5FF]/10">
                <TableCell colSpan={4} className="text-center text-[#8B9EB0] font-mono text-sm py-8">No entries found</TableCell>
              </TableRow>
            ) : (
              waitlist.entries.map((entry, i) => (
                <TableRow key={entry.email} className="border-[#00E5FF]/10 hover:bg-[#00E5FF]/5" data-testid={`waitlist-row-${i}`}>
                  <TableCell className="text-[#8B9EB0] font-mono text-xs">{(page - 1) * 20 + i + 1}</TableCell>
                  <TableCell className="text-[#F0F4F8] font-mono text-sm">{entry.email}</TableCell>
                  <TableCell className="text-[#8B9EB0] font-mono text-xs">{entry.source || "direct"}</TableCell>
                  <TableCell className="text-[#8B9EB0] font-mono text-xs">{formatDate(entry.created_at)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {waitlist.pages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <span className="font-mono text-xs text-[#8B9EB0]">{waitlist.total} total entries</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page <= 1}
              data-testid="pagination-prev"
              className="p-1.5 rounded border border-[#00E5FF]/15 text-[#8B9EB0] hover:text-[#00E5FF] hover:border-[#00E5FF]/30 disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-[#8B9EB0]">{page} / {waitlist.pages}</span>
            <button
              onClick={() => setPage(Math.min(waitlist.pages, page + 1))}
              disabled={page >= waitlist.pages}
              data-testid="pagination-next"
              className="p-1.5 rounded border border-[#00E5FF]/15 text-[#8B9EB0] hover:text-[#00E5FF] hover:border-[#00E5FF]/30 disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AnalyticsTab({ funnel, daily, sections }) {
  const maxFunnel = Math.max(...funnel.map((s) => s.count), 1);

  return (
    <div className="space-y-8">
      {/* Conversion Funnel */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="font-mono text-xs uppercase tracking-wider text-[#00E5FF] mb-6">Conversion Funnel</h3>
        <div className="space-y-3" data-testid="conversion-funnel">
          {funnel.map((stage, i) => (
            <div key={stage.name} className="flex items-center gap-4">
              <span className="font-mono text-xs text-[#8B9EB0] w-32 text-right flex-shrink-0">{stage.name}</span>
              <div className="flex-1 h-8 bg-[#0D1117] rounded overflow-hidden relative">
                <div
                  className="h-full rounded transition-all duration-700"
                  style={{
                    width: `${Math.max((stage.count / maxFunnel) * 100, 2)}%`,
                    background: `linear-gradient(90deg, rgba(0,229,255,${0.15 + i * 0.05}) 0%, rgba(0,229,255,${0.4 + i * 0.1}) 100%)`,
                  }}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-xs text-[#F0F4F8]">{stage.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Signups */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="font-mono text-xs uppercase tracking-wider text-[#00E5FF] mb-6">Daily Signups (30 days)</h3>
        <div className="h-52" data-testid="daily-signups-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={daily}>
              <defs>
                <linearGradient id="signupGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: "#8B9EB0", fontSize: 10, fontFamily: "JetBrains Mono" }} tickLine={false} axisLine={{ stroke: "#00E5FF", strokeOpacity: 0.1 }} tickFormatter={(v) => v.slice(5)} />
              <YAxis tick={{ fill: "#8B9EB0", fontSize: 10, fontFamily: "JetBrains Mono" }} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ background: "#0D1117", border: "1px solid rgba(0,229,255,0.2)", borderRadius: "6px", fontFamily: "JetBrains Mono", fontSize: "12px" }} labelStyle={{ color: "#8B9EB0" }} itemStyle={{ color: "#00E5FF" }} />
              <Area type="monotone" dataKey="signups" stroke="#00E5FF" fill="url(#signupGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Section Views */}
      {sections.length > 0 && (
        <div className="glass-card rounded-lg p-6">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#00E5FF] mb-6">Section Engagement</h3>
          <div className="h-48" data-testid="section-views-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sections}>
                <XAxis dataKey="section" tick={{ fill: "#8B9EB0", fontSize: 10, fontFamily: "JetBrains Mono" }} tickLine={false} axisLine={{ stroke: "#00E5FF", strokeOpacity: 0.1 }} />
                <YAxis tick={{ fill: "#8B9EB0", fontSize: 10, fontFamily: "JetBrains Mono" }} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#0D1117", border: "1px solid rgba(0,229,255,0.2)", borderRadius: "6px", fontFamily: "JetBrains Mono", fontSize: "12px" }} />
                <Bar dataKey="views" fill="#00E5FF" opacity={0.6} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

function formatDate(iso) {
  if (!iso) return "-";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso.slice(0, 10);
  }
}

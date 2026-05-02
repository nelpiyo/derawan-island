import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format, subDays, startOfDay } from "date-fns";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import SiteFooter from "@/components/SiteFooter";
import SEO from "@/components/SEO";

type Visit = { created_at: string };

const RANGES = [
  { label: "7 Hari", days: 7 },
  { label: "30 Hari", days: 30 },
  { label: "90 Hari", days: 90 },
];

const AdminVisitors = () => {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState(30);

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth", { replace: true });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      const isAdmin = roles?.some((r) => r.role === "admin");
      setAllowed(!!isAdmin);
      setAuthChecked(true);
    };
    check();
  }, [navigate]);

  useEffect(() => {
    if (!allowed) return;
    const load = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("visits")
        .select("created_at")
        .order("created_at", { ascending: true });
      setVisits(data ?? []);
      setLoading(false);
    };
    load();
  }, [allowed]);

  const { chartData, total, todayCount, avg } = useMemo(() => {
    const today = startOfDay(new Date());
    const buckets = new Map<string, number>();
    for (let i = range - 1; i >= 0; i--) {
      const d = subDays(today, i);
      buckets.set(format(d, "yyyy-MM-dd"), 0);
    }
    let todayC = 0;
    visits.forEach((v) => {
      const key = format(startOfDay(new Date(v.created_at)), "yyyy-MM-dd");
      if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1);
      if (key === format(today, "yyyy-MM-dd")) todayC++;
    });
    const arr = Array.from(buckets.entries()).map(([date, count]) => ({
      date,
      label: format(new Date(date), "dd MMM"),
      count,
    }));
    const sum = arr.reduce((s, x) => s + x.count, 0);
    return {
      chartData: arr,
      total: visits.length,
      todayCount: todayC,
      avg: arr.length ? Math.round((sum / arr.length) * 10) / 10 : 0,
    };
  }, [visits, range]);

  if (!authChecked) {
    return (
      <main className="min-h-screen bg-abyss flex items-center justify-center">
        <p className="text-foam/60 text-xs uppercase tracking-[0.3em]">Memeriksa akses...</p>
      </main>
    );
  }

  if (!allowed) {
    return (
      <main className="min-h-screen bg-abyss flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-coral text-xs uppercase tracking-[0.3em] mb-4">Akses Ditolak</p>
          <p className="text-foam/70">Halaman ini hanya untuk admin.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-abyss text-foam min-h-screen">
      <SEO title="Visitor Dashboard · Derawan Island" description="Statistik visitor harian." path="/admin/visitors" />
      <Navigation />
      <div className="container pt-32 pb-20 max-w-6xl">
        <Breadcrumb items={[{ label: "Visitor Dashboard" }]} />

        <header className="mt-10 mb-12">
          <p className="text-xs uppercase tracking-[0.5em] text-turquoise mb-4">Admin · Analytics</p>
          <h1 className="font-display text-5xl md:text-6xl text-foam">
            Visitor <span className="italic text-gradient-ocean">Dashboard</span>
          </h1>
        </header>

        {/* Stat Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-10">
          {[
            { label: "Total Visitors", value: total },
            { label: "Hari Ini", value: todayCount },
            { label: `Rata-rata / hari (${range}d)`, value: avg },
          ].map((s) => (
            <div key={s.label} className="glass border border-foam/10 p-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-foam/50 mb-3">{s.label}</p>
              <p className="font-display text-5xl text-foam">{s.value.toLocaleString("id-ID")}</p>
            </div>
          ))}
        </div>

        {/* Range selector */}
        <div className="flex gap-2 mb-6">
          {RANGES.map((r) => (
            <button
              key={r.days}
              onClick={() => setRange(r.days)}
              className={`px-5 py-2 text-[10px] uppercase tracking-[0.3em] border transition-colors ${
                range === r.days
                  ? "bg-coral text-primary-foreground border-coral"
                  : "border-foam/20 text-foam/60 hover:border-coral hover:text-coral"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="glass border border-foam/10 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-foam/60 mb-6">Visitors per Hari</p>
          {loading ? (
            <div className="h-80 flex items-center justify-center text-foam/40 text-xs uppercase tracking-[0.3em]">
              Memuat data...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={340}>
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--coral))" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="hsl(var(--coral))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--foam) / 0.08)" />
                <XAxis
                  dataKey="label"
                  stroke="hsl(var(--foam) / 0.5)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis
                  stroke="hsl(var(--foam) / 0.5)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--abyss))",
                    border: "1px solid hsl(var(--foam) / 0.15)",
                    borderRadius: 0,
                    color: "hsl(var(--foam))",
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "hsl(var(--turquoise))", textTransform: "uppercase", letterSpacing: "0.15em", fontSize: 10 }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(var(--coral))"
                  strokeWidth={2}
                  fill="url(#visitorGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      <SiteFooter />
    </main>
  );
};

export default AdminVisitors;

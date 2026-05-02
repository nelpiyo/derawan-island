import { useEffect, useMemo, useState } from "react";
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

const VisitorStats = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState(30);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadVisits = async () => {
    const { data } = await supabase
      .from("visits")
      .select("created_at")
      .order("created_at", { ascending: true });
    setVisits(data ?? []);
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => {
    loadVisits();

    // Realtime subscription — auto update saat ada visitor baru
    const channel = supabase
      .channel("visits-public")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "visits" },
        (payload) => {
          const newVisit = payload.new as Visit;
          setVisits((prev) => [...prev, newVisit]);
          setLastUpdated(new Date());
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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

  return (
    <main className="bg-abyss text-foam min-h-screen">
      <SEO
        title="Visitor Statistics · Derawan Island"
        description="Statistik publik pengunjung Derawan Island, diperbarui setiap hari."
        path="/visitors"
      />
      <Navigation />
      <Breadcrumb current="Visitor Stats" />
      <div className="container pb-20 max-w-6xl">
        <header className="mt-10 mb-12">
          <p className="text-xs uppercase tracking-[0.5em] text-turquoise mb-4">
            Public · Live Statistics
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-foam">
            Visitor <span className="italic text-gradient-ocean">Statistics</span>
          </h1>
          <div className="mt-4 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-foam/50">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
            </span>
            Live · Update terakhir {format(lastUpdated, "HH:mm:ss")}
          </div>
        </header>

        {/* Stat Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-10">
          {[
            { label: "Total Visitors", value: total },
            { label: "Hari Ini", value: todayCount },
            { label: `Rata-rata / hari (${range}d)`, value: avg },
          ].map((s) => (
            <div key={s.label} className="glass border border-foam/10 p-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-foam/50 mb-3">
                {s.label}
              </p>
              <p className="font-display text-5xl text-foam">
                {s.value.toLocaleString("id-ID")}
              </p>
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
          <p className="text-xs uppercase tracking-[0.3em] text-foam/60 mb-6">
            Visitors per Hari
          </p>
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
                  labelStyle={{
                    color: "hsl(var(--turquoise))",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    fontSize: 10,
                  }}
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

export default VisitorStats;

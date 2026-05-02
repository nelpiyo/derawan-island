import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "derawan_visitor_token";

const getOrCreateToken = () => {
  let t = localStorage.getItem(STORAGE_KEY);
  if (!t) {
    t = crypto.randomUUID().replace(/-/g, "") + Date.now().toString(36);
    localStorage.setItem(STORAGE_KEY, t);
  }
  return t;
};

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const token = getOrCreateToken();

      // Try to record this visitor (silently ignores duplicate token)
      await supabase.from("visits").insert({ visitor_token: token });

      const { count: total } = await supabase
        .from("visits")
        .select("*", { count: "exact", head: true });

      if (!cancelled && typeof total === "number") setCount(total);
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-foam/60">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
      </span>
      <span>
        {count === null ? "···" : count.toLocaleString("id-ID")} visitors
      </span>
    </div>
  );
};

export default VisitorCounter;

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

const Auth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/", { replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate("/", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (error) throw error;
        toast({ title: "Akun dibuat", description: "Anda dapat langsung masuk." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Berhasil masuk" });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      toast({ title: "Gagal", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-abyss flex items-center justify-center px-6">
      <SEO title="Admin Login · Derawan Island" description="Akses admin Derawan Island." canonical="/auth" />
      <div className="w-full max-w-md glass border border-foam/10 p-10">
        <Link to="/" className="text-[10px] uppercase tracking-[0.3em] text-foam/50 hover:text-coral">
          ← Kembali
        </Link>
        <h1 className="font-display text-4xl text-foam mt-6 mb-2">
          {mode === "signin" ? "Masuk" : "Daftar"}
        </h1>
        <p className="text-foam/60 text-sm mb-8">Khusus admin Derawan Island.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-foam/60 mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-foam/20 py-2 text-foam focus:outline-none focus:border-coral"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-foam/60 mb-2">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-foam/20 py-2 text-foam focus:outline-none focus:border-coral"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-coral text-primary-foreground px-8 py-4 text-xs uppercase tracking-[0.3em] hover:bg-coral-glow transition-all disabled:opacity-50"
          >
            {loading ? "Memproses..." : mode === "signin" ? "Masuk" : "Daftar"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 text-xs text-foam/60 hover:text-coral transition-colors"
        >
          {mode === "signin" ? "Belum punya akun? Daftar" : "Sudah punya akun? Masuk"}
        </button>
      </div>
    </main>
  );
};

export default Auth;

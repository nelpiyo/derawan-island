import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

const ResetPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [hashChecked, setHashChecked] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.includes("type=recovery")) {
      toast({
        title: "Link tidak valid",
        description: "Gunakan link reset password dari email.",
        variant: "destructive",
      });
      setHashChecked(true);
      return;
    }

    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setHashChecked(true);
      }
    });

    setHashChecked(true);
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast({ title: "Password tidak cocok", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Password minimal 6 karakter", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast({ title: "Password berhasil diperbarui", description: "Silakan masuk dengan password baru." });
      navigate("/auth", { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      toast({ title: "Gagal", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-abyss flex items-center justify-center px-6">
      <SEO title="Reset Password · Derawan Island" description="Atur ulang password akun admin." path="/reset-password" />
      <div className="w-full max-w-md glass border border-foam/10 p-10">
        <Link to="/auth" className="text-[10px] uppercase tracking-[0.3em] text-foam/50 hover:text-coral">
          ← Kembali
        </Link>
        <h1 className="font-display text-4xl text-foam mt-6 mb-2">Password Baru</h1>
        <p className="text-foam/60 text-sm mb-8">Atur ulang password akun admin.</p>

        {hashChecked ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-foam/60 mb-2">Password Baru</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-foam/20 py-2 text-foam focus:outline-none focus:border-coral"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-foam/60 mb-2">Konfirmasi Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full bg-transparent border-b border-foam/20 py-2 text-foam focus:outline-none focus:border-coral"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-coral text-primary-foreground px-8 py-4 text-xs uppercase tracking-[0.3em] hover:bg-coral-glow transition-all disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Simpan Password"}
            </button>
          </form>
        ) : (
          <div className="py-10 text-center text-foam/50 text-xs uppercase tracking-[0.3em]">
            Memverifikasi link...
          </div>
        )}
      </div>
    </main>
  );
};

export default ResetPassword;

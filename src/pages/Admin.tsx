import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";
import SEO from "@/components/SEO";
import { Shield, Trash2, LogOut, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Experience = {
  id: string;
  visitor_name: string;
  comment: string;
  photo_url: string | null;
  created_at: string;
};

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      if (!userId) {
        navigate("/auth", { replace: true });
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (!data) {
        navigate("/", { replace: true });
        return;
      }
      setIsAdmin(true);
      setChecking(false);
    };
    check();
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    const fetch = async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("id, visitor_name, comment, photo_url, created_at")
        .order("created_at", { ascending: false })
        .limit(100);
      if (!error) setItems(data ?? []);
      setLoading(false);
    };
    fetch();
  }, [isAdmin]);

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus komentar ini?")) return;
    const { error } = await supabase.rpc("delete_experience_with_token", {
      _id: id,
      _token: "admin-delete",
    });
    if (error) {
      toast({ title: "Gagal menghapus", description: error.message, variant: "destructive" });
      return;
    }
    setItems((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Komentar dihapus" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  };

  if (checking) {
    return (
      <main className="min-h-screen bg-abyss flex items-center justify-center text-foam/50 text-xs uppercase tracking-[0.3em]">
        Memeriksa akses...
      </main>
    );
  }

  return (
    <main className="bg-abyss text-foam min-h-screen">
      <SEO title="Admin Dashboard · Derawan Island" description="Panel admin Derawan Island." path="/admin" />
      <Navigation />
      <div className="container max-w-6xl pt-28 pb-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-turquoise mb-3">Admin Panel</p>
            <h1 className="font-display text-4xl md:text-5xl flex items-center gap-3">
              <Shield className="w-8 h-8 text-coral" strokeWidth={1.5} />
              Moderasi Komentar
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-3 text-[10px] uppercase tracking-[0.3em] border border-foam/20 hover:border-coral hover:text-coral transition-colors"
          >
            <LogOut className="w-4 h-4" strokeWidth={1.5} />
            Keluar
          </button>
        </div>

        <div className="glass border border-foam/10 p-8 mb-10 flex items-center gap-6">
          <Users className="w-8 h-8 text-turquoise" strokeWidth={1.5} />
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-foam/50 mb-1">Total Komentar</p>
            <p className="font-display text-4xl">{items.length}</p>
          </div>
        </div>

        {loading ? (
          <p className="text-foam/50 text-xs uppercase tracking-[0.3em]">Memuat...</p>
        ) : items.length === 0 ? (
          <p className="text-foam/50 text-sm">Belum ada komentar.</p>
        ) : (
          <div className="space-y-4">
            {items.map((exp) => (
              <div
                key={exp.id}
                className="glass border border-foam/10 p-6 flex flex-col md:flex-row gap-6 items-start"
              >
                {exp.photo_url && (
                  <img
                    src={exp.photo_url}
                    alt={exp.visitor_name}
                    className="w-full md:w-40 h-28 object-cover rounded-lg border border-foam/10"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-xl">{exp.visitor_name}</h3>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-foam/40">
                      {new Date(exp.created_at).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                  <p className="text-foam/80 leading-relaxed whitespace-pre-wrap break-words text-sm">
                    {exp.comment}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="shrink-0 p-3 text-coral hover:bg-coral/10 border border-coral/30 hover:border-coral transition-colors rounded-lg"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <SiteFooter />
    </main>
  );
};

export default Admin;

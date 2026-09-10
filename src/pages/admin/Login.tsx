import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const Login = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [busy, setBusy] = useState(false);

  useEffect(() => { document.title = "Admin Girişi | MG İletişim"; }, []);

  if (loading) return null;
  if (user) return <Navigate to="/admin" replace />;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const fn = mode === "login" ? signIn : signUp;
    const { error } = await fn(email, password);
    setBusy(false);
    if (error) { toast.error(error); return; }
    if (mode === "signup") toast.success("Hesap oluşturuldu, giriş yapılıyor...");
    nav("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md rounded-2xl bg-card border border-border/50 p-8 shadow-xl">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="font-heading font-bold text-2xl">Admin Paneli</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "login" ? "Giriş yapın" : "İlk admin hesabını oluşturun"}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Şifre</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Bekleyin..." : mode === "login" ? "Giriş Yap" : "Hesap Oluştur"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="w-full mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {mode === "login" ? "İlk kez mi giriş yapıyorsunuz? Hesap oluşturun" : "Zaten hesabınız var mı? Giriş yapın"}
        </button>



      </div>
    </div>
  );
};

export default Login;

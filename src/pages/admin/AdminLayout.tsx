import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, Wrench, ShoppingBag, Smartphone, Monitor, ExternalLink } from "lucide-react";

const links = [
  { to: "/admin/services", label: "Hizmetler", icon: Wrench },
  { to: "/admin/repaired-devices", label: "Tamir Edilen Cihazlar", icon: Monitor },
  { to: "/admin/products", label: "Ürünler", icon: ShoppingBag },
  { to: "/admin/phones", label: "Satılık Telefonlar", icon: Smartphone },
];

const AdminLayout = () => {
  const { user, loading, signOut } = useAuth();
  const nav = useNavigate();

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Yükleniyor...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 border-r border-border/40 bg-card/30 flex flex-col">
        <div className="p-5 border-b border-border/30">
          <div className="font-heading font-bold text-lg">Admin Paneli</div>
          <div className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`
              }
            >
              <l.icon className="w-4 h-4" />
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-border/30 space-y-2">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a href="/" target="_blank" rel="noreferrer"><ExternalLink className="w-4 h-4 mr-1.5" /> Siteyi Gör</a>
          </Button>
          <Button variant="ghost" size="sm" className="w-full" onClick={async () => { await signOut(); nav("/admin/login"); }}>
            <LogOut className="w-4 h-4 mr-1.5" /> Çıkış Yap
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

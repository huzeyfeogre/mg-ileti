import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Wrench, ShoppingBag, Smartphone, Monitor } from "lucide-react";

const tiles = [
  { to: "/admin/services", label: "Hizmetler", icon: Wrench, table: "services" as const },
  { to: "/admin/repaired-devices", label: "Tamir Edilen Cihazlar", icon: Monitor, table: "repaired_devices" as const },
  { to: "/admin/products", label: "Ürünler", icon: ShoppingBag, table: "products" as const },
  { to: "/admin/phones", label: "Satılık Telefonlar", icon: Smartphone, table: "phones_for_sale" as const },
];

const AdminDashboard = () => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    (async () => {
      const result: Record<string, number> = {};
      for (const t of tiles) {
        const { count } = await supabase.from(t.table).select("*", { count: "exact", head: true });
        result[t.table] = count ?? 0;
      }
      setCounts(result);
    })();
  }, []);

  return (
    <div>
      <h1 className="font-heading font-bold text-3xl mb-2">Hoş Geldiniz 👋</h1>
      <p className="text-muted-foreground mb-8">Bir bölüm seçerek içerikleri yönetin.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tiles.map((t) => (
          <Link key={t.to} to={t.to} className="rounded-xl bg-card border border-border/50 p-6 hover:border-primary/40 transition-colors group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                <t.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-3xl font-heading font-bold text-primary">{counts[t.table] ?? "…"}</span>
            </div>
            <div className="font-heading font-semibold text-lg group-hover:text-primary transition-colors">{t.label}</div>
            <div className="text-xs text-muted-foreground mt-1">Düzenlemek için tıklayın →</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";

export const AdminHeader = ({ title, subtitle, onAdd }: { title: string; subtitle?: string; onAdd: () => void }) => (
  <div className="flex items-start justify-between mb-6">
    <div>
      <Link to="/admin" className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground mb-2">
        <ArrowLeft className="w-3 h-3 mr-1" /> Panele dön
      </Link>
      <h1 className="font-heading font-bold text-3xl">{title}</h1>
      {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
    </div>
    <Button onClick={onAdd}><Plus className="w-4 h-4 mr-1" /> Yeni Ekle</Button>
  </div>
);

export const AdminCard = ({ children }: { children: ReactNode }) => (
  <div className="rounded-xl bg-card border border-border/50 overflow-hidden">{children}</div>
);

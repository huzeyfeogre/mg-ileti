import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader, AdminCard } from "./CrudHelpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { IconByName } from "@/lib/icons";

type Row = {
  id?: string;
  title: string;
  description: string;
  icon: string;
  bullets: string[];
  time_estimate: string;
  image_url: string;
  sort_order: number;
};

const empty: Row = { title: "", description: "", icon: "Smartphone", bullets: [], time_estimate: "", image_url: "", sort_order: 0 };

const AdminServices = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Row>(empty);
  const [bulletsText, setBulletsText] = useState("");

  const load = async () => {
    const { data, error } = await supabase.from("services").select("*").order("sort_order");
    if (error) toast.error(error.message); else setRows(data as Row[]);
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setDraft({ ...empty, sort_order: (rows.at(-1)?.sort_order ?? 0) + 1 }); setBulletsText(""); setOpen(true); };
  const openEdit = (r: Row) => { setDraft(r); setBulletsText(r.bullets.join("\n")); setOpen(true); };

  const save = async () => {
    const payload = { ...draft, bullets: bulletsText.split("\n").map((b) => b.trim()).filter(Boolean) };
    const { error } = draft.id
      ? await supabase.from("services").update(payload).eq("id", draft.id)
      : await supabase.from("services").insert(payload);
    if (error) { toast.error(error.message); return; }
    toast.success("Kaydedildi"); setOpen(false); load();
  };
  const remove = async (id: string) => {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Silindi"); load();
  };

  return (
    <div>
      <AdminHeader title="Hizmetler" subtitle="Sunduğunuz hizmetleri yönetin." onAdd={openNew} />
      <AdminCard>
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-xs uppercase text-muted-foreground">
            <tr><th className="text-left p-3">Sıra</th><th className="text-left p-3">İkon</th><th className="text-left p-3">Başlık</th><th className="text-left p-3">Süre</th><th className="p-3 w-24"></th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border/30">
                <td className="p-3">{r.sort_order}</td>
                <td className="p-3"><IconByName name={r.icon} className="w-5 h-5 text-primary" /></td>
                <td className="p-3 font-medium">{r.title}</td>
                <td className="p-3 text-muted-foreground text-xs">{r.time_estimate}</td>
                <td className="p-3 text-right">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(r)}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => remove(r.id!)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Henüz hizmet yok.</td></tr>}
          </tbody>
        </table>
      </AdminCard>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{draft.id ? "Hizmet Düzenle" : "Yeni Hizmet"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Başlık</Label><Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></div>
            <div><Label>Açıklama</Label><Textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} /></div>
            <div><Label>İkon adı (Lucide)</Label><Input value={draft.icon} onChange={(e) => setDraft({ ...draft, icon: e.target.value })} placeholder="Smartphone, Battery, Cpu..." /></div>
            <div><Label>Madde işaretleri (her satıra bir tane)</Label><Textarea rows={4} value={bulletsText} onChange={(e) => setBulletsText(e.target.value)} /></div>
            <div><Label>Tahmini süre</Label><Input value={draft.time_estimate} onChange={(e) => setDraft({ ...draft, time_estimate: e.target.value })} /></div>
            <div><Label>Görsel URL</Label><Input value={draft.image_url} onChange={(e) => setDraft({ ...draft, image_url: e.target.value })} /></div>
            <div><Label>Sıra</Label><Input type="number" value={draft.sort_order} onChange={(e) => setDraft({ ...draft, sort_order: +e.target.value })} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>İptal</Button><Button onClick={save}>Kaydet</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;

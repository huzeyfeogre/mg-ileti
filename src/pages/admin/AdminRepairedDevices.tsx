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

type Row = { id?: string; brand: string; icon: string; models: string[]; sort_order: number };
const empty: Row = { brand: "", icon: "Smartphone", models: [], sort_order: 0 };

const AdminRepairedDevices = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Row>(empty);
  const [modelsText, setModelsText] = useState("");

  const load = async () => {
    const { data, error } = await supabase.from("repaired_devices").select("*").order("sort_order");
    if (error) toast.error(error.message); else setRows(data as Row[]);
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setDraft({ ...empty, sort_order: (rows.at(-1)?.sort_order ?? 0) + 1 }); setModelsText(""); setOpen(true); };
  const openEdit = (r: Row) => { setDraft(r); setModelsText(r.models.join("\n")); setOpen(true); };

  const save = async () => {
    const payload = { ...draft, models: modelsText.split("\n").map((m) => m.trim()).filter(Boolean) };
    const { error } = draft.id
      ? await supabase.from("repaired_devices").update(payload).eq("id", draft.id)
      : await supabase.from("repaired_devices").insert(payload);
    if (error) { toast.error(error.message); return; }
    toast.success("Kaydedildi"); setOpen(false); load();
  };
  const remove = async (id: string) => {
    if (!confirm("Silinsin mi?")) return;
    const { error } = await supabase.from("repaired_devices").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Silindi"); load();
  };

  return (
    <div>
      <AdminHeader title="Tamir Edilen Cihazlar" subtitle="Marka ve modelleri yönetin." onAdd={openNew} />
      <AdminCard>
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-xs uppercase text-muted-foreground">
            <tr><th className="text-left p-3">Sıra</th><th className="text-left p-3">İkon</th><th className="text-left p-3">Marka</th><th className="text-left p-3">Model Sayısı</th><th className="p-3 w-24"></th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border/30">
                <td className="p-3">{r.sort_order}</td>
                <td className="p-3"><IconByName name={r.icon} className="w-5 h-5 text-primary" /></td>
                <td className="p-3 font-medium">{r.brand}</td>
                <td className="p-3 text-muted-foreground">{r.models.length}</td>
                <td className="p-3 text-right">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(r)}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => remove(r.id!)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Henüz kayıt yok.</td></tr>}
          </tbody>
        </table>
      </AdminCard>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{draft.id ? "Düzenle" : "Yeni Kayıt"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Marka</Label><Input value={draft.brand} onChange={(e) => setDraft({ ...draft, brand: e.target.value })} /></div>
            <div><Label>İkon (Lucide)</Label><Input value={draft.icon} onChange={(e) => setDraft({ ...draft, icon: e.target.value })} placeholder="Smartphone, Tablet, Watch, Headphones" /></div>
            <div><Label>Modeller (her satıra bir tane)</Label><Textarea rows={6} value={modelsText} onChange={(e) => setModelsText(e.target.value)} /></div>
            <div><Label>Sıra</Label><Input type="number" value={draft.sort_order} onChange={(e) => setDraft({ ...draft, sort_order: +e.target.value })} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>İptal</Button><Button onClick={save}>Kaydet</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRepairedDevices;

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader, AdminCard } from "./CrudHelpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Pencil, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import { ListEditor } from "./ListEditor";

type Row = {
  id?: string;
  name: string;
  storage: string;
  color: string;
  condition: string;
  battery: string;
  price: string;
  warranty: boolean;
  featured: boolean;
  image_url: string;
  long_description: string;
  gallery: string[];
  features: string[];
  recommended_ids: string[];
  sort_order: number;
};
const empty: Row = {
  name: "", storage: "", color: "", condition: "İyi", battery: "", price: "",
  warranty: true, featured: false, image_url: "",
  long_description: "", gallery: [], features: [], recommended_ids: [], sort_order: 0,
};

const AdminPhones = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Row>(empty);

  const load = async () => {
    const { data, error } = await supabase.from("phones_for_sale").select("*").order("sort_order");
    if (error) toast.error(error.message); else setRows(data as Row[]);
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setDraft({ ...empty, sort_order: (rows.at(-1)?.sort_order ?? 0) + 1 }); setOpen(true); };
  const openEdit = (r: Row) => {
    setDraft({
      ...r,
      gallery: r.gallery ?? [],
      features: r.features ?? [],
      recommended_ids: r.recommended_ids ?? [],
      long_description: r.long_description ?? "",
    });
    setOpen(true);
  };

  const save = async () => {
    const payload = { ...draft, recommended_ids: draft.recommended_ids.filter((x) => x !== draft.id) };
    const { error } = draft.id
      ? await supabase.from("phones_for_sale").update(payload).eq("id", draft.id)
      : await supabase.from("phones_for_sale").insert(payload);
    if (error) { toast.error(error.message); return; }
    toast.success("Kaydedildi"); setOpen(false); load();
  };
  const remove = async (id: string) => {
    if (!confirm("Silinsin mi?")) return;
    const { error } = await supabase.from("phones_for_sale").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Silindi"); load();
  };

  const toggleRecommended = (rid: string) => {
    setDraft((d) => ({
      ...d,
      recommended_ids: d.recommended_ids.includes(rid)
        ? d.recommended_ids.filter((x) => x !== rid)
        : [...d.recommended_ids, rid],
    }));
  };

  return (
    <div>
      <AdminHeader title="Satılık Telefonlar" subtitle="İkinci el telefon ilanlarını yönetin." onAdd={openNew} />
      <AdminCard>
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-xs uppercase text-muted-foreground">
            <tr><th className="text-left p-3">Sıra</th><th className="text-left p-3">İsim</th><th className="text-left p-3">Depolama</th><th className="text-left p-3">Durum</th><th className="text-left p-3">Fiyat</th><th className="text-left p-3">Öne Çıkan</th><th className="p-3 w-24"></th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border/30">
                <td className="p-3">{r.sort_order}</td>
                <td className="p-3 font-medium">{r.name}</td>
                <td className="p-3 text-muted-foreground">{r.storage}</td>
                <td className="p-3 text-muted-foreground">{r.condition}</td>
                <td className="p-3 font-semibold text-primary">{r.price}</td>
                <td className="p-3">{r.featured && <Star className="w-4 h-4 text-accent fill-accent" />}</td>
                <td className="p-3 text-right">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(r)}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => remove(r.id!)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">Henüz telefon yok.</td></tr>}
          </tbody>
        </table>
      </AdminCard>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{draft.id ? "Telefonu Düzenle" : "Yeni Telefon"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>İsim</Label><Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Depolama</Label><Input value={draft.storage} onChange={(e) => setDraft({ ...draft, storage: e.target.value })} placeholder="128 GB" /></div>
              <div><Label>Renk</Label><Input value={draft.color} onChange={(e) => setDraft({ ...draft, color: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Durum</Label><Input value={draft.condition} onChange={(e) => setDraft({ ...draft, condition: e.target.value })} placeholder="Mükemmel / Çok İyi / İyi" /></div>
              <div><Label>Batarya</Label><Input value={draft.battery} onChange={(e) => setDraft({ ...draft, battery: e.target.value })} placeholder="%92" /></div>
            </div>
            <div><Label>Fiyat</Label><Input value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} placeholder="18.500 ₺" /></div>
            <div><Label>Ana Görsel URL</Label><Input value={draft.image_url} onChange={(e) => setDraft({ ...draft, image_url: e.target.value })} /></div>
            <div>
              <Label>Detay Açıklaması</Label>
              <Textarea rows={4} value={draft.long_description} onChange={(e) => setDraft({ ...draft, long_description: e.target.value })} />
            </div>
            <ListEditor
              label="Galeri Görselleri"
              values={draft.gallery}
              onChange={(v) => setDraft({ ...draft, gallery: v })}
              placeholder="https://..."
              addLabel="Resim Ekle"
            />
            <ListEditor
              label="Özellikler"
              values={draft.features}
              onChange={(v) => setDraft({ ...draft, features: v })}
              placeholder="Örn: Face ID destekli"
              addLabel="Madde Ekle"
            />
            <div>
              <Label>Önerilen Telefonlar</Label>
              <div className="mt-2 rounded-lg border border-border/50 p-3 max-h-48 overflow-y-auto space-y-2">
                {rows.filter((r) => r.id !== draft.id).length === 0 && (
                  <p className="text-xs text-muted-foreground">Önermek için başka telefon ekleyin.</p>
                )}
                {rows.filter((r) => r.id !== draft.id).map((r) => (
                  <label key={r.id} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={draft.recommended_ids.includes(r.id!)} onChange={() => toggleRecommended(r.id!)} />
                    <span>{r.name} <span className="text-muted-foreground">— {r.price}</span></span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Hiçbiri seçilmezse otomatik olarak diğer telefonlar önerilir.</p>
            </div>
            <div><Label>Sıra</Label><Input type="number" value={draft.sort_order} onChange={(e) => setDraft({ ...draft, sort_order: +e.target.value })} /></div>
            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 text-sm"><Switch checked={draft.warranty} onCheckedChange={(v) => setDraft({ ...draft, warranty: v })} /> Garantili</label>
              <label className="flex items-center gap-2 text-sm"><Switch checked={draft.featured} onCheckedChange={(v) => setDraft({ ...draft, featured: v })} /> Öne Çıkan</label>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>İptal</Button><Button onClick={save}>Kaydet</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPhones;

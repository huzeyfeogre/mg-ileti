import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader, AdminCard } from "./CrudHelpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Pencil, Trash2, Boxes } from "lucide-react";
import { Link } from "react-router-dom";
import { ListEditor } from "./ListEditor";
import { toast } from "sonner";
import { IconByName } from "@/lib/icons";

type Row = {
  id?: string;
  title: string;
  description: string;
  long_description: string;
  icon: string;
  image_url: string;
  price: string;
  gallery: string[];
  features: string[];
  recommended_ids: string[];
  sort_order: number;
};
const empty: Row = {
  title: "",
  description: "",
  long_description: "",
  icon: "ShoppingBag",
  image_url: "",
  price: "",
  gallery: [],
  features: [],
  recommended_ids: [],
  sort_order: 0,
};

const AdminProducts = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Row>(empty);

  const load = async () => {
    const { data, error } = await supabase.from("products").select("*").order("sort_order");
    if (error) toast.error(error.message);
    else setRows(data as Row[]);
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
      price: r.price ?? "",
    });
    setOpen(true);
  };

  const save = async () => {
    const payload = { ...draft, recommended_ids: draft.recommended_ids.filter((x) => x !== draft.id) };
    const { error } = draft.id
      ? await supabase.from("products").update(payload).eq("id", draft.id)
      : await supabase.from("products").insert(payload);
    if (error) { toast.error(error.message); return; }
    toast.success("Kaydedildi"); setOpen(false); load();
  };
  const remove = async (id: string) => {
    if (!confirm("Silinsin mi?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
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
      <AdminHeader title="Ürünler" subtitle="Aksesuar / ürün kategorilerini yönetin." onAdd={openNew} />
      <AdminCard>
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-xs uppercase text-muted-foreground">
            <tr><th className="text-left p-3">Sıra</th><th className="text-left p-3">İkon</th><th className="text-left p-3">Başlık</th><th className="text-left p-3">Fiyat</th><th className="p-3 w-24"></th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border/30">
                <td className="p-3">{r.sort_order}</td>
                <td className="p-3"><IconByName name={r.icon} className="w-5 h-5 text-primary" /></td>
                <td className="p-3 font-medium">{r.title}</td>
                <td className="p-3 text-muted-foreground">{r.price}</td>
                <td className="p-3 text-right">
                  <Button size="sm" variant="outline" asChild className="mr-2">
                    <Link to={`/admin/products/${r.id}/items`}><Boxes className="w-4 h-4 mr-1" /> Ürünler</Link>
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => openEdit(r)}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => remove(r.id!)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Henüz ürün yok.</td></tr>}
          </tbody>
        </table>
      </AdminCard>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{draft.id ? "Düzenle" : "Yeni Ürün"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Başlık</Label><Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></div>
            <div><Label>Kısa Açıklama</Label><Textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} /></div>
            <div><Label>Uzun Açıklama (detay sayfası)</Label><Textarea rows={5} value={draft.long_description} onChange={(e) => setDraft({ ...draft, long_description: e.target.value })} /></div>
            <div><Label>Fiyat</Label><Input value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} placeholder="₺199" /></div>
            <div><Label>İkon (Lucide)</Label><Input value={draft.icon} onChange={(e) => setDraft({ ...draft, icon: e.target.value })} placeholder="ShoppingBag, Plug, Headphones..." /></div>
            <div><Label>Ana Görsel URL</Label><Input value={draft.image_url} onChange={(e) => setDraft({ ...draft, image_url: e.target.value })} /></div>
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
              placeholder="Örn: 1 yıl garanti"
              addLabel="Madde Ekle"
            />
            <div>
              <Label>Önerilen Ürünler</Label>
              <div className="mt-2 rounded-lg border border-border/50 p-3 max-h-48 overflow-y-auto space-y-2">
                {rows.filter((r) => r.id !== draft.id).length === 0 && (
                  <p className="text-xs text-muted-foreground">Önermek için başka ürün ekleyin.</p>
                )}
                {rows.filter((r) => r.id !== draft.id).map((r) => (
                  <label key={r.id} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draft.recommended_ids.includes(r.id!)}
                      onChange={() => toggleRecommended(r.id!)}
                    />
                    <span>{r.title}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Hiçbiri seçilmezse otomatik olarak diğer ürünler önerilir.</p>
            </div>
            <div><Label>Sıra</Label><Input type="number" value={draft.sort_order} onChange={(e) => setDraft({ ...draft, sort_order: +e.target.value })} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>İptal</Button><Button onClick={save}>Kaydet</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;

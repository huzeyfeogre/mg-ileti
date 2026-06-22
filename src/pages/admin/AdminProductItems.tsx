import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminCard } from "./CrudHelpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ListEditor } from "./ListEditor";

type Item = {
  id?: string;
  product_id: string;
  title: string;
  description: string;
  price: string;
  image_url: string;
  features: string[];
  sort_order: number;
};

const AdminProductItems = () => {
  const { id } = useParams();
  const [parent, setParent] = useState<{ id: string; title: string } | null>(null);
  const [rows, setRows] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const empty: Item = { product_id: id ?? "", title: "", description: "", price: "", image_url: "", features: [], sort_order: 0 };
  const [draft, setDraft] = useState<Item>(empty);

  const load = async () => {
    if (!id) return;
    const [{ data: p }, { data, error }] = await Promise.all([
      supabase.from("products").select("id,title").eq("id", id).maybeSingle(),
      supabase.from("product_items").select("*").eq("product_id", id).order("sort_order"),
    ]);
    setParent(p as { id: string; title: string } | null);
    if (error) toast.error(error.message);
    else setRows(data as Item[]);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [id]);

  const openNew = () => { setDraft({ ...empty, product_id: id!, sort_order: (rows.at(-1)?.sort_order ?? 0) + 1 }); setOpen(true); };
  const openEdit = (r: Item) => { setDraft({ ...r, features: r.features ?? [] }); setOpen(true); };

  const save = async () => {
    const { error } = draft.id
      ? await supabase.from("product_items").update(draft).eq("id", draft.id)
      : await supabase.from("product_items").insert(draft);
    if (error) { toast.error(error.message); return; }
    toast.success("Kaydedildi"); setOpen(false); load();
  };
  const remove = async (rid: string) => {
    if (!confirm("Silinsin mi?")) return;
    const { error } = await supabase.from("product_items").delete().eq("id", rid);
    if (error) { toast.error(error.message); return; }
    toast.success("Silindi"); load();
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <Link to="/admin/products" className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="w-3 h-3 mr-1" /> Kategorilere dön
          </Link>
          <h1 className="font-heading font-bold text-3xl">{parent?.title ?? "Kategori"}</h1>
          <p className="text-muted-foreground mt-1">Bu kategoriye ait ürünleri yönetin.</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-1" /> Yeni Ürün</Button>
      </div>

      <AdminCard>
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-xs uppercase text-muted-foreground">
            <tr><th className="text-left p-3">Sıra</th><th className="text-left p-3">Başlık</th><th className="text-left p-3">Fiyat</th><th className="p-3 w-24"></th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border/30">
                <td className="p-3">{r.sort_order}</td>
                <td className="p-3 font-medium">{r.title}</td>
                <td className="p-3 text-primary font-semibold">{r.price}</td>
                <td className="p-3 text-right">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(r)}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => remove(r.id!)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">Henüz ürün yok.</td></tr>}
          </tbody>
        </table>
      </AdminCard>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{draft.id ? "Düzenle" : "Yeni Ürün"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Başlık</Label><Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></div>
            <div><Label>Açıklama</Label><Textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} /></div>
            <div><Label>Fiyat</Label><Input value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} placeholder="199 ₺" /></div>
            <div><Label>Görsel URL</Label><Input value={draft.image_url} onChange={(e) => setDraft({ ...draft, image_url: e.target.value })} /></div>
            <ListEditor
              label="Özellikler"
              values={draft.features}
              onChange={(v) => setDraft({ ...draft, features: v })}
              placeholder="Örn: Hızlı şarj destekli"
              addLabel="Madde Ekle"
            />
            <div><Label>Sıra</Label><Input type="number" value={draft.sort_order} onChange={(e) => setDraft({ ...draft, sort_order: +e.target.value })} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>İptal</Button><Button onClick={save}>Kaydet</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProductItems;

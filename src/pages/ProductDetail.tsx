import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FadeInSection from "@/components/FadeInSection";
import { ImageSlider } from "@/components/ImageSlider";
import { supabase } from "@/integrations/supabase/client";
import { IconByName } from "@/lib/icons";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";

type Product = {
  id: string;
  title: string;
  description: string;
  long_description: string;
  icon: string;
  image_url: string;
  gallery: string[];
  features: string[];
  price: string;
  recommended_ids: string[];
};

type Item = {
  id: string;
  title: string;
  description: string;
  price: string;
  image_url: string;
  features: string[];
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    (async () => {
      const [{ data }, { data: itemsData }] = await Promise.all([
        supabase.from("products").select("*").eq("id", id).maybeSingle(),
        supabase.from("product_items").select("*").eq("product_id", id).order("sort_order"),
      ]);
      const p = data as Product | null;
      setProduct(p);
      setItems((itemsData as Item[]) ?? []);
      if (p?.recommended_ids?.length) {
        const { data: recs } = await supabase.from("products").select("*").in("id", p.recommended_ids);
        setRecommended((recs as Product[]) ?? []);
      } else {
        const { data: recs } = await supabase.from("products").select("*").neq("id", id).order("sort_order").limit(3);
        setRecommended((recs as Product[]) ?? []);
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return <section className="py-20"><div className="container mx-auto px-4 text-center text-muted-foreground">Yükleniyor...</div></section>;
  }
  if (!product) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">Kategori bulunamadı.</p>
          <Button asChild><Link to="/urunlerimiz">Ürünlere dön</Link></Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Link to="/urunlerimiz" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Tüm kategoriler
        </Link>

        <FadeInSection>
          <div className="rounded-2xl overflow-hidden bg-card border border-border/50 mb-10 min-w-0">
            <ImageSlider images={[product.image_url, ...(product.gallery ?? [])]} alt={product.title} className="rounded-none border-0" imageClassName="h-64 md:h-80" />
            <div className="p-8 min-w-0">
              <div className="flex items-center gap-3 mb-3 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <IconByName name={product.icon} className="w-6 h-6 text-primary" />
                </div>
                <h1 className="font-heading font-extrabold text-3xl md:text-4xl break-words [overflow-wrap:anywhere]">{product.title}</h1>
              </div>
              <p className="text-muted-foreground break-words [overflow-wrap:anywhere]">{product.description}</p>
              {product.long_description && (
                <div className="text-foreground/90 mt-4 whitespace-pre-line break-words [overflow-wrap:anywhere]">{product.long_description}</div>
              )}
              {product.features?.length > 0 && (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 min-w-0">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="break-words [overflow-wrap:anywhere]">{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </FadeInSection>

        <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6">Bu Kategorideki Ürünler</h2>
        {items.length === 0 ? (
          <div className="rounded-xl bg-card border border-border/50 p-10 text-center text-muted-foreground">
            Bu kategoride henüz ürün eklenmemiş. Bilgi için WhatsApp'tan ulaşabilirsiniz.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it) => (
              <FadeInSection key={it.id}>
                <div className="rounded-xl bg-card border border-border/50 hover-lift overflow-hidden h-full flex flex-col min-w-0">
                  {it.image_url ? (
                    <img src={it.image_url} alt={it.title} className="w-full h-48 object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-48 bg-primary/5 flex items-center justify-center">
                      <IconByName name={product.icon} className="w-12 h-12 text-primary/40" />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-lg mb-2 break-words [overflow-wrap:anywhere]">{it.title}</h3>
                    {it.description && <p className="text-sm text-muted-foreground mb-3 break-words [overflow-wrap:anywhere]">{it.description}</p>}
                    {it.features?.length > 0 && (
                      <ul className="space-y-1 mb-4">
                        {it.features.map((f, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5 min-w-0">
                            <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" /> <span className="break-words [overflow-wrap:anywhere]">{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-auto pt-4 border-t border-border/30 flex flex-wrap items-center justify-between gap-2 min-w-0">
                      {it.price && <span className="font-heading font-bold text-primary break-words [overflow-wrap:anywhere]">{it.price}</span>}
                      <Button size="sm" asChild className="bg-[#25D366] hover:bg-[#25D366]/90 text-white ml-auto">
                        <a
                          href={`https://wa.me/905344205735?text=${encodeURIComponent(`Merhaba, "${it.title}" hakkında bilgi almak istiyorum.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" /> Bilgi Al
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        )}

        {recommended.length > 0 && (
          <div className="mt-20">
            <h2 className="font-heading font-bold text-2xl md:text-3xl mb-8">Diğer Kategoriler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommended.map((r) => (
                <Link key={r.id} to={`/urunlerimiz/${r.id}`} className="rounded-xl bg-card border border-border/50 hover-lift overflow-hidden block min-w-0">
                  {r.image_url ? (
                    <img src={r.image_url} alt={r.title} className="w-full h-44 object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-44 bg-primary/5 flex items-center justify-center">
                      <IconByName name={r.icon} className="w-12 h-12 text-primary/40" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-heading font-semibold mb-1 break-words [overflow-wrap:anywhere]">{r.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 break-words [overflow-wrap:anywhere]">{r.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetailPage;

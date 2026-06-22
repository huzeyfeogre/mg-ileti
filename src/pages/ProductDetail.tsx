import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FadeInSection from "@/components/FadeInSection";
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

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    (async () => {
      const { data } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
      const p = data as Product | null;
      setProduct(p);
      setActiveImage(p?.image_url || p?.gallery?.[0] || "");
      if (p?.recommended_ids?.length) {
        const { data: recs } = await supabase
          .from("products")
          .select("*")
          .in("id", p.recommended_ids);
        setRecommended((recs as Product[]) ?? []);
      } else {
        const { data: recs } = await supabase
          .from("products")
          .select("*")
          .neq("id", id)
          .order("sort_order")
          .limit(3);
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
          <p className="text-muted-foreground mb-4">Ürün bulunamadı.</p>
          <Button asChild><Link to="/urunlerimiz">Ürünlere dön</Link></Button>
        </div>
      </section>
    );
  }

  const images = [product.image_url, ...(product.gallery ?? [])].filter(Boolean);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Link to="/urunlerimiz" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Tüm ürünler
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <FadeInSection>
            <div className="rounded-2xl overflow-hidden bg-card border border-border/50 aspect-square flex items-center justify-center">
              {activeImage ? (
                <img src={activeImage} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <IconByName name={product.icon} className="w-24 h-24 text-primary/40" />
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto">
                {images.map((img) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${activeImage === img ? "border-primary" : "border-border/30"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </FadeInSection>

          <FadeInSection>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <IconByName name={product.icon} className="w-6 h-6 text-primary" />
              </div>
              <h1 className="font-heading font-extrabold text-3xl md:text-4xl">{product.title}</h1>
            </div>
            <p className="text-muted-foreground mb-6">{product.description}</p>
            {product.price && (
              <div className="text-3xl font-heading font-bold text-primary mb-6">{product.price}</div>
            )}
            {product.long_description && (
              <div className="prose prose-invert max-w-none text-foreground/90 mb-6 whitespace-pre-line">
                {product.long_description}
              </div>
            )}
            {product.features?.length > 0 && (
              <ul className="space-y-2 mb-8">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}
            <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white">
              <a
                href={`https://wa.me/905344205735?text=${encodeURIComponent(`Merhaba, "${product.title}" hakkında bilgi almak istiyorum.`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp ile sipariş ver
              </a>
            </Button>
          </FadeInSection>
        </div>

        {recommended.length > 0 && (
          <div className="mt-20">
            <h2 className="font-heading font-bold text-2xl md:text-3xl mb-8">Önerilen Ürünler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommended.map((r) => (
                <Link
                  key={r.id}
                  to={`/urunlerimiz/${r.id}`}
                  className="rounded-xl bg-card border border-border/50 hover-lift overflow-hidden block"
                >
                  {r.image_url ? (
                    <img src={r.image_url} alt={r.title} className="w-full h-44 object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-44 bg-primary/5 flex items-center justify-center">
                      <IconByName name={r.icon} className="w-12 h-12 text-primary/40" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-heading font-semibold mb-1">{r.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{r.description}</p>
                    {r.price && <div className="mt-3 text-primary font-bold">{r.price}</div>}
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

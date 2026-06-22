import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FadeInSection from "@/components/FadeInSection";
import { supabase } from "@/integrations/supabase/client";
import { IconByName } from "@/lib/icons";
import storeInterior from "@/assets/store/interior.webp";

type Product = { id: string; title: string; description: string; icon: string; image_url: string; price: string };

const ProductsPage = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("products").select("*").order("sort_order").then(({ data }) => {
      setItems((data as Product[]) ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-center mb-4">Ürünlerimiz</h1>
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-16">
            Telefonunuz için ihtiyacınız olan tüm aksesuarlar mağazamızda.
          </p>
        </FadeInSection>

        <FadeInSection>
          <div className="rounded-2xl overflow-hidden mb-12">
            <img src={storeInterior} alt="Hm Ekran Dünyası mağaza" className="w-full h-72 md:h-96 object-cover" loading="lazy" />
          </div>
        </FadeInSection>

        {loading ? (
          <p className="text-center text-muted-foreground">Yükleniyor...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((c) => (
              <FadeInSection key={c.id}>
                <Link
                  to={`/urunlerimiz/${c.id}`}
                  className="rounded-xl bg-card border border-border/50 hover-lift text-center h-full flex flex-col overflow-hidden transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <div className="block">
                    {c.image_url && <img src={c.image_url} alt={c.title} className="w-full h-44 object-cover" loading="lazy" />}
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                      <IconByName name={c.icon} className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="font-heading font-bold text-xl mb-3 break-words [overflow-wrap:anywhere]">{c.title}</h2>
                    <p className="text-sm text-muted-foreground flex-1 mb-4 break-words [overflow-wrap:anywhere]">{c.description}</p>
                    <span className="mt-auto inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors">
                      Ürünleri Gör →
                    </span>
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;

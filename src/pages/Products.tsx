import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FadeInSection from "@/components/FadeInSection";
import { supabase } from "@/integrations/supabase/client";
import { IconByName } from "@/lib/icons";
import storeInterior from "@/assets/store/interior.webp";

type Product = { id: string; title: string; description: string; icon: string; image_url: string };

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
                <div className="rounded-xl bg-card border border-border/50 hover-lift text-center h-full flex flex-col overflow-hidden">
                  {c.image_url && <img src={c.image_url} alt={c.title} className="w-full h-44 object-cover" loading="lazy" />}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                      <IconByName name={c.icon} className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="font-heading font-bold text-xl mb-3">{c.title}</h2>
                    <p className="text-sm text-muted-foreground flex-1 mb-6">{c.description}</p>
                    <Button asChild variant="outline" className="w-full">
                      <a href="https://wa.me/905344205735" target="_blank" rel="noopener noreferrer">İncele</a>
                    </Button>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FadeInSection from "@/components/FadeInSection";
import { supabase } from "@/integrations/supabase/client";
import { IconByName } from "@/lib/icons";

type Service = {
  id: string; title: string; description: string; icon: string;
  bullets: string[]; time_estimate: string; image_url: string;
};

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("services").select("*").order("sort_order").then(({ data }) => {
      setServices((data as Service[]) ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-center mb-4">Hizmetlerimiz</h1>
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-16">
            Profesyonel ekibimizle tüm telefon tamir ve bakım ihtiyaçlarınız için yanınızdayız.
          </p>
        </FadeInSection>

        {loading ? (
          <p className="text-center text-muted-foreground">Yükleniyor...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s) => (
              <FadeInSection key={s.id}>
                <div className="rounded-xl bg-card border border-border/50 hover-lift h-full flex flex-col overflow-hidden">
                  {s.image_url && <img src={s.image_url} alt={s.title} className="w-full h-48 object-cover" loading="lazy" />}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <IconByName name={s.icon} className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="font-heading font-bold text-xl">{s.title}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{s.description}</p>
                    <ul className="space-y-2 mb-4 flex-1">
                      {s.bullets.map((b) => (
                        <li key={b} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span> {b}
                        </li>
                      ))}
                    </ul>
                    {s.time_estimate && <p className="text-xs text-muted-foreground mb-4 italic">⏱ {s.time_estimate}</p>}
                    <Button asChild className="w-full">
                      <a href="https://wa.me/905344205735" target="_blank" rel="noopener noreferrer">Fiyat Al</a>
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

export default ServicesPage;

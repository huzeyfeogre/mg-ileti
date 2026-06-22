import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FadeInSection from "@/components/FadeInSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Smartphone, Battery, Shield, Star, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Phone = {
  id: string; name: string; storage: string; color: string; condition: string;
  battery: string; price: string; warranty: boolean; featured: boolean; image_url: string;
};

const IMAGES = {
  phones: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=70&auto=format&fit=crop",
  showcase: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=70&auto=format&fit=crop",
};

const conditionColor = (c: string) => {
  if (c === "Mükemmel") return "bg-primary/15 text-primary border-primary/30";
  if (c === "Çok İyi") return "bg-accent/15 text-accent border-accent/30";
  return "bg-muted text-muted-foreground border-border";
};

const PhonesForSalePage = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("phones_for_sale").select("*").order("sort_order").then(({ data }) => {
      setPhones((data as Phone[]) ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-center mb-4">Satılık Telefonlar 📱</h1>
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-6">
            Kontrol edilmiş, garantili ikinci el telefonlar — uygun fiyatlarla
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">✅ Teknik Kontrollü</span>
            <span className="px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">🛡️ Garantili</span>
            <span className="px-4 py-2 rounded-full bg-muted border border-border text-muted-foreground text-sm font-medium">🔋 Batarya Sağlığı Belirtilir</span>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden"><img src={IMAGES.phones} alt="Satılık telefonlar" className="w-full h-64 object-cover" loading="lazy" /></div>
            <div className="rounded-2xl overflow-hidden"><img src={IMAGES.showcase} alt="İkinci el telefon vitrini" className="w-full h-64 object-cover" loading="lazy" /></div>
          </div>
        </FadeInSection>

        {loading ? (
          <p className="text-center text-muted-foreground">Yükleniyor...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {phones.map((phone) => (
              <FadeInSection key={phone.id}>
                <Link to={`/satilik-telefonlar/${phone.id}`} className="rounded-xl bg-card border border-border/50 hover-lift h-full flex flex-col relative overflow-hidden hover:border-primary/40 transition-colors">
                  {phone.featured && (
                    <div className="absolute top-3 right-3 z-10">
                      <Badge className="bg-accent text-accent-foreground text-xs">
                        <Star className="w-3 h-3 mr-1" /> Öne Çıkan
                      </Badge>
                    </div>
                  )}
                  {phone.image_url && (
                    <div className="w-full h-44 overflow-hidden bg-muted">
                      <img src={phone.image_url} alt={`${phone.name} satılık`} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg leading-tight">{phone.name}</h3>
                        <p className="text-xs text-muted-foreground">{phone.storage} • {phone.color}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${conditionColor(phone.condition)}`}>{phone.condition}</span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border flex items-center gap-1">
                        <Battery className="w-3 h-3" /> {phone.battery}
                      </span>
                      {phone.warranty && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
                          <Shield className="w-3 h-3" /> Garantili
                        </span>
                      )}
                    </div>
                    <div className="mt-auto pt-4 border-t border-border/30 flex items-center justify-between">
                      <span className="font-heading font-extrabold text-xl text-primary">{phone.price}</span>
                      <span className="inline-flex items-center text-sm text-primary font-medium">
                        <MessageCircle className="w-4 h-4 mr-1" /> İncele →
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>
        )}

        <FadeInSection>
          <div className="mt-16 p-8 rounded-xl bg-card border border-border/50 text-center">
            <h2 className="font-heading font-bold text-xl mb-3">Telefonunuzu Satmak mı İstiyorsunuz? 💰</h2>
            <p className="text-muted-foreground mb-4">Kullanmadığınız telefonu bize getirin, değerinde fiyat teklifi alalım!</p>
            <Button asChild>
              <a href="https://wa.me/905344205735" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp'tan Yazın
              </a>
            </Button>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default PhonesForSalePage;

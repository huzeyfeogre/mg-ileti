import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FadeInSection from "@/components/FadeInSection";
import { ImageSlider, normalizeImageUrls } from "@/components/ImageSlider";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Battery, Check, MessageCircle, Shield, Smartphone, Star } from "lucide-react";

type Phone = {
  id: string;
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
};

const PhoneDetailPage = () => {
  const { id } = useParams();
  const [phone, setPhone] = useState<Phone | null>(null);
  const [recommended, setRecommended] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    (async () => {
      const { data } = await supabase.from("phones_for_sale").select("*").eq("id", id).maybeSingle();
      const p = data as Phone | null;
      setPhone(p);
      if (p?.recommended_ids?.length) {
        const { data: recs } = await supabase.from("phones_for_sale").select("*").in("id", p.recommended_ids);
        setRecommended((recs as Phone[]) ?? []);
      } else {
        const { data: recs } = await supabase.from("phones_for_sale").select("*").neq("id", id).order("sort_order").limit(3);
        setRecommended((recs as Phone[]) ?? []);
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return <section className="py-20"><div className="container mx-auto px-4 text-center text-muted-foreground">Yükleniyor...</div></section>;
  }
  if (!phone) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">Telefon bulunamadı.</p>
          <Button asChild><Link to="/satilik-telefonlar">Listeye dön</Link></Button>
        </div>
      </section>
    );
  }

  const images = normalizeImageUrls([phone.image_url, ...(phone.gallery ?? [])]);
  const waMsg = encodeURIComponent(`Merhaba, "${phone.name}" (${phone.storage} ${phone.color}) hakkında bilgi almak istiyorum.`);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Link to="/satilik-telefonlar" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Tüm telefonlar
        </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 min-w-0">
          <FadeInSection>
            <div className="relative">
              {phone.featured && (
                <Badge className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground"><Star className="w-3 h-3 mr-1" /> Öne Çıkan</Badge>
              )}
              <ImageSlider
                images={images}
                alt={phone.name}
                className="aspect-square flex items-center justify-center"
                imageClassName="h-full aspect-square"
                fallback={<div className="rounded-2xl overflow-hidden bg-card border border-border/50 aspect-square flex items-center justify-center"><Smartphone className="w-24 h-24 text-primary/40" /></div>}
              />
            </div>
          </FadeInSection>

          <FadeInSection>
            <h1 className="font-heading font-extrabold text-3xl md:text-4xl mb-2 break-words [overflow-wrap:anywhere]">{phone.name}</h1>
            <p className="text-muted-foreground mb-5 break-words [overflow-wrap:anywhere]">{phone.storage} • {phone.color}</p>

            <div className="flex flex-wrap gap-2 mb-6 min-w-0">
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 break-words [overflow-wrap:anywhere]">{phone.condition}</span>
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border flex items-center gap-1">
                <Battery className="w-3 h-3 flex-shrink-0" /> <span className="break-words [overflow-wrap:anywhere]">Batarya {phone.battery}</span>
              </span>
              {phone.warranty && (
                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Garantili
                </span>
              )}
            </div>

            <div className="text-4xl font-heading font-extrabold text-primary mb-6 break-words [overflow-wrap:anywhere]">{phone.price}</div>

            {phone.long_description && (
              <div className="text-foreground/90 mb-6 whitespace-pre-line break-words [overflow-wrap:anywhere]">{phone.long_description}</div>
            )}

            {phone.features?.length > 0 && (
              <ul className="space-y-2 mb-8">
                {phone.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 min-w-0">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="break-words [overflow-wrap:anywhere]">{f}</span>
                  </li>
                ))}
              </ul>
            )}

            <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white">
              <a href={`https://wa.me/905344205735?text=${waMsg}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp ile bilgi al
              </a>
            </Button>
          </FadeInSection>
        </div>

        {recommended.length > 0 && (
          <div className="mt-20">
            <h2 className="font-heading font-bold text-2xl md:text-3xl mb-8">Önerilen Telefonlar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommended.map((r) => (
                <Link key={r.id} to={`/satilik-telefonlar/${r.id}`} className="rounded-xl bg-card border border-border/50 hover-lift overflow-hidden block min-w-0">
                  {r.image_url ? (
                    <img src={r.image_url} alt={r.name} className="w-full h-44 object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-44 bg-primary/5 flex items-center justify-center"><Smartphone className="w-12 h-12 text-primary/40" /></div>
                  )}
                  <div className="p-5">
                    <h3 className="font-heading font-semibold mb-1 break-words [overflow-wrap:anywhere]">{r.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3 break-words [overflow-wrap:anywhere]">{r.storage} • {r.color}</p>
                    <div className="text-primary font-bold break-words [overflow-wrap:anywhere]">{r.price}</div>
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

export default PhoneDetailPage;

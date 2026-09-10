import { useEffect, useState } from "react";
import FadeInSection from "@/components/FadeInSection";
import { supabase } from "@/integrations/supabase/client";
import { IconByName } from "@/lib/icons";

type Device = { id: string; brand: string; icon: string; models: string[] };

const IMAGES = {
  screenRepair: "https://images.unsplash.com/photo-1597673030062-0a0f1a801a31?w=800&q=70&auto=format&fit=crop",
  motherboard: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=70&auto=format&fit=crop",
  repairDesk: "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?w=800&q=70&auto=format&fit=crop",
};

const repairTypes = [
  "Ekran Değişimi", "Batarya Değişimi", "Şarj Soketi Tamiri", "Arka Cam Değişimi",
  "Kamera Tamiri", "Hoparlör / Mikrofon", "Anakart Tamiri", "Su Hasarı Onarımı",
  "Yazılım Güncelleme", "Face ID / Touch ID",
];

const RepairedDevicesPage = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("repaired_devices").select("*").order("sort_order").then(({ data }) => {
      setDevices((data as Device[]) ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-center mb-4">Tamir Ettiğimiz Cihazlar 🔧</h1>
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-16">
            Tüm marka ve modellerde profesyonel tamir hizmeti sunuyoruz
          </p>
        </FadeInSection>

        <FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="rounded-2xl overflow-hidden"><img src={IMAGES.screenRepair} alt="Ekran değişimi" className="w-full h-56 object-cover" loading="lazy" /></div>
            <div className="rounded-2xl overflow-hidden"><img src={IMAGES.motherboard} alt="Anakart tamiri" className="w-full h-56 object-cover" loading="lazy" /></div>
            <div className="rounded-2xl overflow-hidden"><img src={IMAGES.repairDesk} alt="Tamir masası" className="w-full h-56 object-cover" loading="lazy" /></div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {repairTypes.map((type) => (
              <span key={type} className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">{type}</span>
            ))}
          </div>
        </FadeInSection>

        {loading ? (
          <p className="text-center text-muted-foreground">Yükleniyor...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {devices.map((d) => (
              <FadeInSection key={d.id}>
                <div className="p-6 rounded-xl bg-card border border-border/50 hover-lift h-full overflow-hidden">
                  <div className="flex items-center gap-3 mb-4 min-w-0">
                    <IconByName name={d.icon} className="w-8 h-8 text-primary shrink-0" />
                    <h3 className="font-heading font-bold text-lg min-w-0 break-words [overflow-wrap:anywhere]">{d.brand}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {d.models.map((model) => (
                      <li key={model} className="text-sm text-muted-foreground flex items-start gap-2 min-w-0">
                        <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary/50 shrink-0" />
                        <span className="min-w-0 break-words [overflow-wrap:anywhere]">{model}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </FadeInSection>
            ))}
          </div>
        )}

        <FadeInSection>
          <div className="mt-16 p-8 rounded-xl bg-card border border-border/50 text-center">
            <h2 className="font-heading font-bold text-xl mb-3">Cihazınızı Listede Bulamadınız mı? 🤔</h2>
            <p className="text-muted-foreground mb-4">
              Endişelenmeyin! Burada listelenmeyen birçok marka ve modelde de tamir hizmeti veriyoruz.
            </p>
            <p className="text-primary font-semibold">Bizi arayın, cihazınız için en uygun çözümü bulalım!</p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default RepairedDevicesPage;

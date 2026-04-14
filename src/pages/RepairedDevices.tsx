import FadeInSection from "@/components/FadeInSection";
import { Smartphone, Tablet, Watch, Headphones } from "lucide-react";

const IMAGES = {
  screenRepair: "https://images.unsplash.com/photo-1597673030062-0a0f1a801a31?w=800&q=80&auto=format&fit=crop",
  motherboard: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop",
  repairDesk: "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?w=800&q=80&auto=format&fit=crop",
  tools: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80&auto=format&fit=crop",
};

const devices = [
  { icon: Smartphone, brand: "Apple", models: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro", "iPhone 14", "iPhone 13", "iPhone 12", "iPhone 11", "iPhone SE"] },
  { icon: Smartphone, brand: "Samsung", models: ["Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24", "Galaxy S23 Ultra", "Galaxy S23", "Galaxy A54", "Galaxy A34", "Galaxy A14"] },
  { icon: Smartphone, brand: "Xiaomi", models: ["Xiaomi 14 Ultra", "Xiaomi 14", "Redmi Note 13 Pro", "Redmi Note 13", "Redmi 13C", "POCO X6 Pro", "POCO F5"] },
  { icon: Smartphone, brand: "Huawei", models: ["P60 Pro", "P50 Pro", "Mate 50 Pro", "Nova 11", "Nova 10", "Y9 Prime"] },
  { icon: Smartphone, brand: "Oppo / Realme", models: ["Oppo Reno 10 Pro", "Oppo A78", "Oppo A58", "Realme 11 Pro", "Realme C55", "Realme C53"] },
  { icon: Tablet, brand: "Tablet Tamiri", models: ["iPad Pro", "iPad Air", "iPad Mini", "Samsung Galaxy Tab S9", "Galaxy Tab A9", "Xiaomi Pad 6"] },
  { icon: Watch, brand: "Akıllı Saat", models: ["Apple Watch Ultra", "Apple Watch Series 9", "Samsung Galaxy Watch 6", "Huawei Watch GT4"] },
  { icon: Headphones, brand: "Kulaklık / Aksesuar", models: ["AirPods Pro", "AirPods 3", "Galaxy Buds", "JBL", "Sony WH-1000XM5"] },
];

const repairTypes = [
  "Ekran Değişimi", "Batarya Değişimi", "Şarj Soketi Tamiri", "Arka Cam Değişimi",
  "Kamera Tamiri", "Hoparlör / Mikrofon", "Anakart Tamiri", "Su Hasarı Onarımı",
  "Yazılım Güncelleme", "Face ID / Touch ID",
];

const RepairedDevicesPage = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <FadeInSection>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-center mb-4">
          Tamir Ettiğimiz Cihazlar 🔧
        </h1>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-16">
          Tüm marka ve modellerde profesyonel tamir hizmeti sunuyoruz
        </p>
      </FadeInSection>

      {/* Showcase images */}
      <FadeInSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-2xl overflow-hidden">
            <img src={IMAGES.screenRepair} alt="Ekran değişimi" className="w-full h-56 object-cover" loading="lazy" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={IMAGES.motherboard} alt="Anakart tamiri" className="w-full h-56 object-cover" loading="lazy" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={IMAGES.repairDesk} alt="Tamir masası" className="w-full h-56 object-cover" loading="lazy" />
          </div>
        </div>
      </FadeInSection>

      {/* Repair types */}
      <FadeInSection>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {repairTypes.map((type) => (
            <span key={type} className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              {type}
            </span>
          ))}
        </div>
      </FadeInSection>

      {/* Device grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {devices.map((d) => (
          <FadeInSection key={d.brand}>
            <div className="p-6 rounded-xl bg-card border border-border/50 hover-lift h-full">
              <div className="flex items-center gap-3 mb-4">
                <d.icon className="w-8 h-8 text-primary" />
                <h3 className="font-heading font-bold text-lg">{d.brand}</h3>
              </div>
              <ul className="space-y-1.5">
                {d.models.map((model) => (
                  <li key={model} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                    {model}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>
        ))}
      </div>

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

export default RepairedDevicesPage;

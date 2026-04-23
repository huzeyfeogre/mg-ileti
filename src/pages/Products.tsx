import { Button } from "@/components/ui/button";
import FadeInSection from "@/components/FadeInSection";
import {
  ShoppingBag, Plug, Headphones, Layers, BatteryCharging, Bluetooth,
} from "lucide-react";

import storeInterior from "@/assets/store/interior.webp";

const IMAGES = {
  store: storeInterior,
  phoneCases: "https://images.unsplash.com/photo-1601593346740-925612772716?w=800&q=70&auto=format&fit=crop",
  chargers: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=70&auto=format&fit=crop",
  headphones: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=70&auto=format&fit=crop",
  screenProtector: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=70&auto=format&fit=crop",
  powerbank: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=70&auto=format&fit=crop",
  bluetooth: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=70&auto=format&fit=crop",
};

const categories = [
  { icon: ShoppingBag, title: "Telefon Kılıfları", desc: "iPhone, Samsung, Xiaomi ve daha fazlası için şık ve dayanıklı kılıflar. Silikon, şeffaf, deri ve zırh modelleri.", image: IMAGES.phoneCases },
  { icon: Plug, title: "Şarj Cihazları & Kablolar", desc: "Hızlı şarj adaptörleri, USB-C, Lightning ve micro USB kablolar. Orijinal ve uyumlu seçenekler.", image: IMAGES.chargers },
  { icon: Headphones, title: "Kulaklıklar", desc: "Kablolu ve kablosuz Bluetooth kulaklıklar. Spor, müzik ve günlük kullanım için farklı modeller.", image: IMAGES.headphones },
  { icon: Layers, title: "Ekran Koruyucu Camlar", desc: "Tam kaplama temperli cam ekran koruyucular. Tüm popüler modeller için stokta.", image: IMAGES.screenProtector },
  { icon: BatteryCharging, title: "Powerbank", desc: "10.000 mAh'tan 30.000 mAh'a kadar taşınabilir şarj cihazları. Hızlı şarj destekli.", image: IMAGES.powerbank },
  { icon: Bluetooth, title: "Bluetooth Aksesuarlar", desc: "Bluetooth hoparlörler, araç kitleri, akıllı saat aksesuarları ve daha fazlası.", image: IMAGES.bluetooth },
];

const ProductsPage = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <FadeInSection>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-center mb-4">
          Ürünlerimiz
        </h1>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-16">
          Telefonunuz için ihtiyacınız olan tüm aksesuarlar mağazamızda.
        </p>
      </FadeInSection>

      {/* Hero banner */}
      <FadeInSection>
        <div className="rounded-2xl overflow-hidden mb-12">
          <img src={IMAGES.store} alt="Hm Ekran Dünyası mağaza" className="w-full h-72 md:h-96 object-cover" loading="lazy" />
        </div>
      </FadeInSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((c) => (
          <FadeInSection key={c.title}>
            <div className="rounded-xl bg-card border border-border/50 hover-lift text-center h-full flex flex-col overflow-hidden">
              <img src={c.image} alt={c.title} className="w-full h-44 object-cover" loading="lazy" />
              <div className="p-8 flex flex-col flex-1">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <c.icon className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-heading font-bold text-xl mb-3">{c.title}</h2>
                <p className="text-sm text-muted-foreground flex-1 mb-6">{c.desc}</p>
                <Button asChild variant="outline" className="w-full">
                  <a href="https://wa.me/905344205735" target="_blank" rel="noopener noreferrer">
                    İncele
                  </a>
                </Button>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

export default ProductsPage;

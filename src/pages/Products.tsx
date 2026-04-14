import { Button } from "@/components/ui/button";
import FadeInSection from "@/components/FadeInSection";
import {
  ShoppingBag, Plug, Headphones, Layers, BatteryCharging, Bluetooth,
} from "lucide-react";
import accessoriesImg from "@/assets/accessories.jpg";
import storeImg from "@/assets/store-interior.jpg";
import phoneCasesImg from "@/assets/phone-cases.jpg";
import chargersCablesImg from "@/assets/chargers-cables.jpg";

const categories = [
  { icon: ShoppingBag, title: "Telefon Kılıfları", desc: "iPhone, Samsung, Xiaomi ve daha fazlası için şık ve dayanıklı kılıflar. Silikon, şeffaf, deri ve zırh modelleri.", image: phoneCasesImg },
  { icon: Plug, title: "Şarj Cihazları & Kablolar", desc: "Hızlı şarj adaptörleri, USB-C, Lightning ve micro USB kablolar. Orijinal ve uyumlu seçenekler.", image: chargersCablesImg },
  { icon: Headphones, title: "Kulaklıklar", desc: "Kablolu ve kablosuz Bluetooth kulaklıklar. Spor, müzik ve günlük kullanım için farklı modeller.", image: accessoriesImg },
  { icon: Layers, title: "Ekran Koruyucu Camlar", desc: "Tam kaplama temperli cam ekran koruyucular. Tüm popüler modeller için stokta." },
  { icon: BatteryCharging, title: "Powerbank", desc: "10.000 mAh'tan 30.000 mAh'a kadar taşınabilir şarj cihazları. Hızlı şarj destekli." },
  { icon: Bluetooth, title: "Bluetooth Aksesuarlar", desc: "Bluetooth hoparlörler, araç kitleri, akıllı saat aksesuarları ve daha fazlası." },
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
          <img src={storeImg} alt="MG İletişim mağaza" className="w-full h-72 md:h-96 object-cover" loading="lazy" width={1280} height={720} />
        </div>
      </FadeInSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((c) => (
          <FadeInSection key={c.title}>
            <div className="rounded-xl bg-card border border-border/50 hover-lift text-center h-full flex flex-col overflow-hidden">
              {c.image && (
                <img src={c.image} alt={c.title} className="w-full h-44 object-cover" loading="lazy" width={800} height={600} />
              )}
              <div className="p-8 flex flex-col flex-1">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <c.icon className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-heading font-bold text-xl mb-3">{c.title}</h2>
                <p className="text-sm text-muted-foreground flex-1 mb-6">{c.desc}</p>
                <Button asChild variant="outline" className="w-full">
                  <a href="https://wa.me/905001234567" target="_blank" rel="noopener noreferrer">
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

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FadeInSection from "@/components/FadeInSection";
import {
  Shield, Zap, BadgeDollarSign, Users,
  Smartphone, Battery, Code, Cpu, Droplets, Plug,
  ShoppingBag, Headphones, Layers,
  Star, MapPin, Phone, Clock,
} from "lucide-react";
import storeFront from "@/assets/store/storefront.webp";
import storeInterior from "@/assets/store/interior.webp";
import storeWorkshop from "@/assets/store/workshop.webp";
import storeRepairBench from "@/assets/store/repair-bench.webp";
import storeMicroscope from "@/assets/store/microscope.webp";

const IMAGES = {
  hero: storeFront,
  screenRepair: storeRepairBench,
  accessories: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=70&auto=format&fit=crop",
  store: storeInterior,
  repair2: storeMicroscope,
  tools: storeWorkshop,
};

const whyUs = [
  { icon: Users, title: "Uzman Ekip", desc: "Deneyimli teknisyenler ile profesyonel hizmet" },
  { icon: Zap, title: "Hızlı Servis", desc: "Çoğu tamir aynı gün teslim edilir" },
  { icon: BadgeDollarSign, title: "Uygun Fiyat", desc: "Kaliteli hizmeti uygun fiyatlarla sunuyoruz" },
  { icon: Shield, title: "Garantili Tamir", desc: "Tüm işlemlerimiz garanti kapsamındadır" },
];

const services = [
  { icon: Smartphone, title: "Ekran Değişimi", desc: "Orijinal ve uyumlu ekran seçenekleri" },
  { icon: Battery, title: "Batarya Değişimi", desc: "Uzun ömürlü batarya çözümleri" },
  { icon: Code, title: "Yazılım Sorunları", desc: "Format, güncelleme, virüs temizleme" },
  { icon: Cpu, title: "Anakart Tamiri", desc: "Mikroişlemci seviyesinde onarım" },
  { icon: Droplets, title: "Su Hasarı Onarımı", desc: "Sıvı temaslı cihazlarda kurtarma" },
  { icon: Plug, title: "Şarj Soketi Tamiri", desc: "Şarj girişi değişimi ve onarımı" },
];

const products = [
  { icon: ShoppingBag, title: "Kılıflar", desc: "Tüm modeller için şık kılıflar" },
  { icon: Plug, title: "Şarj Cihazları", desc: "Hızlı şarj adaptörleri ve kablolar" },
  { icon: Headphones, title: "Kulaklıklar", desc: "Kablolu ve kablosuz seçenekler" },
  { icon: Layers, title: "Cam Ekran Koruyucu", desc: "Tam kaplama temperli cam" },
];

const testimonials = [
  { name: "Ahmet Y.", text: "Ekranım 1 saatte değiştirildi, çok memnun kaldım. Fiyatlar da gayet uygun.", stars: 5 },
  { name: "Fatma K.", text: "Su hasarından sonra telefonumu kurtardılar. Harika bir ekip, herkese tavsiye ederim!", stars: 5 },
  { name: "Mehmet S.", text: "Batarya değişimi yaptırdım, telefon ilk günkü gibi oldu. Teşekkürler Hm Ekran Dünyası!", stars: 5 },
];

const Index = () => (
  <>
    {/* Hero */}
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <img
        src={IMAGES.hero}
        alt="Telefon tamiri yapan teknisyen"
        className="absolute inset-0 w-full h-full object-cover"
        width={1600}
        height={900}
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <FadeInSection>
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            📍 Sultanbeyli, İstanbul
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Telefonunuz <span className="text-gradient">Bizimle Güvende</span> 🔧
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Hızlı tamir, uygun fiyat, garantili hizmet — hemen randevu alın!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="glow-pulse text-base">
              <Link to="/hizmetlerimiz">Hizmetlerimizi Gör</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link to="/iletisim">Bize Ulaşın</Link>
            </Button>
          </div>
        </FadeInSection>
      </div>
    </section>

    {/* Why Us */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Neden <span className="text-gradient">Biz?</span></h2>
          <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">Binlerce müşterinin güvenini kazandık ✌️</p>
        </FadeInSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((item) => (
            <FadeInSection key={item.title}>
              <div className="p-6 rounded-xl bg-card border border-border/50 text-center hover-lift">
                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>

    {/* Services with images */}
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Hizmetlerimiz 🛠️</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">Profesyonel ekipman, deneyimli ekip</p>
        </FadeInSection>

        {/* Two featured images */}
        <FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="rounded-2xl overflow-hidden">
              <img src={IMAGES.screenRepair} alt="Ekran değişimi" className="w-full h-64 md:h-72 object-cover" loading="lazy" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src={IMAGES.repair2} alt="Telefon tamir işlemi" className="w-full h-64 md:h-72 object-cover" loading="lazy" />
            </div>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <FadeInSection key={s.title}>
              <div className="p-6 rounded-xl bg-card border border-border/50 hover-lift group">
                <s.icon className="w-10 h-10 text-primary mb-4 transition-transform group-hover:scale-110" />
                <h3 className="font-heading font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild variant="outline">
            <Link to="/hizmetlerimiz">Tüm Hizmetleri Gör →</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Products with images */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Ürünlerimiz 🎧</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">Orijinal ve uyumlu aksesuarlar</p>
        </FadeInSection>

        {/* Accessories images */}
        <FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="rounded-2xl overflow-hidden">
              <img src={IMAGES.accessories} alt="Kulaklık ve aksesuarlar" className="w-full h-56 object-cover" loading="lazy" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1601593346740-925612772716?w=800&q=70&auto=format&fit=crop" alt="Telefon kılıfları" className="w-full h-56 object-cover" loading="lazy" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=70&auto=format&fit=crop" alt="Şarj cihazları" className="w-full h-56 object-cover" loading="lazy" />
            </div>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <FadeInSection key={p.title}>
              <div className="p-6 rounded-xl bg-card border border-border/50 hover-lift text-center">
                <p.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-lg mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild variant="outline">
            <Link to="/urunlerimiz">Tüm Ürünleri Gör →</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Müşteri Yorumları ⭐</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">Müşterilerimiz ne diyor?</p>
        </FadeInSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <FadeInSection key={t.name}>
              <div className="p-6 rounded-xl bg-card border border-border/50">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">"{t.text}"</p>
                <p className="font-semibold text-sm">{t.name}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>

    {/* Store & Contact Strip */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Store images */}
        <FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="rounded-2xl overflow-hidden">
              <img src={IMAGES.store} alt="Hm Ekran Dünyası mağaza içi" className="w-full h-64 md:h-80 object-cover" loading="lazy" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src={IMAGES.tools} alt="Tamir aletleri ve ekipmanlar" className="w-full h-64 md:h-80 object-cover" loading="lazy" />
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border/50">
              <MapPin className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-heading font-semibold">Adres</h3>
                <p className="text-sm text-muted-foreground">Mehmet Akif Mah., İpekyolu Sk. No:44, Sultanbeyli/İstanbul</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border/50">
              <Phone className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-heading font-semibold">Telefon</h3>
                <p className="text-sm text-muted-foreground">+90 534 420 57 35</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border/50">
              <Clock className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-heading font-semibold">Çalışma Saatleri</h3>
                <p className="text-sm text-muted-foreground">Pzt–Cmt 09:00–20:00</p>
              </div>
            </div>
          </div>
        </FadeInSection>
        <FadeInSection>
          <div className="rounded-xl overflow-hidden border border-border/50 h-64 bg-muted flex items-center justify-center text-muted-foreground">
            <iframe
              title="Hm Ekran Dünyası Konum"
              src="https://www.google.com/maps?q=Mehmet+Akif+Mah.+%C4%B0pekyolu+Sk.+No+44+Sultanbeyli+%C4%B0stanbul&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </FadeInSection>
      </div>
    </section>
  </>
);

export default Index;

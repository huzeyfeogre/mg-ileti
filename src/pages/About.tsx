import FadeInSection from "@/components/FadeInSection";
import { Target, Eye, Wrench, ShoppingCart, Award, Clock, Users, ThumbsUp, CheckCircle, Smartphone } from "lucide-react";
import storeFront from "@/assets/store/storefront.webp";
import storeWorkshop from "@/assets/store/workshop.webp";
import storeRepairBench from "@/assets/store/repair-bench.webp";
import storeMicroscope from "@/assets/store/microscope.webp";

const IMAGES = {
  store: storeFront,
  workshop: storeWorkshop,
  repair: storeRepairBench,
  tools: storeMicroscope,
};

const brands = ["Apple", "Samsung", "Xiaomi", "Huawei", "Oppo", "Realme", "OnePlus", "Nothing", "Google Pixel"];

const team = [
  { name: "Murat Bey", role: "İşletme Sahibi", desc: "Hm Ekran Dünyası'in kurucusu. Yıllarca sektörde edindiği tecrübeyle ekibi yönlendiren, müşteri memnuniyetini her şeyin önünde tutan lider." },
  { name: "Hamza", role: "Teknisyen", desc: "Ekran değişimi, anakart tamiri ve mikro lehimleme konusunda uzman. Tüm marka ve modellerde hızlı ve kaliteli tamir yapıyor." },
  { name: "Arif", role: "Teknisyen & Satış", desc: "Hem tamir hem aksesuar satışında deneyimli. Müşterilere en uygun çözümü sunarak güler yüzlü hizmet veriyor." },
];

const stats = [
  { icon: Smartphone, value: "15.000+", label: "Tamir Edilen Cihaz" },
  { icon: Users, value: "10.000+", label: "Mutlu Müşteri" },
  { icon: Clock, value: "8+", label: "Yıllık Deneyim" },
  { icon: Award, value: "%98", label: "Müşteri Memnuniyeti" },
];

const values = [
  { icon: ThumbsUp, title: "Güvenilirlik", desc: "Her işlemde şeffaf fiyatlandırma ve dürüst iletişim. Müşterilerimize her zaman doğruyu söyleriz." },
  { icon: CheckCircle, title: "Kalite", desc: "Sadece en kaliteli yedek parçaları kullanırız. Tüm tamirlerimiz garanti kapsamındadır." },
  { icon: Clock, title: "Hız", desc: "Zamanınızın değerli olduğunu biliyoruz. Çoğu tamir işlemi aynı gün teslim edilir." },
];

const AboutPage = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      {/* Header */}
      <FadeInSection>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-center mb-4">
          Hakkımızda
        </h1>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
          Hm Ekran Dünyası olarak Sultanbeyli'de yıllardır hizmet veriyoruz. Müşteri memnuniyetini
          her zaman ön planda tutarak, kaliteli ve güvenilir telefon tamir ile aksesuar hizmeti sunuyoruz.
        </p>
      </FadeInSection>

      {/* Images */}
      <FadeInSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden md:col-span-2">
            <img src={IMAGES.workshop} alt="Telefon tamir atölyesi" className="w-full h-72 object-cover" loading="lazy" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={IMAGES.store} alt="Hm Ekran Dünyası mağaza" className="w-full h-72 object-cover" loading="lazy" />
          </div>
        </div>
      </FadeInSection>

      {/* Story with side image */}
      <FadeInSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-5xl mx-auto">
          <div className="p-8 rounded-xl bg-card border border-border/50">
            <h2 className="font-heading font-bold text-2xl mb-4">Hikayemiz</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Hm Ekran Dünyası, Sultanbeyli'de küçük bir tamir atölyesi olarak yola çıktı. İlk günden itibaren
                amacımız basitti: insanların teknolojik cihazlarını hızlı, uygun fiyatlı ve güvenilir bir
                şekilde tamir etmek.
              </p>
              <p>
                Yıllar içinde edindiğimiz tecrübe ve müşterilerimizin güveniyle büyüdük. Bugün Sultanbeyli'nin
                en bilinen ve en çok tercih edilen telefon servis merkezlerinden biri olmanın gururunu yaşıyoruz.
              </p>
              <p>
                Sadece tamir değil, aynı zamanda geniş aksesuar yelpazemizle müşterilerimizin tüm telefon
                ihtiyaçlarını tek bir noktadan karşılıyoruz.
              </p>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-4">
            <div className="rounded-xl overflow-hidden">
              <img src={IMAGES.repair} alt="Ekran tamiri" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="rounded-xl overflow-hidden">
              <img src={IMAGES.tools} alt="Tamir aletleri" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {stats.map((s) => (
          <FadeInSection key={s.label}>
            <div className="p-6 rounded-xl bg-card border border-border/50 text-center hover-lift">
              <s.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="font-heading font-extrabold text-3xl text-primary mb-1">{s.value}</div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          </FadeInSection>
        ))}
      </div>

      {/* Mission / Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <FadeInSection>
          <div className="p-8 rounded-xl bg-card border border-border/50 h-full">
            <Target className="w-10 h-10 text-primary mb-4" />
            <h2 className="font-heading font-bold text-2xl mb-3">Misyonumuz</h2>
            <p className="text-muted-foreground">
              Sultanbeyli halkına en hızlı, en uygun fiyatlı ve en kaliteli telefon tamir hizmetini
              sunarak teknoloji ile aralarındaki bağı güçlendirmek.
            </p>
          </div>
        </FadeInSection>
        <FadeInSection>
          <div className="p-8 rounded-xl bg-card border border-border/50 h-full">
            <Eye className="w-10 h-10 text-primary mb-4" />
            <h2 className="font-heading font-bold text-2xl mb-3">Vizyonumuz</h2>
            <p className="text-muted-foreground">
              İstanbul'un en güvenilir ve tercih edilen telefon servis merkezi olmak. Teknolojiyi
              herkes için erişilebilir kılmak ve sektörde öncü olmaya devam etmek.
            </p>
          </div>
        </FadeInSection>
      </div>

      {/* Values */}
      <FadeInSection>
        <h2 className="font-heading text-3xl font-bold text-center mb-10">Değerlerimiz</h2>
      </FadeInSection>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {values.map((v) => (
          <FadeInSection key={v.title}>
            <div className="p-8 rounded-xl bg-card border border-border/50 text-center hover-lift h-full">
              <v.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-lg mb-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          </FadeInSection>
        ))}
      </div>

      {/* Team */}
      <FadeInSection>
        <h2 className="font-heading text-3xl font-bold text-center mb-10">Ekibimiz</h2>
      </FadeInSection>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
        {team.map((t) => (
          <FadeInSection key={t.name}>
            <div className="p-6 rounded-xl bg-card border border-border/50 text-center hover-lift h-full">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                {t.role.includes("İşletme") ? (
                  <Users className="w-7 h-7 text-primary" />
                ) : t.role.includes("Satış") ? (
                  <ShoppingCart className="w-7 h-7 text-primary" />
                ) : (
                  <Wrench className="w-7 h-7 text-primary" />
                )}
              </div>
              <h3 className="font-heading font-semibold text-lg">{t.name}</h3>
              <p className="text-sm text-primary mb-2">{t.role}</p>
              <p className="text-sm text-muted-foreground">{t.desc}</p>
            </div>
          </FadeInSection>
        ))}
      </div>

      {/* Brands */}
      <FadeInSection>
        <h2 className="font-heading text-3xl font-bold text-center mb-8">Hizmet Verdiğimiz Markalar</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {brands.map((b) => (
            <div key={b} className="px-6 py-3 rounded-lg bg-card border border-border/50 font-heading font-semibold text-muted-foreground hover-lift">
              {b}
            </div>
          ))}
        </div>
      </FadeInSection>
    </div>
  </section>
);

export default AboutPage;

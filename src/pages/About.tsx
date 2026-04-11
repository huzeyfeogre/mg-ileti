import FadeInSection from "@/components/FadeInSection";
import { Target, Eye, Wrench, ShoppingCart } from "lucide-react";

const brands = ["Apple", "Samsung", "Xiaomi", "Huawei", "Oppo", "Realme"];

const team = [
  { name: "Emre Güneş", role: "Baş Teknisyen", desc: "10 yılı aşkın deneyimle mikroişlemci seviyesinde tamir uzmanı." },
  { name: "Selin Arslan", role: "Satış Sorumlusu", desc: "Müşteri memnuniyetini ön planda tutan, aksesuar danışmanı." },
];

const AboutPage = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <FadeInSection>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-center mb-4">
          Hakkımızda
        </h1>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
          MG İletişim olarak Sultanbeyli'de yıllardır hizmet veriyoruz. Müşteri memnuniyetini
          her zaman ön planda tutarak, kaliteli ve güvenilir telefon tamir ile aksesuar hizmeti sunuyoruz.
        </p>
      </FadeInSection>

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
              herkes için erişilebilir kılmak.
            </p>
          </div>
        </FadeInSection>
      </div>

      {/* Team */}
      <FadeInSection>
        <h2 className="font-heading text-3xl font-bold text-center mb-10">Ekibimiz</h2>
      </FadeInSection>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-20">
        {team.map((t) => (
          <FadeInSection key={t.name}>
            <div className="p-6 rounded-xl bg-card border border-border/50 text-center hover-lift">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                {t.role.includes("Teknisyen") ? (
                  <Wrench className="w-7 h-7 text-primary" />
                ) : (
                  <ShoppingCart className="w-7 h-7 text-primary" />
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
        <div className="flex flex-wrap justify-center gap-6">
          {brands.map((b) => (
            <div key={b} className="px-6 py-3 rounded-lg bg-card border border-border/50 font-heading font-semibold text-muted-foreground">
              {b}
            </div>
          ))}
        </div>
      </FadeInSection>
    </div>
  </section>
);

export default AboutPage;

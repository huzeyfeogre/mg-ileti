import { Button } from "@/components/ui/button";
import FadeInSection from "@/components/FadeInSection";
import {
  Smartphone, Battery, Code, Cpu, Droplets, Plug, Camera, Volume2,
} from "lucide-react";

const IMAGES = {
  screenRepair: "https://images.unsplash.com/photo-1597673030062-0a0f1a801a31?w=800&q=70&auto=format&fit=crop",
  batteryRepair: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=70&auto=format&fit=crop",
  motherboard: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=70&auto=format&fit=crop",
  waterDamage: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=70&auto=format&fit=crop",
  repairTools: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=70&auto=format&fit=crop",
  repairWorkbench: "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?w=800&q=70&auto=format&fit=crop",
  soldering: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=800&q=70&auto=format&fit=crop",
  charging: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=70&auto=format&fit=crop",
};

const services = [
  {
    icon: Smartphone,
    title: "Ekran Değişimi",
    desc: "iPhone, Samsung, Xiaomi, Huawei ve daha fazlası için orijinal ve uyumlu ekran değişimi.",
    bullets: ["Orijinal ve A kalite ekran seçenekleri", "Dokunmatik hassasiyet testi", "Garanti kapsamında hizmet", "Tüm marka ve modeller"],
    time: "Genellikle 1–2 saat içinde tamamlanır",
    image: IMAGES.screenRepair,
  },
  {
    icon: Battery,
    title: "Batarya Değişimi",
    desc: "Telefonunuzun batarya ömrü kısaldıysa, orijinal kapasiteli batarya ile değişim yapıyoruz.",
    bullets: ["Orijinal kapasiteli bataryalar", "Batarya sağlık testi", "Hızlı değişim işlemi", "6 ay garanti"],
    time: "Genellikle 30–60 dakika içinde tamamlanır",
    image: IMAGES.batteryRepair,
  },
  {
    icon: Code,
    title: "Yazılım Sorunları Çözümü",
    desc: "Format atma, güncelleme sorunları, virüs temizleme ve yazılım optimizasyonu.",
    bullets: ["Fabrika ayarlarına sıfırlama", "İşletim sistemi güncellemesi", "Virüs ve zararlı yazılım temizleme", "Veri yedekleme ve kurtarma"],
    time: "Genellikle 1–3 saat içinde tamamlanır",
    image: IMAGES.repairWorkbench,
  },
  {
    icon: Cpu,
    title: "Anakart Tamiri",
    desc: "Mikroişlemci seviyesinde onarım. Açılmayan, donma yapan cihazlar için çözüm.",
    bullets: ["Mikro lehimleme işlemleri", "Entegre değişimi", "Kısa devre tespiti ve onarımı", "Açılmayan cihaz kurtarma"],
    time: "Genellikle 1–3 iş günü içinde tamamlanır",
    image: IMAGES.motherboard,
  },
  {
    icon: Droplets,
    title: "Su Hasarı Onarımı",
    desc: "Sıvı teması sonrası cihazınız için acil müdahale ve onarım.",
    bullets: ["Ultrasonik temizleme", "Korozyon giderme", "Hasar tespiti ve raporlama", "Acil müdahale servisi"],
    time: "Genellikle 1–2 iş günü içinde tamamlanır",
    image: IMAGES.waterDamage,
  },
  {
    icon: Plug,
    title: "Şarj Soketi Tamiri",
    desc: "Şarj girişi arızası, gevşek soket veya şarj almama sorunları için onarım.",
    bullets: ["Şarj soketi değişimi", "Şarj IC tamiri", "Hızlı şarj uyumluluk testi", "Tüm marka ve modeller"],
    time: "Genellikle 1–2 saat içinde tamamlanır",
    image: IMAGES.charging,
  },
  {
    icon: Camera,
    title: "Kamera Değişimi",
    desc: "Ön ve arka kamera modülü değişimi, odaklama sorunları giderme.",
    bullets: ["Ön ve arka kamera değişimi", "Odaklama ayarı", "Kamera camı değişimi", "Orijinal yedek parça"],
    time: "Genellikle 1–2 saat içinde tamamlanır",
    image: IMAGES.repairTools,
  },
  {
    icon: Volume2,
    title: "Hoparlör / Mikrofon Tamiri",
    desc: "Ses gelmiyor, mikrofon çalışmıyor veya ses kısık mı? Hemen çözelim.",
    bullets: ["Hoparlör değişimi", "Mikrofon değişimi", "Ses IC tamiri", "Ses testi ve kalibrasyon"],
    time: "Genellikle 1–2 saat içinde tamamlanır",
    image: IMAGES.soldering,
  },
];

const ServicesPage = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <FadeInSection>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-center mb-4">
          Hizmetlerimiz
        </h1>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-16">
          Profesyonel ekibimizle tüm telefon tamir ve bakım ihtiyaçlarınız için yanınızdayız.
        </p>
      </FadeInSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((s) => (
          <FadeInSection key={s.title}>
            <div className="rounded-xl bg-card border border-border/50 hover-lift h-full flex flex-col overflow-hidden">
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-heading font-bold text-xl">{s.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                <ul className="space-y-2 mb-4 flex-1">
                  {s.bullets.map((b) => (
                    <li key={b} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span> {b}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mb-4 italic">⏱ {s.time}</p>
                <Button asChild className="w-full">
                  <a href="https://wa.me/905001234567" target="_blank" rel="noopener noreferrer">
                    Fiyat Al
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

export default ServicesPage;

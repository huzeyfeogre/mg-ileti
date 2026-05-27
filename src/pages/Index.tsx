import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FadeInSection from "@/components/FadeInSection";
import {
  Smartphone, BatteryCharging, Settings, Droplets, Camera, Package,
  Zap, ShieldCheck, Search,
  MessageCircle, MapPin, Phone, Clock, Instagram, Star, Quote,
} from "lucide-react";

const WA = "https://wa.me/905344205735";
const TEL = "+90 534 420 57 35";

const services = [
  { icon: Smartphone, title: "Ekran Değişimi", desc: "Orijinal ekranlarla aynı gün teslimat. Samsung, iPhone, Xiaomi ve daha fazlası.", badge: "En Çok Tercih" },
  { icon: BatteryCharging, title: "Batarya Değişimi", desc: "Şişmiş veya bitik bataryanı 30 dakikada değiştiriyoruz.", badge: null },
  { icon: Settings, title: "Yazılım & Güncelleme", desc: "Donma, kasma, fabrika ayarı — yazılım sorunlarını çözüyoruz.", badge: null },
  { icon: Droplets, title: "Su Hasarı Onarımı", desc: "Islanan telefonunu getir, biz kurtaralım.", badge: null },
  { icon: Camera, title: "Kamera Tamiri", desc: "Ön/arka kamera değişimi ve lens onarımı.", badge: null },
  { icon: Package, title: "Aksesuar Satışı", desc: "Kılıf, cam, şarj aleti, kulaklık — her şey burada.", badge: "Yeni Ürünler" },
] as const;

const whyUs = [
  { icon: Zap, title: "Aynı Gün Teslimat", desc: "Çoğu tamir 1-2 saat içinde tamamlanır, telefonunuz o gün elinizde." },
  { icon: ShieldCheck, title: "Orijinal Parça Garantisi", desc: "Yalnızca orijinal veya sertifikalı parça kullanıyoruz, 3 ay garanti veriyoruz." },
  { icon: Search, title: "Ücretsiz Kontrol", desc: "Tamir olmadan önce arızayı ücretsiz teşhis ediyoruz, sürpriz ücret yok." },
] as const;

const reviews = [
  { name: "Ahmet K.", rating: 5, text: "iPhone ekranım sabah kırıldı, öğleden önce yenilendi. Fiyat da gayet uygundu.", date: "2 hafta önce" },
  { name: "Merve T.", rating: 5, text: "Batarya sorunum vardı, 45 dakikada hallettiler. Sıcakkanlı insanlar, tavsiye ederim.", date: "1 ay önce" },
  { name: "Osman Y.", rating: 5, text: "Suya düşürdüm, kurtarmak mümkün değil dediler ama burası kurtardı. Teşekkürler!", date: "3 hafta önce" },
] as const;

const Index = () => (
  <>
    {/* HERO */}
    <section id="hero" className="relative min-h-[92vh] flex items-center overflow-hidden hero-bg hero-rings hero-grid">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <FadeInSection>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs sm:text-sm font-medium mb-6">
            ⚡ Aynı Gün Teslimat
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] mb-5">
            Telefonun <span className="text-gradient">Kırıldı mı?</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Ekran, batarya, yazılım — Sultanbeyli'nin en hızlı tamir merkezi burada.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="btn-glow bg-whatsapp hover:bg-whatsapp text-white text-base">
              <a href={WA} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" fill="currentColor" />
                WhatsApp'tan Fiyat Al
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-glow text-base border-border/70">
              <a href="#services">Hizmetleri Gör</a>
            </Button>
          </div>
        </FadeInSection>
      </div>
    </section>

    {/* SERVICES */}
    <section id="services" className="py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold mb-3">Ne Tamir Ediyoruz?</h2>
            <p className="text-muted-foreground">Her marka, her model, her arıza.</p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <FadeInSection key={s.title}>
              <div className="group relative p-6 rounded-xl bg-card border border-border/60 hover-lift h-full">
                {s.badge && (
                  <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full bg-primary/15 text-primary border border-primary/30">
                    {s.badge}
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-1.5">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>

    {/* WHY US */}
    <section id="why" className="py-20 sm:py-24 bg-card/30 border-y border-border/40">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold mb-3">
              Neden <span className="text-gradient">HM Ekran Dünyası</span>?
            </h2>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {whyUs.map((f) => (
            <FadeInSection key={f.title}>
              <div className="text-center px-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center mb-5">
                  <f.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>

    {/* TESTIMONIALS */}
    <section id="reviews" className="py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold mb-3">Müşterilerimiz Ne Diyor?</h2>
            <p className="text-muted-foreground">Gerçek insanlar, gerçek yorumlar.</p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <FadeInSection key={r.name}>
              <div className="relative p-6 rounded-xl bg-card border border-border/60 hover-lift h-full">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[hsl(var(--star))] text-[hsl(var(--star))]" />
                  ))}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed mb-5">"{r.text}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <span className="font-heading font-semibold text-sm">{r.name}</span>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>

    {/* CONTACT */}
    <section id="contact" className="py-20 sm:py-24 bg-card/30 border-t border-border/40">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold mb-3">Bize Ulaşın</h2>
            <p className="text-muted-foreground">Sorun küçükse cevap büyük olsun — yaz, arayalım.</p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <FadeInSection>
            <div className="p-6 sm:p-8 rounded-xl bg-card border border-border/60 h-full flex flex-col">
              <div className="space-y-5 flex-1">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">Adres</div>
                    <div className="font-medium">Mehmet Akif Mah., İpekyolu Sk. No:44, Sultanbeyli / İstanbul</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">Telefon</div>
                    <a href="tel:+905344205735" className="font-medium hover:text-primary transition-colors">{TEL}</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">Çalışma Saatleri</div>
                    <div className="text-sm space-y-0.5">
                      <div>Hafta içi <span className="text-muted-foreground">09:00 – 20:00</span></div>
                      <div>Cumartesi <span className="text-muted-foreground">10:00 – 19:00</span></div>
                      <div>Pazar <span className="text-muted-foreground">Kapalı</span></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">Instagram</div>
                    <a href="https://instagram.com/hmekrandunyasi" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary transition-colors">@hmekrandunyasi</a>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="btn-glow bg-whatsapp hover:bg-whatsapp text-white mt-8">
                <a href={WA} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" fill="currentColor" />
                  WhatsApp'tan Mesaj At
                </a>
              </Button>
            </div>
          </FadeInSection>

          <FadeInSection>
            <div className="rounded-xl overflow-hidden border border-border/60 h-full min-h-[360px] bg-muted">
              <iframe
                title="HM Ekran Dünyası Konum"
                src="https://www.google.com/maps?q=Mehmet+Akif+Mah.+%C4%B0pekyolu+Sk.+No+44+Sultanbeyli+%C4%B0stanbul&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 360 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  </>
);

export default Index;

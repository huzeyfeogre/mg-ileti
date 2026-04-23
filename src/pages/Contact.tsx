import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FadeInSection from "@/components/FadeInSection";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import storeFront from "@/assets/store/storefront.webp";

const IMAGES = {
  store: storeFront,
};

const contactInfo = [
  { icon: MapPin, title: "Adres", value: "Mehmet Akif Mah., İpekyolu Sk. No:44, Sultanbeyli/İstanbul" },
  { icon: Phone, title: "Telefon", value: "+90 534 420 57 35" },
  { icon: Clock, title: "Çalışma Saatleri", value: "Pzt–Cmt 09:00–20:00" },
  { icon: MessageCircle, title: "WhatsApp", value: "+90 534 420 57 35", link: "https://wa.me/905344205735" },
];

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", phone: "", model: "", desc: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mesajınız gönderildi! En kısa sürede sizinle iletişime geçeceğiz.");
    setForm({ name: "", phone: "", model: "", desc: "" });
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-center mb-4">
            İletişim
          </h1>
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-8">
            Sorularınız veya tamir talepleriniz için bize ulaşın.
          </p>
        </FadeInSection>

        {/* Store image */}
        <FadeInSection>
          <div className="rounded-2xl overflow-hidden mb-12 max-w-4xl mx-auto">
            <img src={IMAGES.store} alt="Hm Ekran Dünyası mağaza" className="w-full h-64 md:h-80 object-cover" loading="lazy" />
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Form */}
          <FadeInSection>
            <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-xl bg-card border border-border/50">
              <h2 className="font-heading font-bold text-xl mb-2">Bize Yazın</h2>
              <Input placeholder="Ad Soyad" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <Input placeholder="Telefon Numarası" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              <Input placeholder="Cihaz Modeli" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
              <Textarea placeholder="Sorun Açıklaması" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={4} />
              <Button type="submit" className="w-full">Gönder</Button>
            </form>
          </FadeInSection>

          {/* Info cards */}
          <FadeInSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((c) => (
                <div key={c.title} className="p-6 rounded-xl bg-card border border-border/50 hover-lift">
                  <c.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-heading font-semibold mb-1">{c.title}</h3>
                  {c.link ? (
                    <a href={c.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">{c.value}</a>
                  ) : (
                    <p className="text-sm text-muted-foreground">{c.value}</p>
                  )}
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>

        {/* Map */}
        <FadeInSection>
          <div className="rounded-xl overflow-hidden border border-border/50 h-80">
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
  );
};

export default ContactPage;

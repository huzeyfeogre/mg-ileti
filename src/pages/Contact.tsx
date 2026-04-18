import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FadeInSection from "@/components/FadeInSection";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const IMAGES = {
  store: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=1200&q=70&auto=format&fit=crop",
};

const contactInfo = [
  { icon: MapPin, title: "Adres", value: "Sultanbeyli, İstanbul" },
  { icon: Phone, title: "Telefon", value: "+90 500 123 45 67" },
  { icon: Clock, title: "Çalışma Saatleri", value: "Pzt–Cmt 09:00–20:00" },
  { icon: MessageCircle, title: "WhatsApp", value: "+90 500 123 45 67", link: "https://wa.me/905001234567" },
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
            <img src={IMAGES.store} alt="MG İletişim mağaza" className="w-full h-64 md:h-80 object-cover" loading="lazy" />
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
              title="MG İletişim Konum"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24116.742890071!2d29.25!3d40.96!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac8b0a0a0a0a1%3A0x0!2sSultanbeyli!5e0!3m2!1str!2str!4v1"
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

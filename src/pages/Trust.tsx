import { Shield, Lock, Database, Mail, Phone } from "lucide-react";

const Trust = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-3">Güvenlik ve Gizlilik</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Bu sayfa HM Ekran Dünyası tarafından, müşterilerimize web sitemizin güvenlik ve gizlilik
          uygulamaları hakkında genel bilgi vermek için hazırlanmıştır. Sayfa içeriği bağımsız bir
          sertifikasyon değildir; uygulamamızla birlikte güncellenir.
        </p>
      </div>

      <section className="bg-card border border-border rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Lock className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Yönetim ve Erişim</h2>
        </div>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Site içeriği yalnızca yetkili yönetici hesabı tarafından düzenlenebilir.</li>
          <li>Yönetici girişleri e-posta ve parola ile yapılır; parolalar sızdırılmış parola veritabanına karşı kontrol edilir.</li>
          <li>Yönetici işlemleri sunucu tarafında rol denetimi ile korunur.</li>
        </ul>
      </section>

      <section className="bg-card border border-border rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Database className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Veri Saklama ve Kullanım</h2>
        </div>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Site ziyaretçilerinden hesap oluşturma veya kayıt talep edilmez.</li>
          <li>İletişim formu üzerinden gönderilen bilgiler yalnızca talebinizi yanıtlamak için kullanılır.</li>
          <li>Ürün ve hizmet bilgileri herkese açıktır; kişisel veri içermez.</li>
          <li>Altyapı olarak güvenli bir bulut sağlayıcı (Lovable Cloud) kullanılmakta olup veriler şifreli bağlantı (HTTPS) üzerinden iletilir.</li>
        </ul>
      </section>

      <section className="bg-card border border-border rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Sorumluluk Paylaşımı</h2>
        </div>
        <p className="text-muted-foreground">
          Altyapı güvenliği (sunucu, ağ, platform yamaları) Lovable Cloud tarafından sağlanır.
          Uygulama içeriği, kullanıcı yönetimi ve veri içeriği HM Ekran Dünyası tarafından
          yönetilir. Ziyaretçilerimiz, kendi cihazlarının güvenliği ve paylaştıkları bilgilerden
          sorumludur.
        </p>
      </section>

      <section className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Mail className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Güvenlik İletişimi</h2>
        </div>
        <p className="text-muted-foreground mb-3">
          Bir güvenlik veya gizlilik konusu fark ederseniz lütfen bizimle iletişime geçin:
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://wa.me/905344205735"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Phone className="w-4 h-4" /> +90 534 420 57 35
          </a>
        </div>
      </section>
    </div>
  );
};

export default Trust;

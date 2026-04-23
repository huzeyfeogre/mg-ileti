import { Link } from "react-router-dom";
import { Smartphone, MapPin, Phone, Clock } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/50">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 font-heading font-bold text-lg mb-3">
            <Smartphone className="w-5 h-5 text-primary" />
            Hm Ekran Dünyası
          </div>
          <p className="text-sm text-muted-foreground">
            Sultanbeyli'nin güvenilir telefon tamir ve aksesuar merkezi.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-3">Hızlı Bağlantılar</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Link to="/" className="block hover:text-primary transition-colors">Ana Sayfa</Link>
            <Link to="/hizmetlerimiz" className="block hover:text-primary transition-colors">Hizmetlerimiz</Link>
            <Link to="/urunlerimiz" className="block hover:text-primary transition-colors">Ürünlerimiz</Link>
            <Link to="/hakkimizda" className="block hover:text-primary transition-colors">Hakkımızda</Link>
            <Link to="/iletisim" className="block hover:text-primary transition-colors">İletişim</Link>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-3">İletişim</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-primary" /> Mehmet Akif Mah., İpekyolu Sk. No:44, Sultanbeyli/İstanbul</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +90 500 123 45 67</div>
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Pzt–Cmt 09:00–20:00</div>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-3">Markalar</h4>
          <p className="text-sm text-muted-foreground">
            Apple • Samsung • Xiaomi • Huawei • Oppo • Realme
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border/30 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Hm Ekran Dünyası. Tüm hakları saklıdır.
      </div>
    </div>
  </footer>
);

export default Footer;

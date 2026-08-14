# MG İletişim Sultanbeyli

Build a modern, multi-page website for "MG İletişim" — a phone repair and accessories shop located in Sultanbeyli, Istanbul, Turkey. The site should feel trustworthy, tech-forward, and local. The language of the entire site must be Turkish.

---

## 🎨 Design Direction

- **Aesthetic**: Clean dark-mode tech brand. Deep navy/charcoal background (#0f1117) with electric blue accents (#2563eb) and white text. Sharp, professional, slightly futuristic.

- **Typography**: Use "Syne" for headings (bold, geometric) and "DM Sans" for body text. Import from Google Fonts.

- **Motion**: Smooth fade-in on scroll, hover lift effects on cards, subtle glowing pulse on the CTA button.

- **Visual Details**: Subtle circuit-board pattern overlay in the hero section. Gradient mesh background on service cards. A top sticky navbar with blur/glass effect.

---

## 📄 Pages & Sections

### 1. HOME PAGE (Ana Sayfa)

**Navbar** (sticky, glassmorphism):

- Logo: "MG İletişim" with a small phone icon

- Nav links: Ana Sayfa | Hizmetlerimiz | Ürünlerimiz | Hakkımızda | İletişim

- CTA button: "Hemen Ara" (links to tel: number)

**Hero Section**:

- Big headline: "Telefonunuz Bizimle Güvende"

- Subtext: "Sultanbeyli'nin Güvenilir Telefon Tamir & Aksesuar Merkezi"

- Two buttons: "Hizmetlerimizi Gör" and "Bize Ulaşın"

- Animated background: subtle floating phone/circuit icons

**Why Us Section (Neden Biz?)**:

- 4 icon cards: ✅ Uzman Ekip | ⚡ Hızlı Servis | 💰 Uygun Fiyat | 🛡️ Garantili Tamir

**Services Preview (Hizmetler)**:

- 6 cards with icons: Ekran Değişimi | Batarya Değişimi | Yazılım Sorunları | Anakart Tamiri | Su Hasarı Onarımı | Şarj Soketi Tamiri

- Each card has an icon, title, short description, hover glow effect

**Products Preview (Ürünler)**:

- 4 product category cards: Kılıflar | Şarj Cihazları | Kulaklıklar | Cam Ekran Koruyucu

**Testimonials (Müşteri Yorumları)**:

- 3 fake but realistic Turkish customer reviews with 5 stars and names

**Map & Contact Strip**:

- Address, phone, working hours displayed prominently

- Google Maps embed placeholder

---

### 2. SERVICES PAGE (Hizmetlerimiz)

Full page with detailed service cards, each including:

- Icon

- Service name

- 3–4 bullet points explaining what's included

- Estimated time ("Genellikle 1–2 saat içinde tamamlanır")

- "Fiyat Al" CTA button (links to WhatsApp)

Services to include:

1. 📱 Ekran Değişimi (iPhone, Samsung, Xiaomi, Huawei vb.)

2. 🔋 Batarya Değişimi

3. 💻 Yazılım Sorunları Çözümü (format, güncelleme, virüs temizleme)

4. 🔧 Anakart Tamiri

5. 💧 Su Hasarı Onarımı

6. 🔌 Şarj Soketi Tamiri

7. 📷 Kamera Değişimi

8. 🔊 Hoparlör / Mikrofon Tamiri

---

### 3. PRODUCTS PAGE (Ürünlerimiz)

Grid of product categories with nice illustrated icons:

- Telefon Kılıfları (çeşitli modeller)

- Şarj Cihazları & Kablolar

- Kulaklıklar

- Ekran Koruyucu Camlar

- Powerbank

- Bluetooth Aksesuarlar

Each category card has: icon, name, short description, "İncele" button

---

### 4. ABOUT PAGE (Hakkımızda)

- Short story: "MG İletişim olarak Sultanbeyli'de yıllardır hizmet veriyoruz..."

- Mission/Vision cards

- Team section: 2 fake team member cards (teknisyen, satış)

- Brands we service: Apple, Samsung, Xiaomi, Huawei, Oppo, Realme logos (text only)

---

### 5. CONTACT PAGE (İletişim)

- Contact form: Ad Soyad, Telefon, Cihaz Modeli, Sorun Açıklaması, Gönder butonu

- Info cards: 📍 Adres | 📞 Telefon | 🕐 Çalışma Saatleri | 💬 WhatsApp

- WhatsApp floating button (bottom right, always visible across all pages)

- Embedded Google Maps iframe (placeholder)

**Shop Details to use throughout the site:**

- Business name: MG İletişim

- Location: Sultanbeyli, İstanbul

- Phone: (placeholder — user will fill in)

- Working hours: Pazartesi–Cumartesi 09:00–20:00

---

## ⚙️ Technical Requirements

- React with React Router for multi-page navigation

- Tailwind CSS for styling

- Lucide React for icons

- Fully responsive: mobile, tablet, desktop

- WhatsApp floating button visible on all pages (bottom-right corner, green)

- Smooth page transitions

- All text in Turkish

- SEO-friendly page titles per route

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://mg-ileti.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6768167f-06d6-4887-9116-72af429679ea).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

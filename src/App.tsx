import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import ServicesPage from "./pages/Services";
import ProductsPage from "./pages/Products";
import ProductDetailPage from "./pages/ProductDetail";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import RepairedDevicesPage from "./pages/RepairedDevices";
import PhonesForSalePage from "./pages/PhonesForSale";
import PhoneDetailPage from "./pages/PhoneDetail";
import NotFound from "./pages/NotFound";
import Trust from "./pages/Trust";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminServices from "./pages/admin/AdminServices";
import AdminRepairedDevices from "./pages/admin/AdminRepairedDevices";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductItems from "./pages/admin/AdminProductItems";
import AdminPhones from "./pages/admin/AdminPhones";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/hizmetlerimiz" element={<ServicesPage />} />
              <Route path="/urunlerimiz" element={<ProductsPage />} />
              <Route path="/urunlerimiz/:id" element={<ProductDetailPage />} />
              <Route path="/tamir-ettiklerimiz" element={<RepairedDevicesPage />} />
              <Route path="/satilik-telefonlar" element={<PhonesForSalePage />} />
              <Route path="/satilik-telefonlar/:id" element={<PhoneDetailPage />} />
              <Route path="/hakkimizda" element={<AboutPage />} />
              <Route path="/iletisim" element={<ContactPage />} />
              <Route path="/guvenlik" element={<Trust />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="repaired-devices" element={<AdminRepairedDevices />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/:id/items" element={<AdminProductItems />} />
              <Route path="phones" element={<AdminPhones />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

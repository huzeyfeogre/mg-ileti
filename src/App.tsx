import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import ServicesPage from "./pages/Services";
import ProductsPage from "./pages/Products";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import RepairedDevicesPage from "./pages/RepairedDevices";
import PhonesForSalePage from "./pages/PhonesForSale";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/hizmetlerimiz" element={<ServicesPage />} />
            <Route path="/urunlerimiz" element={<ProductsPage />} />
            <Route path="/tamir-ettiklerimiz" element={<RepairedDevicesPage />} />
            <Route path="/satilik-telefonlar" element={<PhonesForSalePage />} />
            <Route path="/hakkimizda" element={<AboutPage />} />
            <Route path="/iletisim" element={<ContactPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

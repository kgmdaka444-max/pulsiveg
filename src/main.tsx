import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import FleetPage from "./pages/FleetPage";
import VehiclePage from "./pages/VehiclePage";
import ServicesPage from "./pages/ServicesPage";
import ServicePage from "./pages/ServicePage";
import ChauffeursPage from "./pages/ChauffeursPage";
import PricingPage from "./pages/PricingPage";
import WhyUsPage from "./pages/WhyUsPage";
import CorporatePage from "./pages/CorporatePage";
import BookPage from "./pages/BookPage";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/fleet/:id" element={<VehiclePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServicePage />} />
          <Route path="/chauffeurs" element={<ChauffeursPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/why-us" element={<WhyUsPage />} />
          <Route path="/corporate" element={<CorporatePage />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

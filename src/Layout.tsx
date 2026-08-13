import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import WhatsAppFab from "./components/WhatsAppFab";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main className="min-h-svh">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}

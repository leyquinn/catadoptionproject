import { useEffect } from "react";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Adopt from "./pages/adopt";
import About from "./pages/about";
import AdoptionProcess from "./pages/adoptionProcess";
import Footer from "./components/footer";
import { Routes, Route, useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function App() {
  const { pathname } = useLocation();
  const isAdoptionProcessPage = pathname === "/adoption-process";

  return (
    <>
      <ScrollToTop />
      {!isAdoptionProcessPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/about" element={<About />} />
        <Route path="/adoption-process" element={<AdoptionProcess />} />
      </Routes>

      {!isAdoptionProcessPage && <Footer />}
    </>
  );
}

export default App;
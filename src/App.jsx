
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Countries from "./pages/Countries/Countries";
import Admission from "./pages/Admission/Admission";
import Contact from "./pages/Contact/Contact";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/responsive.css";

function App() {
  return (
    <BrowserRouter>

      {/* =========================
          SCROLL TO TOP
          Automatically scrolls to
          top whenever route changes
      ========================= */}
      <ScrollToTop />

      {/* =========================
          NAVBAR
      ========================= */}
      <Navbar />

      {/* =========================
          PAGE ROUTES
      ========================= */}
      <Routes>

        {/* =========================
            HOME
        ========================= */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* =========================
            ABOUT
        ========================= */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* =========================
            COUNTRIES
        ========================= */}
        <Route
          path="/countries"
          element={<Countries />}
        />

        {/* =========================
            SERVICES
        ========================= */}
        <Route
          path="/services"
          element={<Services />}
        />

        {/* =========================
            ADMISSION
        ========================= */}
        <Route
          path="/admission"
          element={<Admission />}
        />

        {/* =========================
            CONTACT
        ========================= */}
        <Route
          path="/contact"
          element={<Contact />}
        />

      </Routes>

      {/* =========================
          FOOTER
      ========================= */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;

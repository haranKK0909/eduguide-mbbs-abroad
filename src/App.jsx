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

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/responsive.css";

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>

      <ScrollToTop />

      <Routes>

        {/* =========================
            PUBLIC WEBSITE
        ========================= */}

        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />

        <Route
          path="/countries"
          element={
            <PublicLayout>
              <Countries />
            </PublicLayout>
          }
        />

        <Route
          path="/services"
          element={
            <PublicLayout>
              <Services />
            </PublicLayout>
          }
        />

        <Route
          path="/admission"
          element={
            <PublicLayout>
              <Admission />
            </PublicLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        {/* =========================
            ADMIN PANEL
        ========================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        {/* =========================
            FALLBACK
        ========================= */}

        <Route
          path="*"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
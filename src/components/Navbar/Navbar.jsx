import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Menu,
  X,
  ArrowUpRight,
  Sparkles
} from "lucide-react";

import "./Navbar.css";

// =========================================
// EDUGUIDE LOGO
// =========================================
import logo from "../../assets/eduguide-logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  /* =========================================
     DETECT PAGE SCROLL
  ========================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================
     CLOSE MOBILE MENU WHEN ROUTE CHANGES
  ========================================= */

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  /* =========================================
     PREVENT BODY SCROLL WHEN MOBILE MENU OPEN
  ========================================= */

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* =========================================
     CLOSE MENU
  ========================================= */

  const closeMenu = () => {
    setOpen(false);
  };

  /* =========================================
     ACTIVE ROUTE
  ========================================= */

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`nav-wrap ${
        scrolled ? "nav-scrolled" : ""
      }`}
    >

      {/* =====================================
          DECORATIVE TOP LIGHT
      ====================================== */}

      <div className="nav-top-line"></div>

      <nav className="nav">

        {/* =====================================
            BRAND
        ====================================== */}

        <Link
          to="/"
          className="brand"
          onClick={closeMenu}
        >

          {/* =================================
              REAL EDUGUIDE LOGO
          ================================= */}

          <div className="brand-logo">

            <img
              src={logo}
              alt="EduGuide Educational Services"
            />

          </div>


          {/* =================================
              BRAND TEXT
          ================================= */}

          <div className="brand-text">

            <b>
              EDUGUIDE
            </b>

            <small>
              EDUCATIONAL SERVICES
            </small>

          </div>

        </Link>


        {/* =====================================
            DESKTOP / MOBILE NAVIGATION
        ====================================== */}

        <div
          className={`nav-links ${
            open ? "show" : ""
          }`}
        >

          {/* =====================================
              HOME
          ====================================== */}

          <Link
            to="/"
            className={
              isActive("/")
                ? "active"
                : ""
            }
            onClick={closeMenu}
          >

            <span>
              Home
            </span>

            {isActive("/") && (
              <i></i>
            )}

          </Link>


          {/* =====================================
              ABOUT
          ====================================== */}

          <Link
            to="/about"
            className={
              isActive("/about")
                ? "active"
                : ""
            }
            onClick={closeMenu}
          >

            <span>
              About
            </span>

            {isActive("/about") && (
              <i></i>
            )}

          </Link>


          {/* =====================================
              SERVICES
          ====================================== */}

          <Link
            to="/services"
            className={
              isActive("/services")
                ? "active"
                : ""
            }
            onClick={closeMenu}
          >

            <span>
              Services
            </span>

            {isActive("/services") && (
              <i></i>
            )}

          </Link>


          {/* =====================================
              COUNTRIES
          ====================================== */}

          <Link
            to="/countries"
            className={
              isActive("/countries")
                ? "active"
                : ""
            }
            onClick={closeMenu}
          >

            <span>
              Countries
            </span>

            {isActive("/countries") && (
              <i></i>
            )}

          </Link>


          {/* =====================================
              ADMISSION
          ====================================== */}

          <Link
            to="/admission"
            className={
              isActive("/admission")
                ? "active"
                : ""
            }
            onClick={closeMenu}
          >

            <span>
              Admission
            </span>

            {isActive("/admission") && (
              <i></i>
            )}

          </Link>


          {/* =====================================
              CONTACT
          ====================================== */}

          <Link
            to="/contact"
            className={
              isActive("/contact")
                ? "active"
                : ""
            }
            onClick={closeMenu}
          >

            <span>
              Contact
            </span>

            {isActive("/contact") && (
              <i></i>
            )}

          </Link>


          {/* =====================================
              CTA
          ====================================== */}

          <Link
            to="/contact"
            className="nav-cta"
            onClick={closeMenu}
          >

            <Sparkles size={14} />

            <span>
              Get Free Guidance
            </span>

            <ArrowUpRight size={15} />

          </Link>

        </div>


        {/* =====================================
            MOBILE MENU BUTTON
        ====================================== */}

        <button
          className={`menu-btn ${
            open ? "menu-open" : ""
          }`}
          onClick={() => setOpen(!open)}
          aria-label={
            open
              ? "Close navigation"
              : "Open navigation"
          }
          aria-expanded={open}
        >

          <span className="menu-icon">

            {open ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}

          </span>

        </button>

      </nav>


      {/* =====================================
          MOBILE BACKDROP
      ====================================== */}

      {open && (
        <div
          className="nav-backdrop"
          onClick={closeMenu}
        ></div>
      )}

    </header>
  );
}
import { Link } from "react-router-dom";

import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  GraduationCap,
  MessageCircle
} from "lucide-react";

import eduguideLogo from "../../assets/eduguide-logo.png";

import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  /* =========================================
     CONTACT DETAILS
  ========================================= */

  const phoneNumber = "9600784851";

  const whatsappLink =
    "https://wa.me/919600784851";

  const emailAddress =
    "eduguideeducationservices@gmail.com";

  const locationLink =
    "https://www.google.com/maps/search/?api=1&query=First+Floor+GKMR+Nagar%2C+60+Feet+Road+Opposite+Dharapuram+to+Tiruppur+Road%2C+Tiruppur+-+641608";

  return (
    <footer className="footer">

      {/* =========================================
          DECORATIVE BACKGROUND
      ========================================= */}

      <div className="footer-glow footer-glow-one"></div>
      <div className="footer-glow footer-glow-two"></div>

      {/* GOLD TOP LINE */}
      <div className="footer-top-line"></div>


      {/* =========================================
          MAIN FOOTER
      ========================================= */}

      <div className="container footer-main">


        {/* =========================================
            BRAND / ABOUT
        ========================================= */}

        <div className="footer-brand-column">

          <Link
            to="/"
            className="footer-brand"
            aria-label="EduGuide Educational Services Home"
          >

            {/* ACTUAL EDUGUIDE LOGO */}

            <div className="footer-logo-wrap">

              <img
                src={eduguideLogo}
                alt="EduGuide Educational Services"
                className="footer-logo-image"
              />

              <div className="footer-logo-shine"></div>

            </div>


            {/* BRAND TEXT */}

            <div className="brand-text">

              <b>EDUGUIDE</b>

              <small>
                EDUCATIONAL SERVICES
              </small>

            </div>

          </Link>


          {/* =====================================
              DESCRIPTION
          ====================================== */}

          <p className="footer-description">

            Your trusted partner for MBBS Abroad
            guidance, university selection and
            complete admission support.

          </p>


          {/* =====================================
              TRUST BADGE
          ====================================== */}

          <div className="footer-trust-badge">

            <span className="footer-trust-icon">

              <GraduationCap size={17} />

            </span>

            <div>

              <strong>
                Build Your Medical Future
              </strong>

              <small>
                With the right guidance
              </small>

            </div>

          </div>


          {/* =====================================
              SOCIAL LINKS
          ====================================== */}

          <div className="footer-social">

            {/* Facebook */}

            <a
              href="https://www.facebook.com/share/1DbiAov7D8/"
              aria-label="Facebook"
              className="footer-social-link footer-social-disabled"
              title="Facebook"
            >

              <Facebook size={17} />

            </a>


            {/* Instagram */}

            <a
              href="https://www.instagram.com/eduguide_official1?igsi=dWcyb214bWxxeTY4"
              aria-label="Instagram"
              className="footer-social-link"
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >

              <Instagram size={17} />

            </a>


            {/* LinkedIn */}

            <a
              href="https://www.linkedin.com/in/eduguide-educational-services-860454432?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              aria-label="LinkedIn"
              className="footer-social-link"
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >

              <Linkedin size={17} />

            </a>

          </div>

        </div>



        {/* =========================================
            QUICK LINKS
        ========================================= */}

        <div className="footer-column">

          <span className="footer-heading-line"></span>

          <h4>
            Quick Links
          </h4>


          <div className="footer-links">

            {/* HOME */}

            <Link to="/">

              <span>
                Home
              </span>

              <ArrowUpRight size={14} />

            </Link>


            {/* ABOUT */}

            <Link to="/about">

              <span>
                About Us
              </span>

              <ArrowUpRight size={14} />

            </Link>


            {/* SERVICES */}

            <Link to="/services">

              <span>
                Services
              </span>

              <ArrowUpRight size={14} />

            </Link>


            {/* COUNTRIES */}

            <Link to="/countries">

              <span>
                Countries
              </span>

              <ArrowUpRight size={14} />

            </Link>


            {/* ADMISSION */}

            <Link to="/admission">

              <span>
                Admission
              </span>

              <ArrowUpRight size={14} />

            </Link>


            {/* CONTACT */}

            <Link to="/contact">

              <span>
                Contact
              </span>

              <ArrowUpRight size={14} />

            </Link>

          </div>

        </div>



        {/* =========================================
            GET IN TOUCH
        ========================================= */}

        <div className="footer-column">

          <span className="footer-heading-line"></span>

          <h4>
            Get In Touch
          </h4>


          <div className="footer-contact">


            {/* PHONE */}

            <a
              href={`tel:+91${phoneNumber}`}
              className="footer-contact-item"
            >

              <span className="footer-contact-icon">

                <Phone size={14} />

              </span>


              <span className="footer-contact-text">

                <small>
                  Call Us
                </small>

                <strong>
                  +91 96007 84851
                </strong>

              </span>

            </a>



            {/* WHATSAPP */}

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-item"
            >

              <span className="footer-contact-icon whatsapp-icon">

                <MessageCircle size={14} />

              </span>


              <span className="footer-contact-text">

                <small>
                  WhatsApp
                </small>

                <strong>
                  +91 96007 84851
                </strong>

              </span>

            </a>



            {/* EMAIL */}

            <a
              href={`mailto:${emailAddress}`}
              className="footer-contact-item"
            >

              <span className="footer-contact-icon">

                <Mail size={14} />

              </span>


              <span className="footer-contact-text">

                <small>
                  Email Us
                </small>

                <strong>
                  eduguideeducationservices@gmail.com
                </strong>

              </span>

            </a>



            {/* LOCATION */}

            <a
              href={locationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-item footer-location-item"
            >

              <span className="footer-contact-icon">

                <MapPin size={14} />

              </span>


              <span className="footer-contact-text">

                <small>
                  Our Location
                </small>

                <strong>
                  First Floor, GKMR Nagar,
                  60 Feet Road,
                  Tiruppur - 641608
                </strong>

              </span>

            </a>

          </div>

        </div>

      </div>



      {/* =========================================
          BOTTOM BAR
      ========================================= */}

      <div className="footer-bottom">

        <div className="container footer-bottom-inner">


          {/* COPYRIGHT */}

          <p>

            © {currentYear} EduGuide Educational Services.
            All Rights Reserved.

          </p>


          {/* BOTTOM TAGS */}

          <div className="footer-bottom-links">

            <span>
              MBBS Abroad
            </span>

            <span className="footer-bottom-dot"></span>

            <span>
              Medical Education
            </span>

            <span className="footer-bottom-dot"></span>

            <span>
              Student Guidance
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
}
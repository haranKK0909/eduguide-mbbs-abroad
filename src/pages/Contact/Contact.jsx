import { useState } from "react";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  ExternalLink,
  CheckCircle2
} from "lucide-react";

import "./Contact.css";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSubmitted(false);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const enquiry = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      country: formData.get("country"),
      academicStatus: formData.get("academicStatus"),
      message: formData.get("message")
    };

    try {
      const response = await fetch(
  "https://eduguide-backend-wtny.onrender.com/api/enquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(enquiry)
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to submit enquiry."
        );
      }

      console.log("EduGuide Enquiry Submitted:", enquiry);

      setSubmitted(true);

      form.reset();

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error(
        "Enquiry submission error:",
        error
      );

      setError(
        "Unable to submit your enquiry right now. Please try again or contact us on WhatsApp."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* =========================================
          PAGE HERO
      ========================================== */}

      <section className="page-hero">

        <div className="page-hero-glow"></div>

        <div className="container page-hero-inner">

          <span className="eyebrow">
            CONTACT US
          </span>

          <h1>
            Let's Plan Your
            <br />
            <span>Medical Journey</span>
          </h1>

          <p>
            Have questions about MBBS abroad?
            Talk to our counsellors and get personalised
            guidance for your next step.
          </p>

        </div>

      </section>


      {/* =========================================
          CONTACT SECTION
      ========================================== */}

      <section className="section contact-section">

        <div className="container contact-grid">


          {/* =====================================
              CONTACT INFORMATION PANEL
          ====================================== */}

          <div className="contact-panel">

            <span className="eyebrow">
              GET IN TOUCH
            </span>

            <h2>
              We're Here to
              <br />
              <span>Help You</span>
            </h2>

            <p>
              Whether you are just exploring your options
              or ready to start your application, our team
              is ready to guide you through the next step.
            </p>


            {/* =================================
                CONTACT POINTS
            ================================== */}

            <div className="contact-points">


              {/* PHONE / WHATSAPP */}

              <a
                href="tel:+919600784851"
                className="contact-point"
              >

                <span className="tiny-icon">
                  <Phone size={18} />
                </span>

                <span>
                  <strong>Phone / WhatsApp</strong>
                  <br />
                  +91 96007 84851
                </span>

              </a>


              {/* EMAIL */}

              <a
                href="mailto:eduguideeducationservices@gmail.com"
                className="contact-point"
              >

                <span className="tiny-icon">
                  <Mail size={18} />
                </span>

                <span>
                  <strong>Email</strong>
                  <br />
                  eduguideeducationservices@gmail.com
                </span>

              </a>


              {/* GOOGLE MAPS */}

              <a
                href="https://www.google.com/maps/search/?api=1&query=First+Floor+GKMR+Nagar%2C+60+Feet+Road+Opposite+Dharapuram+to+Tiruppur+Road%2C+Tiruppur+-+641608"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-point"
              >

                <span className="tiny-icon">
                  <MapPin size={18} />
                </span>

                <span>
                  <strong>Office Location</strong>
                  <br />
                  First Floor GKMR Nagar,
                  <br />
                  60 Feet Road, Opposite Dharapuram
                  <br />
                  to Tiruppur Road,
                  <br />
                  Tiruppur - 641608
                </span>

                <ExternalLink
                  size={14}
                  className="contact-external"
                />

              </a>


              {/* WORKING HOURS */}

              <div className="contact-point">

                <span className="tiny-icon">
                  <Clock size={18} />
                </span>

                <span>
                  <strong>Working Hours</strong>
                  <br />
                  Mon – Sat, 9:00 AM – 6:00 PM
                </span>

              </div>

            </div>


            {/* =================================
                WHATSAPP QUICK BUTTON
            ================================== */}

            <a
              href="https://wa.me/919600784851"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >

              <MessageCircle size={18} />

              <span>
                Chat with us on WhatsApp
              </span>

              <ExternalLink size={15} />

            </a>

          </div>


          {/* =====================================
              ENQUIRY FORM
          ====================================== */}

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >


            {/* =================================
                FORM HEADING
            ================================== */}

            <div className="form-heading">

              <h3>
                Request a Free Consultation
              </h3>

              <p>
                Fill in your details and our counsellor
                will get in touch with you.
              </p>

            </div>


            {/* =================================
                SUCCESS MESSAGE
            ================================== */}

            {submitted && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "13px 15px",
                  borderRadius: "12px",
                  background: "rgba(34, 197, 94, 0.08)",
                  border: "1px solid rgba(34, 197, 94, 0.25)",
                  color: "#15803d",
                  fontSize: "13px",
                  fontWeight: "700"
                }}
              >

                <CheckCircle2 size={17} />

                <span>
                  Thank you! Your enquiry has been submitted.
                  Our counsellor will contact you soon.
                </span>

              </div>
            )}


            {/* =================================
                ERROR MESSAGE
            ================================== */}

            {error && (
              <div
                style={{
                  padding: "13px 15px",
                  borderRadius: "12px",
                  background: "rgba(239, 68, 68, 0.08)",
                  border: "1px solid rgba(239, 68, 68, 0.22)",
                  color: "#b91c1c",
                  fontSize: "13px",
                  fontWeight: "600",
                  lineHeight: "1.5"
                }}
              >
                {error}
              </div>
            )}


            {/* =================================
                NAME + PHONE
            ================================== */}

            <div className="form-row">

              <label>
                Full Name *

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />

              </label>


              <label>
                Phone Number *

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  inputMode="tel"
                  autoComplete="tel"
                  pattern="[0-9+\-\s()]{10,15}"
                  required
                />

              </label>

            </div>


            {/* =================================
                EMAIL + COUNTRY
            ================================== */}

            <div className="form-row">

              <label>
                Email Address *

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  autoComplete="email"
                  required
                />

              </label>


              <label>
                Preferred Country *

                <select
                  name="country"
                  defaultValue=""
                  required
                >

                  <option value="" disabled>
                    Select country
                  </option>

                  <option value="Russia">
                    Russia
                  </option>

                  <option value="Georgia">
                    Georgia
                  </option>

                  <option value="Kazakhstan">
                    Kazakhstan
                  </option>

                  <option value="Uzbekistan">
                    Uzbekistan
                  </option>

                  <option value="Philippines">
                    Philippines
                  </option>

                  <option value="Kyrgyzstan">
                    Kyrgyzstan
                  </option>

                </select>

              </label>

            </div>


            {/* =================================
                ACADEMIC STATUS
            ================================== */}

            <label>
              Current Academic Status *

              <select
                name="academicStatus"
                defaultValue=""
                required
              >

                <option value="" disabled>
                  Select your current status
                </option>

                <option value="Class 12 / Higher Secondary">
                  Class 12 / Higher Secondary
                </option>

                <option value="Completed Class 12">
                  Completed Class 12
                </option>

                <option value="NEET Qualified">
                  NEET Qualified
                </option>

                <option value="NEET Appearing">
                  NEET Appearing
                </option>

                <option value="Already Studying Medicine">
                  Already Studying Medicine
                </option>

                <option value="Parent / Guardian">
                  Parent / Guardian
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </label>


            {/* =================================
                MESSAGE
            ================================== */}

            <label>
              Message

              <textarea
                name="message"
                rows="6"
                placeholder="Tell us about your requirements or ask your questions..."
              ></textarea>

            </label>


            {/* =================================
                PRIVACY NOTE
            ================================== */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#718096",
                fontSize: "11px",
                marginTop: "2px"
              }}
            >

              <CheckCircle2
                size={15}
                style={{
                  color: "#4caf70"
                }}
              />

              <span>
                Your information is kept confidential.
              </span>

            </div>


            {/* =================================
                SUBMIT BUTTON
            ================================== */}

            <button
              type="submit"
              className="btn primary"
              disabled={loading}
              style={{
                opacity: loading ? 0.7 : 1,
                cursor: loading
                  ? "not-allowed"
                  : "pointer"
              }}
            >

              <span>
                {loading
                  ? "Submitting..."
                  : "Send Enquiry"
                }
              </span>

              {!loading && (
                <Send size={16} />
              )}

            </button>

          </form>

        </div>

      </section>
    </>
  );
}
import {
  HeartHandshake,
  Building2,
  FileCheck2,
  Plane,
  GraduationCap,
  WalletCards,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Compass,
  ClipboardCheck,
  Send,
} from "lucide-react";

import SectionHeading from "../../components/SectionHeading/SectionHeading";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import CTA from "../../components/CTA/CTA";

import "./Services.css";

const services = [
  {
    number: "01",
    icon: <HeartHandshake size={23} />,
    title: "Career Counselling",
    description:
      "Understand medical education opportunities and choose a path aligned with your goals."
  },
  {
    number: "02",
    icon: <Building2 size={23} />,
    title: "University Selection",
    description:
      "Get help comparing universities based on recognition, fees, location and academic preferences."
  },
  {
    number: "03",
    icon: <FileCheck2 size={23} />,
    title: "Admission Assistance",
    description:
      "Complete guidance for applications, documentation and admission formalities."
  },
  {
    number: "04",
    icon: <Plane size={23} />,
    title: "Visa Assistance",
    description:
      "Support for preparing documents and understanding the student visa process."
  },
  {
    number: "05",
    icon: <GraduationCap size={23} />,
    title: "Pre-Departure Guidance",
    description:
      "Prepare for your new academic environment with practical pre-departure guidance."
  },
  {
    number: "06",
    icon: <WalletCards size={23} />,
    title: "Fee Guidance",
    description:
      "Understand tuition fees and other expected education-related expenses."
  },
  {
    number: "07",
    icon: <Users size={23} />,
    title: "Parent Counselling",
    description:
      "Clear guidance for parents about universities, safety and the overall journey."
  },
  {
    number: "08",
    icon: <ShieldCheck size={23} />,
    title: "End-to-End Support",
    description:
      "A dedicated support journey from initial counselling to your university admission."
  }
];

const processSteps = [
  {
    number: "01",
    icon: <Compass size={21} />,
    title: "Consult",
    description:
      "Discuss your academic profile, preferences and medical career goals."
  },
  {
    number: "02",
    icon: <ClipboardCheck size={21} />,
    title: "Shortlist",
    description:
      "Compare suitable countries and universities based on your requirements."
  },
  {
    number: "03",
    icon: <Send size={21} />,
    title: "Apply",
    description:
      "Complete applications, documentation and important admission formalities."
  },
  {
    number: "04",
    icon: <GraduationCap size={21} />,
    title: "Begin",
    description:
      "Prepare for your journey and confidently begin your medical education."
  }
];

const serviceBenefits = [
  "Personalised guidance",
  "University comparison support",
  "Application assistance",
  "Documentation guidance",
  "Visa preparation support",
  "Pre-departure assistance"
];

export default function Services() {
  return (
    <main className="services-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="services-hero">

        <div className="services-grid-background"></div>

        <div className="services-hero-glow services-glow-one"></div>
        <div className="services-hero-glow services-glow-two"></div>

        <div className="services-orbit services-orbit-one"></div>
        <div className="services-orbit services-orbit-two"></div>

        <div className="services-particle services-particle-one"></div>
        <div className="services-particle services-particle-two"></div>
        <div className="services-particle services-particle-three"></div>
        <div className="services-particle services-particle-four"></div>
        <div className="services-particle services-particle-five"></div>

        <div className="container services-hero-inner">

          {/* LEFT */}

          <div className="services-hero-content">

            <span className="services-eyebrow">
              <Sparkles size={14} />
              OUR SERVICES
            </span>

            <h1>
              Complete Support
              <br />
              for Your
              <span> MBBS Abroad Journey</span>
            </h1>

            <p className="services-hero-description">
              From your first counselling session to university selection,
              admission, visa assistance and pre-departure preparation,
              EduGuide helps you navigate every important stage.
            </p>

            <div className="services-hero-actions">

              <a
                href="#services"
                className="services-primary-btn"
              >
                Explore Our Services
                <ArrowRight size={18} />
              </a>

              <a
                href="#service-process"
                className="services-secondary-btn"
              >
                How We Help
              </a>

            </div>

            {/* TRUST POINTS */}

            <div className="services-trust-row">

              <div>
                <CheckCircle2 size={17} />
                <span>Student Focused</span>
              </div>

              <div>
                <CheckCircle2 size={17} />
                <span>Complete Guidance</span>
              </div>

              <div>
                <CheckCircle2 size={17} />
                <span>Parent Support</span>
              </div>

            </div>

          </div>


          {/* RIGHT VISUAL */}

          <div className="services-hero-visual">

            <div className="services-visual-glow"></div>

            <div className="services-visual-circle circle-one"></div>
            <div className="services-visual-circle circle-two"></div>
            <div className="services-visual-circle circle-three"></div>

            <div className="services-center-card">

              <div className="services-center-icon">
                <HeartHandshake size={34} />
              </div>

              <span>EDUGUIDE</span>

              <strong>
                Your Journey.
                <br />
                Our Guidance.
              </strong>

              <small>
                Complete MBBS Abroad Support
              </small>

            </div>


            <div className="services-floating-card floating-card-one">

              <div className="floating-service-icon">
                <Building2 size={18} />
              </div>

              <div>
                <strong>University</strong>
                <span>Selection</span>
              </div>

            </div>


            <div className="services-floating-card floating-card-two">

              <div className="floating-service-icon">
                <FileCheck2 size={18} />
              </div>

              <div>
                <strong>Admission</strong>
                <span>Assistance</span>
              </div>

            </div>


            <div className="services-floating-card floating-card-three">

              <div className="floating-service-icon">
                <Plane size={18} />
              </div>

              <div>
                <strong>Visa</strong>
                <span>Support</span>
              </div>

            </div>


            <div className="services-floating-card floating-card-four">

              <div className="floating-service-icon">
                <GraduationCap size={18} />
              </div>

              <div>
                <strong>Pre-Departure</strong>
                <span>Guidance</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        className="section service-page-section"
        id="services"
      >

        <div className="container">

          <SectionHeading
            eyebrow="WHAT WE OFFER"
            title="Services Designed Around"
            highlight="Your Success"
            center
            description="Our services cover the important stages involved in planning and starting your international medical education."
          />


          <div className="service-intro-strip">

            <div className="service-intro-main">

              <div className="service-intro-icon">
                <ShieldCheck size={22} />
              </div>

              <div>
                <strong>
                  One Journey. Complete Support.
                </strong>

                <p>
                  We stay with you through every important stage
                  of your MBBS abroad journey.
                </p>
              </div>

            </div>


            <div className="service-intro-badge">
              <span>08</span>
              <small>CORE SERVICES</small>
            </div>

          </div>


          <div className="service-grid service-page-grid">

            {services.map((service) => (
              <ServiceCard
                key={service.number}
                {...service}
              />
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section className="services-benefits-section">

        <div className="services-benefits-glow"></div>

        <div className="container services-benefits-grid">

          <div className="services-benefits-content">

            <span className="services-section-label">
              WHY OUR SUPPORT MATTERS
            </span>

            <h2>
              More clarity.
              <br />
              <span>Less confusion.</span>
            </h2>

            <p>
              Studying medicine abroad involves many decisions.
              Our goal is to simplify the process and help students
              and parents understand every important step.
            </p>

            <div className="services-benefit-list">

              {serviceBenefits.map((benefit, index) => (
                <div key={benefit}>

                  <CheckCircle2 size={17} />

                  <span>{benefit}</span>

                  <small>
                    {String(index + 1).padStart(2, "0")}
                  </small>

                </div>
              ))}

            </div>

          </div>


          <div className="services-benefit-visual">

            <div className="benefit-card-main">

              <div className="benefit-card-top">

                <span>EDUGUIDE</span>

                <ShieldCheck size={21} />

              </div>

              <div className="benefit-progress">

                <div className="benefit-progress-label">
                  <span>Your Journey</span>
                  <strong>Complete Support</strong>
                </div>

                <div className="progress-line">
                  <span></span>
                </div>

              </div>


              <div className="benefit-mini-grid">

                <div>
                  <Building2 size={18} />
                  <span>University</span>
                </div>

                <div>
                  <FileCheck2 size={18} />
                  <span>Admission</span>
                </div>

                <div>
                  <Plane size={18} />
                  <span>Visa</span>
                </div>

                <div>
                  <GraduationCap size={18} />
                  <span>Journey</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PROCESS
      ===================================================== */}

      <section
        className="section soft services-process-section"
        id="service-process"
      >

        <div className="container service-process">

          <SectionHeading
            eyebrow="OUR APPROACH"
            title="Simple. Clear."
            highlight="Personalised."
            center
            description="A structured process designed to make your MBBS abroad journey easier to understand."
          />


          <div className="service-steps">

            {processSteps.map((step, index) => (

              <div
                className="service-step"
                key={step.number}
              >

                <div className="service-step-number">
                  {step.number}
                </div>

                <div className="service-step-icon">
                  {step.icon}
                </div>

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.description}
                </p>

                {index !== processSteps.length - 1 && (
                  <div className="service-step-line"></div>
                )}

              </div>

            ))}

          </div>


          <div className="process-bottom-note">

            <ShieldCheck size={19} />

            <span>
              From your first consultation to the beginning
              of your medical education journey — we're here to guide you.
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <CTA />

    </main>
  );
}
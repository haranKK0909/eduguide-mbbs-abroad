import {
  HeartHandshake,
  MessageCircle,
  UserRoundSearch,
  Globe2,
  FileCheck2,
  BadgeCheck,
  Plane,
  Luggage,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  UsersRound,
  Sparkles
} from "lucide-react";

import { Link } from "react-router-dom";

import SectionHeading from "../../components/SectionHeading/SectionHeading";
import CTA from "../../components/CTA/CTA";

import "./Admission.css";


/* =========================================================
   ADMISSION PROCESS DATA
========================================================= */

const processSteps = [
  {
    number: "01",
    icon: <MessageCircle size={23} />,
    title: "Initial Counselling",
    description:
      "Discuss your medical education goals, academic background, preferred destinations and expectations with our counsellors."
  },
  {
    number: "02",
    icon: <UserRoundSearch size={23} />,
    title: "Profile Evaluation",
    description:
      "We understand your academic profile, preferences and requirements to identify suitable study options."
  },
  {
    number: "03",
    icon: <Globe2 size={23} />,
    title: "Country & University Selection",
    description:
      "Explore suitable countries and universities by comparing important factors such as recognition, fees and academic environment."
  },
  {
    number: "04",
    icon: <FileCheck2 size={23} />,
    title: "Application & Documentation",
    description:
      "Get guidance with application forms, document preparation and other admission requirements."
  },
  {
    number: "05",
    icon: <BadgeCheck size={23} />,
    title: "Admission Confirmation",
    description:
      "Once your application progresses, we help you understand the admission confirmation and next steps."
  },
  {
    number: "06",
    icon: <Plane size={23} />,
    title: "Visa Assistance",
    description:
      "Receive support in preparing the required documents and understanding the student visa process."
  },
  {
    number: "07",
    icon: <Luggage size={23} />,
    title: "Pre-Departure Preparation",
    description:
      "Prepare for your journey with practical guidance about travel, accommodation and settling into your new environment."
  },
  {
    number: "08",
    icon: <GraduationCap size={23} />,
    title: "Begin Your Journey",
    description:
      "Start your international medical education journey with the confidence of having support throughout the important stages."
  }
];


/* =========================================================
   DOCUMENTS
========================================================= */

const documents = [
  "NEET Qualification Details",
  "Academic Certificates",
  "Valid Passport",
  "Passport-size Photographs",
  "Medical Documents",
  "Other Admission & Visa Documents"
];


/* =========================================================
   SUPPORT FEATURES
========================================================= */

const supportFeatures = [
  {
    number: "01",
    icon: <UsersRound size={22} />,
    title: "Student First",
    description:
      "Your academic goals, preferences and future plans remain at the centre of the guidance process."
  },
  {
    number: "02",
    icon: <ShieldCheck size={22} />,
    title: "Clear Guidance",
    description:
      "We help you understand the important stages, requirements and decisions involved in your journey."
  },
  {
    number: "03",
    icon: <HeartHandshake size={22} />,
    title: "Parent Support",
    description:
      "Parents can receive guidance about universities, documentation, safety and the overall process."
  }
];


/* =========================================================
   ADMISSION PROCESS PAGE
========================================================= */

export default function AdmissionProcess() {
  return (
    <main className="admission-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="admission-hero">

        <div className="admission-hero-grid"></div>

        <div className="admission-hero-glow admission-glow-one"></div>
        <div className="admission-hero-glow admission-glow-two"></div>

        <div className="admission-particle admission-particle-one"></div>
        <div className="admission-particle admission-particle-two"></div>
        <div className="admission-particle admission-particle-three"></div>


        <div className="container admission-hero-inner">

          {/* HERO CONTENT */}

          <div className="admission-hero-content">

            <span className="admission-eyebrow">
              <Sparkles size={14} />
              ADMISSION PROCESS
            </span>


            <h1>
              Your Journey to
              <br />
              <span>MBBS Abroad</span>
            </h1>


            <div className="admission-tagline">
              From Dream to Medical College.
            </div>


            <p>
              From your first counselling session to admission,
              visa assistance and pre-departure preparation,
              EduGuide helps you navigate every important stage
              with clarity and confidence.
            </p>


            <div className="admission-hero-actions">

              <Link
                to="/contact"
                className="admission-primary-btn"
              >
                Start Your Journey
                <ArrowRight size={18} />
              </Link>


              <a
                href="#process"
                className="admission-secondary-btn"
              >
                View Process
              </a>

            </div>


            {/* TRUST POINTS */}

            <div className="admission-hero-trust">

              <div>
                <CheckCircle2 size={17} />
                <span>Personalised Guidance</span>
              </div>

              <div>
                <CheckCircle2 size={17} />
                <span>Complete Support</span>
              </div>

              <div>
                <CheckCircle2 size={17} />
                <span>Student & Parent Support</span>
              </div>

            </div>

          </div>


          {/* =================================================
              HERO VISUAL
          ================================================= */}

          <div className="admission-hero-visual">

            <div className="journey-orbit orbit-one"></div>
            <div className="journey-orbit orbit-two"></div>
            <div className="journey-orbit orbit-three"></div>


            {/* CENTER */}

            <div className="journey-center">

              <div className="journey-center-inner">

                <GraduationCap size={42} />

                <strong>
                  MBBS
                </strong>

                <span>
                  ABROAD
                </span>

              </div>

            </div>


            {/* JOURNEY NODES */}

            <div className="journey-node node-one">
              <MessageCircle size={17} />
              <span>Consult</span>
            </div>

            <div className="journey-node node-two">
              <Globe2 size={17} />
              <span>Choose</span>
            </div>

            <div className="journey-node node-three">
              <FileCheck2 size={17} />
              <span>Apply</span>
            </div>

            <div className="journey-node node-four">
              <Plane size={17} />
              <span>Travel</span>
            </div>

            <div className="journey-node node-five">
              <GraduationCap size={17} />
              <span>Begin</span>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PROCESS SECTION
      ===================================================== */}

      <section
        className="section admission-process-section"
        id="process"
      >

        <div className="container">

          <SectionHeading
            eyebrow="HOW IT WORKS"
            title="A Simple Process."
            highlight="A Clear Journey."
            center
            description="Our structured admission process helps students and parents understand what comes next at every stage."
          />


          {/* TIMELINE */}

          <div className="admission-timeline">

            <div className="timeline-line"></div>


            {processSteps.map((step, index) => (

              <article
                className={`admission-step ${
                  index % 2 === 0
                    ? "step-left"
                    : "step-right"
                }`}
                key={step.number}
              >

                {/* STEP NUMBER */}

                <div className="step-number">
                  {step.number}
                </div>


                <div className="step-dot"></div>


                {/* STEP CARD */}

                <div className="step-card">

                  <div className="step-icon">
                    {step.icon}
                  </div>


                  <div className="step-card-content">

                    <span className="step-small">
                      STEP {step.number}
                    </span>

                    <h3>
                      {step.title}
                    </h3>

                    <p>
                      {step.description}
                    </p>

                  </div>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          DOCUMENTS SECTION
      ===================================================== */}

      <section className="section admission-documents-section">

        <div className="container admission-documents-grid">


          {/* DOCUMENT INTRO */}

          <div className="documents-content">

            <span className="section-label">
              DOCUMENT PREPARATION
            </span>


            <h2>
              Get Your Documents
              <span> Ready.</span>
            </h2>


            <p>
              Proper documentation is an important part of the
              admission journey. We help you understand the documents
              required for your application and visa preparation.
            </p>


            <div className="documents-note">

              <ShieldCheck size={20} />

              <div>

                <strong>
                  Guidance at Every Step
                </strong>

                <span>
                  Requirements can vary depending on the
                  university and destination.
                </span>

              </div>

            </div>

          </div>


          {/* DOCUMENT CARD */}

          <div className="documents-card">

            <div className="documents-card-header">

              <div className="documents-card-icon">
                <FileCheck2 size={21} />
              </div>


              <div>

                <strong>
                  Important Documents
                </strong>

                <span>
                  Commonly required documents
                </span>

              </div>

            </div>


            <div className="documents-list">

              {documents.map((document, index) => (

                <div
                  className="document-item"
                  key={document}
                >

                  <span className="document-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <CheckCircle2 size={17} />

                  <span>
                    {document}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY EDUGUIDE
      ===================================================== */}

      <section className="section admission-support-section">

        <div className="container">

          <SectionHeading
            eyebrow="WHY EDUGUIDE"
            title="Support That Stays"
            highlight="With You."
            center
            description="We aim to make the admission journey easier to understand for both students and parents."
          />


          <div className="support-grid">

            {supportFeatures.map((feature) => (

              <article
                className="support-card"
                key={feature.number}
              >

                <div className="support-number">
                  {feature.number}
                </div>


                <div className="support-icon">
                  {feature.icon}
                </div>


                <h3>
                  {feature.title}
                </h3>


                <p>
                  {feature.description}
                </p>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL JOURNEY BANNER
      ===================================================== */}

      <section className="admission-final-section">

        <div className="admission-final-glow"></div>


        <div className="container admission-final-content">

          <span className="section-label">
            YOUR NEXT STEP
          </span>


          <h2>
            Ready to begin your
            <span> MBBS journey?</span>
          </h2>


          <p>
            Take the first step towards exploring your medical
            education opportunities abroad.
          </p>


          <Link
            to="/contact"
            className="admission-final-btn"
          >
            Get Free Guidance
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>


      {/* =====================================================
          GLOBAL CTA
      ===================================================== */}

      {/* <CTA /> */}

    </main>
  );
}
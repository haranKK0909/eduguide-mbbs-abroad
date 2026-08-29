import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Globe2,
  HeartHandshake,
  ShieldCheck,
  Stethoscope,
  UsersRound,
  Sparkles,
} from "lucide-react";

import {
  Canvas,
} from "@react-three/fiber";

import {
  Float,
  OrbitControls,
  Sphere,
  Stars,
  MeshDistortMaterial,
} from "@react-three/drei";

import "./About.css";

/* =========================================================
   3D GLOBE
========================================================= */

function Globe3D() {
  return (
    <div className="about-globe-wrapper">

      {/* Background glow */}
      <div className="about-globe-glow"></div>

      {/* Orbital rings */}
      <div className="globe-orbit orbit-horizontal"></div>
      <div className="globe-orbit orbit-diagonal-one"></div>
      <div className="globe-orbit orbit-diagonal-two"></div>

      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 42,
        }}
        dpr={[1, 2]}
      >

        {/* Lighting */}
        <ambientLight intensity={0.45} />

        <directionalLight
          position={[4, 4, 5]}
          intensity={2.2}
        />

        <pointLight
          position={[-4, -2, 3]}
          intensity={1.8}
        />

        {/* Stars */}
        <Stars
          radius={8}
          depth={5}
          count={900}
          factor={2}
          saturation={0}
          fade
          speed={0.4}
        />

        {/* Globe */}
        <Float
          speed={1.2}
          rotationIntensity={0.18}
          floatIntensity={0.35}
        >

          <group rotation={[0.15, -0.45, 0]}>

            {/* Main Earth */}
            <Sphere args={[1.55, 96, 96]}>

              <MeshDistortMaterial
                color="#0b3b72"
                roughness={0.48}
                metalness={0.42}
                distort={0.025}
                speed={1}
              />

            </Sphere>

            {/* Golden inner globe */}
            <Sphere args={[1.57, 64, 64]}>

              <meshBasicMaterial
                color="#d9a83f"
                wireframe
                transparent
                opacity={0.18}
              />

            </Sphere>

            {/* Outer wireframe */}
            <Sphere args={[1.64, 48, 48]}>

              <meshBasicMaterial
                color="#f2c85b"
                wireframe
                transparent
                opacity={0.14}
              />

            </Sphere>

          </group>

        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.65}
          minPolarAngle={Math.PI / 2.4}
          maxPolarAngle={Math.PI / 1.7}
        />

      </Canvas>

      {/* Globe light core */}
      <div className="globe-core-light"></div>

      {/* Bottom platform */}
      <div className="globe-platform">
        <div className="platform-ring platform-ring-one"></div>
        <div className="platform-ring platform-ring-two"></div>
        <div className="platform-center"></div>
      </div>

      {/* Floating cards */}

      <div className="globe-card globe-card-top">
        <div className="globe-card-icon">
          <ShieldCheck size={20} />
        </div>

        <div>
          <strong>Verified</strong>
          <span>University Options</span>
        </div>
      </div>

      <div className="globe-card globe-card-left">
        <div className="globe-card-icon">
          <Globe2 size={20} />
        </div>

        <div>
          <strong>Global</strong>
          <span>Medical Education</span>
        </div>
      </div>

      <div className="globe-card globe-card-right">
        <div className="globe-card-icon">
          <Stethoscope size={20} />
        </div>

        <div>
          <strong>MBBS</strong>
          <span>Abroad Guidance</span>
        </div>
      </div>

    </div>
  );
}


/* =========================================================
   ABOUT PAGE
========================================================= */

export default function About() {

  return (
    <main className="about-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="about-hero">

        <div className="about-grid-background"></div>

        <div className="about-hero-glow about-glow-one"></div>
        <div className="about-hero-glow about-glow-two"></div>

        <div className="about-particle particle-one"></div>
        <div className="about-particle particle-two"></div>
        <div className="about-particle particle-three"></div>
        <div className="about-particle particle-four"></div>

        <div className="container about-hero-container">

          {/* LEFT CONTENT */}

          <div className="about-hero-content">

            <span className="about-eyebrow">
              <Sparkles size={14} />
              ABOUT EDUGUIDE
            </span>

            <h1>
              Your trusted
              <br />
              partner for
              <span> MBBS Abroad</span>
            </h1>

            <div className="about-tagline">
              Your Dream. Our Guidance. Your Future.
            </div>

            <p className="about-hero-description">
              EduGuide Educational Services helps aspiring medical students
              explore international medical education opportunities with
              personalised guidance, university selection and complete
              admission support.
            </p>

            <div className="about-hero-actions">

              <Link
                to="/contact"
                className="about-primary-btn"
              >
                Discover EduGuide
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/services"
                className="about-secondary-btn"
              >
                Explore Our Services
              </Link>

            </div>


            {/* MINI FEATURES */}

            <div className="about-mini-features">

              <div className="about-mini-feature">

                <div className="mini-icon">
                  <UsersRound size={18} />
                </div>

                <div>
                  <strong>01</strong>
                  <span>STUDENT FIRST</span>
                  <small>Your goals, our priority.</small>
                </div>

              </div>


              <div className="about-mini-feature">

                <div className="mini-icon">
                  <Globe2 size={18} />
                </div>

                <div>
                  <strong>02</strong>
                  <span>GLOBAL GUIDANCE</span>
                  <small>Explore global opportunities.</small>
                </div>

              </div>


              <div className="about-mini-feature">

                <div className="mini-icon">
                  <BadgeCheck size={18} />
                </div>

                <div>
                  <strong>03</strong>
                  <span>COMPLETE SUPPORT</span>
                  <small>We support you at every step.</small>
                </div>

              </div>

            </div>

          </div>


          {/* RIGHT 3D */}

          <div className="about-hero-visual">
            <Globe3D />
          </div>

        </div>

      </section>


      {/* =====================================================
          WHO WE ARE
      ===================================================== */}

      <section className="about-who-section">

        <div className="about-section-glow"></div>

        <div className="container about-who-grid">

          <div className="about-who-content">

            <span className="section-label">
              WHO WE ARE
            </span>

            <h2>
              Making your medical education journey
              <span> simpler.</span>
            </h2>

            <p>
              Choosing to study medicine abroad is a major decision.
              From selecting a university to completing documentation
              and visa formalities, every step requires careful planning.
            </p>

            <p>
              EduGuide provides personalised guidance throughout the
              admission journey so students and parents can make informed
              decisions with confidence.
            </p>

          </div>


          <div className="about-highlight-grid">

            <article className="about-highlight-card">

              <div className="highlight-number">
                01
              </div>

              <HeartHandshake size={25} />

              <h3>Student First</h3>

              <p>
                We focus on understanding every student's academic goals,
                preferences and future plans.
              </p>

            </article>


            <article className="about-highlight-card">

              <div className="highlight-number">
                02
              </div>

              <BadgeCheck size={25} />

              <h3>Complete Guidance</h3>

              <p>
                From university selection to admission and visa support,
                we guide students through every important stage.
              </p>

            </article>


            <article className="about-highlight-card">

              <div className="highlight-number">
                03
              </div>

              <ShieldCheck size={25} />

              <h3>Trusted Support</h3>

              <p>
                Our goal is to make the entire process transparent,
                comfortable and easy to understand.
              </p>

            </article>

          </div>

        </div>

      </section>

    
          {/* =====================================================
          WHY STUDY MBBS ABROAD
          ADDED CONTENT — EXISTING CODE UNCHANGED
      ===================================================== */}

      <section className="about-mbbs-section">

        <div className="about-mbbs-glow"></div>

        <div className="container">

          {/* SECTION HEADER */}

          <div className="about-mbbs-heading">

            <span className="section-label">
              WHY STUDY MBBS ABROAD
            </span>

            <h2>
              Explore Global Opportunities,
              <span> Build Your Medical Career.</span>
            </h2>

            <p>
              Discover the advantages of pursuing MBBS abroad with
              quality education, global exposure and better career
              opportunities.
            </p>

          </div>


          {/* MAIN CONTENT */}

          <div className="about-mbbs-content">

            {/* LEFT — BENEFITS */}

            <div className="about-mbbs-benefits">

              {/* 01 */}

              <div className="about-mbbs-benefit">

                <div className="mbbs-benefit-icon">
                  <UsersRound size={22} />
                </div>

                <div>
                  <h3>
                    NEET Qualified Students Eligible
                  </h3>

                  <p>
                    For Indian students who have qualified NEET.
                  </p>
                </div>

              </div>


              {/* 02 */}

              <div className="about-mbbs-benefit">

                <div className="mbbs-benefit-icon">
                  <span>₹</span>
                </div>

                <div>
                  <h3>
                    Affordable Fee Structure
                  </h3>

                  <p>
                    Quality education at a fraction of the cost in India.
                  </p>
                </div>

              </div>


              {/* 03 */}

              <div className="about-mbbs-benefit">

                <div className="mbbs-benefit-icon">
                  <BadgeCheck size={22} />
                </div>

                <div>
                  <h3>
                    WHO & NMC Approved Universities
                  </h3>

                  <p>
                    Study in globally recognized and approved universities.
                  </p>
                </div>

              </div>


              {/* 04 */}

              <div className="about-mbbs-benefit">

                <div className="mbbs-benefit-icon">
                  <span>EN</span>
                </div>

                <div>
                  <h3>
                    English Medium Education
                  </h3>

                  <p>
                    International curriculum with English as the medium
                    of instruction.
                  </p>
                </div>

              </div>


              {/* 05 */}

              <div className="about-mbbs-benefit">

                <div className="mbbs-benefit-icon">
                  <Globe2 size={22} />
                </div>

                <div>
                  <h3>
                    Global Recognition & Better Opportunities
                  </h3>

                  <p>
                    Recognized degrees with global career opportunities.
                  </p>
                </div>

              </div>


              {/* 06 */}

              <div className="about-mbbs-benefit">

                <div className="mbbs-benefit-icon">
                  <span>🏫</span>
                </div>

                <div>
                  <h3>
                    Modern Campus & Hostel Facilities
                  </h3>

                  <p>
                    State of the art infrastructure and comfortable stay.
                  </p>
                </div>

              </div>


              {/* 07 */}

              <div className="about-mbbs-benefit">

                <div className="mbbs-benefit-icon">
                  <span>✈</span>
                </div>

                <div>
                  <h3>
                    International Exposure & Multicultural Environment
                  </h3>

                  <p>
                    Learn, grow and build a global network for your future.
                  </p>
                </div>

              </div>

            </div>


            {/* RIGHT — VISUAL CONTENT */}

            <div className="about-mbbs-visual">

              <div className="mbbs-visual-glow"></div>

              <div className="mbbs-globe-ring mbbs-ring-one"></div>
              <div className="mbbs-globe-ring mbbs-ring-two"></div>

              <div className="mbbs-visual-center">

                <Globe2 size={70} />

                <strong>
                  MBBS
                </strong>

                <span>
                  ABROAD
                </span>

                <small>
                  A Global Pathway
                </small>

              </div>

              <div className="mbbs-visual-orbit orbit-one">
                <span>✈</span>
              </div>

              <div className="mbbs-visual-orbit orbit-two">
                <span>✦</span>
              </div>

            </div>

          </div>


          {/* =================================================
              BOTTOM BENEFITS
          ================================================= */}

          <div className="about-mbbs-bottom">

            <div className="mbbs-bottom-title">
              A <span>GLOBAL PATHWAY</span> TO BECOME A DOCTOR
            </div>


            <div className="mbbs-bottom-grid">

              <div className="mbbs-bottom-item">

                <div>
                  <BadgeCheck size={26} />
                </div>

                <strong>
                  QUALITY
                  <br />
                  EDUCATION
                </strong>

              </div>


              <div className="mbbs-bottom-item">

                <div>
                  <UsersRound size={26} />
                </div>

                <strong>
                  BRIGHT
                  <br />
                  CAREER
                </strong>

              </div>


              <div className="mbbs-bottom-item">

                <div>
                  <Globe2 size={26} />
                </div>

                <strong>
                  GLOBAL
                  <br />
                  EXPOSURE
                </strong>

              </div>


              <div className="mbbs-bottom-item">

                <div>
                  <HeartHandshake size={26} />
                </div>

                <strong>
                  BETTER
                  <br />
                  FUTURE
                </strong>

              </div>


              <div className="mbbs-bottom-item">

                <div>
                  <ArrowRight size={26} />
                </div>

                <strong>
                  ENDLESS
                  <br />
                  OPPORTUNITIES
                </strong>

              </div>

            </div>

          </div>

        </div>

      </section>

      
      {/* =====================================================
          WHY EDUGUIDE
      ===================================================== */}

      <section className="about-values-section">

        <div className="container">

          <div className="about-values-heading">

            <span className="section-label">
              WHY EDUGUIDE
            </span>

            <h2>
              More than admission.
              <span> A complete journey.</span>
            </h2>

            <p>
              We believe students need more than just a university list.
              They need proper guidance, clarity and continuous support.
            </p>

          </div>


          <div className="about-value-grid">

            <article className="about-value-card">

              <span>01</span>

              <div className="value-card-icon">
                <UsersRound size={22} />
              </div>

              <h3>Personalized Guidance</h3>

              <p>
                Recommendations based on your academic profile,
                preferences, budget and career goals.
              </p>

            </article>


            <article className="about-value-card">

              <span>02</span>

              <div className="value-card-icon">
                <Globe2 size={22} />
              </div>

              <h3>University Selection</h3>

              <p>
                Compare suitable universities and understand the
                important factors before making a decision.
              </p>

            </article>


            <article className="about-value-card">

              <span>03</span>

              <div className="value-card-icon">
                <BadgeCheck size={22} />
              </div>

              <h3>Admission Assistance</h3>

              <p>
                Support with applications, documentation and other
                admission requirements.
              </p>

            </article>


            <article className="about-value-card">

              <span>04</span>

              <div className="value-card-icon">
                <ShieldCheck size={22} />
              </div>

              <h3>Visa Support</h3>

              <p>
                Guidance through the visa preparation process and
                required documentation.
              </p>

            </article>

          </div>

        </div>

      </section>


      {/* =====================================================
          GLOBAL PATHWAY
      ===================================================== */}

      <section className="about-pathway-section">

        <div className="pathway-glow"></div>

        <div className="container pathway-content">

          <span className="section-label">
            YOUR GLOBAL PATHWAY
          </span>

          <h2>
            A global pathway
            <span> to become a doctor.</span>
          </h2>

          <p>
            Quality education, global exposure and better opportunities
            can shape the foundation of a successful medical career.
          </p>

          <div className="pathway-points">

            <div>
              <Globe2 size={20} />
              <span>Global Exposure</span>
            </div>

            <div>
              <BadgeCheck size={20} />
              <span>Quality Education</span>
            </div>

            <div>
              <Stethoscope size={20} />
              <span>Medical Career</span>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
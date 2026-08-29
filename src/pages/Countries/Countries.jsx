import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";

import { motion } from "framer-motion";

import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Globe2,
  GraduationCap,
  MapPin,
  Plane,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  WalletCards,
} from "lucide-react";

import { Link } from "react-router-dom";

import CountryCard from "../../components/CountryCard/CountryCard";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import CTA from "../../components/CTA/CTA";

import worldData from "world-atlas/countries-110m.json";

import "./Countries.css";


/* =========================================================
   COUNTRIES DATA
========================================================= */

const countries = [
  {
    code: "KG",
    name: "Kyrgyzstan",
    subtitle: "Accessible Education",
    description:
      "Explore medical education options with accessible admission pathways.",
  },
   {
    code: "UZ",
    name: "Uzbekistan",
    subtitle: "Growing Medical Destination",
    description:
      "Explore modern universities and medical programmes for international students.",
  },
  {
    code: "RU",
    name: "Russia",
    subtitle: "Established Medical Education",
    description:
      "Explore established medical universities, modern campuses and international student communities.",
  },
  {
    code: "GE",
    name: "Georgia",
    subtitle: "European Education Environment",
    description:
      "English-medium programmes and a student-friendly environment for international learners.",
  },
  {
    code: "PH",
    name: "Philippines",
    subtitle: "English-Medium Environment",
    description:
      "An English-based academic environment with strong healthcare exposure.",
  },
  {
    code: "KZ",
    name: "Kazakhstan",
    subtitle: "Affordable Medical Studies",
    description:
      "A growing destination offering accessible medical education opportunities.",
  },
  
];


/* =========================================================
   DESTINATION MAP DATA
========================================================= */

const destinations = [
  {
    code: "KG",
    name: "Kyrgyzstan",
    coordinates: [74.7, 41.2],
  },
  {
    code: "UZ",
    name: "Uzbekistan",
    coordinates: [64.5, 41.3],
  },
  {
    code: "RU",
    name: "Russia",
    coordinates: [90, 60],
  },
  {
    code: "GE",
    name: "Georgia",
    coordinates: [43.5, 42],
  },
  {
    code: "PH",
    name: "Philippines",
    coordinates: [122, 12],
  },
  {
    code: "KZ",
    name: "Kazakhstan",
    coordinates: [68, 48],
  },
  
  
  
];


/* =========================================================
   ROUTE DATA
========================================================= */

const routes = [
  {
    from: [77.2, 11.1],
    to: [90, 60],
  },
  {
    from: [77.2, 11.1],
    to: [43.5, 42],
  },
  {
    from: [77.2, 11.1],
    to: [68, 48],
  },
  {
    from: [77.2, 11.1],
    to: [64.5, 41.3],
  },
  {
    from: [77.2, 11.1],
    to: [122, 12],
  },
  {
    from: [77.2, 11.1],
    to: [74.7, 41.2],
  },
];


/* =========================================================
   WORLD MAP
========================================================= */

function WorldMap() {
  return (
    <div className="world-map-wrapper">

      {/* Map Glow */}

      <div className="world-map-glow"></div>


      {/* Animated grid */}

      <div className="world-map-grid"></div>


      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 145,
          center: [75, 30],
        }}
        className="world-map"
      >

        {/* =================================================
            COUNTRIES
        ================================================= */}

        <Geographies geography={worldData}>

          {({ geographies }) =>
            geographies.map((geo) => (

              <Geography
                key={geo.rsmKey}
                geography={geo}
                className="map-country"
                style={{
                  default: {
                    fill: "#0d2a50",
                    stroke: "rgba(242,200,91,0.18)",
                    strokeWidth: 0.45,
                    outline: "none",
                  },

                  hover: {
                    fill: "#173c6c",
                    stroke: "#f2c85b",
                    strokeWidth: 0.7,
                    outline: "none",
                  },

                  pressed: {
                    fill: "#173c6c",
                    outline: "none",
                  },
                }}
              />

            ))
          }

        </Geographies>


        {/* =================================================
            INDIA START POINT
        ================================================= */}

        <Marker coordinates={[77.2, 11.1]}>

          <circle
            r="5"
            fill="#f2c85b"
            className="india-core"
          />

          <circle
            r="10"
            fill="none"
            stroke="#f2c85b"
            strokeWidth="1"
            className="india-pulse"
          />

          <circle
            r="15"
            fill="none"
            stroke="rgba(242,200,91,0.3)"
            strokeWidth="1"
            className="india-pulse-two"
          />

        </Marker>


        {/* =================================================
            TRAVEL ROUTES
        ================================================= */}

        {routes.map((route, index) => (

          <Line
            key={index}
            from={route.from}
            to={route.to}
            stroke="#f2c85b"
            strokeWidth={0.7}
            strokeLinecap="round"
            className="travel-route"
          />

        ))}


        {/* =================================================
            DESTINATION MARKERS
        ================================================= */}

        {destinations.map((destination) => (

          <Marker
            key={destination.code}
            coordinates={destination.coordinates}
          >

            <g className="destination-marker">

              <circle
                r="5"
                fill="#f2c85b"
                className="destination-core"
              />

              <circle
                r="10"
                fill="none"
                stroke="#f2c85b"
                strokeWidth="1"
                className="destination-pulse"
              />

              <circle
                r="16"
                fill="none"
                stroke="rgba(242,200,91,0.25)"
                strokeWidth="0.8"
                className="destination-pulse-two"
              />

            </g>

          </Marker>

        ))}

      </ComposableMap>


      {/* =================================================
          FLOATING MAP LABELS
      ================================================= */}

      <div className="map-floating-label map-label-one">
        <Globe2 size={16} />
        <div>
          <strong>Global</strong>
          <span>Medical Education</span>
        </div>
      </div>


      <div className="map-floating-label map-label-two">
        <ShieldCheck size={16} />
        <div>
          <strong>Verified</strong>
          <span>University Options</span>
        </div>
      </div>


      <div className="map-floating-label map-label-three">
        <Plane size={16} />
        <div>
          <strong>International</strong>
          <span>Student Pathways</span>
        </div>
      </div>


      {/* =================================================
          MAP LEGEND
      ================================================= */}

      <div className="map-legend">

        <span className="legend-dot"></span>

        <span>
          EduGuide Destination
        </span>

      </div>

    </div>
  );
}


/* =========================================================
   COUNTRY PAGE
========================================================= */

export default function Countries() {

  return (
    <main className="countries-page">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="countries-hero">

        <div className="countries-hero-bg"></div>

        <div className="countries-hero-glow countries-glow-one"></div>

        <div className="countries-hero-glow countries-glow-two"></div>


        {/* Particles */}

        <div className="country-particle particle-a"></div>
        <div className="country-particle particle-b"></div>
        <div className="country-particle particle-c"></div>
        <div className="country-particle particle-d"></div>
        <div className="country-particle particle-e"></div>


        <div className="container countries-hero-container">


          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <motion.div
            className="countries-hero-content"
            initial={{
              opacity: 0,
              x: -35,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <span className="countries-eyebrow">

              <Sparkles size={14} />

              STUDY DESTINATIONS

            </span>


            <h1>

              Explore Your Ideal

              <br />

              <span>
                Medical Destination
              </span>

            </h1>


            <p className="countries-hero-description">

              Discover international destinations for your
              medical education journey and explore the
              possibilities with expert guidance from EduGuide.

            </p>


            <div className="countries-hero-actions">

              <Link
                to="/contact"
                className="countries-primary-btn"
              >

                Get Free Guidance

                <ArrowRight size={17} />

              </Link>


              <a
                href="#destinations"
                className="countries-secondary-btn"
              >

                Explore Countries

                <Globe2 size={16} />

              </a>

            </div>


            {/* Quick stats */}

            <div className="countries-quick-stats">

              <div>

                <strong>06</strong>

                <span>
                  DESTINATIONS
                </span>

              </div>


              <div>

                <strong>01</strong>

                <span>
                  GLOBAL PATH
                </span>

              </div>


              <div>

                <strong>100%</strong>

                <span>
                  GUIDANCE
                </span>

              </div>

            </div>

          </motion.div>


          {/* =================================================
              RIGHT WORLD MAP
          ================================================= */}

          <motion.div
            className="countries-map-area"
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.15,
            }}
          >

            <WorldMap />

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          DESTINATION INTRO
      ===================================================== */}

      <section
        className="section countries-section"
        id="destinations"
      >

        <div className="container">


          <SectionHeading
            eyebrow="DESTINATIONS"
            title="Popular Countries for"
            highlight="MBBS Abroad"
            center
            description="Explore different destinations and find the option that fits your academic and career goals."
          />


          <div className="country-grid countries-grid">

            {countries.map((country, index) => (

              <motion.div
                key={country.code}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
              >

                <CountryCard
                  {...country}
                />

              </motion.div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY DIFFERENT COUNTRIES
      ===================================================== */}

      <section className="country-difference-section">

        <div className="country-difference-glow"></div>

        <div className="container">

          <div className="country-difference-grid">


            {/* LEFT */}

            <div className="country-difference-content">

              <span className="section-label country-dark-label">

                SMART DESTINATION SELECTION

              </span>


              <h2>

                The right country can shape

                <span>
                  your journey.
                </span>

              </h2>


              <p>

                Choosing where to study medicine is an important
                decision. We help students understand the key
                factors behind each destination before making
                an informed choice.

              </p>


              <div className="difference-button">

                <Link to="/contact">

                  Talk to an Expert

                  <ArrowRight size={16} />

                </Link>

              </div>

            </div>


            {/* RIGHT */}

            <div className="country-factors">


              <div className="country-factor-card">

                <div className="factor-icon">

                  <BadgeCheck size={21} />

                </div>

                <div>

                  <strong>
                    University Recognition
                  </strong>

                  <span>
                    Understand university recognition
                    and eligibility considerations.
                  </span>

                </div>

              </div>


              <div className="country-factor-card">

                <div className="factor-icon">

                  <WalletCards size={21} />

                </div>

                <div>

                  <strong>
                    Fee Structure
                  </strong>

                  <span>
                    Compare tuition and other
                    education-related costs.
                  </span>

                </div>

              </div>


              <div className="country-factor-card">

                <div className="factor-icon">

                  <BookOpen size={21} />

                </div>

                <div>

                  <strong>
                    Academic Environment
                  </strong>

                  <span>
                    Understand teaching style,
                    curriculum and student life.
                  </span>

                </div>

              </div>


              <div className="country-factor-card">

                <div className="factor-icon">

                  <Stethoscope size={21} />

                </div>

                <div>

                  <strong>
                    Medical Career
                  </strong>

                  <span>
                    Consider your long-term
                    academic and career pathway.
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          GLOBAL JOURNEY
      ===================================================== */}

      <section className="global-journey-section">

        <div className="container">

          <div className="global-journey-card">


            <div className="journey-orbit orbit-one"></div>

            <div className="journey-orbit orbit-two"></div>


            <div className="journey-icon">

              <GraduationCap size={30} />

            </div>


            <div className="journey-content">

              <span>
                YOUR GLOBAL MEDICAL JOURNEY
              </span>

              <h2>

                From your dream

                <strong>
                  to your destination.
                </strong>

              </h2>

              <p>

                EduGuide helps you explore destinations,
                understand your options and move forward
                with greater clarity and confidence.

              </p>

            </div>


            <Link
              to="/contact"
              className="journey-button"
            >

              Start Your Journey

              <ArrowRight size={17} />

            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      {/* <CTA /> */}

    </main>
  );
}
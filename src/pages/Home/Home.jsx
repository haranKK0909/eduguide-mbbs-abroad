import { Link } from "react-router-dom";

import {
    BadgeCheck,
    WalletCards,
    Globe2,
    HeartHandshake,
    Building2,
    BookOpen,
    GraduationCap,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    Stethoscope,
    Plane,
    FileCheck2,
    UsersRound,
} from "lucide-react";

import Hero from "../../components/Hero/Hero";
import TrustStrip from "../../components/TrustStrip/TrustStrip";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import BenefitCard from "../../components/BenefitCard/BenefitCard";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import CTA from "../../components/CTA/CTA";

import "./Home.css";


/* =========================================================
   BENEFITS
========================================================= */

const benefits = [
    {
        number: "01",
        icon: <BadgeCheck size={23} />,
        title: "Verified Universities",
        description:
            "We help you identify recognised and reliable medical universities with complete guidance.",
    },
    {
        number: "02",
        icon: <WalletCards size={23} />,
        title: "Affordable Options",
        description:
            "Explore quality medical education options carefully selected according to your budget.",
    },
    {
        number: "03",
        icon: <Globe2 size={23} />,
        title: "Global Destinations",
        description:
            "Discover leading international destinations for pursuing your medical education.",
    },
    {
        number: "04",
        icon: <HeartHandshake size={23} />,
        title: "Complete Guidance",
        description:
            "From counselling and admission to visa and travel, we support you at every step.",
    },
    {
        number: "05",
        icon: <Building2 size={23} />,
        title: "University Selection",
        description:
            "Get personalised university recommendations based on your academic profile.",
    },
    {
        number: "06",
        icon: <BookOpen size={23} />,
        title: "Career Guidance",
        description:
            "Understand your future opportunities before making an important academic decision.",
    },
];


/* =========================================================
   DESTINATIONS
========================================================= */

const countries = [
    {
        code: "RU",
        name: "Russia",
        subtitle: "Affordable Medical Education",
        description:
            "Globally recognised medical universities with modern infrastructure.",
        flag: "/assets/flags/russia.jpg",
    },
    {
        code: "KG",
        name: "Kyrgyzstan",
        subtitle: "Value-Focused Education",
        description:
            "Affordable tuition with a growing choice of medical universities.",
        flag: "/assets/flags/kyrgyzstan.jpg",
    },
    {
        code: "UZ",
        name: "Uzbekistan",
        subtitle: "Emerging Destination",
        description:
            "Modern medical education with accessible admission opportunities.",
        flag: "/assets/flags/uzbekistan.jpg",
    },
    {
        code: "PL",
        name: "Philippines",
        subtitle: "Quality Medical Education",
        description:
            "Explore established medical universities with diverse academic opportunities.",
        flag: "/assets/flags/philipines.jpeg",
    },
    {
        code: "GE",
        name: "Georgia",
        subtitle: "European Medical Education",
        description:
            "Quality English-medium medical programmes with a student-friendly environment.",
        flag: "/assets/flags/georgia.jpg",
    },
];


/* =========================================================
   SERVICES
========================================================= */

const services = [
    {
        number: "01",
        icon: <HeartHandshake size={23} />,
        title: "Career Counselling",
        description:
            "Understand your options and select a suitable medical career path.",
    },
    {
        number: "02",
        icon: <Building2 size={23} />,
        title: "University Selection",
        description:
            "Shortlist universities based on eligibility, budget and preferences.",
    },
    {
        number: "03",
        icon: <BookOpen size={23} />,
        title: "Admission Support",
        description:
            "Get assistance throughout the application and admission process.",
    },
    {
        number: "04",
        icon: <Globe2 size={23} />,
        title: "Visa Assistance",
        description:
            "Receive guidance for documentation and the student visa process.",
    },
];


/* =========================================================
   JOURNEY
========================================================= */

const journeySteps = [
    {
        icon: <UsersRound size={22} />,
        number: "01",
        title: "Counselling",
        text: "Understand your goals, eligibility and available options.",
    },
    {
        icon: <Stethoscope size={22} />,
        number: "02",
        title: "University Selection",
        text: "Choose suitable universities according to your profile.",
    },
    {
        icon: <FileCheck2 size={22} />,
        number: "03",
        title: "Admission",
        text: "Complete documentation and admission formalities.",
    },
    {
        icon: <Plane size={22} />,
        number: "04",
        title: "Visa & Travel",
        text: "Prepare for your student visa and journey abroad.",
    },
];


export default function Home() {
    return (
        <main className="home-page">

            {/* =====================================================
                HERO
            ===================================================== */}

            <Hero />


            {/* =====================================================
                TRUST
            ===================================================== */}

            <TrustStrip />


            {/* =====================================================
                WHY EDUGUIDE
            ===================================================== */}

            <section className="section section-light home-benefits-section">

                <div className="container">

                    <div className="home-section-intro">

                        <span className="section-mini-label">
                            <Sparkles size={14} />
                            WHY EDUGUIDE
                        </span>

                    </div>

                    <SectionHeading
                        eyebrow="WHY EDUGUIDE"
                        title="Everything You Need to"
                        highlight="Study Abroad"
                        description="We simplify the entire MBBS abroad journey so students and parents can make confident, informed decisions."
                    />

                    <div className="benefit-grid large">

                        {benefits.map((item) => (

                            <div
                                className="home-benefit-wrapper"
                                key={item.number}
                            >
                                <BenefitCard {...item} />
                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* =====================================================
                FEATURE SECTION
            ===================================================== */}

            <section className="section split-feature">

                <div className="container split-grid">

                    {/* 3D VISUAL */}

                    <div className="home-visual-area">

                        <div className="visual-orbit orbit-one"></div>

                        <div className="visual-orbit orbit-two"></div>

                        <div className="visual-glow"></div>

                        <div className="home-poster">

                            <div className="poster-top">
                                <span>EDUGUIDE</span>
                                <span>01</span>
                            </div>

                            <div className="poster-content">

                                <div className="poster-icon">
                                    <GraduationCap
                                        size={62}
                                        strokeWidth={1.5}
                                    />
                                </div>

                                <span className="poster-small-title">
                                    YOUR MEDICAL JOURNEY
                                </span>

                                <strong>MBBS</strong>

                                <span className="poster-abroad">
                                    ABROAD
                                </span>

                                <div className="poster-line"></div>

                                <p>
                                    Learn. Explore.
                                    <br />
                                    Become a Doctor.
                                </p>

                            </div>

                            <div className="poster-bottom">
                                <span>GLOBAL EDUCATION</span>
                                <span>EST. 2026</span>
                            </div>

                            <div className="floating-badge badge-one">
                                <CheckCircle2 size={17} />
                                Verified
                            </div>

                            <div className="floating-badge badge-two">
                                <Globe2 size={17} />
                                Global
                            </div>

                        </div>

                    </div>


                    {/* CONTENT */}

                    <div className="feature-content">

                        <SectionHeading
                            eyebrow="YOUR FUTURE STARTS HERE"
                            title="Make the Right Choice"
                            highlight="with Confidence"
                            description="Choosing the right medical university is one of the most important decisions in your academic journey. Our experts help you understand every option clearly."
                        />

                        <div className="check-list">

                            <div>
                                <BadgeCheck size={19} />
                                <span>
                                    Personalised university shortlisting
                                </span>
                            </div>

                            <div>
                                <BadgeCheck size={19} />
                                <span>
                                    Transparent admission guidance
                                </span>
                            </div>

                            <div>
                                <BadgeCheck size={19} />
                                <span>
                                    Complete documentation assistance
                                </span>
                            </div>

                            <div>
                                <BadgeCheck size={19} />
                                <span>
                                    Visa and travel guidance
                                </span>
                            </div>

                        </div>

                        <Link
                            to="/contact"
                            className="feature-button"
                        >
                            <span>Start Your Journey</span>
                            <ArrowRight size={18} />
                        </Link>

                    </div>

                </div>

            </section>


            {/* =====================================================
                DESTINATIONS
            ===================================================== */}

            <section className="section dark-section destination-section">

                <div className="destination-background-glow glow-left"></div>

                <div className="destination-background-glow glow-right"></div>

                <div className="container">

                    <SectionHeading
                        eyebrow="POPULAR DESTINATIONS"
                        title="Explore Medical"
                        highlight="Destinations"
                        description="Discover international destinations where students can pursue quality medical education."
                    />


                    <div className="destination-row">

                        {countries.map((country, index) => (

                            <div
                                className="destination-pill"
                                key={country.code}
                                style={{
                                    "--card-index": index,
                                    "--country-flag": `url("${country.flag}")`,
                                }}
                            >

                                {/* FLAG BACKGROUND */}

                                <div className="country-flag-bg"></div>

                                {/* DARK OVERLAY */}

                                <div className="country-flag-overlay"></div>


                                {/* CONTENT */}

                                <div className="country-card-content">

                                    <div className="country-top">

                                        <span className="country-code">
                                            {country.code}
                                        </span>

                                        <span className="destination-number">
                                            0{index + 1}
                                        </span>

                                    </div>


                                    <div className="country-middle">

                                        <b>
                                            {country.name}
                                        </b>

                                        <small>
                                            {country.subtitle}
                                        </small>

                                    </div>


                                    <div className="country-bottom">

                                        <span>
                                            MBBS ABROAD
                                        </span>

                                        {/* <span className="destination-arrow">
                                            <ArrowRight size={14} />
                                        </span> */}

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* =====================================================
                JOURNEY
            ===================================================== */}

            <section className="section journey-section">

                <div className="container">

                    <SectionHeading
                        eyebrow="HOW IT WORKS"
                        title="Your Journey,"
                        highlight="Simplified"
                        description="We make the process easier by supporting you through every important stage."
                    />

                    <div className="journey-track">

                        <div className="journey-line"></div>

                        {journeySteps.map((step) => (

                            <div
                                className="journey-item"
                                key={step.number}
                            >

                                <div className="journey-icon">
                                    {step.icon}
                                </div>

                                <span className="journey-number">
                                    {step.number}
                                </span>

                                <h3>
                                    {step.title}
                                </h3>

                                <p>
                                    {step.text}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* =====================================================
                SERVICES
            ===================================================== */}

            <section className="section service-showcase">

                <div className="container">

                    <SectionHeading
                        eyebrow="OUR SERVICES"
                        title="Complete Support From"
                        highlight="Start to Finish"
                        description="Our counselling and admission services are designed to make your international medical education journey simple and stress-free."
                    />

                    <div className="service-grid">

                        {services.map((item) => (

                            <div
                                className="home-service-wrapper"
                                key={item.number}
                            >
                                <ServiceCard {...item} />
                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* =====================================================
                FINAL CTA
            ===================================================== */}

            <CTA />

        </main>
    );
}
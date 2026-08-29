import { ArrowRight, PlayCircle, Sparkles, Globe2, ShieldCheck, Headphones } from "lucide-react";
import "./Hero.css";

export default function Hero() {
    const startJourney = () => {
        window.location.href = "/contact";
    };

    const scrollToDestinations = () => {
        const section = document.querySelector(".dark-section");

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    const scrollToContact = () => {
        const section =
            document.getElementById("contact") ||
            document.querySelector(".cta-section");

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        } else {
            window.location.hash = "contact";
        }
    };

    return (
        <section className="hero-section" id="home">

            {/* =====================================================
          HERO BACKGROUND
      ====================================================== */}
            <div className="hero-image-wrap">
                <img
                    src="/images/eduguide-hero.jpg"
                    alt="EduGuide - Study MBBS Abroad"
                    className="hero-image"
                />

                <div className="hero-image-overlay"></div>
            </div>


            {/* =====================================================
          COUNTRY → COUNTRY ANIMATED ROUTES
          SVG PATHS KEEP DOTS EXACTLY ON THE LINES
      ====================================================== */}
            <div className="hero-route-layer" aria-hidden="true">

                <svg
                    className="hero-route-svg"
                    viewBox="0 0 1600 900"
                    preserveAspectRatio="none"
                >

                    {/* USA → Europe */}
                    <path
                        id="route-one"
                        className="route-line"
                        d="M 160 500
               C 300 390, 430 380, 550 500"
                    />

                    <circle className="route-dot">
                        <animateMotion
                            dur="4.8s"
                            repeatCount="indefinite"
                            rotate="auto"
                        >
                            <mpath href="#route-one" />
                        </animateMotion>
                    </circle>


                    {/* Europe → Asia */}
                    <path
                        id="route-two"
                        className="route-line"
                        d="M 550 500
               C 720 350, 820 360, 1000 530"
                    />

                    <circle className="route-dot">
                        <animateMotion
                            dur="5.4s"
                            begin="1s"
                            repeatCount="indefinite"
                            rotate="auto"
                        >
                            <mpath href="#route-two" />
                        </animateMotion>
                    </circle>


                    {/* South America → Europe */}
                    <path
                        id="route-three"
                        className="route-line"
                        d="M 300 690
               C 390 590, 450 500, 550 500"
                    />

                    <circle className="route-dot">
                        <animateMotion
                            dur="5.2s"
                            begin="0.8s"
                            repeatCount="indefinite"
                            rotate="auto"
                        >
                            <mpath href="#route-three" />
                        </animateMotion>
                    </circle>


                    {/* Europe → Africa */}
                    <path
                        id="route-four"
                        className="route-line"
                        d="M 550 500
               C 550 570, 580 630, 620 720"
                    />

                    <circle className="route-dot">
                        <animateMotion
                            dur="4.5s"
                            begin="1.8s"
                            repeatCount="indefinite"
                            rotate="auto"
                        >
                            <mpath href="#route-four" />
                        </animateMotion>
                    </circle>


                    {/* Europe → Australia */}
                    <path
                        id="route-five"
                        className="route-line"
                        d="M 550 500
               C 760 450, 930 540, 1030 800"
                    />

                    <circle className="route-dot">
                        <animateMotion
                            dur="5.8s"
                            begin="2s"
                            repeatCount="indefinite"
                            rotate="auto"
                        >
                            <mpath href="#route-five" />
                        </animateMotion>
                    </circle>


                    {/* Asia → Australia */}
                    <path
                        id="route-six"
                        className="route-line"
                        d="M 1000 530
               C 1010 620, 1020 700, 1030 800"
                    />

                    <circle className="route-dot">
                        <animateMotion
                            dur="4.2s"
                            begin="1.4s"
                            repeatCount="indefinite"
                            rotate="auto"
                        >
                            <mpath href="#route-six" />
                        </animateMotion>
                    </circle>

                </svg>

            </div>


            {/* =====================================================
          DECORATIVE PARTICLES
          These stay AWAY from route animation
      ====================================================== */}
            <div className="hero-particles" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>


            {/* =====================================================
          HERO CONTENT
      ====================================================== */}
            <div className="hero-content">

                <div className="hero-badge">
                    <Sparkles size={15} />
                    <span>YOUR GLOBAL MEDICAL EDUCATION PARTNER</span>
                </div>


                <h1>
                    Your Dream.
                    <br />
                    <span>Our Guidance.</span>
                    <br />
                    Your Future.
                </h1>


                <p>
                    Discover recognised medical universities abroad with
                    personalised guidance from counselling to admission,
                    visa and travel support.
                </p>


                <div className="hero-actions">

                    {/* START JOURNEY */}

                    <button
                        type="button"
                        className="hero-primary-btn"
                        onClick={startJourney}
                    >

                        <span>
                            Start Your Journey
                        </span>

                        <ArrowRight size={19} />

                    </button>
                    {/* <button
                        type="button"
                        className="hero-primary-btn"
                        onClick={scrollToContact}
                    >
                        <span>Start Your Journey</span>
                        <ArrowRight size={19} />
                    </button> */}


                    <button
                        type="button"
                        className="hero-secondary-btn"
                        onClick={scrollToDestinations}
                    >
                        <PlayCircle size={19} />
                        <span>Explore Destinations</span>
                    </button>

                </div>

            </div>


            {/* =====================================================
          HERO STATS
      ====================================================== */}
            <div className="hero-stats">

                <div className="hero-stat">

                    <div className="hero-stat-icon">
                        <Globe2 size={21} />
                    </div>

                    <div>
                        <strong>6+</strong>
                        <span>Global Destinations</span>
                    </div>

                </div>


                <div className="hero-stat-divider"></div>


                <div className="hero-stat">

                    <div className="hero-stat-icon">
                        <ShieldCheck size={21} />
                    </div>

                    <div>
                        <strong>100%</strong>
                        <span>Personalised Guidance</span>
                    </div>

                </div>


                <div className="hero-stat-divider"></div>


                <div className="hero-stat">

                    <div className="hero-stat-icon">
                        <Headphones size={21} />
                    </div>

                    <div>
                        <strong>360°</strong>
                        <span>Admission Support</span>
                    </div>

                </div>

            </div>


            {/* =====================================================
          SCROLL INDICATOR
      ====================================================== */}
            <div className="hero-scroll-indicator">
                <span></span>
                <small>SCROLL TO EXPLORE</small>
            </div>

        </section>
    );
}
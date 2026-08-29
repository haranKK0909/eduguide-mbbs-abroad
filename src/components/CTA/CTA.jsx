import { ArrowRight, Sparkles, GraduationCap, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import "./CTA.css";

export default function CTA() {
  return (
    <section className="cta-section">

      {/* Background 3D elements */}
      <div className="cta-background">
        <div className="cta-orbit orbit-one"></div>
        <div className="cta-orbit orbit-two"></div>
        <div className="cta-glow glow-one"></div>
        <div className="cta-glow glow-two"></div>

        <div className="cta-floating-icon icon-one">
          <GraduationCap size={25} />
        </div>

        <div className="cta-floating-icon icon-two">
          <Globe2 size={23} />
        </div>
      </div>

      <div className="container cta-inner">

        {/* Eyebrow */}
        <div className="cta-eyebrow">
          <Sparkles size={15} />
          <span>START YOUR JOURNEY</span>
        </div>

        {/* Heading */}
        <h2>
          Ready to Begin Your
          <span> Medical Journey?</span>
        </h2>

        {/* Description */}
        <p>
          Talk to our expert counsellors and get personalised guidance
          for your MBBS abroad journey — from university selection to
          admission and visa support.
        </p>

        {/* CTA button */}
        <Link to="/contact" className="cta-button">
          <span>Talk to an Expert</span>
          <ArrowRight size={18} />
        </Link>

        {/* Bottom trust text */}
        <div className="cta-trust">
          <span></span>
          <p>No obligation consultation</p>
          <span></span>
        </div>

      </div>
    </section>
  );
}
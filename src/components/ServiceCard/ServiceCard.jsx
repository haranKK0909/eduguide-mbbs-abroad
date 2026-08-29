import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import "./ServiceCard.css";

export default function ServiceCard({
  number,
  icon,
  title,
  description
}) {
  return (
    <article className="service-card">

      {/* Decorative background */}
      <div className="service-glow"></div>
      <div className="service-orbit"></div>

      <div className="service-card-inner">

        {/* Top row */}
        <div className="service-top">

          <span className="service-number">
            {number}
          </span>

          <span className="service-mini-icon">
            <Sparkles size={13} />
          </span>

        </div>

        {/* Main icon */}
        <div className="service-icon">
          {icon}
        </div>

        {/* Content */}
        <div className="service-content">

          <h3>{title}</h3>

          <p>{description}</p>

        </div>

        {/* Bottom action */}
        <div className="service-bottom">

          <Link
            to="/contact"
            className="service-link"
          >
            <span>Learn More</span>

            <span className="service-arrow">
              <ArrowRight size={16} />
            </span>
          </Link>

          <span className="service-label">
            EDUGUIDE
          </span>

        </div>

      </div>
    </article>
  );
}
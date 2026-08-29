import { ArrowUpRight, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import "./CountryCard.css";

export default function CountryCard({
  code,
  name,
  subtitle,
  description
}) {
  return (
    <article className="country-card">
      <div className="country-card-glow"></div>
      <div className="country-card-ring"></div>

      <div className="country-card-inner">

        <div className="country-top">
          <div className="country-code-wrap">
            <span className="country-code">
              {code}
            </span>

            <span className="country-label">
              DESTINATION
            </span>
          </div>

          <div className="country-icon">
            <Globe2 size={19} />
          </div>
        </div>

        <div className="country-heading">
          <span className="country-line"></span>
          <h2>{name}</h2>
        </div>

        <strong className="country-subtitle">
          {subtitle}
        </strong>

        <p className="country-description">
          {description}
        </p>

        <div className="country-bottom">
          <Link
            to="/contact"
            className="country-link"
          >
            <span>Get Guidance</span>

            <span className="country-link-icon">
              <ArrowUpRight size={17} />
            </span>
          </Link>

          <span className="country-number">
            {code}
          </span>
        </div>

      </div>
    </article>
  );
}
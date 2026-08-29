import "./BenefitCard.css";

export default function BenefitCard({
  number,
  icon,
  title,
  description
}) {
  return (
    <article className="benefit-card">
      {/* Animated shine layer */}
      <span className="benefit-shine"></span>

      {/* Top number */}
      <span className="benefit-index">
        {number}
      </span>

      {/* Icon */}
      <div className="icon-wrap">
        <div className="icon-glow"></div>
        <span className="icon-inner">
          {icon}
        </span>
      </div>

      {/* Content */}
      <div className="benefit-content">
        <h3>{title}</h3>

        <p>{description}</p>
      </div>

      {/* Bottom decorative line */}
      <span className="benefit-line"></span>
    </article>
  );
}
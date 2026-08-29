import { Sparkles } from "lucide-react";
import "./SectionHeading.css";

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  center = false
}) {
  return (
    <div className={`section-heading ${center ? "center" : ""}`}>

      {eyebrow && (
        <div className="section-heading-eyebrow-wrap">
          <span className="section-heading-line"></span>

          <span className="section-eyebrow">
            <Sparkles size={12} />
            {eyebrow}
          </span>

          <span className="section-heading-line"></span>
        </div>
      )}

      <h2>
        {title}
        {highlight && (
          <>
            {" "}
            <span className="heading-highlight">
              {highlight}
            </span>
          </>
        )}
      </h2>

      {description && (
        <p className="lead">
          {description}
        </p>
      )}

      <div className="heading-decoration">
        <span></span>
        <i></i>
        <span></span>
      </div>

    </div>
  );
}
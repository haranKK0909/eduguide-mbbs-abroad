import {
  Users,
  Globe2,
  GraduationCap,
  ShieldCheck,
  Sparkles
} from "lucide-react";

import "./TrustStrip.css";

const stats = [
  {
    number: "10+",
    label: "Years of Guidance",
    icon: <Users size={16} />
  },
  {
    number: "15+",
    label: "Medical Destinations",
    icon: <Globe2 size={16} />
  },
  {
    number: "5000+",
    label: "Students Guided",
    icon: <GraduationCap size={16} />
  },
  {
    number: "100%",
    label: "Dedicated Support",
    icon: <ShieldCheck size={16} />
  }
];

export default function TrustStrip() {
  return (
    <section className="trust-strip">

      <div className="trust-strip-glow"></div>

      <div className="container trust-strip-grid">

        {stats.map((item, index) => (
          <div
            className="trust-stat"
            key={item.label}
          >

            {/* Number index */}
            <span className="trust-index">
              0{index + 1}
            </span>

            {/* Icon */}
            <div className="trust-icon">
              {item.icon}
            </div>

            {/* Main number */}
            <strong>
              {item.number}
            </strong>

            {/* Label */}
            <p>
              {item.label}
            </p>

            {/* Bottom accent */}
            <span className="trust-accent"></span>

          </div>
        ))}

      </div>

      {/* Decorative sparkle */}
      <div className="trust-sparkle sparkle-one">
        <Sparkles size={12} />
      </div>

      <div className="trust-sparkle sparkle-two">
        <Sparkles size={10} />
      </div>

    </section>
  );
}
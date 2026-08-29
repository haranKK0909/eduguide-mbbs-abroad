import "./Timeline.css";

export default function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((item, index) => (
        <div className="timeline-item" key={index}>

          <div className="timeline-number">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>

          <span className="timeline-dot"></span>
        </div>
      ))}
    </div>
  );
}
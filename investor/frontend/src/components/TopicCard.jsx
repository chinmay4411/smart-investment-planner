import React from "react";
import "./TopicCard.css";

export default function TopicCard({
  topic,
  onBookmark,
  bookmarked,
  expanded,
  onToggleExpand,
}) {
  const {
    title,
    description,
    details,
    image = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    level = "beginner",
    category = "General",
  } = topic;

  const levelColor = {
    beginner: "#4caf50",
    intermediate: "#ff9800",
    advanced: "#e91e63",
  };

  // Print handler
  function handlePrint() {
    const html = `
      <html>
      <head><title>${title}</title></head>
      <body style="font-family:Arial;padding:20px;">
        <h1>${title}</h1>
        <p>${description}</p>
        <pre>${details || ""}</pre>
      </body>
      </html>`;
    const w = window.open("", "_blank");
    w.document.write(html);
    w.print();
  }

  return (
    <article className="topic-card">

      {/* IMAGE */}
      <div className="topic-img-container">
        <img src={image} className="topic-img" alt={title} />
      </div>

      {/* TITLE + BADGES */}
      <div className="topic-header">

        <h3 className="topic-title">{title}</h3>

        {/* BADGE ROW */}
        <div className="badge-row">
          <span className="level-badge" style={{ background: levelColor[level] }}>
            {level.toUpperCase()}
          </span>

          <span className="category-tag">{category}</span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="topic-actions">
          <button
            className={`star ${bookmarked ? "on" : ""}`}
            onClick={onBookmark}
          >
            {bookmarked ? "★" : "☆"}
          </button>

          <button className="btn small" onClick={handlePrint}>🖨 Print</button>

          <button className="btn small ghost" onClick={onToggleExpand}>
            {expanded ? "▲ Hide" : "▼ Read"}
          </button>
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="small-desc">{description}</p>

      {/* EXPANDED DETAILS */}
      {expanded && (
        <div className="topic-body">
          <div
            className="topic-details"
            dangerouslySetInnerHTML={{
              __html: (details || "").replace(/\n/g, "<br/>"),
            }}
          />
        </div>
      )}
    </article>
  );
}

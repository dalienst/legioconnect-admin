import React from "react";

function Content({ heading, subheading, content, text }) {
  return (
    <div>
      <h2 className="fw-semibold">{heading}</h2>
      <h5>{subheading}</h5>
      <p>{text}</p>
      <ol style={{ listStyleType: "decimal" }}>
        {content.map((section) => (
          <li key={section.id}>
            <p>{section.title}</p>
            {section.body && <p className="text-justify">{section.body}</p>}
            {section.items && section.items.length > 0 && (
              <ul style={{ listStyleType: "disc" }}>
                {section.items.map((item, index) => (
                  <li key={index}>
                    <p className="text-justify">{item}</p>
                  </li>
                ))}
              </ul>
            )}
            {/* Optionally, render something else if there are no items */}
            {section.items && section.items.length === 0 && (
              <p>No information available.</p> // Customize this message as needed
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Content;

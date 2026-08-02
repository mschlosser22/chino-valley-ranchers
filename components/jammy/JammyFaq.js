import { useEffect, useRef, useState } from "react";

/**
 * FAQ accordion.
 *
 * The prototype drove this with manual height math and no ARIA. Rebuilt as a
 * controlled React component: one panel open at a time, height animated from
 * the measured content, and proper button/region semantics so it is usable by
 * keyboard and screen reader.
 */
function FaqItem({ item, isOpen, onToggle, index }) {
  const panelRef = useRef(null);
  const [height, setHeight] = useState(0);

  // Re-measure on open and on resize -- the answer text reflows at narrow
  // widths, so a cached height would clip it.
  useEffect(() => {
    const measure = () => {
      if (panelRef.current) setHeight(panelRef.current.scrollHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [item.answer]);

  const btnId = `jammy-faq-btn-${index}`;
  const panelId = `jammy-faq-panel-${index}`;

  return (
    <div style={{ borderTop: "1px solid #D9D9D9" }}>
      <h3 style={{ margin: 0 }}>
        <button
          id={btnId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            padding: "24px 4px",
            background: "none",
            border: 0,
            cursor: "pointer",
            textAlign: "left",
            fontFamily: "Figtree, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(19px, 2.2vw, 24px)",
            lineHeight: 1.35,
            color: "#20261A",
          }}
        >
          <span>{item.question}</span>
          <span
            aria-hidden="true"
            style={{
              flex: "0 0 auto",
              fontFamily: "Figtree, sans-serif",
              fontWeight: 700,
              fontSize: 26,
              lineHeight: 1,
              color: "#2E4322",
              transform: isOpen ? "rotate(45deg)" : "none",
              transition: "transform .35s cubic-bezier(.2,.7,.3,1)",
            }}
          >
            +
          </span>
        </button>
      </h3>
      {/* Not using `hidden` -- it would suppress the height transition.
          The collapsed panel is zero-height with overflow clipped, and
          inert content is hidden from AT via aria-hidden. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        aria-hidden={!isOpen}
        style={{
          overflow: "hidden",
          height: isOpen ? height : 0,
          transition: "height .4s cubic-bezier(.2,.7,.3,1)",
        }}
      >
        <div ref={panelRef}>
          <p
            style={{
              margin: 0,
              padding: "0 4px 26px",
              fontFamily: "Figtree, sans-serif",
              fontSize: 18,
              lineHeight: "28.8px",
              color: "#3A3F31",
            }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function JammyFaq({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div style={{ borderBottom: "1px solid #D9D9D9" }}>
      {items.map((item, i) => (
        <FaqItem
          key={item.question}
          item={item}
          index={i}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
  );
}

export default JammyFaq;

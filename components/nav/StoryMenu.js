import { useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";

/* OUR STORY's dropdown. It was a Headless UI <Menu>, which keeps its open
   state to itself, so it stayed open underneath the mega menu when OUR EGGS
   was opened beside it. This one is controlled by Nav, which keeps exactly
   one of the two open at a time. Same look and the same click-to-open
   behaviour as before; Escape and clicking outside close it. */
export function StoryMenu({ item, open, onOpenChange }) {
  const buttonRef = useRef(null);
  const wrapRef = useRef(null);
  const id = "nav-our-story";

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        onOpenChange(false);
        buttonRef.current && buttonRef.current.focus();
      }
    };
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, onOpenChange]);

  return (
    <div ref={wrapRef} className="relative text-left z-50">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => onOpenChange(!open)}
        className="flex items-center text-sm font-medium text-gray-900 rounded-md focus:outline-none"
      >
        <span className="px-3 py-2 rounded-md text-sm font-medium text-white uppercase hover:bg-gray-700 hover:text-white">
          {item.name}
          <ChevronDownIcon
            className="inline-block h-3.5 w-3.5 ml-0.5 -mt-0.5"
            style={{ transform: open ? "rotate(180deg)" : "none" }}
            aria-hidden="true"
          />
        </span>
      </button>
      <div
        id={id}
        hidden={!open}
        className="origin-top-right absolute z-30 right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
      >
        <div className="py-1">
          {item.children.map((child) => (
            <a
              key={child.name}
              href={child.href}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
            >
              {child.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

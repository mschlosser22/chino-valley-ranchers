import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";

import { MEGA_MENU, PRODUCTS, CARD_DEFAULTS } from "./megaMenuData";

/* The OUR EGGS mega menu (Figma "CVR Mega Menu", Nov 2026).

   The Figma has one state: desktop, open, drawn over a screenshot of the live
   site. Its geometry is placed here as proportions of the nav's content box
   (max-w-7xl less px-8, 1216px at 1280 and up), at 0.84 CSS px per design unit
   -- the ratio at which the design's bar, logo and items match the live ones.
   The layout CSS is in globals.css under "Mega menu".

   Behaviour the design does not specify, built to the usual disclosure
   pattern:
   - Mouse: hover opens (short delay), leaving closes (longer delay, so the
     pointer can travel from the trigger down into the panel).
   - Touch and keyboard: the trigger is a button; tap or Enter toggles it.
   - Escape closes and returns focus to OUR EGGS; clicking outside closes.
   - The panel sits after the bar in the DOM so it can span the viewport, so
     Tab from OUR EGGS is routed into the panel and out again to RECIPES.
   - Nothing in the panel -- and none of its images -- loads until the menu is
     first opened (or hovered towards). */

const OPEN_DELAY = 90;
const CLOSE_DELAY = 280;
export const MEGA_MENU_ID = "mega-menu-our-eggs";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useMegaMenu({ onOpen } = {}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timer = useRef(null);
  const hoverOpenedAt = useRef(0);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;
  const openNow = useCallback(() => {
    setOpen(true);
    onOpenRef.current && onOpenRef.current();
  }, []);
  const show = useCallback(() => {
    clear();
    setMounted(true);
    openNow();
  }, [openNow]);
  const hide = useCallback((focusTrigger = false) => {
    clear();
    setOpen(false);
    if (focusTrigger && triggerRef.current) triggerRef.current.focus();
  }, []);

  // Mouse only: touch fires pointerenter too, and a tap is a click.
  const onPointerEnter = (e) => {
    if (e.pointerType !== "mouse") return;
    clear();
    setMounted(true); // start loading as soon as the pointer is on its way
    timer.current = setTimeout(() => {
      hoverOpenedAt.current = Date.now();
      openNow();
    }, OPEN_DELAY);
  };
  const onPointerLeave = (e) => {
    if (e.pointerType !== "mouse") return;
    clear();
    timer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  const onTriggerClick = () => {
    // A click that lands just after hover opened the menu is the same
    // gesture finishing, not a request to close it again.
    if (open && Date.now() - hoverOpenedAt.current < 600) return;
    open ? hide() : show();
  };

  const onTriggerKeyDown = (e) => {
    if (e.key === "Tab" && !e.shiftKey && open && panelRef.current) {
      const first = panelRef.current.querySelector(FOCUSABLE);
      if (first) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const onPanelKeyDown = (e) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const items = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter(
      (el) => el.offsetParent !== null
    );
    if (!items.length) return;
    if (e.shiftKey && document.activeElement === items[0]) {
      e.preventDefault();
      triggerRef.current && triggerRef.current.focus();
    } else if (!e.shiftKey && document.activeElement === items[items.length - 1]) {
      // On to whatever follows OUR EGGS in the bar.
      const nav = triggerRef.current && triggerRef.current.closest("nav");
      if (!nav) return;
      const all = [...nav.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null && !panelRef.current.contains(el)
      );
      const next = all[all.indexOf(triggerRef.current) + 1];
      if (next) {
        e.preventDefault();
        hide();
        next.focus();
      }
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") hide(true);
    };
    const onDown = (e) => {
      const nav = triggerRef.current && triggerRef.current.closest("nav");
      if (nav && !nav.contains(e.target)) hide();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, hide]);

  useEffect(() => () => clear(), []);

  return {
    open,
    mounted,
    triggerRef,
    panelRef,
    hide,
    hoverProps: { onPointerEnter, onPointerLeave },
    onTriggerClick,
    onTriggerKeyDown,
    onPanelKeyDown,
  };
}

export function MegaMenuTrigger({ menu, className = "" }) {
  return (
    <button
      ref={menu.triggerRef}
      type="button"
      aria-expanded={menu.open}
      aria-controls={MEGA_MENU_ID}
      onClick={menu.onTriggerClick}
      onKeyDown={menu.onTriggerKeyDown}
      {...menu.hoverProps}
      className={`mm-trigger ${menu.open ? "mm-trigger--open" : ""} ${className}`}
    >
      Our Eggs
      <ChevronDownIcon className="mm-chevron" aria-hidden="true" />
    </button>
  );
}

function pct([l, t, w, h]) {
  return { left: `${l}%`, top: `${t}%`, width: `${w}%`, height: `${h}%` };
}

function ProductCard({ id }) {
  const p = PRODUCTS[id];
  const eggs = p.eggs === undefined ? CARD_DEFAULTS.eggs : p.eggs;
  const burst = p.burst || CARD_DEFAULTS.burst;
  return (
    /* The card repeats the hovered product's link for the mouse; it is
       hidden from assistive tech and the tab order, since the same link is
       already in the list. */
    <a
      href={p.href}
      className="mm-card"
      data-mm-card
      tabIndex={-1}
      aria-hidden="true"
    >
      <span className="mm-card__ground" />
      <img
        src={`/images/mega-menu/${p.image}.webp`}
        alt=""
        className="mm-card__product"
        style={pct(p.box)}
        decoding="async"
      />
      {eggs && (
        <img src="/images/mega-menu/two-eggs.png" alt="" className="mm-card__deco" style={pct(eggs)} />
      )}
      <img src="/images/mega-menu/burst.svg" alt="" className="mm-card__deco" style={pct(burst)} />
      {/* Title and description stack, so a two-line title pushes the copy
          down rather than over it. */}
      <span className="mm-card__text">
        <span className="mm-card__title" data-mm-title>
          {p.name}
        </span>
        <span className="mm-card__desc" data-mm-desc>
          {p.description}
        </span>
      </span>
    </a>
  );
}

export function MegaMenuPanel({ menu }) {
  const [tab, setTab] = useState(MEGA_MENU[0].id);
  const [active, setActive] = useState(MEGA_MENU[0].defaultProduct);
  const current = MEGA_MENU.find((t) => t.id === tab);

  // Each opening starts where the design does: Eggs, Organic Free Range.
  useEffect(() => {
    if (menu.open) {
      setTab(MEGA_MENU[0].id);
      setActive(MEGA_MENU[0].defaultProduct);
    }
  }, [menu.open]);

  // Once open, fetch the other cards' images in the background so hovering
  // between products does not wait on the network.
  useEffect(() => {
    if (!menu.open) return;
    const t = setTimeout(() => {
      Object.values(PRODUCTS).forEach((p) => {
        const img = new Image();
        img.src = `/images/mega-menu/${p.image}.webp`;
      });
    }, 400);
    return () => clearTimeout(t);
  }, [menu.open]);

  const choose = (t) => {
    setTab(t.id);
    setActive(t.defaultProduct);
  };

  const onTabKey = (e, i) => {
    const d = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = MEGA_MENU[(i + d + MEGA_MENU.length) % MEGA_MENU.length];
    choose(next);
    const el = document.getElementById(`mm-tab-${next.id}`);
    el && el.focus();
  };

  return (
    <div
      id={MEGA_MENU_ID}
      ref={menu.panelRef}
      className="mm-panel"
      hidden={!menu.open}
      role="region"
      aria-label="Our eggs"
      onKeyDown={menu.onPanelKeyDown}
      {...menu.hoverProps}
    >
      {menu.mounted && (
        <div className="mm-container">
          <div className="mm-stage">
            <div className="mm-tabs" role="tablist" aria-orientation="vertical" aria-label="Egg categories">
              {MEGA_MENU.map((t, i) => (
                <button
                  key={t.id}
                  id={`mm-tab-${t.id}`}
                  type="button"
                  role="tab"
                  aria-selected={t.id === tab}
                  aria-controls={`mm-tabpanel-${t.id}`}
                  tabIndex={t.id === tab ? 0 : -1}
                  className={`mm-tab ${t.id === tab ? "mm-tab--active" : ""}`}
                  onClick={() => choose(t)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && t.id !== tab && choose(t)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  {t.label}
                </button>
              ))}
              {/* Not in the Figma. OUR EGGS used to link to /products and now
                  opens this panel, so the all-eggs page needs a way in. */}
              <a href="/products" className="mm-all">
                View all our eggs <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            {/* Decorative rules from the Figma's "Navigation Structural
                Elements": connectors from the tabs to the columns and from
                the columns to the card, and a rule under each half. */}
            <span className="mm-rule mm-rule--conn-l" aria-hidden="true" />
            <span className="mm-rule mm-rule--conn-r" aria-hidden="true" />
            <span className="mm-rule mm-rule--div-l" aria-hidden="true" />
            <span className="mm-rule mm-rule--div-r" aria-hidden="true" />

            {MEGA_MENU.map((t) => (
              <div
                key={t.id}
                id={`mm-tabpanel-${t.id}`}
                role="tabpanel"
                aria-labelledby={`mm-tab-${t.id}`}
                hidden={t.id !== tab}
                className="mm-tabpanel"
              >
                {t.columns.map((col, ci) => (
                  <div
                    key={ci}
                    /* A tab with nothing in its second column (Liquid,
                       Cooked) lets the first take that room, so long names
                       stay on one line. */
                    className={`mm-col mm-col--${ci + 1} ${
                      ci === 0 && !t.columns[1].length ? "mm-col--wide" : ""
                    }`}
                    data-mm-col={ci + 1}
                  >
                    {col.map((g) => (
                      <div key={g.heading} className="mm-group">
                        <p className="mm-heading">
                          <span data-mm-heading>{g.heading}</span>
                        </p>
                        <ul className="mm-list">
                          {g.items.map((id) => {
                            const p = PRODUCTS[id];
                            return (
                              <li key={id}>
                                <a
                                  href={p.href}
                                  className={`mm-link ${active === id ? "mm-link--active" : ""}`}
                                  onPointerEnter={() => setActive(id)}
                                  onFocus={() => setActive(id)}
                                >
                                  {p.lines
                                    ? p.lines.map((l, i) => (
                                        <span key={l}>
                                          {i > 0 && <br />}
                                          {l}
                                          {i < p.lines.length - 1 ? " " : ""}
                                        </span>
                                      ))
                                    : p.name}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}

            <div className="mm-card-slot">
              <ProductCard id={active} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Phones and tablets (below 1024px). The Figma has no design here; this
   follows the existing hamburger menu's style. OUR EGGS expands in place to
   the same categories, groups and products, with no cards -- the list is the
   content, and a phone menu should stay short and fast. */
export function MobileEggsMenu({ itemClassName = "" }) {
  const [open, setOpen] = useState(false);
  const id = "mobile-our-eggs";
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={`${itemClassName} w-full flex items-center justify-between text-left`}
      >
        Our Eggs
        <ChevronDownIcon
          className="h-5 w-5"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
          aria-hidden="true"
        />
      </button>
      <div id={id} hidden={!open} className="mm-mobile">
        <a href="/products" className="mm-mobile__link">
          View all our eggs
        </a>
        {MEGA_MENU.map((t) => (
          <div key={t.id} className="mm-mobile__cat">
            <p className="mm-mobile__cat-label">{t.label}</p>
            {t.columns.flat().map((g) => (
              <div key={g.heading} className="mm-mobile__group">
                <p className="mm-mobile__heading">{g.heading}</p>
                {g.items.map((pid) => (
                  <a key={pid} href={PRODUCTS[pid].href} className="mm-mobile__link">
                    {PRODUCTS[pid].name}
                  </a>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";

/**
 * Behaviour for the Jammy landing page.
 *
 * Ported from the design prototype's DCLogic componentDidMount. Everything is
 * scoped to the passed-in root ref and torn down on unmount, so navigating away
 * leaves no scroll listeners or observers behind.
 *
 * Respects prefers-reduced-motion: with it set, reveals are shown immediately
 * and the letter-drip, parallax and badge/sticker entrances are skipped. The
 * CSS also neutralises the looping animations.
 */
export function useJammyInteractions(rootRef) {
  const cleanupRef = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const teardown = cleanupRef.current;
    const q = (sel) => Array.from(root.querySelectorAll(sel));
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ── Scroll reveals ───────────────────────────────────────── */
    const reveals = q(".jammy-reveal");
    const show = (el) => el.classList.add("is-visible");

    if (reduceMotion) {
      reveals.forEach(show);
    } else {
      // Stagger within each group of six so a row of cards cascades.
      reveals.forEach((el, i) => {
        el.style.transitionDelay = `${(i % 6) * 70}ms`;
      });

      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                show(e.target);
                io.unobserve(e.target);
              }
            });
          },
          { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
        );
        reveals.forEach((el) => io.observe(el));
        teardown.push(() => io.disconnect());

        // Protein badge and "hard part" sticker spin in once on entry.
        const spinIn = (sel, anim, threshold) => {
          const el = root.querySelector(sel);
          if (!el) return;
          const obs = new IntersectionObserver(
            (entries) => {
              entries.forEach((e) => {
                if (e.isIntersecting) {
                  e.target.style.animation = anim;
                  obs.unobserve(e.target);
                }
              });
            },
            { threshold }
          );
          obs.observe(el);
          teardown.push(() => obs.disconnect());
        };
        // The badge pops in square; only the sticker keeps its tilt.
        spinIn(
          "[data-badge]",
          "jammyPopIn .7s cubic-bezier(.34,1.56,.64,1) forwards",
          0.3
        );
        spinIn(
          "[data-sticker]",
          "jammySpinIn .8s cubic-bezier(.34,1.56,.64,1) .25s forwards",
          0.25
        );
      } else {
        reveals.forEach(show);
      }

      // Safety net: never leave content invisible if an observer misfires.
      const fallback = setTimeout(() => reveals.forEach(show), 4000);
      teardown.push(() => clearTimeout(fallback));
    }

    /* ── Hero lockup: letters bounce into place, then hold a slow wobble ── */
    const lockup = root.querySelector("[data-lockup]");
    if (lockup && !reduceMotion) {
      const letters = Array.from(lockup.querySelectorAll("[data-letter]"));

      let wobbleTimer;
      let started = false;
      const run = () => {
        // Both the image-load handler and the hard-start timer call this, and
        // whichever loses the race must not restart an animation already
        // playing -- that reads as the wordmark falling in twice.
        if (started) return;
        started = true;

        letters.forEach((el, i) => {
          el.style.animation = `jammyDripBounce 1.15s cubic-bezier(.3,0,.4,1) ${
            260 + i * 70
          }ms both`;
        });
        wobbleTimer = setTimeout(() => {
          lockup.style.animation = "jammyWobble 7s ease-in-out infinite";
        }, 260 + (letters.length - 1) * 70 + 1250);
      };

      // Wait for the letter images so the sequence doesn't start half-loaded.
      const pending = letters.filter((el) => !el.complete);
      if (!pending.length) {
        run();
      } else {
        let left = pending.length;
        const done = () => {
          if (--left <= 0) run();
        };
        pending.forEach((el) => {
          el.addEventListener("load", done);
          el.addEventListener("error", done);
        });
        const hardStart = setTimeout(run, 2500);
        teardown.push(() => clearTimeout(hardStart));
      }
      teardown.push(() => clearTimeout(wobbleTimer));
    }

    /* ── Parallax ─────────────────────────────────────────────── */
    if (!reduceMotion) {
      const layers = q("[data-parallax]");
      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const vh = window.innerHeight;
          layers.forEach((el) => {
            const host = el.closest("section") || el.parentElement;
            if (!host) return;
            const r = host.getBoundingClientRect();
            if (r.bottom < -200 || r.top > vh + 200) return;
            const rate = parseFloat(el.getAttribute("data-parallax")) || 0;
            const mid = r.top + r.height / 2 - vh / 2;
            el.style.willChange = "transform";
            const inner = el.firstElementChild || el;
            inner.style.transform = `translate3d(0,${(-mid * rate).toFixed(
              1
            )}px,0)`;
          });
          ticking = false;
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      onScroll();
      teardown.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      });
    }

    /* ── Golden-hour gallery: hovered tile expands, siblings collapse ── */
    const grid = root.querySelector(".jammy-tiles");
    if (grid) {
      const tiles = Array.from(grid.querySelectorAll("[data-tile]"));
      const DEFAULT_INDEX = 1;
      const cols = (active) =>
        tiles.map((_, i) => (i === active ? "3.4fr" : "1fr")).join(" ");

      tiles.forEach((tile, i) => {
        const img = tile.querySelector("img");
        const enter = () => {
          grid.style.gridTemplateColumns = cols(i);
          if (img) img.style.transform = "scale(1.06)";
        };
        const leave = () => {
          if (img) img.style.transform = "none";
        };
        tile.addEventListener("mouseenter", enter);
        tile.addEventListener("mouseleave", leave);
        teardown.push(() => {
          tile.removeEventListener("mouseenter", enter);
          tile.removeEventListener("mouseleave", leave);
        });
      });

      const reset = () => {
        grid.style.gridTemplateColumns = cols(DEFAULT_INDEX);
      };
      grid.addEventListener("mouseleave", reset);
      teardown.push(() => grid.removeEventListener("mouseleave", reset));
    }

    /* ── Hover on buttons and cards ────────────────────────────
       QA: "Remove drop shadow from the hover state of buttons. Just the
       scale animation is sufficient." So this scales rather than lifting,
       and paints no shadow. */
    q("[data-lift]").forEach((el) => {
      const enter = () => {
        el.style.transform = "scale(1.04)";
      };
      const leave = () => {
        el.style.transform = "none";
      };
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      el.addEventListener("focus", enter);
      el.addEventListener("blur", leave);
      teardown.push(() => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
        el.removeEventListener("focus", enter);
        el.removeEventListener("blur", leave);
      });
    });

    return () => {
      teardown.forEach((fn) => fn());
      cleanupRef.current = [];
    };
  }, [rootRef]);
}

export default useJammyInteractions;

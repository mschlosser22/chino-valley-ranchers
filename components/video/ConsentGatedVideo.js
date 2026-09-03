import { useState } from "react";

import { useConsent } from "../../context/consent";

/**
 * Rewrites a YouTube embed URL to the privacy-preserving nocookie domain.
 *
 * Embed URLs live in ~30 content JSON files, so this normalises at render time
 * rather than by rewriting content. Editors can keep pasting ordinary YouTube
 * URLs into the CMS without reintroducing the tracking domain.
 */
export function toNoCookie(src) {
  if (!src || typeof src !== "string") return src;

  return src
    .replace("://www.youtube.com/", "://www.youtube-nocookie.com/")
    .replace("://youtube.com/", "://www.youtube-nocookie.com/")
    .replace("://m.youtube.com/", "://www.youtube-nocookie.com/");
}

/**
 * A YouTube embed that transmits nothing until it is allowed to.
 *
 * With marketing consent the iframe renders immediately, exactly as before.
 * Without it, a placeholder stands in and the visitor can load the player with
 * one click -- an explicit, per-video choice.
 *
 * The placeholder deliberately does not use img.youtube.com thumbnails: those
 * are themselves a Google request and would defeat the point. It is drawn from
 * brand colours instead.
 */
export function ConsentGatedVideo({
  src,
  title = "YouTube video player",
  className = "",
  id,
}) {
  const { consent, ready, openPreferences } = useConsent();
  const [loadedByClick, setLoadedByClick] = useState(false);

  const url = toNoCookie(src);
  const allowed = ready && consent.marketing;

  // `id` sits on the wrapper, not the iframe, so anything targeting it -- e.g.
  // the ScrollMagic scene keyed to #trigger in FeedVideo -- still finds an
  // element while the video is behind the consent placeholder.
  if (allowed || loadedByClick) {
    return (
      <div id={id} className={`aspect-w-16 aspect-h-9 ${className}`}>
        <iframe
          src={url}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return (
    <div id={id} className={`aspect-w-16 aspect-h-9 ${className}`}>
      <div className="w-full h-full bg-chinodarkblue flex flex-col items-center justify-center text-center px-6">
        <button
          type="button"
          onClick={() => setLoadedByClick(true)}
          className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-chinoyellow focus-visible:ring-offset-2 focus-visible:ring-offset-chinodarkblue rounded-md px-4 py-3"
        >
          <span className="flex items-center justify-center mx-auto h-14 w-20 rounded-xl bg-chinored group-hover:bg-chinoyellow transition-colors">
            {/* Play triangle */}
            <span
              aria-hidden="true"
              className="block w-0 h-0 ml-1 border-t-[12px] border-b-[12px] border-l-[20px] border-t-transparent border-b-transparent border-l-white"
            />
          </span>
          <span className="block font-din uppercase tracking-wider text-white text-lg mt-4">
            Load video
          </span>
        </button>

        <p className="font-lato text-white text-sm leading-snug mt-3 max-w-md">
          Playing this video loads it from YouTube, which may set cookies.{" "}
          <button
            type="button"
            onClick={openPreferences}
            className="underline text-chinoyellow focus:outline-none focus-visible:ring-2 focus-visible:ring-chinoyellow rounded-sm"
          >
            Cookie settings
          </button>
        </p>
      </div>
    </div>
  );
}

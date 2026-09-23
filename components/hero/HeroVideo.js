import Image from "next/image";
import ReactMarkdown from "react-markdown";

import {
  InlineTextarea,
  InlineImage,
  BlocksControls,
} from "react-tinacms-inline";

import { InlineWysiwyg } from "../../components/tinacms/InlineWYSIWYG";

export function HeroVideo(props) {
  return (
    <header
      /* h-screen, not min-h-[400px]: this project is on Tailwind 2.2.19, which
         has no arbitrary-value support, so `min-h-[400px]` and `h-[400px]`
         compiled to nothing at all. The header collapsed to its headline --
         77px on a phone -- and `overflow-hidden` clipped the 844px video down
         to a sliver under the nav. The video was always there and playing; it
         had no box to show in. */
      className="relative overflow-hidden lg:overflow-visible z-0 w-full h-screen flex items-center"
      role="banner"
    >
      {/* Same reason: h-[400px] resolved to 0px on this Tailwind version. */}
      <div className="absolute inset-0 h-full w-full">
        <video
          className="w-full h-screen absolute top-0 left-0 object-cover"
          src={`https://res.cloudinary.com/dmfgntgym/video/fetch/q_auto:eco/https://www.chinovalleyranchers.com/${props.video.src}`}
          autoPlay
          loop
          playsInline
          muted
        ></video>
      </div>

      <div className="max-w-7xl mx-auto z-40 text-center">
        <h1 className="text-3xl lg:text-7xl text-white font-ultra uppercase tracking-wide hero-video">
          <InlineWysiwyg name="heading" format="markdown" sticky>
            <ReactMarkdown>{props.heading}</ReactMarkdown>
          </InlineWysiwyg>
        </h1>
      </div>
    </header>
  );
}

export const heroVideoBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <HeroVideo {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Hero",
    defaultItem: {
      heading: "Some Headline Here",
      image: "/images/hero-products.jpg",
    },
    fields: [
      {
        name: "video",
        label: "Video",
        component: "group",
        fields: [
          {
            name: "src",
            label: "src",
            component: "text",
          },
        ],
      },
      {
        name: "heading",
        label: "Heading",
        component: "text",
      },
    ],
  },
};

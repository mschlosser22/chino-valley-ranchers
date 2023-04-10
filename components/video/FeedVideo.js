import Image from "next/image";
import { useRef } from "react";
import {
  InlineTextarea,
  InlineImage,
  BlocksControls,
} from "react-tinacms-inline";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Spring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import { Controller, Scene } from "react-scrollmagic";

export function FeedVideo(props) {
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const parallax = useRef(null);

  const handleAsyncTo = async (next, cancel) => {
    await next({ opacity: 1, color: "#ffaaee" });
    await next({ opacity: 0, color: "rgb(14,26,19)" });
  };

  return (
    <>
      <div
        className="w-full relative -mt-16 -mb-12 z-10 sm:mb-10 lg:pb-24 bg-cover bg-no-repeat bg-fixed pt-12"
        style={{ backgroundImage: `url('/images/dirt-bg.png')` }}
      >
        <Parallax ref={parallax} pages={1}>
          <ParallaxLayer
            offset={0}
            speed={10}
            factor={1}
            className="z-0"
            style={{
              backgroundAttachment: "fixed",
              backgroundImage: `url('/images/chicken-feet.png')`,
            }}
          />
        </Parallax>
        <div className="max-w-5xl mx-auto pt-12 pb-24 lg:pt-28 relative">
          <Controller>
            <Scene duration={200} triggerElement="#trigger">
              {(progress, event) => (
                <>
                  <div className="grid grid-cols-12 relative z-30">
                    <div className="col-span-12">
                      <div className="text-3xl sm:text-6xl lg:text-7xl text-chinored font-ultra uppercase tracking-wide mb-8 text-center lg:pt-0">
                        <InlineTextarea name="heading" />
                      </div>
                    </div>

                    <div className="col-span-12 z-40 sm:px-4 lg:px-0">
                      <div className="border-8 border-white rounded">
                        <div className="aspect-w-16 aspect-h-9">
                          <iframe
                            id="trigger"
                            src={props.video.src}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-12 relative lg:-mt-6">
                      <div className="lg:max-w-xl mx-auto pr-4 sm:pr-0">
                        <div
                          ref={ref}
                          className="bg-cover bg-no-repeat px-8 pt-8 pb-12 text-left flex items-center text-xl leading-body lg:text-3xl lg:leading-body text-white font-lato font-bold tracking-wide"
                          style={{
                            backgroundImage: `url('/images/content-bg.png')`,
                          }}
                        >
                          <InlineTextarea name="content" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden xl:block xl:absolute -right-32 bottom-24 2xl:-right-52 2xl:bottom-48 z-40">
                    <Spring
                      config={{
                        mass: 1,
                        tension: 120,
                        friction: 14,
                      }}
                      from={{ transform: `rotate(15deg)` }}
                      to={[{ transform: `rotate(-${progress * 5}deg)` }]}
                    >
                      {(styles) => (
                        <animated.div style={styles}>
                          <img
                            src={`https://res.cloudinary.com/dmlnena1u/image/fetch/q_auto:eco/https://www.chinovalleyranchers.com/${props.image.src}`}
                            alt={props.image.alt}
                          />
                        </animated.div>
                      )}
                    </Spring>
                  </div>
                </>
              )}
            </Scene>
          </Controller>
        </div>
      </div>
    </>
  );
}

export const feedVideoBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <FeedVideo {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Feed Video",
    defaultItem: {},
    fields: [
      {
        name: "heading",
        label: "Heading",
        component: "text",
      },
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
        name: "content",
        label: "Content",
        component: "textarea",
      },
      {
        name: "image",
        label: "Image",
        component: "group",
        fields: [
          {
            name: "src",
            label: "Image",
            component: "image",
          },
          {
            name: "alt",
            label: "Alt Text",
            component: "text",
          },
        ],
      },
    ],
  },
};

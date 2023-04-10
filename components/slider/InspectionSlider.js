import Image from "next/image";
import {
  InlineTextarea,
  InlineImage,
  BlocksControls,
} from "react-tinacms-inline";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export function InspectionSlider(props) {
  const responsive = {
    mobile: {
      breakpoint: { max: 4000, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div
        className="relative bg-cover bg-no-repeat -mt-24 z-20 pb-12 lg:pb-36"
        style={{ backgroundImage: `url('/images/grass-bg.png')` }}
      >
        <div className="max-w-7xl mx-auto relative">
          <Carousel
            className="absolute -top-0"
            responsive={responsive}
            additionalTransfrom={0}
            arrows={false}
            infinite
            renderDotsOutside
            showDots
            slidesToSlide={1}
            swipeable
          >
            {props.slides.map((slide, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-8 pt-48 relative"
              >
                {/* Image */}
                <div className=" relative col-span-12 lg:col-span-3 flex justify-center lg:block px-24 lg:px-0">
                  <img
                    src={`https://res.cloudinary.com/dmlnena1u/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com/${slide.image.src}`}
                    alt={slide.image.src}
                  />
                </div>

                {/* Content */}
                <div className="col-span-12 lg:col-span-9 font-ultra text-3xl sm:leading-body lg:text-6xl tracking-wide text-white uppercase pt-10">
                  <p className="text-center lg:text-left px-8 lg:px-0">
                    {slide.content}
                  </p>
                  {/* Inspection Point */}
                  <div className="pt-12 pb-20 relative lg:right-36 px-8 sm:px-12 lg:px-0">
                    <img
                      className="hidden lg:block"
                      src="https://res.cloudinary.com/dmlnena1u/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/inspection.png"
                      alt="inspection point"
                    />
                    <img
                      className="lg:hidden"
                      src="https://res.cloudinary.com/dmlnena1u/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/inspection-mobile.png"
                      alt="inspection point"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}

export const inspectionSliderBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <InspectionSlider {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Inpsection Slider",
    defaultItem: {},
    fields: [
      {
        name: "classes",
        label: "Tailwind CSS Classes",
        component: "text",
      },
      {
        label: "Slides",
        name: "slides",
        component: "group-list",
        itemProps: (item) => ({
          key: item.id,
          label: item.name,
        }),
        defaultItem: () => ({
          name: "New Slide",
        }),
        fields: [
          {
            label: "Content",
            name: "content",
            component: "textarea",
          },
          {
            label: "Image",
            name: "image",
            component: "group",
            fields: [
              {
                label: "Image",
                name: "src",
                component: "image",
                parse: (media) => `/images/products/${media.filename}`,
                uploadDir: () => "/images/products/",
              },
              {
                label: "Image Alt Tag",
                name: "alt",
                component: "text",
              },
            ],
          },
        ],
      },
    ],
  },
};

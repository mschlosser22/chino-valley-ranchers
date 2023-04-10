import Image from "next/image";
import { CtaButton } from "../button/CtaButton";
import { useState, useEffect } from "react";
import styles from "@tailwindcss/typography/src/styles";

const buttonProps = {
  button: {
    link: {
      url: "https://youtu.be/kDgO22nhVEQ",
    },
    text: "Watch the video",
  },
};

export function CtaSpecialDelivery(props) {
  const [y, setY] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ctaHeight, setCtaHeight] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    setY(window.scrollY);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    window.addEventListener("load", function () {
      setIsLoaded(true);
      setCtaHeight(true);
    });

    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 0) {
        setIsLoaded(false);
        setInView(true);
        setCtaHeight(false);
      } else {
        setIsLoaded(true);
        setInView(true);
        setCtaHeight(true);
      }
    });
  }, [y]);

  return (
    <div
      className={`relative ${inView ? "block" : "hidden"} ${
        ctaHeight ? "max-h-screen lg:max-h-max" : "max-h-0"
      }`}
    >
      <div
        className={`bg-balloonsBanner bg-cover bg-center bg-no-repeat  pt-4 text-white z-60 2xl:h-96 xl:h-72 lg:h-64 md:h-44 sm:h-40 xs:h-32 h-28 top-0 transform transition duration-700 ease-in-out origin-top ${
          isLoaded ? "scale-y-100" : "scale-y-0"
        } ${ctaHeight ? "h-auto" : "h-0"}`}
      >
        <div className="flex justify-center xl:ml-96 lg:ml-72 md:ml-36 sm:ml-48">
          <div className="absolute left-2">
            <img
              src="https://res.cloudinary.com/dmlnena1u/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/twoGuysBanner.png"
              className="sm:block hidden items-end 2xl:h-96 xl:h-72 lg:h-64 md:h-44 sm:h-36"
            />
            {/* <Image
                        src='/images/twoGuysBanner.png'
                        height={376}
                        width={653}
                        alt="Chino Valley Ranchers"
                    /> */}
          </div>
          <div className="absolute top-0 2xl:left-[625px] xl:left-[485px] lg:left-[420px] md:left-[280px] sm:left-[260px] left-4">
            <img
              src="https://res.cloudinary.com/dmlnena1u/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com/images/museBanner.gif"
              className="xl-h-72 lg:h-56 md:h-28 sm:h-24 h-20"
            />
          </div>

          <div>
            <div className="text-center mx-auto lg:w-min xl:pt-10 lg:pt-8 sm:pt-4">
              <div>
                <h1 className="uppercase z-60 2xl:text-6xl xl:text-4xl lg:text-3xl sm:text-xl text-xl font-ultra text-ctablue leading-4">
                  Special Delivery!
                </h1>
              </div>
              <div className="bg-ctablue w-max sm:mx-auto ml-3 lg:px-6 md:px-4 md:py-3 px-1 xl:mt-4 md:mt-2 xs:mt-3 mt-1.5 xl:mb-6 lg:mb-4 md:mb-3 xs:mb-4 mb-2">
                <h3 className="uppercase text-white 2xl:text-4xl xl:2xl lg:text-xl sm:text-sm text-md font-ultra">
                  What's in the box?
                </h3>
              </div>
              <div className="pl-2">
                <CtaButton {...buttonProps} />
              </div>
            </div>
          </div>

          <div className="absolute bottom-[5] right-4">
            <img
              src="https://res.cloudinary.com/dmlnena1u/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/womanBanner.png"
              className=" sm:block hidden 2xl:h-96 xl:h-72 lg:h-64 md:h-44 sm:h-40"
            />
            {/* <Image
                        src='/images/womanBanner.png'
                        height={396}
                        width={428}
                        alt="Chino Valley Ranchers"
                    /> */}
          </div>
        </div>

        <button
          className=" absolute lg:right-20 md:right-12 right-2 top-2 bg-ctablue rounded-full h-6 w-6 flex items-center justify-center font-bold z-50"
          onClick={() => {
            setIsLoaded(false), setCtaHeight(false);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
}

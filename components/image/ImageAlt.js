import {
  InlineText,
  InlineTextarea,
  InlineImage,
  BlocksControls,
  InlineGroup,
} from "react-tinacms-inline";

import { Spring, animated, interpolate } from "react-spring";
import { Controller, Scene } from "react-scrollmagic";

export function ImageAlt(props) {
  const scrollPositionOverHalf = (progress) => {
    if (progress * 100 >= 25) {
      return true;
    } else {
      return false;
    }
  };

  const scrollPositionOverHalfAlt = (progress) => {
    if (progress * 100 >= 75) {
      return true;
    } else {
      return false;
    }
  };

  const scrollPositionEven = (progress) => {
    if (Math.ceil(progress * 10) % 2 == 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Controller>
      <div
        className="relative pb-4 lg:pb-12 bg-repeat-y bg-cover"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper.png')`,
        }}
      >
        <div className="max-w-5xl mx-auto text-center" id="ahc">
          <div className="mb-2 px-8 xl:px-0">
            <BlocksControls index={props.index}>
              <div className="px-8 text-center flex justify-center relative">
                <Scene duration={400} triggerElement="#ahc">
                  {(progress, event) => (
                    <>
                      <Spring
                        style="perspective: 400px"
                        config={{
                          mass: 1,
                          tension: 80,
                          friction: 14,
                        }}
                        from={{ transform: "rotate(-5deg) scale(0.9)" }}
                        to={[
                          {
                            transform: `rotate(${progress * 5 - 5}deg) scale(${
                              (progress + 9) / 10
                            })`,
                          },
                        ]}
                      >
                        {(styles) => (
                          <animated.div style={styles} className="">
                            <img src="https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/heart.png" />
                          </animated.div>
                        )}
                      </Spring>
                    </>
                  )}
                </Scene>
                <div>
                  <InlineImage
                    src="image.src"
                    parse={(media) => media.id}
                    uploadDir={() => "/images/"}
                    alt="image.alt"
                    className="relative top-12 right-12"
                  />
                </div>
              </div>
            </BlocksControls>
          </div>
        </div>
      </div>
    </Controller>
  );
}

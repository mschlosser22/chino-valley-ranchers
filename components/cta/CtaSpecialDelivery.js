import Image from 'next/image'
import { CtaButton } from '../button/CtaButton'
import { useState, useEffect } from 'react';
import styles from '@tailwindcss/typography/src/styles';

const buttonProps = {
    button: {
      link: {
        url: "https://youtu.be/kDgO22nhVEQ"
      },
      text: "Watch the video"
    }
  }

  export function CtaSpecialDelivery(props) {
    const [y, setY] = useState(null);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ ctaHeight, setCtaHeight ] = useState(false);
    const [ inView, setInView ] = useState(true);

    useEffect(() => {
      setY(window.scrollY);
    }, []);

    useEffect(() => {

      window.scrollTo(0, 0);

      window.addEventListener("load", function(){
        setIsLoaded(true);
        setCtaHeight(true);
      });

      window.addEventListener("scroll", function() {
        if(window.pageYOffset > 0) {
          setIsLoaded(false);
          setInView(true);
          setCtaHeight(false);
        } else {
          setIsLoaded(true);
          setInView(true);
          setCtaHeight(true);
        }
      });

    }, [y])

    return(
      <div className={`relative ${inView ? 'block' : 'hidden' } ${ctaHeight ? 'max-h-screen lg:max-h-max' : 'max-h-0' }`}>
        <div className={`bg-balloonsBanner bg-cover bg-center bg-no-repeat  pt-4 text-white z-60 xl:h-96 lg:h-64 md:h-52 sm:h-40 xs:h-24 h-20 top-0 transform transition duration-700 ease-in-out origin-top ${isLoaded ? 'scale-y-100' : 'scale-y-0'} ${ctaHeight ? 'h-auto' : 'h-0' }`}>
            <div className="flex justify-center">
                <div className="lg:left-8 md:left-4 left-2">
                    <img src="/images/twoGuysBanner.png" className="items-end xl:h-96 lg:h-64 md:h-52 sm:h-36 xs:h-24 h-16" />
                    {/* <Image
                        src='/images/twoGuysBanner.png'
                        height={376}
                        width={653}
                        alt="Chino Valley Ranchers"
                    /> */}
                </div>

                <div>
                    <div className="text-center xl:pt-12 md:pt-6 sm:pt-4">
                        <div className="">
                            <h1 className="uppercase xl:text-7xl lg:text-4xl md:text-2xl sm:text-xl text-sm font-ultra text-ctablue leading-4">Special Delivery!</h1>
                        </div>
                        <div className="bg-ctablue w-max sm:mx-auto ml-3 lg:px-6 md:px-4 md:py-3 px-1 md:mt-3 xs:mt-2 lg:mb-8 md:mb-3 xs:mb-4 mb-0.5">
                            <h3 className="uppercase text-white xl:text-5xl lg:text-2xl md:text-lg sm:text-sm text-xs font-ultra">What's in the box?</h3>
                        </div>
                        <div className="pl-2">
                            <CtaButton {...buttonProps} />
                        </div>
                    </div>
                </div>

                <div className="bottom-[5] xl:right-32 lg:right-24 md:right-18 right-4">
                    <img src="/images/womanBanner.png" className="xl:h-96 lg:h-64 md:h-56 sm:h-40 xs:h-28 h-20" />
                    {/* <Image
                        src='/images/womanBanner.png'
                        height={396}
                        width={428}
                        alt="Chino Valley Ranchers"
                    /> */}
                </div>
            </div>

              <button
                className="absolute lg:right-20 md:right-12 right-2 top-2 bg-ctablue rounded-full h-6 w-6 flex items-center justify-center font-bold z-50"
                onClick={ () => {setIsLoaded(false), setCtaHeight(false)} }
              >X</button>
          </div>
        </div>
    )
  }
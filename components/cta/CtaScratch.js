// import Image from 'next/image'
import { CtaButton } from '../button/CtaButton'
import { useState, useEffect } from 'react';
import styles from '@tailwindcss/typography/src/styles';

const buttonProps = {
    button: {
      link: {
        url: "https://youtu.be/rZaYeqYh-Ik"
      },
      text: "Watch the video"
    }
  }

  export function CtaScratch(props) {
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
        <div className={`bg-scratchBanner bg-cover bg-center bg-no-repeat pt-4 text-white z-60 xl:h-full lg:h-64 sm:h-48 xs:h-32 h-24 top-0 transform transition duration-700 ease-in-out origin-top ${isLoaded ? 'scale-y-100' : 'scale-y-0'} ${ctaHeight ? 'h-auto' : 'h-0' }`}>
            <div className="grid grid-cols-2 3xl:gap-80 2xl:gap-64 xl:gap-56 lg:gap-56 md:gap-36 sm:gap-28 gap-16">
                <div className="col-span-1 p-0 m-0">
                    <img src="/images/suitcase.png" className="3xl:h-96 xl:h-80 lg:h-56 md:h-44 sm:h-44  h-20 3xl:pl-40 xl:pl-32 lg:pl-12 md:pl-20 sm:pl-12 pl-6" />
                    {/* <Image
                        src='/images/twoGuysBanner.png'
                        height={376}
                        width={653}
                        alt="Chino Valley Ranchers"
                    /> */}
                </div>

                <div className="col-span-1">
                    <div class="sm:flex block relative">
                        <img src="/images/scratch.png" className="3xl:h-80 xl:h-64 lg:h-48 md:h-44 sm:h-36 sm:h-32 xs:h-28 h-16 md:ml-0 ml-4 z-10" />
                        {/* <Image
                            src='/images/womanBanner.png'
                            height={396}
                            width={428}
                            alt="Chino Valley Ranchers"
                        /> */}
                        <div>
                            <div className="3xl:-ml-8 2xl:-ml-7 xl:-ml-6 lg:-ml-5 md:-ml-4 sm:-ml-3 -ml-16 absolute bottom-0 3xl:mb-20 2xl:mb-14 xl:mb-10 lg:mb-10 md:mb-8 sm:mb-6 -mb-2">
                                <CtaButton {...buttonProps} />
                            </div>
                        </div>
                    </div>
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
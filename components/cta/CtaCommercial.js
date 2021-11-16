import Image from 'next/image'
import { CtaButton } from '../button/CtaButton'
import { useState, useEffect } from 'react';

const buttonProps = {
  button: {
    link: {
      url: "https://youtu.be/RtAomjuOTOs"
    },
    text: "Watch the video"
  }
}

export function CtaCommercial(props) {

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
      <div className={`relative z-60 bg-ctagray ${inView ? 'block' : 'hidden' } ${ctaHeight ? 'max-h-screen lg:max-h-96' : 'max-h-0' }`}>
        <div className={`cta-commercial bg-ctagray text-white z-60 top-0 w-full overflow-hidden transform transition duration-700 ease-in-out h-auto origin-top ${isLoaded ? 'scale-y-100' : 'scale-y-0'} ${ctaHeight ? 'h-auto' : 'h-0' }`}>
          <div className="max-w-7xl mx-auto py-8 px-8 md:px-6 lg:px-10 pb-12 grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8">
              <div className="text-2xl lg:text-4xl font-ultra">Knockout hunger with #ChinoValleyEggs!</div>
              <div className="text-lg lg:text-2xl font-ultra text-chinoorange my-4 mb-4 lg:mb-10">The Internet’s latest VIRAL SENSATION! </div>
              <div className="flex gap-8 content-center">
                <CtaButton {...buttonProps} />
                <div className="flex content-center items-center">
                  <div className="border-b-2 border-chinoorange flex-shrink flex-grow-0">OR WATCH ON</div>
                </div>

                <div className="gap-2 flex lg:items-center">

                  <a href="https://www.instagram.com/p/CWEVYRBpFvw/" className="cursor-pointer" target="_blank">
                    <div className="h-[28px]">
                      <Image
                        src='/images/instagram.png'
                        height={28}
                        width={28}
                        alt="Chino Valley Ranchers"
                      />
                    </div>
                  </a>

                  <a href="https://youtu.be/RtAomjuOTOs" className="cursor-pointer" target="_blank">
                    <div className="h-[28px]">
                      <Image
                        src='/images/youtube.png'
                        height={28}
                        width={28}
                        alt="Chino Valley Ranchers"
                      />
                    </div>
                  </a>

                  <a href="https://fb.watch/9aDBt4jxYm/" className="cursor-pointer" target="_blank">
                    <div className="h-[28px]">
                      <Image
                        src='/images/facebook.png'
                        height={28}
                        width={28}
                        alt="Chino Valley Ranchers"
                      />
                    </div>
                  </a>

                </div>

              </div>
            </div>
            <div className="col-span-12 lg:col-span-4 relative">
              <div className="border-2 border-chinoorange">
                <Image
                  src='/images/boxer.gif'
                  height={270}
                  width={480}
                  alt="Chino Valley Ranchers Boxer Commercial"
                />
              </div>
              <button
                className="absolute bg-chinogray rounded-full h-6 w-6 flex items-center justify-center -top-4 -right-4 lg:-top-4 lg:-right-10 font-bold z-50"
                onClick={ () => {setIsLoaded(false), setCtaHeight(false)} }
              >X</button>
            </div>
          </div>

        </div>
      </div>
    )

}
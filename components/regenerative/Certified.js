export function Certified() {
    return (
      <>
          <div className="relative bg-repeat" backgroundImage={`/images/carton-bg.jpg`}>
              <img src="/images/carton-bg.jpg" alt="Carton" className="absolute w-full h-full" />
              <div className="absolute hidden lg:grid lg:grid-cols-2 w-full h-full">
                <div className="bg-chinolightblue h-full w-full">

                </div>
                <div></div>
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto pl-8">
                  <div className="relative text-left text-white tracking-wide px-8 bg-chinolightblue py-20 border-r-4 border-white">As the original trailblazers of organic egg farming, Chino Valley Ranchers is proud to be Regenerative Organic Certified, which is a revolutionary new certification for food that represents the highest standard for organic agriculture in the world.</div>
                  <div className="relative w-full h-full flex items-center">
                    <img src="/images/certified-organic.png" alt="Certified Organic" className="justify-self-center pl-8" />
                  </div>
              </div>
          </div>
      </>
    );
  }
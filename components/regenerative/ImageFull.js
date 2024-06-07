export function ImageFull() {
    return (
      <>
          <div className="relative bg-white border-t-4 border-b-4 border-white" backgroundImage={"/images/chicken-closeup.jpg"}>
              <img src="/images/chicken-closeup.jpg" alt="Chicken Closeup" className="w-full absolute h-full" />
              <div className="py-32 grid grid-cols-2 max-w-5xl mx-auto lg:gap-12 px-8">
                <div className="hidden lg:block"></div>
                <p className="text-white z-50 relative text-xl">We believe this farming method represents the next generation of agriculture and provides the best opportunity for our birds to continue to live and thrive.</p>
              </div>
          </div>
      </>
    );
  }
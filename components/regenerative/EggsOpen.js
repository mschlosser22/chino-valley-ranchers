export function EggsOpen() {
    return (
      <>
          <div className="relative bg-white border-t-4 border-b-4 border-white">
              <img src="/images/eggs-open.jpg" alt="Chicken Closeup" className="w-full h-full absolute" />
              <div className="py-24 grid grid-cols-2 max-w-5xl mx-auto gap-12 px-8">
                <div className="hidden lg:block"></div>
                <p className="text-white z-50 relative text-lg uppercase flex flex-col gap-4 lg:px-12 tracking-wider">
                    <h3 className="font-bold text-2xl">Our regenerative eggs are pasture Raised On Family Farms</h3>
                    <span>Sustainable And Regenerative Farming Practices</span>
                    <span>Ethically Produced For Future Generations</span>
                </p>
              </div>
          </div>
      </>
    );
  }
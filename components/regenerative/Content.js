import { Button } from "../button/Button";

const button = {
    text: "Learn More",
    link: {
        url: "/contact",
    },
}

const buttonOther = {
    text: "Purchase Our Organic Regenerative Eggs",
    link: {
        url: "/products",
    },
}

export function Content() {
    return (
      <>
          <div className="relative bg-white">
              <div className="w-full pt-16 pb-24 grid grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto gap-24 px-8">
                  <div className="text-gray-900 tracking-wider">
                    <p className="text-lg">Regenerative organic agriculture is a collection of practices that focus on regenerative soil health and the full farm ecosystem. This can include crop rotation, compositing, and zero use of persistent chemical pesticides and fertilizers. Soil is the bedrock of our food system, and we are committed to protecting it for future generations.</p>
                    <div className="mt-12">
                        <Button button={button} />
                    </div>
                  </div>
                  <div>
                    <div className="bg-chinored text-white px-3 py-3 max-w-[450px] text-center font-semibold">
                        <a href={buttonOther.link.url} className="uppercase text-2xl text-center">{buttonOther.text}</a>
                    </div>
                  </div>
              </div>
          </div>
      </>
    );
  }
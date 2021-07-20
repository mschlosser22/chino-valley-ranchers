import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'

export function ContactForm(props) {

    console.log(props)

    return(
        <>
        <div className="w-full relative -mt-12 -mb-12 z-20 bg-cover bg-no-repeat" style={{ backgroundImage: `url('/images/bg-paper.png')`}}>
            <div className="max-w-5xl mx-auto relative">

                <div className="grid grid-cols-12 relative">

                    <div className="col-span-12 pb-12 px-8 lg:px-0">

                        {/* Address */}
                        {props.address.map( (item, index) => (
                            <p key={index} className="text-chinoblue font-ultra text-xl lg:text-4xl text-center break-words lg:break-normal">{item}</p>
                        ))}
                        <p className="text-chinoblue font-ultra text-xl lg:text-4xl text-center break-words lg:break-normal"><a href="mailto:info@chinovalleyranchers.com">info@chinovalleyranchers.com</a></p>

                    </div>

                    <div className="col-span-12 pb-12 grid grid-cols-12 px-8 lg:px-0">

                        {/* Form */}
                        <form
                            action="https://getform.io/f/51bccb03-3af0-4a69-bc96-f636c4b96cb1"
                            method="POST"
                            className="col-span-12 grid grid-cols-1 gap-y-6"
                        >

                        <div className="col-span-1">
                            <label htmlFor="name" className="block text-xl font-medium text-gray-700">
                                Name
                            </label>
                            <div className="mt-1">
                                <input
                                type="text"
                                name="name"
                                id="name"
                                autoComplete="name"
                                className="py-3 px-4 block w-full shadow-sm focus:ring-chinoblue focus:border-chinoblue border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="email" className="block text-xl font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                className="py-3 px-4 block w-full shadow-sm focus:ring-chinoblue focus:border-chinoblue border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="subject" className="block text-xl font-medium text-gray-700">
                                Subject
                            </label>
                            <div className="mt-1">
                                <input
                                type="text"
                                name="subject"
                                id="subject"
                                autoComplete="subject"
                                className="py-3 px-4 block w-full shadow-sm focus:ring-chinoblue focus:border-chinoblue border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="message" className="block text-xl font-medium text-gray-700">
                                Message
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={10}
                                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                    defaultValue={''}
                                />
                            </div>
                        </div>

                        <div className="col-span-1 text-center mt-12 mb-24">
                            <button
                                type="submit"
                                className="px-5 py-2 bg-chinored text-white uppercase font-din font-bold text-xl lg:text-4xl rounded-lg tracking-wide cursor-pointer"
                            >
                            Submit
                            </button>
                        </div>

                        </form>

                    </div>

                    </div>

                </div>
        </div>
        </>
    )

}

export const contactFormBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <ContactForm {...data} />
      </BlocksControls>
    ),
    template: {
        label: 'Contact Form',
        defaultItem: {

        },
        fields: [

        ],
    },
}
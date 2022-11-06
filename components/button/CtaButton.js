export function CtaButton(props) {

  const {button} = props

  return(

  <a href={button.link.url} target="_blank" className={`block 3xl:text-5xl 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-md text-sm 2xl:px-12 xl:px-10 lg:px-6 md:px-6 sm:px-4 px-2 sm:py-2 py-1 mr-2 text-center bg-chinored text-white uppercase font-din font-bold xs:text-sm text-xs md:text-xl lg:text-4xl rounded-lg cursor-pointer`}>{button.text}</a>
  )

}
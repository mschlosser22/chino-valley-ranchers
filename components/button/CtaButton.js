export function CtaButton(props) {

  const {button} = props

  return(

  <a href={button.link.url} target="_blank" className={`2xl:text-5xl xl:text-2xl lg:text-xl md:text-md px-5 py-2  bg-chinored text-white uppercase font-din font-bold xs:text-sm text-xs md:text-xl lg:text-4xl rounded-lg tracking-wide cursor-pointer z-60`}>{button.text}</a>
  )

}
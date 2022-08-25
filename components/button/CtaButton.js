export function CtaButton(props) {

  const {button} = props

  return(

  <a href={button.link.url} target="_blank" className={`xl:text-5xl xs:px-5 xs:py-2 px-3 py-1.5 bg-chinored text-white uppercase font-din font-bold xs:text-sm text-xs md:text-xl lg:text-4xl rounded-lg tracking-wide cursor-pointer z-60`}>{button.text}</a>
  )

}
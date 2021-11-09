export function CtaButton(props) {

  const {button} = props

  return(

  <a href={button.link.url} target="_blank" className={`px-5 py-2 bg-chinored text-white uppercase font-din font-bold text-xl lg:text-4xl rounded-lg tracking-wide cursor-pointer z-60`}>{button.text}</a>
  )

}
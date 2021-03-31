import Image from "next/image"

export default function Index(props) {
  const classes = ["wrap__img"]
  props.className ? classes.push(props.className) : ""
  props.width ? classes.push(props.width) : ""

  return (
    <Image
      src={props.image}
      className={classes.join(" ")}
      alt="Image"
      width={props.width}
      height={props.height}
    />
  )
}
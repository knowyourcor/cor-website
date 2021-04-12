export default function Index(props) {
  const classes = ["text__paragraph"]

  props.className ? classes.push(props.className) : "";

  return <p className={classes.join(" ")}>{props.text}</p>
}
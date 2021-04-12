import styles from "./section.module.scss";

const Section = (props) => {
  // Create array with base class
  const classes = [styles.section];

  props.backgroundColor
    ? classes.push(
      styles[
      `background${props.backgroundColor.charAt(0).toUpperCase() +
      props.backgroundColor.slice(1).replace(/\s/, "")
      }`
      ]
    )
    : "";

  props.align ? classes.push(styles[`align-${props.align}`]) : "";
  props.fullScreen ? classes.push(styles.fullScreen) : "";
  props.noPadding ? classes.push(styles.noPadding) : "";
  props.className ? classes.push(props.className) : "";

  return (
    <section id={props.id} className={classes.join(" ")} style={props.style}>
      { props.children}
    </section >
  );
};

export default Section;

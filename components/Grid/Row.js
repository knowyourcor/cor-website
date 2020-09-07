import styles from "./grid.module.scss";
const Row = (props) => {
  // Define our breakpoint names
  const breakpointLabels = ["xs", "sm", "md", "lg", "xl", "xxl"];

  // Create array with base Row class
  const classes = [styles.Row];

  // Add justify class
  if (props.justify) {
    classes.push(styles[`justify-${props.justify}`]);
  }

  if (props.className) {
    classes.push(props.className);
  }

  // Handle text alignment
  // @param {Object} textAlgin prop
  const handleTextAlign = (alignments) => {
    for (let [breakpoint, value] of Object.entries(alignments)) {
      classes.push(styles[`text-${value}@${breakpoint}`]);
    }
  };

  // Handle flex direction
  // @param {Object} flexDirection prop
  const handleFlexDirection = (directions) => {
    for (let [breakpoint, value] of Object.entries(directions)) {
      classes.push(styles[`flex-direction-${value}@${breakpoint}`]);
    }
  };

  // Check props for either textAlign or flexDirection
  for (let [label, obj] of Object.entries(props)) {
    if (label === "textAlign") {
      handleTextAlign(obj);
    } else if (label === "flexDirection") {
      handleFlexDirection(obj);
    }
  }

  return <div className={classes.join(" ")}>{props.children}</div>;
};

export default Row;

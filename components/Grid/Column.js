import styles from "./grid.module.scss";
const Column = (props) => {
  // Define our breakpoint names
  const breakpointLabels = ["xs", "sm", "md", "lg", "xl", "xxl"];

  // Create array with base Column class
  const classes = [styles.Column];

  // Handle columns
  // @param {Object} columns prop
  const handleColumns = (columns) => {
    for (let [breakpoint, value] of Object.entries(columns)) {
      if (breakpointLabels.includes(breakpoint)) {
        classes.push(styles[`column-${value}@${breakpoint}`]);
      }
    }
  };

  // Handle offsets
  // @param {Object} offsets prop
  const handleOffsets = (offsets) => {
    for (let [breakpoint, value] of Object.entries(offsets)) {
      classes.push(styles[`column-offset-${value}@${breakpoint}`]);
    }
  };

  // Handle self alignments
  // @param {Object} alignSelf prop
  const handleAlignSelf = (alignments) => {
    for (let [breakpoint, value] of Object.entries(alignments)) {
      classes.push(styles[`align-self-${value}@${breakpoint}`]);
    }
  };

  // Handle overlaps
  // @param {Object} offsets prop
  const handleOverlaps = (overlaps) => {
    for (let [breakpoint, value] of Object.entries(overlaps)) {
      classes.push(styles[`overlap-${value}@${breakpoint}`]);
    }
  };

  // Check props for either columns or offsets
  for (let [label, obj] of Object.entries(props)) {
    if (label === "columns") {
      handleColumns(obj);
    } else if (label === "offsets") {
      handleOffsets(obj);
    } else if (label === "alignSelf") {
      handleAlignSelf(obj);
    } else if (label === "overlaps") {
      handleOverlaps(obj);
    }
  }

  // Handle background color
  props.backgroundColor
    ? classes.push(
        styles[
          `background${
            props.backgroundColor.charAt(0).toUpperCase() +
            props.backgroundColor.slice(1)
          }`
        ]
      )
    : "";

  // Handle justify
  props.justify ? classes.push(styles[`justify-${props.justify}`]) : "";

  return <div className={classes.join(" ")}>{props.children}</div>;
};

export default Column;

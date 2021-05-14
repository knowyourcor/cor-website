// import styles from "./grid.module.scss";
// const Row = (props) => {
//   // Define our breakpoint names
//   const breakpointLabels = ["xs", "sm", "md", "lg", "xl", "xxl"];

//   // Create array with base Row class
//   const classes = [styles.Row];

//   // Add justify class
//   if (props.justify) {
//     classes.push(styles[`justify-${props.justify}`]);
//   }

//   if (props.className) {
//     classes.push(props.className);
//   }

//   // Handle text alignment
//   // @param {Object} textAlgin prop
//   const handleTextAlign = (alignments) => {
//     for (let [breakpoint, value] of Object.entries(alignments)) {
//       classes.push(styles[`text-${value}@${breakpoint}`]);
//     }
//   };

//   // Handle flex direction
//   // @param {Object} flexDirection prop
//   const handleFlexDirection = (directions) => {
//     for (let [breakpoint, value] of Object.entries(directions)) {
//       classes.push(styles[`flex-direction-${value}@${breakpoint}`]);
//     }
//   };

//   // Check props for either textAlign or flexDirection
//   for (let [label, obj] of Object.entries(props)) {
//     if (label === "textAlign") {
//       handleTextAlign(obj);
//     } else if (label === "flexDirection") {
//       handleFlexDirection(obj);
//     }
//   }

//   return <div className={classes.join(" ")}>{props.children}</div>;
// };

// export default Row;

// TODO: pass class name - scoped or non-scoped
import React from "react";
import getConfig from "./config";
import styles from "./grid.module.scss";

// interface Props {
//   children: React.ReactNode;
//   justify?: {
//     [key: string]: 'normal' | 'start' | 'center' | 'end';
//   };
//   align?: {
//     [key: string]: 'normal' | 'start' | 'center' | 'end';
//   };
//   spacing?: {
//     [key: string]: 0 | 1 | 2 | 3 | 4;
//   };
//   className?: string;
// }

export default function Row({ children, justify, align, spacing, className }) {
  // Define our breakpoint labels using breakpoints keys
  const breakpointLabels = Object.keys(getConfig.breakpoints);

  // Setup our class array
  const classNames = [styles.row];

  // The justification within breakpoint
  // @param {Object} justify prop
  // Usage: <Row justify={{ xs: "center", md: "start", lg: "end" }}></Row>
  const handleJustify = (justify) => {
    for (let [breakpoint, value] of Object.entries(justify)) {
      if (breakpointLabels.includes(breakpoint)) {
        classNames.push(styles[`justify-${value}@${breakpoint}`]);
      }
    }
  };

  // The alignment within breakpoint
  // @param {Object} align prop
  // Usage: <Row align={{ xs: "center", md: "start", lg: "end" }}></Row>
  const handleAlign = (align) => {
    for (let [breakpoint, value] of Object.entries(align)) {
      if (breakpointLabels.includes(breakpoint)) {
        classNames.push(styles[`align-${value}@${breakpoint}`]);
      }
    }
  };

  // The gutter spacing within breakpoint
  // @param {Object} spacing prop
  // Usage: <Row spacing={{ xs: 0, md: 4, lg: 2 }}></Row>
  const handleSpacing = (spacing) => {
    for (let [breakpoint, value] of Object.entries(spacing)) {
      if (breakpointLabels.includes(breakpoint)) {
        classNames.push(styles[`spacing-${value}@${breakpoint}`]);
      }
    }
  };

  justify && handleJustify(justify);
  align && handleAlign(align);
  spacing && handleSpacing(spacing);

  return (
    <div className={[classNames.join(" "), className].join(" ")}>
      {children}
    </div>
  );
}

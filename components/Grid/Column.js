// import styles from "./grid.module.scss";
// const Column = (props) => {
//   // Define our breakpoint names
//   const breakpointLabels = ["xs", "sm", "md", "lg", "xl", "xxl"];

//   // Create array with base Column class
//   const classes = [styles.Column];

//   // Handle columns
//   // @param {Object} columns prop
//   const handleColumns = (columns) => {
//     for (let [breakpoint, value] of Object.entries(columns)) {
//       if (breakpointLabels.includes(breakpoint)) {
//         classes.push(styles[`column-${value}@${breakpoint}`]);
//       }
//     }
//   };

//   // Handle offsets
//   // @param {Object} offsets prop
//   const handleOffsets = (offsets) => {
//     for (let [breakpoint, value] of Object.entries(offsets)) {
//       classes.push(styles[`column-offset-${value}@${breakpoint}`]);
//     }
//   };

//   // Handle self alignments
//   // @param {Object} alignSelf prop
//   const handleAlignSelf = (alignments) => {
//     for (let [breakpoint, value] of Object.entries(alignments)) {
//       classes.push(styles[`align-self-${value}@${breakpoint}`]);
//     }
//   };

//   // Handle overlaps
//   // @param {Object} offsets prop
//   const handleOverlaps = (overlaps) => {
//     for (let [breakpoint, value] of Object.entries(overlaps)) {
//       classes.push(styles[`overlap-${value}@${breakpoint}`]);
//     }
//   };

//   // Handle order
//   // @param {Object} order prop
//   const handleOrders = (orders) => {
//     for (let [breakpoint, value] of Object.entries(orders)) {
//       classes.push(styles[`order-${value}@${breakpoint}`]);
//     }
//   };

//   // Check props for either columns or offsets
//   for (let [label, obj] of Object.entries(props)) {
//     if (label === "columns") {
//       handleColumns(obj);
//     } else if (label === "offsets") {
//       handleOffsets(obj);
//     } else if (label === "alignSelf") {
//       handleAlignSelf(obj);
//     } else if (label === "overlaps") {
//       handleOverlaps(obj);
//     } else if (label === "orders") {
//       handleOrders(obj);
//     }
//   }

//   // Handle background color
//   props.backgroundColor
//     ? classes.push(
//       styles[
//       `background${props.backgroundColor.charAt(0).toUpperCase() +
//       props.backgroundColor.slice(1)
//       }`
//       ]
//     )
//     : "";

//   // Handle justify
//   props.justify ? classes.push(styles[`justify-${props.justify}`]) : "";
//   props.zIndex ? classes.push(styles[`zIndex-${props.zIndex}`]) : "";
//   props.className ? classes.push(props.className) : "";

//   return <div className={classes.join(" ")}>{props.children}</div>;
// };

// export default Column;

// TODO: Allow props to be passed in
// TODO: Allow additional classes to be passed in
import getConfig from "./config";
import styles from "./Grid.module.scss";

// interface Props {
//   children: React.ReactNode;
//   columns?: {
//     [key: string]: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
//   };
//   offsets?: {
//     [key: string]: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
//   };
//   ordering?: {
//     [key: string]: number;
//   };
//   [key: string]: any;
// }

export default function Column({ children, columns, offsets, ordering }) {
  // Define our breakpoint labels using breakpoints keys
  const breakpointLabels = Object.keys(getConfig.breakpoints);

  // Setup our class array
  const classNames = [styles.column];

  // The column size within breakpoint
  // @param {Object} columns prop
  // Usage: <Column columns={{ xs: 7, sm: 6, md: 3 }}></Column>
  const handleColumns = (columns) => {
    for (let [breakpoint, value] of Object.entries(columns)) {
      if (breakpointLabels.includes(breakpoint)) {
        classNames.push(styles[`column-${value}@${breakpoint}`]);
      }
    }
  };

  // The column offset amount within breakpoint
  // @param {Object} offsets prop
  // Usage: <Column offsets={{ xs: 3, sm: 2, md: 1 }}></Column>
  const handleOffsets = (offsets) => {
    for (let [breakpoint, value] of Object.entries(offsets)) {
      classNames.push(styles[`column-offset-${value}@${breakpoint}`]);
    }
  };

  // The column order amount within breakpoint
  // @param {Object} order prop
  // Usage: <Column ordering={{ xs: 1, md: 2 }}></Column>
  const handleOrdering = (orders) => {
    for (let [breakpoint, value] of Object.entries(orders)) {
      classNames.push(styles[`column-order-${value}@${breakpoint}`]);
    }
  };

  columns && handleColumns(columns);
  offsets && handleOffsets(offsets);
  ordering && handleOrdering(ordering);

  return <div className={classNames.join(" ")}>{children}</div>;
}

import { motion, AnimatePresence } from "framer-motion";
import Content from "./Content";

import styles from "./shopAccordion.module.scss";

export default function Item({
  data,
  backgroundColor,
  isExpanded,
  expandItem,
  index,
}) {
  const activeTabClass = isExpanded ? styles.activeTab : "";

  const handleIndex = (index) => {
    const number = index + 1;
    if (number < 9) {
      return `0${number}`;
    } else {
      return number;
    }
  };

  return (
    <div
      className={[
        styles.item,
        isExpanded && styles.activeItem,
        styles[`item_${index}`],
      ].join(" ")}
    >
      <div
        className={[styles.label, activeTabClass].join(" ")}
        onClick={expandItem}
      >
        <div className={styles.accordionHeader}>
          <span
            className={styles.itemIndex}
            style={{ backgroundColor: backgroundColor }}
          >
            {handleIndex(index)}
          </span>
          <span className={styles.itemLabel}>{data.title[0].text}</span>
          <div className={styles.indexLine} />
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isExpanded && <Content {...data} />}
      </AnimatePresence>
    </div>
  );
}

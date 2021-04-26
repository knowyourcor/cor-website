import { motion, AnimatePresence } from "framer-motion";
import Content from "./Content";

import styles from "./accordion.module.scss";

export default function Item({ data, isExpanded, expandItem, index }) {
  const activeTabClass = isExpanded ? styles.activeTab : "";

  const line = {
    initial: { y1: 0, y2: 20 },
    minus: { y1: 10, y2: 10 },
    plus: {
      y1: 0,
      y2: 20,
    },
  };

  const handleIndex = (index) => {
    const number = index + 1;
    if (number < 9) {
      return `0${number}`;
    } else {
      return number;
    }
  };

  return (
    <>
      <div className={[styles.item, isExpanded && styles.activeItem].join(" ")}>
        <div
          className={[styles.label, activeTabClass].join(" ")}
          onClick={expandItem}
        >

          <div className={styles.accordionHead}>
            <span className={styles.itemIndex}>{handleIndex(index)}</span>
            <span className={styles.itemLabel}>{data.title[0].text}</span>
            <div className={styles.cBorder} />
          </div>
        </div>
        <AnimatePresence initial={false}>
          {isExpanded && <Content {...data} />}
        </AnimatePresence>
      </div>
    </>
  );
}

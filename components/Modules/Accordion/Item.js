import { motion, AnimatePresence } from "framer-motion";
import Content from "./Content";

import styles from "./accordion.module.scss";

export default function Item({ data, bullet, isExpanded, expandItem, index }) {
  const activeTabClass = isExpanded ? styles.activeTab : "";

  const handleIndex = (index) => {
    const number = index + 1;
    if (number < 9) {
      return `0${number}`;
    } else {
      return number;
    }
  };

  const bulletStyle = bullet === "disc" ? "•" : handleIndex(index);

  return (
    <>
      <div className={[styles.item, isExpanded && styles.activeItem].join(" ")}>
        <button
          className={[styles.label, activeTabClass].join(" ")}
          onClick={expandItem}
          aria-label={
            isExpanded
              ? `${data.title[0].text} content expanded`
              : `Expand ${data.title[0].text} content`
          }
        >
          <span className={styles.itemIndex} aria-hidden="true">
            {bulletStyle}
          </span>
          <span className={styles.itemLabel}>{data.title[0].text}</span>
          <div className={styles.indexLine} />
        </button>
        <AnimatePresence initial={false}>
          {isExpanded && <Content {...data} />}
        </AnimatePresence>
      </div>
    </>
  );
}

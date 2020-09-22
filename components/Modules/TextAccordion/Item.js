import { motion, AnimatePresence } from "framer-motion";
import Content from "./Content";

import styles from "./textAccordion.module.scss";

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
    <div className={styles.item}>
      <div
        className={[styles.label, activeTabClass].join(" ")}
        onClick={expandItem}
      >
        <div>
          <span>{handleIndex(index)}</span> {data.title[0].text}
        </div>
        <AnimatePresence initial={false}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className={styles.icon}
          >
            <g>
              <motion.line
                x1="10"
                x2="10"
                y1="0"
                y2="20"
                fill="none"
                strokeWidth="2"
                variants={line}
                initial="initial"
                animate={isExpanded ? "minus" : "plus"}
              />
              <line y1="10" y2="10" x2="20" fill="none" strokeWidth="2" />
            </g>
          </svg>
        </AnimatePresence>
      </div>
      <AnimatePresence initial={false}>
        {isExpanded && <Content {...data} />}
      </AnimatePresence>
    </div>
  );
}

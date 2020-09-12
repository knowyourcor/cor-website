import { motion, AnimatePresence } from "framer-motion";
import Content from "./Content";

import styles from "./accordion.module.scss";

export default function Item({ data, isExpanded, expandItem }) {
  const activeTabClass = isExpanded ? styles.activeTab : "";

  const line = {
    initial: { y1: 0, y2: 20 },
    minus: { y1: 10, y2: 10 },
    plus: {
      y1: 0,
      y2: 20,
    },
  };

  return (
    <div className={styles.item}>
      <div
        className={[styles.label, activeTabClass].join(" ")}
        onClick={expandItem}
      >
        {data.title[0].text}
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
                stroke="#000"
                strokeWidth="2"
                variants={line}
                initial="initial"
                animate={isExpanded ? "minus" : "plus"}
              />
              <line
                y1="10"
                y2="10"
                x2="20"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />
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

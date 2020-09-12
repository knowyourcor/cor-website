import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "../styles/tabs.module.scss";

const tabData = [
  {
    id: 0,
    label: "Apples",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 1,
    label: "Oranges",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
  {
    id: 2,
    label: "Pears",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function Tabs() {
  const [isOpen, setIsOpen] = useState(tabData[0].id);

  return (
    <div className={styles.tabs}>
      <motion.ul layout className={styles.labels}>
        {tabData.map((item) => (
          <Item
            key={item.id}
            isOpen={item.id === isOpen}
            label={item.label}
            openTab={() => setIsOpen(item.id)}
          />
        ))}
      </motion.ul>

      <div className={styles.tabContent}>
        {tabData.map((item) => (
          <AnimatePresence exitBeforeEnter key={item.id}>
            {item.id === isOpen && <Content tabContent={item.content} />}
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
}

function Item({ label, isOpen, openTab }) {
  const activeTabClass = isOpen ? styles.activeTab : "";
  return (
    <li className={activeTabClass} onClick={openTab}>
      {label}
    </li>
  );
}

function Content({ tabContent }) {
  const contentVariant = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
    hidden: { opacity: 0 },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildrenChildren",
      },
    },
  };

  const itemVariant = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      layout
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={contentVariant}
      className={styles.content}
    >
      <div className={styles.container}>
        <motion.p variants={itemVariant}>{tabContent}</motion.p>
        <motion.p variants={itemVariant}>{tabContent}</motion.p>
        <motion.p variants={itemVariant}>{tabContent}</motion.p>
      </div>
    </motion.div>
  );
}

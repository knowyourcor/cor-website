import { useRef, useEffect } from "react";
import Link from "../Link";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import FocusLock from "react-focus-lock";
import { motion } from "framer-motion";
import styles from "./menu.module.scss";

const Menu = ({ active, toggle, mainMenuData }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current && ref.current.focus();

    ref.current && active
      ? disableBodyScroll(ref.current)
      : enableBodyScroll(ref.current);

    return () => {
      clearAllBodyScrollLocks();
    };
  }, [active]);

  const isActive = active ? styles["menu--active"] : "";

  const navVariant = {
    open: {
      x: 0,
      transition: {
        x: { stiffness: 1000, velocity: 200 },
      },
    },
    closed: {
      x: "-100%",
      transition: {
        x: { stiffness: 1000 },
      },
    },
  };

  const navItemsVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.15 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const navItemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -200 },
      },
    },
    closed: {
      x: -50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <motion.nav
      className={styles.menu}
      ref={ref}
      style={{ transform: "translateX(-100%)" }}
      initial="closed"
      animate={active ? "open" : "closed"}
      variants={navVariant}
    >
      <motion.ul
        className={[styles.mainMenu, active && styles.isMenuOpen].join(" ")}
        variants={navItemsVariants}
      >
        {mainMenuData?.menu_links.map((link, index) => {
          return (
            <motion.li
              key={`${link.link._meta.uid}_${index}`}
              variants={navItemVariants}
            >
              <Link
                activeClassName={styles.active}
                href={`/${link.link._meta.uid}`}
              >
                <a onClick={() => toggle()}>{link.label[0].text}</a>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
      <motion.ul className={styles.subMenu} variants={navItemsVariants}>
        <motion.li variants={navItemVariants}>
          <Link activeClassName={styles.active} href="/">
            <a onClick={() => toggle()}>Legal</a>
          </Link>
        </motion.li>
        <motion.li variants={navItemVariants}>
          <Link activeClassName={styles.active} href="/">
            <a onClick={() => toggle()}>Privacy</a>
          </Link>
        </motion.li>
        <motion.li variants={navItemVariants}>
          <Link activeClassName={styles.active} href="/">
            <a onClick={() => toggle()}>Cookies</a>
          </Link>
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
};

export default Menu;

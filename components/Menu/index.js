import { useRef, useEffect } from "react";
import Link from "../Link";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
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
    <>
      <nav className={styles.menu}>
        <div className={styles.scrollContainer}>
          <ul className={styles.menuItems}>
            {mainMenuData?.menu_links.map((item, index) => {
              if (item.link) {
                return (
                  <li key={`${item.link._meta.uid}_${index}`}>
                    <Link
                      activeClassName={styles.active}
                      href={`/${item.link._meta.uid}`}
                    >
                      <a>{item.label[0].text}</a>
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </nav>

      <motion.nav
        className={[styles.menu, styles.mobile].join(" ")}
        ref={ref}
        style={{ transform: "translateX(-100%)" }}
        initial="closed"
        animate={active ? "open" : "closed"}
        variants={navVariant}
      >
        <div className={styles.scrollContainer}>
          <motion.ul
            className={[styles.menuItems, active && styles.isMenuOpen].join(
              " "
            )}
            variants={navItemsVariants}
          >
            {mainMenuData?.menu_links.map((item, index) => {
              if (item.link) {
                return (
                  <motion.li
                    key={`${item.link._meta.uid}_${index}`}
                    variants={navItemVariants}
                  >
                    <Link
                      activeClassName={styles.active}
                      href={`/${item.link._meta.uid}`}
                    >
                      <a onClick={() => toggle()}>{item.label[0].text}</a>
                    </Link>
                  </motion.li>
                );
              }
            })}
          </motion.ul>
        </div>
      </motion.nav>
    </>
  );
};

export default Menu;

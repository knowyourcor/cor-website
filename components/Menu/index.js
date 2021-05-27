import { useEffect, useRef } from "react";
import Link from "../Link";
import { motion } from "framer-motion";
import styles from "./menu.module.scss";

const Menu = ({ active, toggle, mainMenuData }) => {
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

  const ref = useRef();
  useEffect(() => {
    active ? ref.current?.focus() : ref.current?.blur();
    return () => {
      ref.current.blur();
    };
  }, [active]);

  return (
    <>
      <div className={styles.menu}>
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

      <motion.div
        className={[styles.menu, styles.mobile].join(" ")}
        style={{ transform: "translateX(-100%)" }}
        initial="closed"
        animate={active ? "open" : "closed"}
        variants={navVariant}
        tabIndex={active ? "0" : "-1"}
        aria-hidden={active ? "false" : "true"}
      >
        <div className={styles.scrollContainer}>
          <motion.ul
            className={[styles.menuItems, active && styles.isMenuOpen].join(
              " "
            )}
            aria-hidden={active ? "false" : "true"}
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
                      <a
                        onClick={() => toggle()}
                        tabIndex={active ? "0" : "-1"}
                        aria-hidden={active ? "false" : "true"}
                        ref={index === 0 ? ref : null}
                      >
                        {item.label[0].text}
                      </a>
                    </Link>
                  </motion.li>
                );
              }
            })}
          </motion.ul>
        </div>
      </motion.div>
    </>
  );
};

export default Menu;

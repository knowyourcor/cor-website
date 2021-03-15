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
    <FocusLock disabled={!active}>
      <motion.nav
        className={styles.menu}
        ref={ref}
        style={{ transform: "translateX(-100%)" }}
        initial="closed"
        animate={active ? "open" : "closed"}
        variants={navVariant}
      >
        <div className={styles.top}>
          <Link href="/">
            <a onClick={() => toggle()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22.393 22.393"
                className={styles.iconMark}
              >
                <path d="M19.36 8.544a8.584 8.584 0 11-8.164-5.931V.003a11.194 11.194 0 1010.649 7.736z" />
                <path d="M16.875 9.35l2.485-.807a8.586 8.586 0 00-8.164-5.935V5.22a5.973 5.973 0 015.679 4.126" />
              </svg>
            </a>
          </Link>
          <button className={styles.linkClose} onClick={() => toggle()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16.414"
              height="16.414"
              className={[styles.iconClose]}
            >
              <g fill="none" stroke="#fff" strokeWidth="2">
                <path d="M.707.707l15 15" />
                <path data-name="Line" d="M15.707.707l-15 15" />
              </g>
            </svg>
          </button>
        </div>
        <motion.ul variants={navItemsVariants}>
          {mainMenuData?.menu_links.map((link, index) => {
            return (
              <motion.li
                key={`${link.link._meta.uid}_${index}`}
                variants={navItemVariants}
              >
                {link.link._meta.type === "page" ? (
                  <Link
                    activeClassName={styles.active}
                    href="/[slug]"
                    as={`/${link.link._meta.uid}`}
                  >
                    <a onClick={() => toggle()}>{link.label[0].text}</a>
                  </Link>
                ) : (
                  <Link
                    activeClassName={styles.active}
                    href={`/${link.link._meta.uid}`}
                  >
                    <a onClick={() => toggle()}>{link.label[0].text}</a>
                  </Link>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.nav>
      <div
        className={[styles.mask, isActive].join(" ")}
        onClick={() => toggle()}
      ></div>
    </FocusLock>
  );
};

export default Menu;

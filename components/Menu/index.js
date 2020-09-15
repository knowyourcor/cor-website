import Link from "../Link";
import { motion } from "framer-motion";
import styles from "./menu.module.scss";

// TODO
// Add body scroll lock

const Menu = ({ active, toggle, mainMenuData }) => {
  const isActive = active ? styles["menu--active"] : "";

  const navVariants = {
    open: {
      x: 0,
      transition: {
        x: { stiffness: 1000, velocity: -50 },
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
      transition: { staggerChildren: 0.07, delayChildren: 0.25 },
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
        y: { stiffness: 1000, velocity: -100 },
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
      <motion.nav
        className={styles.menu}
        style={{ transform: "translateX(-100%)" }}
        initial="closed"
        animate={active ? "open" : "closed"}
        variants={navVariants}
      >
        <div className={styles.top}>
          <Link href="/">
            <a className={styles.mark}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22.393"
                height="22.393"
              >
                <path d="M19.36 8.544a8.584 8.584 0 11-8.164-5.931V.003a11.194 11.194 0 1010.649 7.736z" />
                <path d="M16.875 9.35l2.485-.807a8.586 8.586 0 00-8.164-5.935V5.22a5.973 5.973 0 015.679 4.126" />
              </svg>
            </a>
          </Link>
          <button className={styles.close} onClick={() => toggle()}>
            <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="nonzero"
                d="M43.904 0L25 18.856 6.096 0 0 6.096 18.856 25 0 43.904 6.096 50 25 31.144 43.904 50 50 43.904 31.144 25 50 6.096z"
              />
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
                    <a>{link.label[0].text}</a>
                  </Link>
                ) : (
                  <Link
                    activeClassName={styles.active}
                    href={`/${link.link._meta.uid}`}
                  >
                    <a>{link.label[0].text}</a>
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
    </>
  );
};

export default Menu;

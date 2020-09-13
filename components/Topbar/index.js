import { useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import Link from "../Link";
import Logo from "../Logo";
import Menu from "../Menu";

import styles from "./topbar.module.scss";

const Topbar = ({ mainMenuData }) => {
  const [isOpen, toggleOpen] = useState(false);

  const toggleMenu = () => {
    toggleOpen(!isOpen);
  };

  const { scrollY } = useViewportScroll();
  const background = useTransform(
    scrollY,
    [50, 250],
    ["rgba(242, 242, 242, 0)", "rgba(242, 242, 242, 1)"]
  );

  const opacity = useTransform(scrollY, [50, 250], ["0", "1"]);

  return (
    <>
      <motion.div
        className={styles.topbar}
        style={{
          background,
        }}
      >
        <motion.div className={styles.boxShadow} style={{ opacity }} />
        <div className={styles.container}>
          <button onClick={() => toggleMenu()} className={styles.menuToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16">
              <g fill="none" stroke="#000" strokeWidth="2">
                <path d="M22 15H0M22 8H0M22 1H0" />
              </g>
            </svg>
          </button>

          <Link href="/">
            <a
              className={styles.logo}
              aria-expanded="false"
              aria-label="Main menu"
              role="button"
              tabIndex="0"
            >
              <Logo />
            </a>
          </Link>
          <div className={styles.utility}>
            <Link activeClassName={styles.active} href="/account">
              <a aria-label="Account" role="button" tabIndex="1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  viewBox="0 0 20.55 25.606"
                >
                  <path d="M9.987 12.47a6.237 6.237 0 10-6.026-6.033 6.237 6.237 0 006.026 6.033zM9.774 2.421a3.838 3.838 0 11-3.4 3.4 3.842 3.842 0 013.4-3.4z" />
                  <path d="M10.251 13.58c-5.124 0-9.381 4.3-10.23 9.949a1.82 1.82 0 001.809 2.077h17.247a1.47 1.47 0 001.462-1.636c-.688-5.873-5.032-10.39-10.288-10.39zm-7.727 9.59c.9-4.133 4.021-7.191 7.727-7.191s6.829 3.059 7.727 7.191z" />
                </svg>
              </a>
            </Link>
            <Link activeClassName={styles.active} href="/cart">
              <a aria-label="Cart" role="button" tabIndex="2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  viewBox="0 0 27.822 25.799"
                >
                  <path d="M25.951 8.282h-4.388v-.63a7.652 7.652 0 00-15.3 0v.63H1.875A1.87 1.87 0 00.064 10.62l3.561 13.777a1.87 1.87 0 001.81 1.4h16.957a1.87 1.87 0 001.81-1.4l3.561-13.777a1.87 1.87 0 00-1.812-2.338zm-17.238-.63a5.2 5.2 0 0110.4 0v.63h-10.4zm13.225 15.693H5.885l-3.26-12.609h22.572z" />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </motion.div>
      <Menu
        mainMenuData={mainMenuData}
        active={isOpen}
        toggle={() => toggleMenu()}
      />
    </>
  );
};

export default Topbar;

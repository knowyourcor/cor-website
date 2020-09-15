import { useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import Link from "../Link";
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
              <g fill="none" stroke="#000" strokeWidth="1.45">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 80.012 26.196"
                preserveAspectRatio="none"
              >
                <path d="M13.733 21.518a8.754 8.754 0 006.27-2.473l3.467 3.343a13.74 13.74 0 01-9.737 3.808 13.606 13.606 0 01-9.754-3.826 12.26 12.26 0 01-3.976-9.3 12.321 12.321 0 013.992-9.257A13.584 13.584 0 0113.733.005a13.741 13.741 0 019.737 3.808l-3.467 3.341a8.761 8.761 0 00-6.27-2.471 8.74 8.74 0 00-6.235 2.454 7.913 7.913 0 00-2.592 5.965 7.913 7.913 0 002.592 5.965 8.738 8.738 0 006.235 2.455M34.041 19.029a8.671 8.671 0 006.234 2.489 8.677 8.677 0 006.235-2.489 7.983 7.983 0 002.592-5.964 7.882 7.882 0 00-2.575-5.948 8.757 8.757 0 00-6.252-2.438 8.759 8.759 0 00-6.252 2.438 7.883 7.883 0 00-2.574 5.948 7.977 7.977 0 002.593 5.964M40.276 0a13.57 13.57 0 019.72 3.825 12.343 12.343 0 014.01 9.272 12.338 12.338 0 01-4.01 9.272 13.567 13.567 0 01-9.72 3.826 13.565 13.565 0 01-9.719-3.826 12.375 12.375 0 01-4.01-9.3 12.319 12.319 0 013.992-9.257A13.585 13.585 0 0140.276.004M64.355 11.596h5.078a3.028 3.028 0 002.4-1.068 3.609 3.609 0 00.928-2.436 3.617 3.617 0 00-.928-2.438 3.03 3.03 0 00-2.4-1.067h-5.078zm9.912 14.356l-6.97-10.016h-2.942v10.016h-4.9V.244h10.193a7.8 7.8 0 015.71 2.287 7.53 7.53 0 012.311 5.56 7.544 7.544 0 01-1.383 4.44 7.762 7.762 0 01-3.625 2.837l7.355 10.584z" />
              </svg>
            </a>
          </Link>
          <div className={styles.utility}>
            <Link activeClassName={styles.active} href="/account">
              <a
                aria-label="Account"
                role="button"
                tabIndex="1"
                className={styles.activeSnap}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20.55 25.606"
                  className={styles.iconAccount}
                >
                  <path d="M9.987 12.47a6.237 6.237 0 10-6.026-6.033 6.237 6.237 0 006.026 6.033zM9.774 2.421a3.838 3.838 0 11-3.4 3.4 3.842 3.842 0 013.4-3.4z" />
                  <path d="M10.251 13.58c-5.124 0-9.381 4.3-10.23 9.949a1.82 1.82 0 001.809 2.077h17.247a1.47 1.47 0 001.462-1.636c-.688-5.873-5.032-10.39-10.288-10.39zm-7.727 9.59c.9-4.133 4.021-7.191 7.727-7.191s6.829 3.059 7.727 7.191z" />
                </svg>
              </a>
            </Link>
            <Link activeClassName={styles.active} href="/cart">
              <a
                aria-label="Cart"
                role="button"
                tabIndex="2"
                className={styles.activeSnap}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 27.822 25.799"
                  className={styles.iconCart}
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

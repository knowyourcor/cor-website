import { useState, useEffect } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import Link from "../Link";
import Menu from "../Menu";

import styles from "./navigation.module.scss";

const Navigation = ({ mainMenuData, transparent }) => {
  // Menu state
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [scrollDetect, setScrollDetect] = useState(false)

  const { scrollY } = useViewportScroll();

  const background = transparent
    ? useTransform(
      scrollY,
      [50, 250],
      ["rgba(242, 242, 242, 0)", "rgba(242, 242, 242, 1)"]
    )
    : "background: rgba(242, 242, 242, 1)";

  const opacity = useTransform(scrollY, [50, 250], ["0", "1"]);

  useEffect(() => {
    // Background color hack
    // On refresh, if scrolled past y 250px
    // Smooth scroll to top so FramerMotion useViewportScroll
    // is initiated and the background color is added.
    const timer = setTimeout(() => {
      if (window.pageYOffset > 250 && transparent) {
        window.scrollTo({
          top: window.pageYOffset + 1,
          left: 0,
          behavior: "smooth",
        });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY !== 0) {
        setScrollDetect(true)
      } else setScrollDetect(false)
    });
  }, [])

  return (
    <>
      <motion.div
        className={[
          styles.navigation,
          !transparent && styles.withBG,
          scrollDetect && styles.onScroll].join(" ")}
        style={{
          background,
        }}
      >
        <motion.div className={styles.boxShadow} style={{ opacity }} />
        <div className={styles.container}>
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className={[styles.customBurger, isMenuOpen && styles.openBurger].join(" ")}
          >
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16">
              <g fill="none" stroke="#000" strokeWidth="1.45">
                <path d="M22 15H0M22 8H0M22 1H0" />
              </g>
            </svg> */}
            <span></span>
            <span></span>
            <span></span>
          </button>
          <Menu
            mainMenuData={mainMenuData}
            active={isMenuOpen}
            toggle={() => setMenuOpen(!isMenuOpen)}
          />
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
          <div className={styles.cart}>
            <Link href="/">
              <a className={styles.cartIcon}>
                <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60.53,18.71A2,2,0,0,0,59,18H48.85A15,15,0,0,0,34,5H30A15,15,0,0,0,15.15,18H5a2,2,0,0,0-1.53.71A2,2,0,0,0,3,20.35l5.33,30.3A6.51,6.51,0,0,0,14.77,56H49.23a6.51,6.51,0,0,0,6.41-5.36L61,20.35A2,2,0,0,0,60.53,18.71ZM30,9h4a11,11,0,0,1,10.81,9H19.19A11,11,0,0,1,30,9ZM51.71,49.94A2.52,2.52,0,0,1,49.23,52H14.77a2.5,2.5,0,0,1-2.47-2L7.38,22H56.62Z" />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navigation;

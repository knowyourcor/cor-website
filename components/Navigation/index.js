import { useState } from "react";
import { motion } from "framer-motion";
import { FocusOn } from "react-focus-on";
import Link from "../Link";
import Menu from "../Menu";
import MenuToggle from "../MenuToggle";
import Button from "../Button";
import styles from "./navigation.module.scss";

const Navigation = ({ mainMenuData }) => {
  // Menu state
  const [isMenuOpen, setMenuOpen] = useState(false);

  const skipToContentProps = {
    "aria-hidden": isMenuOpen ? "true" : "false",
    ...(isMenuOpen ? { tabIndex: "-1" } : false),
  };

  return (
    <FocusOn enabled={isMenuOpen}>
      <motion.nav
        className={[
          styles.navigation,
          styles.withBG,
          isMenuOpen ? styles.isOpen : "",
          styles.onScroll,
        ].join(" ")}
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
      >
        <motion.div className={styles.boxShadow} aria-hidden="true" />
        <div className={styles.container}>
          <a
            className={styles.skipToContentLink}
            href="#main"
            {...skipToContentProps}
          >
            Skip to Content
          </a>

          <Menu
            mainMenuData={mainMenuData}
            active={isMenuOpen}
            toggle={() => setMenuOpen(!isMenuOpen)}
          />

          <Link href="/">
            <a
              className={[styles.logo, isMenuOpen && styles.menuOpenLogo].join(
                " "
              )}
              aria-label="Return to homepage"
              onClick={() => setMenuOpen(false)}
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
          <div className={styles.callToAction}>
            <Button
              linkData={mainMenuData.call_to_action_link}
              labelData={mainMenuData.call_to_action_label}
            ></Button>
          </div>
          <MenuToggle
            toggle={() => setMenuOpen(!isMenuOpen)}
            isOpen={isMenuOpen}
          />
        </div>
      </motion.nav>
    </FocusOn>
  );
};

export default Navigation;

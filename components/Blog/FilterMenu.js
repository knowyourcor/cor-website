import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FocusOn } from "react-focus-on";
import { useFilterContext } from "../../lib/filterContext";
import styles from "./blog.module.scss";

export default function FilterMenu({
  allPostsTags,
  filterBy,
  toggleTagsMenu,
  isOpen,
}) {
  const router = useRouter();
  const { filterContext, setFilterContext } = useFilterContext();

  const handelTagUpdate = (tag) => {
    setFilterContext(tag.name);
    filterBy(tag.name);
    if (tag.name === "reset") {
      // Shallow update of URL
      router.push(`/blog`, undefined, {
        shallow: true,
      });
    } else {
      // Shallow update of URL
      router.push(`/blog`, `/blog?filter=${tag.slug}`, {
        shallow: true,
      });
    }
    isOpen && toggleTagsMenu();
  };

  const navVariant = {
    open: {
      x: "0%",
      transition: {
        x: { stiffness: 1000, velocity: 200 },
      },
    },
    closed: {
      x: "100%",
      transition: {
        x: { stiffness: 1000 },
      },
    },
  };

  const maskVariant = {
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        x: { duration: 0 },
        opacity: { ease: "easeOut", duration: 0.45 },
      },
    },
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        x: { delay: 0.45, duration: 0, ease: "easeOut" },
        opacity: { ease: "easeOut", duration: 0.45 },
      },
    },
  };

  return (
    <FocusOn enabled={isOpen}>
      <motion.nav
        className={styles.postTags}
        style={{ transform: "translateX(100%)" }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={navVariant}
        aria-hidden={isOpen ? "false" : "true"}
      >
        <div>
          <p>Categories</p>
          <ul>
            <li>
              <button
                onClick={() => handelTagUpdate({ name: null })}
                className={styles.tagName}
                tabIndex={isOpen ? "0" : "-1"}
              >
                All posts
              </button>
            </li>
            {allPostsTags.map((tag) => {
              return (
                <li key={tag.slug}>
                  <button
                    onClick={() => handelTagUpdate(tag)}
                    className={[
                      styles.tagName,
                      filterContext === tag.name && styles.activeFilter,
                    ].join(" ")}
                    tabIndex={isOpen ? "0" : "-1"}
                  >
                    {tag.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.nav>
      <motion.nav
        className={styles.postTagsMask}
        style={{ opacity: 1, transform: "translateX(100%)" }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={maskVariant}
        onClick={toggleTagsMenu}
        tabIndex="-1"
      ></motion.nav>
    </FocusOn>
  );
}

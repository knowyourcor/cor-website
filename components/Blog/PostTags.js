import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { ALL_BLOG_POSTS_QUERY } from "../../lib/ApolloQueries";
import { motion } from "framer-motion";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import FocusLock from "react-focus-lock";
import styles from "./blog.module.scss";

export default function PostTags({
  allPostsTags,
  filterByData,
  filterByQuery,
  isOpen,
  toggleTagsMenu,
  selectedFilter,
  resetFilter,
}) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState(null);
  const ref = useRef();

  const {
    data: postsByTagData,
    loading: postsByTagLoading,
    error: postsByTagError,
    fetchMore,
  } = useQuery(ALL_BLOG_POSTS_QUERY, {
    variables: {
      tag: activeFilter === "reset" ? null : activeFilter,
      after: null,
    },
  });

  useEffect(() => {
    ref.current && ref.current.focus();

    ref.current && isOpen
      ? disableBodyScroll(ref.current)
      : enableBodyScroll(ref.current);

    return () => {
      clearAllBodyScrollLocks();
    };
  }, [isOpen]);

  // Filter by page query on initial load
  useEffect(() => {
    const matchTag = allPostsTags.find((obj) => obj.slug === filterByQuery);
    filterByQuery && setActiveFilter(matchTag.name);
  }, [filterByQuery]);

  useEffect(() => {
    activeFilter && filterByData(postsByTagData);
  }, [postsByTagData, activeFilter]);

  useEffect(() => {
    resetFilter && handelTagUpdate({ name: "reset" });
  }, [resetFilter]);

  const handelTagUpdate = (tag) => {
    setActiveFilter(tag.name);
    selectedFilter(tag);
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
    <FocusLock disabled={!isOpen}>
      <motion.nav
        className={styles.postTags}
        ref={ref}
        style={{ transform: "translateX(100%)" }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={navVariant}
        tabIndex="-1"
      >
        <div>
          <p>Categories</p>
          <button
            onClick={() => handelTagUpdate({ name: "reset" })}
            className={styles.tagName}
          >
            All posts
          </button>
          {allPostsTags.map((tag) => {
            return (
              <button
                key={tag.slug}
                onClick={() => handelTagUpdate(tag)}
                className={[
                  styles.tagName,
                  activeFilter === tag.name && styles.activeFilter,
                ].join(" ")}
              >
                {tag.name}
              </button>
            );
          })}
        </div>
      </motion.nav>
      <motion.nav
        className={styles.postTagsMask}
        style={{ opacity: 1, transform: "translateX(100%)" }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={maskVariant}
        onClick={toggleTagsMenu}
      ></motion.nav>
    </FocusLock>
  );
}

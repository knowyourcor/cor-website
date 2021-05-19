import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { POSTS_BY_TAG_QUERY } from "../../lib/ApolloQueries";
import { motion } from "framer-motion";
import styles from "./blog.module.scss";

export default function PostTags({
  allPostsTags,
  filterByData,
  filterBy,
  isOpen,
  toggleTagsMenu,
}) {
  const router = useRouter();
  const [activeTag, setActiveTag] = useState(null);
  const ref = useRef();

  const {
    data: postsByTagData,
    loading: postsByTagLoading,
    error: postsByTagError,
    fetchMore,
  } = useQuery(POSTS_BY_TAG_QUERY, {
    variables: {
      tag: activeTag === "reset" ? null : activeTag,
      after: null,
    },
  });

  // Filter by page query on initial load
  useEffect(() => {
    const matchTag = allPostsTags.find((obj) => obj.slug === filterBy);
    filterBy && setActiveTag(matchTag.name);
  }, [filterBy]);

  useEffect(() => {
    activeTag && filterByData(postsByTagData);
  }, [postsByTagData, activeTag]);

  const handelTagUpdate = (tag) => {
    setActiveTag(tag.name);

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

    toggleTagsMenu();
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
    <>
      <motion.nav
        className={styles.postTags}
        ref={ref}
        style={{ transform: "translateX(100%)" }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={navVariant}
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
                  activeTag === tag.name && styles.activeTag,
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
    </>
  );
}

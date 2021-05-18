import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { POSTS_BY_TAG_QUERY } from "../../lib/ApolloQueries";
import styles from "./blog.module.scss";
import { isCompositeType } from "graphql";

export default function PostTags({ allPostsTags, filterByData, filterBy }) {
  const router = useRouter();
  const [activeTag, setActiveTag] = useState(null);

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
  };

  return (
    <div className={styles.grid}>
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
            className={styles.tagName}
          >
            {tag.name}
          </button>
        );
      })}
    </div>
  );
}

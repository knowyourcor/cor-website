import { useState, useEffect, useRef } from "react";
import { useQuery, gql } from "@apollo/client";
import { ALL_BLOG_POSTS_QUERY } from "../../lib/ApolloQueries";
import styles from "./blog.module.scss";

export default function PostTags({ paginatedPostsData, filterBy }) {
  const [activeTag, setActiveTag] = useState(null);
  const [currentCursor, setCurrentCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const { data, loading, error, fetchMore } = useQuery(ALL_BLOG_POSTS_QUERY, {
    variables: {
      tag: activeTag === "reset" ? null : activeTag,
      variables: { limit: 9 },
    },
  });

  useEffect(() => {
    setActiveTag(filterBy);
  }, [filterBy]);

  useEffect(() => {
    setCurrentCursor(data?.allBlog_posts.pageInfo.endCursor);
    setHasNextPage(data?.allBlog_posts.pageInfo.hasNextPage);
    paginatedPostsData(data);
  }, [data]);

  const loadMorePosts = () => {
    if (fetchMore) {
      fetchMore({
        variables: {
          tag: activeTag === "reset" ? null : activeTag,
          after: currentCursor,
        },
      });
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => loadMorePosts({ name: "reset" })}
          disabled={hasNextPage ? false : true}
          className={styles.button}
        >
          Show More
        </button>
      </div>
    </>
  );
}

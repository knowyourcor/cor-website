import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { ALL_BLOG_POSTS_QUERY } from "../../lib/ApolloQueries";
import styles from "./blog.module.scss";

export default function PostTags({
  allPostsData,
  paginatedPostsData,
  filterBy,
}) {
  const [activeTag, setActiveTag] = useState(null);
  const [currentCursor, setCurrentCursor] = useState(null);

  const { data, loading, error, fetchMore } = useQuery(ALL_BLOG_POSTS_QUERY, {
    variables: {
      tag: activeTag === "reset" ? null : activeTag,
    },
  });

  // data && console.log(data);

  useEffect(() => {
    console.log("init data", data);
    setCurrentCursor(data?.allBlog_posts.pageInfo.endCursor);
  }, [data]);

  const loadMorePosts = () => {
    console.log("load more");
    if (data.allBlog_posts.pageInfo) {
      // const { endCursor } = data.allBlog_posts.pageInfo;
      // console.log("endCursor: ", endCursor);

      fetchMore({
        variables: {
          tag: null,
          after: currentCursor,
        },
      }).then((posts) => {
        setCurrentCursor(posts.data.allBlog_posts.pageInfo.endCursor);
        return paginatedPostsData(posts.data);
      });

      // fetchMore({
      // variables: { after: endCursor, offset: 0, limit: 1 },

      //   updateQuery: (prevResult, { fetchMoreResult }) => {
      //     fetchMoreResult.allBlog_posts.edges = [
      //       ...prevResult.allBlog_posts.edges,
      //       ...fetchMoreResult.allBlog_posts.edges,
      //     ];
      //     return fetchMoreResult;
      //   },
      // });
    }
  };

  // const loadMorePosts = (cursor) => {
  //   console.log("load more");
  //   setCurrentCursor(cursor);
  // };

  return (
    <>
      <div>
        <button onClick={() => loadMorePosts({ name: "reset" })}>
          Show More
        </button>
      </div>
    </>
  );
}

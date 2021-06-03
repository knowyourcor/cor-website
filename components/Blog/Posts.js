import { useState, useEffect } from "react";
import { useQuery, NetworkStatus, useMutation } from "@apollo/client";
import { ALL_BLOG_POSTS_QUERY } from "../../lib/ApolloQueries";
import PostPreview from "./PostPreview";

import Loading from "../Loading";

// Styles
import styles from "./blog.module.scss";

export const allPostsQueryVars = {
  after: null,
  tag: null,
  limit: 9,
};

export default function PostList({ postsData, filter }) {
  return (
    <section>
      <div className={styles.blogPosts}>
        {postsData?.allBlog_posts?.edges.map((post, index) => (
          <PostPreview {...post} key={post.node._meta.uid} />
        ))}
      </div>
    </section>
  );
}

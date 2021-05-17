import React from "react";
import ClientOnly from "../../components/Apollo/ClientOnly";
import { getLayout } from "../../components/Layout/PageLayout";
import { Container, Row, Column } from "../../components/Grid";
import Error from "../../components/Error";
import Loading from "../../components/Loading";

// Apollo
import { useQuery } from "@apollo/client";
import { ALL_BLOG_POSTS_QUERY } from "../../lib/ApolloQueries";
import PostPreview from "../../components/Blog/PostPreview";

// Prismic
import { getMenuData } from "../../lib/api";

// Styles
import styles from "../../styles/blog/blog.module.scss";

export default function Blog({ pageData }) {
  const {
    data: allPosts,
    loading: allPostsLoading,
    error: allPostsError,
    fetchMore,
  } = useQuery(ALL_BLOG_POSTS_QUERY, {
    variables: {
      after: null,
      limit: null,
    },
  });

  if (allPostsError) return <Error message="Error loading posts." />;
  if (allPostsLoading) return <Loading />;

  return (
    <div className={styles.blog}>
      <Container>
        <Row>
          <Column columns={{ xs: 14, md: 12 }} offsets={{ md: 1 }}>
            {allPosts &&
              allPosts.allBlog_posts.edges.map((post) => (
                <PostPreview {...post} key={post.node._meta.uid} />
              ))}
          </Column>
        </Row>
      </Container>
    </div>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const mainMenuData = await getMenuData("main-menu");
  const footerMenuData = await getMenuData("footer-menu");
  const tertiaryMenuData = await getMenuData("tertiary-menu");
  return {
    props: {
      preview,
      mainMenuData,
      footerMenuData,
      tertiaryMenuData,
    },
    revalidate: 1,
  };
}

Blog.getLayout = getLayout;

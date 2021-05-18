import React from "react";
import ClientOnly from "../../components/Apollo/ClientOnly";
import { getLayout } from "../../components/Layout/PageLayout";
import { Container, Row, Column } from "../../components/Grid";
import Head from "../../components/Head";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import PostPinned from "../../components/Blog/PostPinned";
import PostPreview from "../../components/Blog/PostPreview";
import Filter from "../../components/Blog/Filter";

// Apollo
import { useQuery } from "@apollo/client";
import { ALL_BLOG_POSTS_QUERY } from "../../lib/ApolloQueries";
import client from "../../lib/ApolloClient";

// Prismic
import { getBlogData, getMenuData, getBlogPostTags } from "../../lib/api";

// Styles
import styles from "../../styles/Blog.module.scss";

export default function Blog({ pageData, allPostsTags, allBlogPosts }) {
  const { meta_title, meta_description, pinned_blog_post } = pageData[0].node;

  const pinnedPostUID = pinned_blog_post?._meta.uid;

  const pinnedPostData = {
    node: { ...pinned_blog_post },
  };

  const filterOutPinnedPost = allBlogPosts?.allBlog_posts?.edges.filter(
    (post) => post.node._meta.uid !== pinnedPostUID
  );

  // const {
  //   data: allPosts,
  //   loading: allPostsLoading,
  //   error: allPostsError,
  //   fetchMore,
  // } = useQuery(ALL_BLOG_POSTS_QUERY, {
  //   variables: {
  //     after: null,
  //     limit: null,
  //   },
  // });

  // if (allPostsError) return <Error message="Error loading posts." />;
  // if (allPostsLoading) return <Loading />;

  return (
    <>
      <Head title={meta_title} description={meta_description} />
      <div className={styles.blog}>
        <Container>
          <Row>
            <Column columns={{ xs: 14, md: 12 }} offsets={{ md: 1 }}>
              <PostPinned {...pinnedPostData} />
            </Column>
          </Row>
        </Container>

        <Container>
          <Row>
            <Column columns={{ xs: 14, md: 12 }} offsets={{ md: 1 }}>
              <Filter filters={allPostsTags} />
            </Column>
          </Row>
          <Row>
            <Column columns={{ xs: 14, md: 12 }} offsets={{ md: 1 }}>
              <div className={styles.blogPosts}>
                {filterOutPinnedPost &&
                  filterOutPinnedPost.map((post) => (
                    <PostPreview {...post} key={post.node._meta.uid} />
                  ))}
              </div>
            </Column>
          </Row>
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const { data: allBlogPosts } = await client.query({
    query: ALL_BLOG_POSTS_QUERY,
  });

  const pageData = await getBlogData(previewData);
  const allPostsTags = await getBlogPostTags();
  const mainMenuData = await getMenuData("main-menu");
  const footerMenuData = await getMenuData("footer-menu");
  const tertiaryMenuData = await getMenuData("tertiary-menu");
  return {
    props: {
      preview,
      pageData,
      allPostsTags,
      allBlogPosts,
      mainMenuData,
      footerMenuData,
      tertiaryMenuData,
    },
    revalidate: 1,
  };
}

Blog.getLayout = getLayout;

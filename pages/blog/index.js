import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import slugify from "slugify";
import { getLayout } from "../../components/Layout/PageLayout";
import { Container, Row, Column } from "../../components/Grid";
import Head from "../../components/Head";
import PostPinned from "../../components/Blog/PostPinned";
import PostPreview from "../../components/Blog/PostPreview";
import PostTags from "../../components/Blog/PostTags";

// Apollo
import { ALL_BLOG_POSTS_QUERY } from "../../lib/ApolloQueries";
import client from "../../lib/ApolloClient";
import ClientOnly from "../../lib/ClientOnly";

// Prismic
import { getBlogData, getMenuData, getBlogPostTags } from "../../lib/api";

// Styles
import styles from "../../styles/Blog.module.scss";

export default function Blog({ pageData, allPostsTags, allBlogPosts }) {
  const router = useRouter();
  const { meta_title, meta_description, pinned_blog_post } = pageData[0].node;

  // Tag filter
  const [tagFilter, setTagFilter] = useState(null);

  // Check if a filter is being passed on initial load
  useEffect(() => {
    setTagFilter(router.query?.filter);
  }, [router.query]);

  // Pinned post
  const pinnedPostUID = pinned_blog_post?._meta.uid;
  const pinnedPostData = {
    node: { ...pinned_blog_post },
  };

  // All posts data
  const [allPosts, setAllPosts] = useState(allBlogPosts);

  // Handel data updates when filtered by tag
  const handelPostsDataUpdate = (postsByTagData) => {
    postsByTagData && setAllPosts(postsByTagData);
  };

  // TODO: hook up show more pagination
  // const handleShowMore = () => {
  //   if (data.allBlog_posts.pageInfo.hasNextPage) {
  //     const { endCursor } = data.allBlog_posts.pageInfo;

  //     fetchMore({
  //       variables: { after: endCursor, offset: 0, limit: 6 },

  //       updateQuery: (prevResult, { fetchMoreResult }) => {
  //         fetchMoreResult.allBlog_posts.edges = [
  //           ...prevResult.allBlog_posts.edges,
  //           ...fetchMoreResult.allBlog_posts.edges,
  //         ];
  //         return fetchMoreResult;
  //       },
  //     });
  //   }
  // };

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
              <ClientOnly>
                <PostTags
                  allPostsTags={allPostsTags}
                  filterByData={handelPostsDataUpdate}
                  filterBy={tagFilter}
                />
              </ClientOnly>
            </Column>
          </Row>
          <Row>
            <Column columns={{ xs: 14, md: 12 }} offsets={{ md: 1 }}>
              <div className={styles.blogPosts}>
                {allPosts &&
                  allPosts?.allBlog_posts?.edges
                    .filter((post) => post.node._meta.uid !== pinnedPostUID)
                    .map((post) => (
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
  const allPostsTagsData = await getBlogPostTags();
  const mainMenuData = await getMenuData("main-menu");
  const footerMenuData = await getMenuData("footer-menu");
  const tertiaryMenuData = await getMenuData("tertiary-menu");

  const allTags = allPostsTagsData.map((tag) => tag.node._meta?.tags[0]);
  const removeTagDuplicates = [...new Set(allTags)];
  const allPostsTags = removeTagDuplicates.map((tag) => ({
    name: tag,
    slug: slugify(tag, { lower: true }),
  }));

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

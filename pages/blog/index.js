import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import slugify from "slugify";
import { getLayout } from "../../components/Layout/PageLayout";
import { Container, Row, Column } from "../../components/Grid";
import Head from "../../components/Head";
import PostPinned from "../../components/Blog/PostPinned";
import PostPreview from "../../components/Blog/PostPreview";
import PostTags from "../../components/Blog/PostTags";
import LoadMorePosts from "../../components/Blog/LoadMorePosts";

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

  const categoryButtonRef = useRef();

  // Check if a filter is being passed on initial load
  const [queryFilter, setQueryFilter] = useState(null);
  useEffect(() => {
    setQueryFilter(router.query?.filter);

    const matchTag = allPostsTags.find(
      (obj) => obj.slug === router.query?.filter
    );
    router.query?.filter && setCurrentFilter(matchTag.name);
  }, [router.query]);

  // Pinned post
  const pinnedPostUID = pinned_blog_post?._meta.uid;
  const pinnedPostData = {
    node: { ...pinned_blog_post },
  };

  // All posts data
  const [allPosts, setAllPosts] = useState(allBlogPosts);

  // Handel data updates when filtered by tag
  const handlePostsDataUpdate = (postsByTagData) => {
    postsByTagData && setResetFilter(false);
    postsByTagData && setAllPosts(postsByTagData);
  };

  // Handel data updates when filtered by tag
  const handelPostsDataMerge = (postsData) => {
    postsData && setAllPosts(postsData);
  };

  // Tags menu toggle
  const [tagsMenuActive, setTagsMenuActive] = useState(false);

  const [currentFilter, setCurrentFilter] = useState(null);
  const handleCurrentFilter = (tag) => {
    if (tag.name === "reset") {
      setCurrentFilter(null);
    } else {
      setCurrentFilter(tag.name);
    }
  };

  // Filter reset
  const [resetFilter, setResetFilter] = useState(false);
  const onFilterReset = () => {
    setCurrentFilter(null);
    setResetFilter(true);
  };

  useEffect(() => {
    tagsMenuActive && categoryButtonRef.current.focus();
  }, [tagsMenuActive]);

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
              <div className={styles.categories}>
                {currentFilter && (
                  <div className={[styles.button, styles.colorGray].join(" ")}>
                    <span>{currentFilter}</span>

                    <button
                      onClick={onFilterReset}
                      title="remove filter"
                      className={styles.removeFilter}
                    >
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.iconClose}
                      >
                        <path d="M50 5L45 0L25 20L5 0L0 5L20 25L0 45L5 50L25 30L45 50L50 45L30 25L50 5Z" />
                      </svg>
                    </button>
                  </div>
                )}

                <button
                  className={[styles.button, styles.buttonDark].join(" ")}
                  onClick={() => {
                    setTagsMenuActive(!tagsMenuActive);
                  }}
                  role="button"
                  tabIndex="0"
                  title="Select category"
                  ref={categoryButtonRef}
                >
                  <span>Select Category</span>
                </button>
              </div>
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

      <ClientOnly>
        <PostTags
          isOpen={tagsMenuActive}
          toggleTagsMenu={() => setTagsMenuActive(!tagsMenuActive)}
          allPostsTags={allPostsTags}
          filterByData={handlePostsDataUpdate}
          filterByQuery={queryFilter}
          selectedFilter={handleCurrentFilter}
          resetFilter={resetFilter}
        />
        {/* <LoadMorePosts
          allPostsData={allPosts}
          paginatedPostsData={handelPostsDataMerge}
          filterBy={tagFilter}
        /> */}
      </ClientOnly>
    </>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const { data: allBlogPosts } = await client.query({
    query: ALL_BLOG_POSTS_QUERY,
    variables: null,
  });

  const pageData = await getBlogData(previewData);
  const allPostsTagsData = await getBlogPostTags();
  const mainMenuData = await getMenuData("main-menu");
  const footerMenuData = await getMenuData("footer-menu");
  const tertiaryMenuData = await getMenuData("tertiary-menu");

  const allTags = allPostsTagsData
    .map((tag) => tag.node._meta?.tags[0])
    .filter((item) => !!item);
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

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useQuery, NetworkStatus } from "@apollo/client";
import slugify from "slugify";
import { getLayout } from "../../components/Layout/PageLayout";
import { useFilterContext } from "../../lib/filterContext";
import { Container, Row, Column } from "../../components/Grid";
import Head from "../../components/Head";
import PostPinned from "../../components/Blog/PostPinned";
import PostPreview from "../../components/Blog/PostPreview";
import FilterMenu from "../../components/Blog/FilterMenu";

// Apollo for dynamic data, filtering, pagination
import { ALL_BLOG_POSTS_QUERY } from "../../lib/ApolloQueries";

// Prismic data for getStaticProps
import { getBlogData, getMenuData, getBlogPostTags } from "../../lib/api";

// Styles
import styles from "../../styles/Blog.module.scss";

export default function Blog({ pageData, allPostsTags }) {
  const blogData = pageData[0]?.node;
  const router = useRouter();
  const { filterContext, setFilterContext } = useFilterContext();
  const [filterMenuActive, setFilterMenuActive] = useState(null);

  // Used to set focus on menu close
  const categoryButtonRef = useRef();

  // Pinned post data
  const pinnedPostUID = blogData?.pinned_blog_post?._meta.uid;
  const pinnedPostData = {
    node: { ...blogData?.pinned_blog_post },
  };

  const {
    loading,
    error,
    data: allPosts,
    fetchMore,
    networkStatus,
  } = useQuery(ALL_BLOG_POSTS_QUERY, {
    variables: {
      after: null,
      tag: filterContext,
      first: 6,
    },
    notifyOnNetworkStatusChange: true,
  });

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        after: allPosts?.allBlog_posts?.pageInfo?.endCursor || null,
        tag: filterContext,
        first: 6,
      },
    });
  };

  const filterPosts = (filterBy) => {
    fetchMore({
      variables: {
        tag: filterBy,
      },
    });
  };

  const hasNextPage = allPosts?.allBlog_posts?.pageInfo.hasNextPage;

  const handleFilterReset = () => {
    setFilterContext(null);
    filterPosts(null);
    // Remove filter query from URL
    router.push(`/blog`, undefined, {
      shallow: true,
    });
  };

  const handleFilter = (filter) => {
    setFilterContext(filter);
    filterPosts(filter);
  };

  // Check if a filter is being passed on initial load
  useEffect(() => {
    const matchTag = allPostsTags.find(
      (obj) => obj.slug === router.query?.filter
    );
    router.query?.filter && handleFilter(matchTag.name);
  }, [router.query]);

  useEffect(() => {
    // Shallow update of URL
    {
      filterContext &&
        router.push(
          `/blog`,
          `/blog?filter=${slugify(filterContext, { lower: true })}`,
          {
            shallow: true,
          }
        );
    }
  }, [filterContext]);

  // Handle focus of categoryButtonRef on close of tagMenu
  useEffect(() => {
    !filterMenuActive &&
      filterMenuActive !== null &&
      categoryButtonRef.current.focus();
  }, [filterMenuActive]);

  return (
    <>
      <Head
        title={blogData?.meta_title}
        description={blogData?.meta_description}
      />
      <div className={styles.blog}>
        {pinnedPostData.node !== undefined && (
          <Container>
            <Row>
              <Column columns={{ xs: 14, md: 12 }} offsets={{ md: 1 }}>
                <PostPinned {...pinnedPostData} />
              </Column>
            </Row>
          </Container>
        )}
        <Container>
          <Row>
            <Column columns={{ xs: 14, md: 12 }} offsets={{ md: 1 }}>
              <div className={styles.categories}>
                {filterContext && (
                  <div className={[styles.button, styles.colorGray].join(" ")}>
                    <span>{filterContext}</span>

                    <button
                      onClick={handleFilterReset}
                      title="remove filter"
                      className={styles.removeFilter}
                      aria-label={`Remove ${filterContext} filter`}
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
                    setFilterMenuActive(!filterMenuActive);
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
                {allPosts?.allBlog_posts?.edges
                  .filter((post) => post.node._meta.uid !== pinnedPostUID)
                  .map((post) => (
                    <PostPreview {...post} key={post.node._meta.uid} />
                  ))}
              </div>
              <div className={styles.pagination}>
                <button
                  onClick={() => loadMorePosts()}
                  disabled={loadingMorePosts || !hasNextPage}
                  className={[
                    styles.button,
                    !hasNextPage ? styles.disabled : "",
                  ].join(" ")}
                >
                  {loadingMorePosts ? "Loading..." : "Show More"}
                </button>
              </div>
            </Column>
          </Row>
        </Container>
      </div>

      <FilterMenu
        allPostsTags={allPostsTags}
        filterBy={(filterBy) => filterPosts(filterBy)}
        toggleTagsMenu={() => setFilterMenuActive(!filterMenuActive)}
        isOpen={filterMenuActive}
      />
    </>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
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
      mainMenuData,
      footerMenuData,
      tertiaryMenuData,
    },
    revalidate: 1,
  };
}

Blog.getLayout = getLayout;

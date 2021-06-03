import { useState } from "react";
import { useQuery, NetworkStatus } from "@apollo/client";
import slugify from "slugify";
import { ALL_BLOG_POSTS_QUERY } from "../lib/ApolloQueries";
import { getLayout } from "../components/Layout/PageLayout";
import { useFilterContext } from "../lib/filterContext";
import PostPreview from "../components/Blog/PostPreview";
import FilterMenu from "../components/Blog/FilterMenu";
import Loading from "../components/Loading";

// Prismic data for getStaticProps
import { getBlogData, getMenuData, getBlogPostTags } from "../lib/api";

// Styles
import styles from "../styles/Blog.module.scss";

export default function Blog({ allPostsTags }) {
  const { filterContext } = useFilterContext();
  const [filterMenuActive, setFilterMenuActive] = useState(null);

  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_BLOG_POSTS_QUERY,
    {
      variables: {
        after: null,
        tag: filterContext,
        first: 3,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        after: data?.allBlog_posts?.pageInfo?.endCursor || null,
        tag: filterContext,
        first: 3,
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

  const hasNextPage = data?.allBlog_posts?.pageInfo.hasNextPage;

  // TODO: ADD ERROR PAGE
  if (error) return <div>Error loading posts.</div>;
  if (loading && !loadingMorePosts) return <Loading />;

  return (
    <section>
      <button
        className={[styles.button, styles.buttonDark].join(" ")}
        onClick={() => {
          setFilterMenuActive(!filterMenuActive);
        }}
        role="button"
        tabIndex="0"
        title="Select category"
      >
        <span>Select Category</span>
      </button>
      <FilterMenu
        allPostsTags={allPostsTags}
        isOpen={filterMenuActive}
        toggleTagsMenu={() => setFilterMenuActive(!filterMenuActive)}
        filterBy={(filterBy) => filterPosts(filterBy)}
      />

      <div className={styles.blogPosts}>
        {data?.allBlog_posts?.edges.map((post, index) => (
          <PostPreview {...post} key={post.node._meta.uid} />
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          onClick={() => loadMorePosts()}
          disabled={loadingMorePosts || !hasNextPage}
          className={[styles.button, !hasNextPage ? styles.disabled : ""].join(
            " "
          )}
        >
          {loadingMorePosts ? "Loading..." : "Show More"}
        </button>
      </div>
    </section>
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

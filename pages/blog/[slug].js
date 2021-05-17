import { useRouter } from "next/router";
import { getLayout } from "../../components/Layout/PageLayout";
import Head from "../../components/Head";
import Post from "../../components/Blog/Post.js";
import Error from "../../components/Error";
import Loading from "../../components/Loading";

// Apollo
import { useQuery } from "@apollo/client";
import client from "../../lib/ApolloClient";
import { ALL_BLOG_POSTS_UID, BLOG_POST_QUERY } from "../../lib/ApolloQueries";

//  Prismic
import { getMenuData } from "../../lib/api";

// Styles
import styles from "../../styles/BlogPost.module.scss";

export default function BlogPost() {
  // Get blog slug from next/router
  const router = useRouter();
  const slug = router.query;

  // Query blog post with slug variable
  const { data, loading, error } = useQuery(BLOG_POST_QUERY, {
    variables: slug,
  });

  if (error) return <Error message="Error loading posts." />;
  if (loading) return <Loading />;

  const { title } = data.allBlog_posts.edges[0].node;

  return (
    <>
      <Head title={title[0].text} />
      <div className={styles.container}>
        <Post data={data.allBlog_posts.edges[0].node} />
      </div>
    </>
  );
}

export const getStaticPaths = async (previewData) => {
  const { data } = await client.query({
    query: ALL_BLOG_POSTS_UID,
  });

  const paths = data.allBlog_posts.edges.map((id) => {
    return {
      params: { slug: id.node._meta.uid },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ preview = false, previewData, params }) {
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

BlogPost.getLayout = getLayout;

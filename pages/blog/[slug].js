import { getLayout } from "../../components/Layout/PageLayout";
import Head from "../../components/Head";
import Post from "../../components/Blog/Post.js";

// Apollo
import client from "../../lib/ApolloClient";
import { ALL_BLOG_POSTS_UID } from "../../lib/ApolloQueries";

//  Prismic
import { getBlogPostData, getMenuData } from "../../lib/api";

// Styles
import styles from "../../styles/BlogPost.module.scss";

export default function BlogPost({ blogPostData }) {
  const { title } = blogPostData;

  const postTheme =
    styles[`theme-${blogPostData?.theme}`] || styles["theme-default"];

  return (
    <>
      <Head
        title={
          blogPostData.meta_title ? blogPostData.meta_title : title[0].text
        }
        description={blogPostData.meta_description}
      />
      <div className={[styles.container, postTheme].join(" ")}>
        <Post data={blogPostData} />
      </div>
    </>
  );
}

export const getStaticPaths = async () => {
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
    fallback: "blocking",
  };
};

export async function getStaticProps({ preview = false, previewData, params }) {
  const blogPostData = await getBlogPostData(params.slug, previewData);
  const mainMenuData = await getMenuData("main-menu");
  const footerMenuData = await getMenuData("footer-menu");
  const tertiaryMenuData = await getMenuData("tertiary-menu");

  return {
    props: {
      preview,
      blogPostData,
      mainMenuData,
      footerMenuData,
      tertiaryMenuData,
    },
    revalidate: 1,
  };
}

BlogPost.getLayout = getLayout;

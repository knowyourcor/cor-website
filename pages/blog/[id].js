import { RichText } from "prismic-reactjs";
import Layout from "../../components/Layout"
import { Container } from "../../components/Grid"
import Content from "./Content/Index"

import styles from "../../styles/blog/blog-post.module.scss"

import { getBlogData, getBlogPostData, getMenuData } from "../../lib/api"

const Post = ({
  preview,
  pageData,
  mainMenuData,
  footerMenuData,
  tertiaryMenuData,
}) => {
  let date = pageData.date
  let dateFormat = date.replace(/-/g, '.')

  return (
    <Layout
      classNameVal={styles.blogPost}
      title="Blog Post"
      preview={preview}
      mainMenuData={mainMenuData}
      footerMenuData={footerMenuData}
      tertiaryMenuData={tertiaryMenuData}
    >
      <div>
        <Container>
          <RichText render={pageData.title} />
          <div className={styles.wrapper}>
            <div className={styles.subtitle}>
              <RichText render={pageData.subtitle} />
            </div>
            <p className={styles.date}>{dateFormat}</p>
          </div>
        </Container>
        <Content props={pageData.content} />
      </div>
    </Layout>
  );
}

export default Post;

export const getStaticPaths = async (previewData) => {
  const pageData = await getBlogData(previewData);

  const paths = pageData.map(post => {
    return {
      params: { id: post.node._meta.uid }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ preview = false, previewData, params }) {
  const pageData = await getBlogPostData(params.id, previewData);
  const mainMenuData = await getMenuData("main-menu");
  const footerMenuData = await getMenuData("footer-menu");
  const tertiaryMenuData = await getMenuData("tertiary-menu");

  return {
    props: {
      preview,
      pageData,
      mainMenuData,
      footerMenuData,
      tertiaryMenuData,
    },
    revalidate: 1, // In seconds
  }
}

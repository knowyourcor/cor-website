import { RichText } from "prismic-reactjs";
import Layout from "../../components/Layout"
import { Container } from "../../components/Grid"

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
      <div className={styles.contentWrapper} style={{ backgroundColor: `${pageData.background_color === null ? '' : pageData.background_color}` }}>
        <Container>
          <RichText render={pageData.title} />
          <div className={styles.postInfoWrapper}>
            <p className={styles.category}>{RichText.asText(pageData.category)}</p>
            <p className={styles.date}>{dateFormat}</p>
          </div>
          <div>
            {pageData.content.map((item, i) => { 
              return (
                <div key={i} className={styles.postContent}>
                  {item.image &&
                    <div className={styles.imageWrapper}>
                      <div className={styles.imageHolder}>
                        <img className={styles.image} src={item.image.url} />
                      </div>
                    </div>
                  }
                  {item?.embed_media?.html &&
                    <div className={styles.videoWrapper}>
                      <div className={styles.videoHolder}>
                        <div dangerouslySetInnerHTML={{ __html: item?.embed_media?.html }} />
                      </div>
                    </div>
                  }
                  <div className={styles.contentText}>
                    <div className={styles.contentHolder}>
                      <RichText render={item.heading} />
                    </div>
                    <div className={styles.contentHolder}>
                      <RichText render={item.paragraph} />
                      {item.quote && <div className={styles.quoteText}><RichText render={item.quote} /></div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </Layout>
  );
}

export default Post;

export const getStaticPaths = async (previewData) => {
  const pageData = await getBlogData(previewData);

  const paths = pageData.map(post => {
    return {
      params: { slug: post.node._meta.uid }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ preview = false, previewData, params }) {
  const pageData = await getBlogPostData(params.slug, previewData);
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

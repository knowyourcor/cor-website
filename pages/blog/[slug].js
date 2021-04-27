import client from "../../apollo-client";
import gql from "graphql-tag";
import { RichText } from "prismic-reactjs";
import { useQuery } from "@apollo/client";

import Layout from "../../components/Layout"
import { Container } from "../../components/Grid"

import styles from "../../styles/blog/blog-post.module.scss"

import { getBlogData, getBlogPostData, getMenuData, getCategoryBlogData } from "../../lib/api"

export default function Post({ 
  preview,
  pageData,
  mainMenuData,
  footerMenuData,
  tertiaryMenuData,
}) {

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
      style={{ backgroundColor: `${pageData.background_color === null ? '' : pageData.background_color}` }}
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
                  <div className={styles.mediaWrapper}>
                    <div className={styles.mediaHolder}>
                      {item.image &&
                        <img className={styles.image} src={item.image.url} />
                      }
                      {item?.embed_media?.html &&
                        <div className={styles.video} dangerouslySetInnerHTML={{ __html: item?.embed_media?.html }} />
                      }
                    </div>
                  </div>
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

const POSTS_QUERY = gql`
  query Posts($after: String) {
    allBlog_posts(first: 100, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          featured_post
          title
          category
          date
          excerpt
          _meta {
            uid
          }
          content {
            image
            heading
            paragraph
            quote
          }
        }
        cursor
      }
    }
  }
`;

export const getStaticPaths = async (previewData) => {
  const { data } = await client.query({
    query: POSTS_QUERY
  })

  const paths = data.allBlog_posts.edges.map(id => {
    return {
      params: { slug: id.node._meta.uid }
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

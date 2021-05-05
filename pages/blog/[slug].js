import client from "../../apollo-client";
import gql from "graphql-tag";
import { RichText } from "prismic-reactjs";
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";
import Layout from "../../components/Layout"
import { Container } from "../../components/Grid"

import styles from "../../styles/blog/blog-post.module.scss"

import { getBlogData, getBlogPostData, getMenuData, getCategoryBlogData } from "../../lib/api"

const BlogContentMedia = ({ mediaItem }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const transition = {
    duration: 0.4,
    delay: 0.2,
    ease: "easeInOut"
  };

  const variants = {
    hidden: {
      opacity: 0,
      transition
    },
    show: {
      opacity: 1,
      transition
    }
  };

  return (
    <motion.div
      ref={ref}
      className={styles.mediaWrapper}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit="hidden"
      variants={variants}
    >
      <div className={styles.mediaHolder}>
        {mediaItem.image &&
          <img className={styles.image} src={mediaItem.image.url} />
        }
        {mediaItem?.embed_media?.html &&
          <div className={styles.video} dangerouslySetInnerHTML={{ __html: mediaItem?.embed_media?.html }} />
        }
      </div>
    </motion.div>
  )
}

const BlogContentText = ({ textItem }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const transition = {
    duration: 0.4,
    delay: 0.2,
    ease: "easeInOut"
  };

  const variants = {
    hidden: {
      opacity: 0,
      transition
    },
    show: {
      opacity: 1,
      transition
    }
  };

  return (
    <motion.div
      ref={ref}
      className={styles.contentText}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit="hidden"
      variants={variants}
    >
      <div className={styles.contentHolder}>
        <RichText render={textItem.heading} />
      </div>
      <div className={styles.contentHolder}>
        <RichText render={textItem.paragraph} />
        {textItem.quote && <div className={styles.quoteText}><RichText render={textItem.quote} /></div>}
      </div>
    </motion.div>
  )
}

export default function Post({ 
  preview,
  pageData,
  mainMenuData,
  footerMenuData,
  tertiaryMenuData,
}) {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const transition = {
    duration: 0.4,
    delay: 0.2,
    ease: "easeInOut"
  };

  const fadeInVariants = {
    hidden: {
      opacity: 0,
      transition
    },
    show: {
      opacity: 1,
      transition
    }
  };

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
          <motion.div 
            ref={ref} 
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            exit="hidden"
            variants={fadeInVariants}
          >
            <RichText render={pageData.title} />
            <div className={styles.postInfoWrapper}>
              <p className={styles.category}>{RichText.asText(pageData.category)}</p>
              <p className={styles.date}>{dateFormat}</p>
            </div>
          </motion.div>
          <div>
            {pageData.content.map((item, i) => {
              return (
                <div key={i} className={styles.postContent}>
                  {!item.image && !item?.embed_media?.html ? (
                      ''
                    ) : (
                      <BlogContentMedia mediaItem={item} />
                    )
                  }
                  <BlogContentText textItem={item} />
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

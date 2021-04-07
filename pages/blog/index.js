import { RichText } from "prismic-reactjs";
import Link from "next/link"
import moment from "moment"

import Layout from "../../components/Layout"
import { Container } from "../../components/Grid"

import styles from "../../styles/blog/blog.module.scss"

import { getBlogData } from "../../lib/api"

export default function Blog({
  preview,
  pageData
}) {
  return (
    <Layout
      classNameVal={styles.blog}
      title="Blog"
      preview={preview}
    >
      <Container>
        <div className={styles.postWrapper}>
          {pageData.map((item, i) => {
            let data = item.node
            let date = moment(data.date).format('DD MMMM, YYYY')

            return (
              <div className={styles.postHolder}>
                <div className={styles.postImage}>
                  <Link href={'/blog/' + data._meta.uid}>
                    <a>
                      <div className={styles.imageWrapper}>
                        <img
                          src={data.content[0].image.url}
                          className={styles.image}
                          alt=""
                        />
                      </div>
                    </a>
                  </Link>
                </div>
                <div className={styles.postContent}>
                  <h2 className={styles.title}>{RichText.asText(data.title)}</h2>
                  <div className={styles.wrapper}>
                    <p className={styles.subtitle}>{RichText.asText(data.subtitle)}</p>
                    <p className={styles.date}>{date}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const pageData = await getBlogData(previewData);

  return {
    props: {
      preview,
      pageData,
    },
    revalidate: 1, // In seconds
  }
}


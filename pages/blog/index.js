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
      <div className={styles.sectionPost}>
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
                      <p className={styles.category}>{RichText.asText(data.subtitle)}</p>
                      <p className={styles.date}>{date}</p>
                    </div>
                    {i === 0 && <p>{data.excerpt[0].text}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </div>
      <div className={styles.sectionPostCategory}>
        <Container>
          <div className={styles.contentWrapper}>
            <div className={styles.categoryWrapper}>
              <div className={styles.selectedCategory}>Diet</div>
              <select className={styles.selectCategory} value="Category">
                <option value="Category">Category</option>
                <option value="Diet">Diet</option>
                <option value="Health">Health</option>
              </select>
            </div>
            <div className={styles.postWrapper}>
              {pageData.map((item, i) => {
                let data = item.node
                let date = moment(data.date).format('DD MMMM, YYYY')

                return (
                  <div className={styles.postHolder}>
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
                    <div className={styles.wrapper}>
                      <p className={styles.category}>{RichText.asText(data.subtitle)}</p>
                      <p className={styles.date}>{date}</p>
                    </div>
                    <h2 className={styles.title}>{RichText.asText(data.title)}</h2>
                  </div>
                )
              })}
            </div>
            <div className={styles.buttonHolder}>
              <button className={styles.buttonShow}>Show More</button>
            </div>
          </div>
        </Container>
      </div>
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


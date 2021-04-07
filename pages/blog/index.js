import { RichText } from "prismic-reactjs";
import Link from "next/link"

import Layout from "../../components/Layout"

import styles from "../../styles/blog/blog.module.scss"

import { getBlogData } from "../../lib/api"

export default function Blog({
  preview,
  posts,
  pageData
}) {
  return (
    <Layout
      classNameVal={styles.blog}
      title="Blog"
      preview={preview}
    >
      <ul>
        {pageData.map((item, i) => {
          let itemNode = item.node
          return (
            <li key={i}>
              <Link href={'/blog/' + itemNode._meta.uid}>
                <a><RichText render={itemNode.title} /></a>
              </Link>
            </li>
          )
        })}
      </ul>
      {/* <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={'/blog/' + post.id}>
              <a><RichText render={pageData.title} /></a>
            </Link>
          </li>
        ))}
      </ul> */}
    </Layout>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const pageData = await getBlogData(previewData);
  const res = await fetch('http://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  return {
    props: {
      preview,
      pageData,
      posts: data.slice(0, 4)
    },
    revalidate: 1, // In seconds
  }
}


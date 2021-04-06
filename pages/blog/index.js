import Layout from "../../components/Layout"

import styles from "../../styles/blog/blog.module.scss"

export default function Blog({
  preview,
  posts
}) {
  return ( 
    <Layout
      classNameVal={styles.blog}
      title="Blog"
      preview={preview}
    >
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={'/blog/' + post.id}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const res = await fetch('http://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  return {
    props: {
      preview,
      posts: data.slice(0, 4)
    },
    revalidate: 1, // In seconds
  }
}


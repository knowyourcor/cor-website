import Layout from "../../components/Layout"
import { Container } from "../../components/Grid"
import Content from "./Content/Index"

import styles from "../../styles/blog/blog-post.module.scss"

export const getStaticPaths = async () => {
  const res = await fetch('http://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  const paths = data.map(post => {
    return {
      params: { id: post.id.toString() }
    }
  })

  return {
    paths: paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch('http://jsonplaceholder.typicode.com/posts/' + id);
  const data = await res.json();

  return {
    props: { post: data }
  }
}

const content = [
  {
    image: '/images/blog/BlogPost/blog-post-image-1-min.jpg',
    heading: 'Unlocking your potential',
    p: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    quote: 'The COR console provides you with previously unattainable data about your self health, on your terms, in your own home.'
  },
  {
    image: '/images/blog/BlogPost/blog-post-image-2-min.jpg',
    heading: 'Understanding your data',
    p: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    quote: 'Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    heading: 'Adapting your lifestyle',
    p: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  }
]

const Post = ({ post, props }) => {
  console.log(content)

  return ( 
    <Layout
      classNameVal={styles.blogPost}
      title="Blog Post"
    >
      <div>
        <Container>
          <h1 className={styles.title}>Optimizing your health</h1>
          <div className={styles.wrapper}>
            <p className={styles.subtitle}>Daily Practices</p>
            <p className={styles.date}>05.15.2021</p>
          </div>
        </Container>
        <Content props={content} />
      </div>
    </Layout>
  );
}
 
export default Post;

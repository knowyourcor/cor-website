import React, { useState, useEffect } from "react";
import { RichText } from "prismic-reactjs";
import Link from "next/link";
import moment from "moment";
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";
import ClientOnly from "../../components/Apollo/ClientOnly";
import SectionPostCategory from "../../components/Apollo/Categories";
import Layout from "../../components/Layout";
import { Container } from "../../components/Grid";

import styles from "../../styles/blog/blog.module.scss";

import { getBlogData, getMenuData } from "../../lib/api";

const BlogPostItem = ({ item, index }) => {
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

  let date = moment(item.node.date).format("DD MMMM, YYYY");

  return (
    <motion.div
      ref={ref}
      className={styles.postHolder}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit="hidden"
      variants={variants}
    >
      <div className={styles.postImage}>
        <Link href={"/blog/" + item.node._meta.uid}>
          <a>
            <div className={styles.imageWrapper}>
              <img
                src={item.node.content[0].image.url}
                className={styles.image}
                alt=""
              />
            </div>
          </a>
        </Link>
      </div>
      <div className={styles.postContent}>
        <h2 className={styles.title}>
          <Link href={"/blog/" + item.node._meta.uid}>
            <a>{RichText.asText(item.node.title)}</a>
          </Link>
        </h2>
        <div className={styles.wrapper}>
          <p className={styles.category}>
            {RichText.asText(item.node.category)}
          </p>
          <p className={styles.date}>{date}</p>
        </div>
        {index === 0 && <p>{item.node.excerpt[0].text}</p>}
      </div>
    </motion.div>
  )
}

export default function Blog({
  preview,
  pageData,
  mainMenuData,
  footerMenuData,
  tertiaryMenuData,
}) {
  const [post, setPost] = useState([]);

  const setPostData = () => {
    const items = [];
    Object.values(pageData).forEach((data) =>
      data.edges.forEach((edge) => items.push(edge))
    );
    setPost(
      items.sort((a, b) =>
        a.node.featured_post === b.node.featured_post
          ? 0
          : a.node.featured_post
            ? -1
            : 1
      )
    );
  };

  useEffect(() => {
    setPostData();
  }, []);

  return (
    <Layout
      classNameVal={styles.blog}
      title="Blog"
      preview={preview}
      mainMenuData={mainMenuData}
      footerMenuData={footerMenuData}
      tertiaryMenuData={tertiaryMenuData}
    >
      <div className={styles.sectionPost}>
        <Container>
          <div className={styles.postWrapper}>
            {post.map((item, i) => {
              return (
                <BlogPostItem 
                  item={item}
                  index={i}
                  key={i}
                />
              );
            })}
          </div>
        </Container>
      </div>
      {post.length < 5 &&
        <ClientOnly>
          <SectionPostCategory />
        </ClientOnly>
      }
    </Layout>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const pageData = await getBlogData(previewData);
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
  };
}

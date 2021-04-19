import React, { useState, useEffect, useRef } from "react";
import { RichText } from "prismic-reactjs";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { gql } from "@apollo/client";
import client from "../../apollo-client";

import ClientOnly from "../../components/Apollo/ClientOnly";
import Categories from "../../components/Apollo/Categories";
import Layout from "../../components/Layout";
import { Container } from "../../components/Grid";

import styles from "../../styles/blog/blog.module.scss";

import { getBlogData, getCategoryBlogData, getMenuData } from "../../lib/api";

export default function Blog({
  preview,
  pageData,
  categories,
  mainMenuData,
  footerMenuData,
  tertiaryMenuData,
}) {
  const [post, setPost] = useState([]);
  const endCursor = useRef(null);

  const handleShowMore = async () => { };

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

  // const filterCategoriesData = () => {
  //   if (!value.length) {
  //     setPostCategory(categories.categoriesData.edges);
  //   } else {
  //     const filteredData = categories.categoriesData.edges.filter(
  //       (data) => data.node.category[0].text === value
  //     );
  //     setPostCategory(filteredData);
  //   }
  // };

  useEffect(() => {
    setPostData();
  }, []);

  // useEffect(() => {
  //   filterCategoriesData();
  // }, [value]);

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
              let data = item.node;
              let date = moment(data.date).format("DD MMMM, YYYY");

              return (
                <div key={i} className={styles.postHolder}>
                  <div className={styles.postImage}>
                    <Link href={"/blog/" + data._meta.uid}>
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
                    <h2 className={styles.title}>
                      <Link href={"/blog/" + data._meta.uid}>
                        <a>{RichText.asText(data.title)}</a>
                      </Link>
                    </h2>
                    <div className={styles.wrapper}>
                      <p className={styles.category}>
                        {RichText.asText(data.category)}
                      </p>
                      <p className={styles.date}>{date}</p>
                    </div>
                    {i === 0 && <p>{data.excerpt[0].text}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      <div className={styles.sectionPostCategory}>
        <Container>
          <div className={styles.contentWrapper}>
            <ClientOnly>
              <Categories />
            </ClientOnly>

            {/* <div className={styles.postWrapper}>
              {postCategory.map((item, i) => {
                let data = item.node;
                let date = moment(data.date).format("DD MMMM, YYYY");

                return (
                  <div key={i} className={styles.postHolder}>
                    <Link href={"/blog/" + data._meta.uid}>
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
                      <p className={styles.category}>
                        {RichText.asText(data.category)}
                      </p>
                      <p className={styles.date}>{date}</p>
                    </div>
                    <h2 className={styles.title}>
                      {RichText.asText(data.title)}
                    </h2>
                  </div>
                );
              })}
            </div> */}
            <div className={styles.buttonHolder}>
              <button className="btn btn--inverted" onClick={handleShowMore}>
                Show More
              </button>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const pageData = await getBlogData(previewData);
  const categories = await getCategoryBlogData("", previewData);
  const mainMenuData = await getMenuData("main-menu");
  const footerMenuData = await getMenuData("footer-menu");
  const tertiaryMenuData = await getMenuData("tertiary-menu");
  return {
    props: {
      preview,
      pageData,
      categories,
      mainMenuData,
      footerMenuData,
      tertiaryMenuData,
    },
    revalidate: 1, // In seconds
  };
}

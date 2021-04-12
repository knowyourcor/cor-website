import React, { useState, useEffect } from "react";
import { RichText } from "prismic-reactjs";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import Layout from "../../components/Layout";
import { Container } from "../../components/Grid";

import styles from "../../styles/blog/blog.module.scss";

import { getBlogData, getMenuData } from "../../lib/api";

export default function Blog({
  preview,
  pageData,
  mainMenuData,
  footerMenuData,
  tertiaryMenuData,
}) {
  const [show, setShow] = useState();
  const [value, setValue] = useState([]);
  const [category, setCategory] = useState([]);
  const [post, setPost] = useState([]);
  const [postCategory, setPostCategory] = useState([]);

  useEffect(() => {
    const currentCategory = pageData.map((cat) => cat.node.category[0].text);
    setCategory([...new Set(currentCategory)]);

    const currentPageData = [...pageData];
    currentPageData.sort((a, b) =>
      a.node.featured_post === b.node.featured_post
        ? 0
        : a.node.featured_post
        ? -1
        : 1
    );
    setPost(currentPageData);
  }, []);

  useEffect(() => {
    if (!value.length) {
      setPostCategory(pageData);
    } else {
      const filteredData = pageData.filter(
        (data) => data.node.category[0].text === value
      );
      setPostCategory(filteredData);
    }
  }, [value]);

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
            {post
              .filter((_, i) => i <= 3)
              .map((item, i) => {
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
            <div className={styles.categoryWrapper}>
              {!!value.length && (
                <div className={styles.selectedCategory}>
                  {value}{" "}
                  <span className={styles.Icon} onClick={() => setValue("")}>
                    <Image src="/icons/close.svg" height={12} width={12} />
                  </span>
                </div>
              )}
              <button
                className={styles.dropdown}
                onClick={() => setShow(!show)}
              >
                <div
                  className={`${styles.dropdownName} ${
                    show === true ? styles.openDropdown : ""
                  }`}
                >
                  Category{" "}
                  <span className={styles.Icon}>
                    <Image src="/icons/down-arrow.svg" height={13} width={13} />
                  </span>
                </div>
                {show && (
                  <div className={styles.dropdownListWrapper}>
                    <div className={styles.List}>
                      {category.map((item, i) => {
                        return (
                          <>
                            {item !== value && (
                              <div
                                key={i}
                                className={styles.ListItem}
                                value="Category"
                                onClick={() => setValue(item)}
                              >
                                {item}
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                )}
              </button>
            </div>
            <div className={styles.postWrapper}>
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
            </div>
            <div className={styles.buttonHolder}>
              <button className="btn btn--inverted">Show More</button>
            </div>
          </div>
        </Container>
      </div>
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

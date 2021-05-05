import React, { useState } from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Posts from "../../components/Apollo/Posts";
import { Container } from "../../components/Grid";
import styles from "../../styles/blog/blog.module.scss";

const CATEGORIES_QUERY = gql`
  query Categories($after: String) {
    allBlog_posts(after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          category
        }
        cursor
      }
    }
  }
`;

export default function Categories() {
  const [show, setShow] = useState();
  const [value, setValue] = useState("");
  const [category, setCategory] = useState([]);
  
  const { data, loading, error, fetchMore } = useQuery(CATEGORIES_QUERY, {
    variables: {
      after: null
    }
  });

  if (loading) {
    return <> </>;
  }
  
  if (error) {
    console.error(error);
    return null;
  }
  
  if (data.allBlog_posts.pageInfo.hasNextPage) {
    const { endCursor } = data.allBlog_posts.pageInfo;
    
    fetchMore({
      variables: { after: endCursor, offset: 0 },
      
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.allBlog_posts.edges = [
          ...prevResult.allBlog_posts.edges,
          ...fetchMoreResult.allBlog_posts.edges
        ];
        return fetchMoreResult;
      }
    });
  }
  
  const categories = data.allBlog_posts.edges;

  const CategoriesDropdown = () => {
    const currentCategory = categories.map(cat => cat.node.category[0].text);
    setCategory([...new Set(currentCategory)]);

    setShow(!show)
  };

  const handleOnClick = (item) => {
    value === item ? setValue('') : setValue(item)
  }

  return (
    <div className={styles.sectionPostCategory}>
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.categoryWrapper}>
            <button
              className={styles.dropdown}
              onClick={CategoriesDropdown}
            >
              <div className={`${styles.dropdownName} ${show && styles.openDropdown}`}>
                Category
                <span className={styles.Icon}>
                  <Image src="/icons/down-arrow.svg" height={13} width={13} />
                </span>
              </div>
            </button>
            {show && (
              <div className={styles.dropdownListWrapper}>
                <span className={styles.closeCategoriesIcon} onClick={() => setShow(false)}>
                  <Image src="/icons/close-icon-light-cyan.svg" height={14} width={14} />
                </span>
                <h2 className={styles.title}>Categories</h2>
                <div className={styles.List}>
                  {category.map((item, i) => {
                    return (
                      <>
                        <div
                          key={i}
                          className={`${styles.ListItem} ${value === item ? styles.selected : ''}`}
                          value="Category"
                          onClick={() => handleOnClick(item)}
                        >
                          {value === item && (
                            <span>
                              <Image src="/icons/close-icon-v2.svg" height={14} width={14} />
                            </span>
                          )}
                          {item}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <Posts category={value} />
        </div>
      </Container>
    </div>
  );
}

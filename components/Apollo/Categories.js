import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
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
  const [value, setValue] = useState([]);
  const [category, setCategory] = useState([]);
  
  const { data, loading, error, fetchMore } = useQuery(CATEGORIES_QUERY, {
    variables: {
      after: null
    }
  });

  if (loading) {
    return <h2>Loading...</h2>;
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
    setShow(!show)
    
    const currentCategory = categories.map(
      (cat) => cat.node.category[0].text
      );
    setCategory([...new Set(currentCategory)]);
  };

  return (
    <>
      <div className={styles.categoryWrapper}>
        {!!value.length && (
          <div className={styles.selectedCategory}>
            <span>{value}</span>
            <span className={styles.Icon} onClick={() => setValue("")}>
              <Image src="/icons/close.svg" height={12} width={12} />
            </span>
          </div>
        )}
        <button
          className={styles.dropdown}
          onClick={() => CategoriesDropdown()}
        >
          <div className={`${styles.dropdownName} ${show && styles.openDropdown}`}>
            Category
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
    </>
  );
}

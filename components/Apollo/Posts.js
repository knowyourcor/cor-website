import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styles from "../../styles/blog/blog.module.scss";

const POSTS_QUERY = gql`
  query Categories($after: String) {
    allBlog_posts(first: 6, after: $after) {
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        node {
          featured_post
          title
          category
          date
          excerpt
          _meta {
            uid
          }
          content {
            image
            heading
            paragraph
            quote
          }
        }
        cursor
      }
    }
  }
`;

export default function Posts() {
  const { data, loading, error, fetchMore } = useQuery(QUERY, {
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
  
  const posts = data.allBlog_posts.edges;

  console.log(posts)

  return (
    <>
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
    </>
  );
}

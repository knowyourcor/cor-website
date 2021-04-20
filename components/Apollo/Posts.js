import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { RichText } from "prismic-reactjs";
import moment from "moment";

import styles from "../../styles/blog/blog.module.scss";

const POSTS_QUERY = gql`
  query Posts($after: String, $category: String) {
    allBlog_posts(first: 6, after: $after, where: { category_fulltext: $category }) {
      pageInfo {
        hasNextPage
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

export default function Posts(props) {
  const categoryName = props.category

  const { data, loading, error, fetchMore } = useQuery(POSTS_QUERY, {
    variables: {
      after: null,
      limit: null,
      category: categoryName,
    }
  });

  if (loading || !data) {
    return <h2 style={{ fontSize: "30px" }}>Loading...</h2>;
  }
  
  if (error) {
    console.error(error);
    return null;
  }
  
  const handleShowMore = () => { 
    if (data.allBlog_posts.pageInfo.hasNextPage) {
      const { endCursor } = data.allBlog_posts.pageInfo;
      
      fetchMore({
        variables: { after: endCursor, offset: 0, limit: 6 },
        
        updateQuery: (prevResult, { fetchMoreResult }) => {
          fetchMoreResult.allBlog_posts.edges = [
            ...prevResult.allBlog_posts.edges,
            ...fetchMoreResult.allBlog_posts.edges
          ];
          return fetchMoreResult;
        }
      });
    }
  };
  
  const posts = data.allBlog_posts.edges;

  return (
    <>
      <div className={styles.postWrapper}>
        {posts.map((item, i) => {
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
      {data.allBlog_posts.pageInfo.hasNextPage && 
        <div className={styles.buttonHolder}>
          <button className="btn btn--inverted" onClick={handleShowMore}>
            Show More
          </button>
        </div>
      }
    </>
  );
}

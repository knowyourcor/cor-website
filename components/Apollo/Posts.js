import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { RichText } from "prismic-reactjs";
import moment from "moment";
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";

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

const PostItem = ({ item, index }) => {
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
      <div className={styles.wrapper}>
        <p className={styles.category}>
          {RichText.asText(item.node.category)}
        </p>
        <p className={styles.date}>{date}</p>
      </div>
      <Link href={"/blog/" + item.node._meta.uid}>
        <a>
          <h2 className={styles.title}>
            {RichText.asText(item.node.title)}
          </h2>
        </a>
      </Link>
    </motion.div>
  )
}

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
          return (
            <PostItem 
              item={item}
              index={i}
              key={i}
            />
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

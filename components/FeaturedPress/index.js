import { useState } from "react"
import Link from "next/link"
import { RichText } from "prismic-reactjs";
import moment from "moment"
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";

import Section from "../Section";
import { Container, Row, Column } from "../Grid";

import styles from "./index.module.scss"


const POSTS_QUERY = gql`
query FeaturedPress($after: String) {
  allBlog_posts(sortBy:date_DESC, first: 3, after: $after, where: { category_fulltext: "Featured Press"}) {
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
          link_name
        }
      }
      cursor
    }
  }
}
`;

const FeaturedBlog = ({ item, index }) => {
  const [isHovered, setHovered] = useState(false)
  const [activeItem, setActiveItem] = useState("item-0");
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  let pathNode = item.node
  let pathNodeContent = pathNode.content[0]
  let date = moment(item.node.date).format("DD MMMM, YYYY")

  const transitionAnimate = {
    duration: 0.25,
    ease: "easeInOut"
  };

  const variants = {
    hidden: {
      opacity: 0,
      transitionAnimate
    },
    show: {
      opacity: 1,
      transitionAnimate
    }
  };

  const transition = {
    opacity: {
      duration: 0.45,
      ease: [0.465, 0.183, 0.153, 0.946],
    },
    y: {
      duration: 0.75,
      ease: [0.465, 0.183, 0.153, 0.946],
    },
  };

  const svgVariants = {
    open: {
      x: 50,
      opacity: 1,
      transition: transition,
    },
    closed: {
      x: 0,
      transition: transition,
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit="hidden"
      variants={variants}
      className={styles.featuredItem}
    >
      <Row align="center" textAlign={{ xs: "left" }}>
        <Column columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} className="custom__column" justify="center">
          <img
            src={pathNodeContent.image.url}
          />
        </Column>
        <Column columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} justify="center">
          <span>{date}</span>
          <Link href={"/blog/" + pathNode._meta.uid}><a><RichText render={pathNode.title} /></a></Link>
          {pathNodeContent?.link_name && (
            <motion.div
              className={styles.actionWrap}
              onMouseEnter={() => {
                setHovered(true)
                setActiveItem(`item-${index}`)
              }}
              onMouseLeave={() => {
                setHovered(false)
                setActiveItem(`item-${index}`)
              }}
            >
              <Link
                href={"/blog/" + pathNode._meta.uid}
              >
                <a>
                  <RichText render={pathNodeContent?.link_name} />
                  <motion.svg viewBox="0 0 512 512"
                    initial={false}
                    animate={isHovered && `item-${index}` === activeItem ? "open" : "closed"}
                    variants={svgVariants}
                  >
                    <g>
                      <g>
                        <path d="M506.134,241.843c-0.006-0.006-0.011-0.013-0.018-0.019l-104.504-104c-7.829-7.791-20.492-7.762-28.285,0.068 c-7.792,7.829-7.762,20.492,0.067,28.284L443.558,236H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h423.557 l-70.162,69.824c-7.829,7.792-7.859,20.455-0.067,28.284c7.793,7.831,20.457,7.858,28.285,0.068l104.504-104 c0.006-0.006,0.011-0.013,0.018-0.019C513.968,262.339,513.943,249.635,506.134,241.843z" />
                      </g>
                    </g>
                  </motion.svg>
                </a>
              </Link>
            </motion.div>
          )}
        </Column>
      </Row>
    </motion.div>
  )
}

export default function Index() {
  const { data, loading, error, fetchMore } = useQuery(POSTS_QUERY, {
    variables: {
      after: null
    }
  });

  if (loading) {
    return (
      <Section>
        <Container>
          <h2 className="loading">Loading...</h2>
        </Container>
      </Section>
    )
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
    <Section className={styles.featuredWrap}>
      <Container>
        <h2>Featured press</h2>
        <div className={styles.featuredList}>
          {posts?.map((item, i) => {
            return (
              <FeaturedBlog
                item={item}
                index={i}
                key={i}
              />
            )
          })}
        </div>
        {data.allBlog_posts.pageInfo.hasNextPage ? (
          <div className={styles.buttonHolder}>
            <button className="btn btn--inverted" onClick={handleShowMore}>
              Show More
            </button>
          </div>) : (
          <Link href="/blog"><a className="btn btn--inverted">View More Blogs</a></Link>
        )
        }

        {/* <Link href="/blog"><a className="btn btn--inverted">Show More</a></Link> */}
      </Container>
    </Section>
  )
}
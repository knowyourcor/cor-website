import Link from "next/link"
import { RichText } from "prismic-reactjs";
import moment from "moment"
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import Section from "../Section";
import { Container, Row, Column } from "../Grid";

import styles from "./index.module.scss"


const POSTS_QUERY = gql`
query Categories($after: String) {
  allBlog_posts(first: 100, after: $after) {
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

export default function Index({ blogData }) {
  const { data, loading, error, fetchMore } = useQuery(POSTS_QUERY, {
    variables: {
      after: null
    }
  });
  if (loading) {
    return <h2>Loading...</h2>;
  }
  console.log(fetchMore)
  console.log(data)
  // let arrFilter = []

  // for (let blog = 0; blogData.length <= 2; blog++) {
  //   // Runs 5 times, with values of step 0 through 4.
  //   console.log('Walking east one step');
  // }
  // blogData.forEach(element => {
  //   if (element.node.category[0].text === 'Case Studies & Research') {
  //     arrFilter.push(element)
  //   }
  // })

  // console.log(arrFilter)

  return (
    <Section className={styles.featuredWrap}>
      <Container>
        <h2>Featured press</h2>
        <div className={styles.featuredList}>
          {/* {arrFilter.map((item, i) => {
            console.log(item)
            let pathNode = item.node
            let pathNodeContent = pathNode.content[0]
            let date = moment(item.node.date).format('LL')
            return (
              <div key={i} className={styles.featuredItem}>
                <Row align="center" textAlign={{ xs: "left" }}>
                  <Column columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} className="custom__column" justify="center">
                    <img
                      src={pathNodeContent.image.url}
                    />
                  </Column>
                  <Column columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} justify="center">
                    <span>{date}</span>
                    <Link href={"/blog/" + pathNode._meta.uid}><a><RichText render={pathNodeContent.heading} /></a></Link>
                    {pathNodeContent?.link_name && (
                      <Link href={"/blog/" + pathNode._meta.uid}>
                        <a>
                          <RichText render={pathNodeContent?.link_name} />
                          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512">
                            <g>
                              <g>
                                <path d="M506.134,241.843c-0.006-0.006-0.011-0.013-0.018-0.019l-104.504-104c-7.829-7.791-20.492-7.762-28.285,0.068 c-7.792,7.829-7.762,20.492,0.067,28.284L443.558,236H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h423.557 l-70.162,69.824c-7.829,7.792-7.859,20.455-0.067,28.284c7.793,7.831,20.457,7.858,28.285,0.068l104.504-104 c0.006-0.006,0.011-0.013,0.018-0.019C513.968,262.339,513.943,249.635,506.134,241.843z" />
                              </g>
                            </g>
                          </svg>
                        </a>
                      </Link>
                    )}
                  </Column>
                </Row>
              </div>
            )
          })} */}
          {/* {fields.map((field, i) => {
            let date = moment(field.date).format('LL')
            return (
              <div key={i} className={styles.featuredItem}>
                <Row align="center" textAlign={{ xs: "left" }}>
                  <Column columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} className="custom__column" justify="center">
                    <img
                      src={field.image.url}
                    />
                  </Column>
                  <Column columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} justify="center">
                    <span>{date}</span>
                    <RichText render={field.heading} />
                    <Link href="/">
                      <a>
                        <RichText render={field.link_label} />
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512">
                          <g>
                            <g>
                              <path d="M506.134,241.843c-0.006-0.006-0.011-0.013-0.018-0.019l-104.504-104c-7.829-7.791-20.492-7.762-28.285,0.068 c-7.792,7.829-7.762,20.492,0.067,28.284L443.558,236H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h423.557 l-70.162,69.824c-7.829,7.792-7.859,20.455-0.067,28.284c7.793,7.831,20.457,7.858,28.285,0.068l104.504-104 c0.006-0.006,0.011-0.013,0.018-0.019C513.968,262.339,513.943,249.635,506.134,241.843z" />
                            </g>
                          </g>
                        </svg>
                      </a>
                    </Link>
                  </Column>
                </Row>
              </div>
            )
          })} */}
        </div>
        <Link href="/"><a className={["btn btn--inverted"].join(" ")}>Show More</a></Link>
      </Container>
    </Section>
  )
}
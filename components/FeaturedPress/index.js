import Image from "next/image"
import Link from "next/link"

import Section from "../Section"
import { Container, Row, Column } from "../Grid"

import styles from "./featured.module.scss"

const primary = [
  {
    image: "/images/featured/featured-1.jpg",
    date: "05 April, 2021",
    title: "How COR Has Helped Guide My Daily Routines.",
    urlName: "The New York Times",
    url: "/",
  },
  {
    image: "/images/featured/featured-2.jpg",
    date: "25 March, 2021",
    title: "How I Became An Expert In My Own Self Health",
    urlName: "TechCrunch",
    url: "/",
  },
  {
    image: "/images/featured/featured-3.jpg",
    date: "05 March, 2021",
    title: "Revolutionizing The Way We View Self Health",
    urlName: "Health",
    url: "/",
  }
]

export default function Index() {
  return (
    <Section className={styles.featuredWrap}>
      <Container>
        <h2>Featured press</h2>
        <div className={styles.featuredList}>
          {primary.map((item, i) => {
            return (
              <div key={i} className={styles.featuredItem}>
                <Row align="center" textAlign={{ xs: "center", sm: "left" }}>
                  <Column columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} className="custom__column" justify="center">
                    <Image
                      src={item.image}
                      alt="Featured Press"
                      width={753}
                      height={495}
                    />
                  </Column>
                  <Column columns={{ xs: 14, sm: 6 }} offsets={{ sm: 1 }} justify="center">
                    <span>{item.date}</span>
                    <h3>{item.title}</h3>
                    <Link href={item.url}>
                      <a>
                        {item.urlName}
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
          })}
        </div>
      </Container>
    </Section>
  )
}
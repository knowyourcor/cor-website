import { RichText } from "prismic-reactjs";
import Image from "next/image"
import { Container } from "../../../components/Grid"

import styles from "./content.module.scss"

const Index = ({ props }) => {
  return (
    <>
      {props.map((item, i) => (
        <div key={i} className={styles.postContent}>
          {item.image &&
            <div className={styles.imageWrapper}>
              <div className={styles.bgImage} style={{ backgroundImage: `url(${item.image.url})` }}></div>
              {/* <img className={styles.image} src={item.image.url} /> */}
            </div>
          }
          <div className={styles.contentText}>
            <Container>
              <div className={styles.contentWrapper}>
                <div className={styles.contentHolder}>
                  {/* <h2 className={styles.heading}>{item.heading}</h2> */}
                  <RichText render={item.heading} />
                </div>
                <div className={styles.contentHolder}>
                  {/* <p>{item.p}</p> */}
                  <RichText render={item.paragraph} />
                  {item.quote && <div className={styles.quoteText}><RichText render={item.quote} /></div>}
                  {/* {item.quote && <p className={styles.quoteText}>"{item.quote}"</p>} */}
                </div>
              </div>
            </Container>
          </div>
        </div>
      ))}
    </>
  )
}

export default Index

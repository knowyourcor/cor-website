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
            <Image
              src={item.image}
              className={styles.image}
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition= "0 50%"
            />
          </div>
        }
        <div className={styles.contentText}>
          <Container>
            <div className={styles.contentWrapper}>
              <div className={styles.contentHolder}>
                <h2 className={styles.heading}>{item.heading}</h2>
              </div>
              <div className={styles.contentHolder}>
                <p>{item.p}</p>
                {item.quote && <p className={styles.quoteText}>"{item.quote}"</p>}
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

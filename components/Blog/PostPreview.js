import Link from "next/link";
import { RichText, Date } from "prismic-reactjs";
import slugify from "slugify";
import Picture from "../Picture";
import styles from "./blog.module.scss";

export default function PostPreview({ node }) {
  const { _meta, title, date, excerpt, cover_image } = node;

  const timestamp = Date(date);

  const formattedDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(timestamp);

  return (
    <Link href={`/blog/${_meta.uid}`}>
      <a className={styles.postPreview}>
        <div className={styles.card}>
          <div className={styles.borderRadius}>
            <div className={styles.image}>
              {cover_image && <Picture image={cover_image} />}
            </div>
            <div className={styles.content}>
              <div className={styles.meta}>
                {_meta?.tags[0] && (
                  <p className={styles.tags}>{_meta.tags[0]}</p>
                )}
                {date && <p className={styles.date}>{formattedDate}</p>}
              </div>
              <h2>{title[0]?.text}</h2>
              <RichText render={excerpt} />
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

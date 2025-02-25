import Link from "next/link";
import { RichText, Date } from "prismic-reactjs";
import slugify from "slugify";
import Picture from "../Picture";
import styles from "./blog.module.scss";

export default function PostPinned({ node }) {
  const { _meta, title, date, excerpt, cover_image } = node;

  const timestamp = Date(date);

  const formattedDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(timestamp);

  return (
    <div className={styles.postPinned}>
      {cover_image && (
        <div className={styles.image}>
          <Link href={`/blog/${_meta.uid}`}>
            <a>
              <Picture image={cover_image} />
            </a>
          </Link>
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.meta}>
          {_meta?.tags[0] && (
            <Link
              href={`/blog/?filter=${slugify(_meta.tags[0], { lower: true })}`}
            >
              <a>{_meta.tags[0]}</a>
            </Link>
          )}
          {date && <p className={styles.date}>{formattedDate}</p>}
        </div>
        {title && (
          <h2>
            <Link href={`/blog/${_meta.uid}`}>
              <a>{title[0]?.text}</a>
            </Link>
          </h2>
        )}
        <RichText render={excerpt} />
      </div>
    </div>
  );
}

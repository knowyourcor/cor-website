import Link from "next/link";
import { RichText, Date } from "prismic-reactjs";
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

  const tagToCategorySlug = (tag) => tag?.toLowerCase().replace(" ", "-");

  return (
    //   <a
    //   href={post?.link?.url}
    //   target={post?.link?.target}
    //   className={styles.post}
    // >
    //   <div className={styles.card}>
    //     <div className={styles.borderRadius}>
    //       <div className={styles.image}>
    //         <Picture image={post.cover_image} />
    //       </div>
    //       <div className={styles.cardContent}>
    //         <RichText render={post.publisher} />
    //         <RichText render={post.title} />
    //         <p className={styles.date}>{formattedDate}</p>
    //       </div>
    //     </div>
    //   </div>
    // </a>

    <Link href={`/blog/${_meta.uid}`}>
      <a className={styles.postPreview}>
        <div className={styles.card}>
          <div className={styles.borderRadius}>
            <div className={styles.image}>
              <Picture image={cover_image} />
            </div>
            <div className={styles.content}>
              <div className={styles.meta}>
                <p className={styles.tags}>{_meta.tags[0]}</p>
                <p className={styles.date}>{formattedDate}</p>
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

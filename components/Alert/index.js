import { useRouter } from "next/router";
import styles from "./alert.module.scss";

export default function Alert({ children }) {
  const { isPreview } = useRouter();
  return (
    <div className={styles.alert}>
      {children}
      {isPreview ? (
        <>
          <p>You're viewing a preview of this page</p>
          <a href="/api/exit-preview" className={styles.button}>
            Exit Preview
          </a>
        </>
      ) : null}
    </div>
  );
}

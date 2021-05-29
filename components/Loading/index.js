import styles from "./loading.module.scss";
export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
}

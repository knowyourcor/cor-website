import styles from "./alert.module.scss";

export default function Alert({ preview }) {
  return (
    <>
      {preview && (
        <div className={styles.alert}>
          <p>
            This is page is a preview.{" "}
            <a href="/api/exit-preview">Click here</a> to exit preview mode.
          </p>
        </div>
      )}
    </>
  );
}

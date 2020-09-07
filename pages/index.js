import Head from "../components/Head";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head title="Welcome" />

      <main className={styles.main}>
        <h1 className={styles.title}>
          <img src="/images/cor.svg" alt="COR Logo" className={styles.logo} />
        </h1>

        <p className={styles.description}>
          Initial website structure and setup.
        </p>

        <div className={styles.grid}></div>
      </main>

      <footer className={styles.footer}>
        <a href="#"></a>
      </footer>
    </div>
  );
}

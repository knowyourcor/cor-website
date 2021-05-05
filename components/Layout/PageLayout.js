import { getLayout as getPageLayout } from "./index";
import styles from "./layout.module.scss";

export default function PageLayout({ children }) {
  return (
    <>
      <main className={styles.main} id="main">
        {children}
      </main>
    </>
  );
}

export const getLayout = (page) =>
  getPageLayout(<PageLayout>{page}</PageLayout>);

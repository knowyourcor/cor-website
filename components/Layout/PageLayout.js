import { useRouter } from "next/router";
import slugify from "slugify";
import { getLayout as getPageLayout } from "./index";
import styles from "./layout.module.scss";

export default function PageLayout({ children }) {
  const router = useRouter();
  const route = router.route === "/" ? "homepage" : router.route;
  const pageName = slugify(route, { lower: true });

  return (
    <>
      <main
        className={[styles.main, styles[`page-${pageName}`]].join(" ")}
        id="main"
      >
        {children}
      </main>
    </>
  );
}

export const getLayout = (page) =>
  getPageLayout(<PageLayout>{page}</PageLayout>);

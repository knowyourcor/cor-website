import Head from "../Head";
import Alert from "../Alert"
import Navigation from "../Navigation";
import Footer from "../Footer";

import { getMenuData } from "../../lib/api";

const Layout = ({
  children,
  mainMenuData,
  footerMenuData,
  tertiaryMenuData,
  classNameVal,
  title,
  preview,
}) => {
  return (
    <>
      <Head title={title} />
      <Alert preview={preview} />
      <main className={classNameVal}>
        <Navigation mainMenuData={mainMenuData} />
        {children}
      </main>
      <Footer
        footerMenuData={footerMenuData}
        tertiaryMenuData={tertiaryMenuData}
      />
    </>
  )
}

export default Layout


// export async function getStaticProps() {
//   const mainMenuData = await getMenuData("main-menu");
//   const footerMenuData = await getMenuData("footer-menu");
//   const tertiaryMenuData = await getMenuData("tertiary-menu");
//   return {
//     props: {
//       mainMenuData,
//       footerMenuData,
//       tertiaryMenuData,
//     },
//     revalidate: 1, // In seconds
//   };
// }
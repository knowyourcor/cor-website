import Head from "../Head";
import Alert from "../Alert"
import Navigation from "../Navigation";
import Footer from "../Footer";

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

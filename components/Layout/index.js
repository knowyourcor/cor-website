import Alert from "../Alert";
import Navigation from "../Navigation";
import Footer from "../Footer";

export default function Layout({ children, preview }) {
  return (
    <>
      <Alert preview={preview} />
      {children?.props?.children?.props?.children?.props?.mainMenuData && (
        <Navigation
          mainMenuData={
            children?.props?.children?.props?.children?.props?.mainMenuData
          }
        />
      )}
      {children}
      {children?.props?.children?.props?.children?.props?.footerMenuData && (
        <Footer
          footerMenuData={
            children?.props?.children?.props?.children?.props?.footerMenuData
          }
          tertiaryMenuData={
            children?.props?.children?.props?.children?.props?.tertiaryMenuData
          }
        />
      )}
      {/* a11y - aria-describedby */}
      <div hidden>
        <span id="new-window-0">Opens in a new window</span>
        <span id="new-window-1">Opens an external site</span>
        <span id="new-window-2">Opens an external site in a new window</span>
      </div>
    </>
  );
}

export const getLayout = (page) => <Layout>{page}</Layout>;

import React from "react";
import Alert from "../Alert";
import Navigation from "../Navigation";
import Footer from "../Footer";

export default function Layout({ children, preview }) {
  const childProps = React.Children.map(
    children?.props?.children?.props?.children,
    (child) => {
      return {
        mainMenuData: child?.props?.mainMenuData,
        footerMenuData: child?.props?.footerMenuData,
        tertiaryMenuData: child?.props?.tertiaryMenuData,
        preview: child?.props?.preview,
      };
    }
  );

  return (
    <>
      <Alert preview={preview} />
      {childProps && <Navigation mainMenuData={childProps[0].mainMenuData} />}
      {children}
      {childProps && (
        <Footer
          footerMenuData={childProps[0].footerMenuData}
          tertiaryMenuData={childProps[0].tertiaryMenuData}
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

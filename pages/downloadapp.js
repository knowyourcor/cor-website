import { useEffect } from "react";
export default function DownloadApp() {
  useEffect(() => {
    window.location.assign(
      "https://apps.apple.com/us/app/cor-lifestyle-science/id1541622602"
    );
  }, []);
  return <></>;
}

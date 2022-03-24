import Router from "next/router";
import { useEffect } from "react";
import { getLayout } from "../components/Layout/PageLayout";

export default function Homepage() {
  useEffect(() => {
    Router.push("/");
  }, []);
  return null;
}

Homepage.getLayout = getLayout;

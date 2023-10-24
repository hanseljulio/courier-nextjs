import Head from "next/head";
import React, { ReactNode } from "react";

interface ILayout {
  children: ReactNode;
}

function Layout({ children }: ILayout) {
  return <Head>{children}</Head>;
}

export default Layout;

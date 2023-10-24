import React, { ReactNode } from "react";

interface ILayout {
  children: ReactNode;
}

function Layout({ children }: ILayout) {
  return (
    <div>
      <h1>Header</h1>
      {children}
      <h1>footer</h1>
    </div>
  );
}

export default Layout;

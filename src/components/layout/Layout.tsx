import { LayoutProps } from "@/src/interfaces/LayoutProps";
import React from "react";
import Header from "../header/Header";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <div>
        {/* sidebar */}
        <div className="container mx-auto max-w-screen-xl sm:w-11/12 md:w-5/6 lg:w-3/4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

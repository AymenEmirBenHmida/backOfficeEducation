import { LayoutProps } from "@/src/interfaces/LayoutProps";
import React from "react";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <div>
        <div className="container mx-auto max-w-screen-xl sm:w-11/12 md:w-5/6 lg:w-3/4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

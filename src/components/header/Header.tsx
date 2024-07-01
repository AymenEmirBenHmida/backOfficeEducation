import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import LanguageChanger from "../languageChanger/LanguageChanger";
import SideDrawer from "../drawer/SideDrawer";
import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  //show side drawer everywhere except lofin or signup page
  const shouldShowSideDrawer =
    location.pathname !== "/login" && location.pathname !== "/signup";

  return (
    <AppBar
      position="static"
      sx={
        {
          // backgroundColor: "white",
          // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2) important!",
        }
      }
    >
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          {shouldShowSideDrawer ? <SideDrawer /> : <></>}
        </Typography>
        <LanguageChanger></LanguageChanger>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

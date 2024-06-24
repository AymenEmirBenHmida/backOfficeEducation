import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";

import LanguageChanger from "../languageChanger/LanguageChanger";

const Header: React.FC = () => {
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* for the future in case we want to add something like a logo */}
        </Typography>
        <LanguageChanger></LanguageChanger>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

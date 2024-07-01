import { Drawer, IconButton } from "@mui/material";
import React, { useState } from "react";
import { CiMenuBurger, CiViewList } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import DrawerTeacher from "./drawerContent/teacher/DrawerTeacher";
const SideDrawer: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  //open or close drawer
  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <>
      <IconButton
        aria-label="Menu"
        // onClick={logOut}
        sx={{ color: "white", display: "flex", alignItems: "center" }}
        onClick={() => {
          toggleDrawer(true);
        }}
      >
        <CiMenuBurger style={{ marginRight: "5px" }} />
        {t("txt_menu")}
      </IconButton>

      <Drawer
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "#1556A0",
            color: "#fff",
            minWidth: "250px",
            display: "flex",
            justifyContent: "center",
          },
        }}
        onClose={() => {
          toggleDrawer(false);
        }}
      >
        <DrawerTeacher></DrawerTeacher>
      </Drawer>
    </>
  );
};

export default SideDrawer;

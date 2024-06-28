import { Avatar, Box, Button, Drawer, IconButton } from "@mui/material";
import React, { useState } from "react";
import { FaBell, FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { IoDocumentText, IoLogOutOutline } from "react-icons/io5";
import { CiMenuBurger, CiViewList } from "react-icons/ci";
import { GiBookCover } from "react-icons/gi";
import { MdMenuBook } from "react-icons/md";
import { GrScorecard } from "react-icons/gr";
import profile from "/images/profile.svg";
import "./SideDrawer.css";

import { useTranslation } from "react-i18next";
const SideDrawer: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "0px",
            flexDirection: "column",
          }}
        >
          <Avatar
            alt="Dan Abrahmov"
            src={profile}
            sx={{ width: 90, height: 90 }}
          />
          <div className="mt-[10px]">{t("txt_profile")}</div>
        </div>
        <div className="flex flex-col items-start mr-10 ml-[20px]">
          <Button
            ////variant="outlined"
            className="tab "
            aria-label="Home"
            startIcon={<FaHome />}
            onClick={() => {
              // router.push("/dashAdmin");
            }}
          >
            {t("txt_dashboard")}
          </Button>
          <Button
            ////variant="outlined"
            className="tab"
            aria-label="students"
            startIcon={<FaUser />}
            onClick={() => {
              // router.push("/students");
            }}
          >
            {t("txt_profile")}
          </Button>

          <Button
            ////variant="outlined"
            className="tab"
            aria-label="Home"
            startIcon={<FaBook />}
            onClick={() => {
              // router.push("/departements");
            }}
          >
            {t("txt_manage_exercises")}
          </Button>

          <Button
            ////variant="outlined"
            className="tab"
            aria-label="teachers"
            startIcon={<IoDocumentText />}
          >
            {t("txt_manage_lessons")}
          </Button>
          <Button
            //variant="outlined"
            className="tab"
            aria-label="teachers"
            startIcon={<GiBookCover />}
            onClick={() => {
              // router.push("/fileUpload");
            }}
          >
            {t("txt_manage_subjects")}
          </Button>

          <Button
            //variant="outlined"
            className="tab"
            aria-label="absence"
            startIcon={<MdMenuBook />}
          >
            {t("txt_manage_chapters")}
          </Button>
          <Button
            //variant="outlined"
            className="tab"
            aria-label="matieres"
            startIcon={<GrScorecard />}
            onClick={() => {
              // router.push("/subjects");
            }}
          >
            {t("txt_manage_trimesters")}
          </Button>
          <div className="w-full mt-[15px]">
            <div className="flex justify-center items-center">
              <Button
                variant="contained"
                className="!bg-accent !normal-case  "
                sx={{ color: "black" }}
                endIcon={<IoLogOutOutline />}
              >
                {t("txt_logout")}
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default SideDrawer;

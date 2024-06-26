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
          },
        }}
        onClose={() => {
          toggleDrawer(false);
        }}
      >
        <div className="general-tabs pt-[60px]">
          <Button
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
            className="tab"
            aria-label="teachers"
            startIcon={<IoDocumentText />}
          >
            {t("txt_manage_lessons")}
          </Button>
          <Button
            variant="outlined"
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
            variant="outlined"
            className="tab"
            aria-label="absence"
            startIcon={<MdMenuBook />}
          >
            {t("txt_manage_chapters")}
          </Button>
          <Button
            variant="outlined"
            className="tab"
            aria-label="matieres"
            startIcon={<GrScorecard />}
            onClick={() => {
              // router.push("/subjects");
            }}
          >
            {t("txt_manage_trimesters")}
          </Button>
          <div className="spacing">
            <div className="profile-tab">
              <div
                style={{ display: "flex", alignItems: "center", margin: "0px" }}
              >
                <Avatar
                  alt="Dan Abrahmov"
                  src="https://bit.ly/dan-abramov"
                  sx={{ width: 40, height: 40 }}
                />
                <div style={{ marginLeft: "10px" }}>Profile</div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <IconButton
                  aria-label="notifications"
                  sx={{ padding: 0, margin: 0, color: "white" }}
                >
                  <FaBell />
                </IconButton>
                <IconButton
                  aria-label="logout"
                  // onClick={logOut}
                  sx={{ padding: 0, margin: 0, color: "white" }}
                >
                  <IoLogOutOutline />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default SideDrawer;

import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { IoDocumentText, IoLogOutOutline } from "react-icons/io5";
import { GiBookCover } from "react-icons/gi";
import { MdMenuBook } from "react-icons/md";
import { GrScorecard } from "react-icons/gr";
import profile from "/images/profile.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./DrawerTeacher.css";
import { useDispatch } from "react-redux";
import { logout as logoutRedux } from "../../../../redux/adminSlice";

const SideDrawer: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //logout
  const logout = () => {
    dispatch(logoutRedux());
    // navigate("/login");
  };
  return (
    <>
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
            navigate("/teacher/exercises");
          }}
        >
          {t("txt_manage_exercises")}
        </Button>

        <Button
          ////variant="outlined"
          className="tab"
          aria-label="teachers"
          startIcon={<IoDocumentText />}
          onClick={() => {
            navigate("/teacher/all-lessons");
          }}
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
            navigate("/login");
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
              onClick={() => {
                logout();
              }}
            >
              {t("txt_logout")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;

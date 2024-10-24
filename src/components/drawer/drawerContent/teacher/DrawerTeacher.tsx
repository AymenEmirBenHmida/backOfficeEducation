import { Avatar, Button } from "@mui/material";
import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  logout as logoutRedux,
  selectUserRole,
} from "../../../../redux/adminSlice";

const SideDrawer: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //getting the current user
  const userRole = useSelector(selectUserRole);
  //logout
  const logout = () => {
    dispatch(logoutRedux());
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
        {/* <Button
          className="tab "
          aria-label="Home"
          startIcon={<FaHome />}
          onClick={() => {
          }}
        >
          {t("txt_dashboard")}
        </Button>
        <Button
          className="tab"
          aria-label="students"
          startIcon={<FaUser />}
          onClick={() => {
          }}
        >
          {t("txt_profile")}
        </Button> */}
        {userRole === "Teacher" && (
          <>
            <Button
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
              className="tab"
              aria-label="teachers"
              startIcon={<IoDocumentText />}
              onClick={() => {
                navigate("/teacher/lessons");
              }}
            >
              {t("txt_manage_lessons")}
            </Button>
            <Button
              className="tab"
              aria-label="absence"
              startIcon={<MdMenuBook />}
              onClick={() => {
                navigate("/teacher/chapters");
              }}
            >
              {t("txt_manage_chapters")}
            </Button>
          </>
        )}
        {userRole === "Admin" && (
          <>
            <Button
              className="tab"
              aria-label="teachers"
              startIcon={<GiBookCover />}
              onClick={() => {
                navigate("/admin/validate-exercices");
              }}
            >
              {t("txt_validate_exercices")}
            </Button>
            <Button
              className="tab"
              aria-label="teachers"
              startIcon={<GiBookCover />}
              onClick={() => {
                navigate("/admin/subjects");
              }}
            >
              {t("txt_manage_subjects")}
            </Button>
            <Button
              //variant="outlined"
              className="tab"
              aria-label="matieres"
              startIcon={<GrScorecard />}
              onClick={() => {
                navigate("/admin/trimesters");
              }}
            >
              {t("txt_manage_trimesters")}
            </Button>
          </>
        )}
        <div className="w-full mt-auto" style={{ marginTop: "40%" }}>
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

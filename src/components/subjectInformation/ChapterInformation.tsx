import React, { useEffect, useState } from "react";
import { Skeleton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "@/redux/Store";
import { useDispatch } from "react-redux";
import { getSubject } from "@/redux/subjectsSlice";
interface ChapterInfoProps {
  selectedChapterId: string;
}
const SubjectInformation: React.FC<ChapterInfoProps> = ({
  selectedChapterId,
}) => {
  const { t } = useTranslation();
  //used to access redux
  const dispatch = useDispatch<AppDispatch>();
  //the chapters gotten from the backend
  const [subject, setSubject] = useState(null);
  //variable responsible for the initial loading of info
  const [loading, setLoading] = useState(true);
  // styling for the modal
  const style = {
    overflowX: "auto",
    overflowY: "auto",
    position: "relative",
    top: "50%",
    left: "50%",
    maxHeight: "100%",
    transform: "translate(-50%, -50%)",
    width: "90%", // Default to 90% of the screen width
    maxWidth: 600, // Maximum width for larger screens
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  //variable responsible the update loading
  // getting the lesson to be updated
  const handleGetSubject = async () => {
    try {
      const response = await dispatch(getSubject(selectedChapterId));
      setSubject(response.payload.data);
      console.log(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  //initial functions called
  useEffect(() => {
    handleGetSubject();
    console.log("entered use effect");
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Skeleton className="!mb-2" />
          <Skeleton className="!mb-2" animation="wave" />
          <Skeleton className="!mb-2" />
          <Skeleton className="!mb-2" />
          <Skeleton className="!mb-2" />
        </>
      ) : (
        subject !== null &&
        subject !== undefined && (
          <>
            {" "}
            <Typography variant="h5" component="div">
              {subject.name}
            </Typography>
            <Typography variant="body1" component="div">
              {t("txt_description")}: {subject.description}
            </Typography>
            <Typography variant="body1" component="div">
              {t("txt_locked")}: {subject.isLocked ? t("txt_yes") : t("txt_no")}
            </Typography>
            {/* <Typography variant="body1" component="div">
              {t("txt_trimester")}:{" "}
              {chapter.estTermine ? t("txt_yes") : t("txt_no")}
            </Typography> */}
            {subject.trimestre !== null ? (
              <div style={{ marginTop: "5px" }}>
                <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                  {t("txt_trimester")}
                </Typography>
                <Typography variant="body1" component="div">
                  Name : {subject.trimestre.name}
                </Typography>
                <Typography variant="body1" component="div">
                  Slug : {subject.trimestre.slug}
                </Typography>
                <Typography variant="body1" component="div">
                  {t("txt_locked")}:{" "}
                  {subject.trimestre.isLocked ? t("txt_yes") : t("txt_no")}
                </Typography>
              </div>
            ) : null}
          </>
        )
      )}
    </>
  );
};

export default SubjectInformation;

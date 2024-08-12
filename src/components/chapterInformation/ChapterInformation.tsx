import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Modal,
  Skeleton,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "@/redux/Store";
import { useDispatch } from "react-redux";
import { getChapter } from "@/redux/chaptersSlice";
import AddChapter from "../addChapter/AddChapter";
interface ChapterInfoProps {
  selectedChapterId: string;
}
const ChapterInformation: React.FC<ChapterInfoProps> = ({
  selectedChapterId,
}) => {
  const { t } = useTranslation();
  //used to access redux
  const dispatch = useDispatch<AppDispatch>();
  //the chapters gotten from the backend
  const [chapter, setChapter] = useState(null);
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
  const handleGetChapter = async () => {
    try {
      const response = await dispatch(getChapter(selectedChapterId));
      setChapter(response.payload.data);
      console.log(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  //initial functions called
  useEffect(() => {
    handleGetChapter();
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
        chapter !== null &&
        chapter !== undefined && (
          <>
            <Typography variant="h5" component="div">
              {chapter.name}
            </Typography>
            <Typography variant="body1" component="div">
              {t("txt_description")}: {chapter.description}
            </Typography>
            <Typography variant="body1" component="div">
              {t("txt_locked")}: {chapter.isLocked ? t("txt_yes") : t("txt_no")}
            </Typography>
            <Typography variant="body1" component="div">
              {t("txt_completed")}:{" "}
              {chapter.estTermine ? t("txt_yes") : t("txt_no")}
            </Typography>

            {chapter.cours && chapter.cours.length !== 0 ? (
              <div style={{ marginTop: "5px" }}>
                <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                  {t("txt_lessons")}
                </Typography>
                <List>
                  {chapter.cours.map((course) => (
                    <ListItem className="!m-0 !p-0" key={course.id}>
                      <ListItemText
                        primary={course.name}
                        secondary={`Description: ${course.description}, Time Passed: ${course.tempsPasse}, Estimated Time: ${course.tempsEstime}`}
                      />
                      <Box>
                        {course.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`course-${index}`}
                            style={{
                              maxWidth: "100px",
                              maxHeight: "100px",
                              margin: "5px 10px",
                            }}
                          />
                        ))}
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </div>
            ) : null}

            <Typography variant="h6" component="div" sx={{ mt: 2 }}>
              {t("txt_subject")}
            </Typography>
            <Typography variant="body1" component="div">
              {t("txt_name")}: {chapter.matiere.name}
            </Typography>
            <Typography variant="body1" component="div">
              {t("txt_description")}: {chapter.matiere.description}
            </Typography>
          </>
        )
      )}
    </>
  );
};

export default ChapterInformation;

import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ExerciceUpdateProps } from "@/interfaces/ExerciceCrudProps";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/Store";
import { getExercice, updatExercice } from "@/redux/exerciceSlice";
import { LessonInterface } from "@/interfaces/LessonInterface";
import { getAllLessons } from "@/redux/lessonSlice";

const Read: React.FC<ExerciceUpdateProps> = ({
  handleSubmit,
  updateLoading,
  selectedExerciceId,
  errors,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  //form variable
  const [formData, setFormData] = useState<any>({
    typeQuestion: "",
    content: {
      text: "",
      image: "",
    },
    courId: "",
    description: "",
    isLocked: false,
  });
  //loading animation variable
  const [loading, setLoading] = useState(true);
  //lessons variable
  const [lessons, setLessons] = useState<LessonInterface[]>([]);
  //change content attribute
  const handleContentChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }));
  };
  //change form variabel
  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
  //leave out unnecessary attributes
  const cleanFormData = (data: any) => {
    const {
      cour, // Add the attributes you want to remove
      createById,
      createdAt,
      updatedAt,
      ...cleanedData
    } = data;
    return cleanedData;
  };
  //update exercice

  //get exercice
  const handleGetExercice = async () => {
    const response = await dispatch(getExercice(selectedExerciceId));
    setFormData(response.payload.data);
    console.log(response);
  };
  //getting all lessons
  const getLessons = async () => {
    const result = await dispatch(getAllLessons());
    if (getAllLessons.fulfilled.match(result)) {
      setLessons(result.payload as LessonInterface[]);
    } else {
      console.error("Failed to fetch lessons");
    }
  };
  useEffect(() => {
    handleGetExercice();
    getLessons();
    console.log("entered use effect");
  }, []);

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {formData.typeQuestion}
      </Typography>
      <Select
        value={formData.courId}
        label={t("txt_lesson")}
        onChange={(e) => {
          console.log("lesson id", e.target.value);
          handleFormChange("courId", e.target.value);
        }}
        className="w-full"
      >
        {lessons.map((lesson) => (
          <MenuItem key={lesson.id} value={lesson.id}>
            {lesson.name}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label={t("txt_text")}
        value={formData.content.text || ""}
        onChange={(e) => handleContentChange("text", e.target.value)}
        fullWidth
        className="!mt-[15px]"
      />
      <TextField
        label={t("txt_image")}
        value={formData.content.text || ""}
        onChange={(e) => handleContentChange("image", e.target.value)}
        fullWidth
        className="!mt-[15px]"
      />
      <FormControlLabel
        className="!mt-[15px]"
        control={
          <Checkbox
            value={formData.isLocked}
            checked={formData.isLocked}
            onChange={(e) => handleFormChange("isLocked", e.target.checked)}
          />
        }
        label={t("txt_locked")}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          console.log(formData);
          await handleSubmit(formData, selectedExerciceId, cleanFormData);
        }}
        className="!mt-[15px]"
      >
        {updateLoading ? (
          <CircularProgress sx={{ color: "white" }} size={30} />
        ) : (
          t("txt_submit")
        )}
      </Button>
    </>
  );
};

export default Read;

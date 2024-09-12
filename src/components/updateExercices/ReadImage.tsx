import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Select,
  MenuItem,
  Skeleton,
  CircularProgress,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ExerciceUpdateProps } from "@/interfaces/ExerciceCrudProps";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/Store";
import { getExercice, updatExercice } from "@/redux/exerciceSlice";
import { LessonInterface } from "@/interfaces/LessonInterface";
import { getAllLessons } from "@/redux/lessonSlice";

const ReadImage: React.FC<ExerciceUpdateProps> = ({
  selectedExerciceId,
  handleSubmit,
  setErrors,
  errors,
  handleApproval,
  isApproval,
  handleRefusal,
  refusalLoading,
}) => {
  const { t } = useTranslation();
  //refusal comment
  const [refusalComment, setRefusalComment] = useState("");
  //lessons variable
  const [lessons, setLessons] = useState<LessonInterface[]>([]);
  //initial loading
  const [loading, setLoading] = useState(true);
  //loading on update
  const [updateLoading, setUpdateLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  //the inputs state variable
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
  //change the content attribute
  const handleContentChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }));
  };
  //change the attributes directly under the dormData variable
  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
  //handles updating exercice

  //getting an exercice
  const handleGetExercice = async () => {
    try {
      const response = await dispatch(getExercice(selectedExerciceId));
      setFormData(response.payload.data);
      console.log(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  //leave unnecessary attributes
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
  //get lessons
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
    setErrors({});
  }, []);

  return (
    <>
      {loading ? (
        <>
          {" "}
          <Skeleton className="!mb-2" />
          <Skeleton className="!mb-2" animation="wave" />
          <Skeleton className="!mb-2" />
          <Skeleton className="!mb-2" />
          <Skeleton className="!mb-2" />
        </>
      ) : (
        <>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {formData.typeQuestion}
          </Typography>
          <FormControl required fullWidth className="!mt-[15px]">
            <InputLabel>{t("txt_lesson")}</InputLabel>
            <Select
              disabled={isApproval}
              value={formData.courId}
              error={!!errors[`courId`]}
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
            {!!errors[`courId`] && (
              <FormHelperText sx={{ color: "red" }}>
                {errors[`courId`]}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth className="!mt-[15px]">
            <TextField
              disabled={isApproval}
              error={!!errors[`description`]}
              helperText={errors[`description`]}
              label={t("txt_description")}
              value={formData.description}
              onChange={(e) => handleFormChange("description", e.target.value)}
              fullWidth
            />
          </FormControl>
          <TextField
            disabled={isApproval}
            label={t("txt_text")}
            value={formData.content.text || ""}
            required
            error={!!errors[`content.text`]}
            helperText={errors[`content.text`]}
            onChange={(e) => handleContentChange("text", e.target.value)}
            fullWidth
            className="!mt-[15px]"
          />
          <TextField
            disabled={isApproval}
            label={t("txt_image")}
            value={formData.content.image || ""}
            required
            error={!!errors[`content.image`]}
            helperText={errors[`content.image`]}
            onChange={(e) => handleContentChange("image", e.target.value)}
            fullWidth
            className="!mt-[15px]"
          />
          <FormControlLabel
            className="!mt-[15px]"
            control={
              <Checkbox
                disabled={isApproval}
                value={formData.isLocked}
                checked={formData.isLocked}
                onChange={(e) => handleFormChange("isLocked", e.target.checked)}
              />
            }
            label={t("txt_locked")}
          />
          {isApproval && (
            <TextField
              className="!mr-[5px]"
              label={t("txt_refusal_comment")}
              value={refusalComment}
              onChange={(e) => setRefusalComment(e.target.value)}
              fullWidth
            />
          )}
          {isApproval ? (
            <>
              <Button
                className="!mt-[15px] !mr-[5px]"
                variant="contained"
                color="primary"
                onClick={async () => {
                  console.log(formData);
                  await handleApproval!(
                    formData,
                    selectedExerciceId,
                    cleanFormData
                  );
                }}
              >
                {updateLoading ? (
                  <CircularProgress sx={{ color: "white" }} size={30} />
                ) : (
                  t("txt_approve")
                )}
              </Button>
              <Button
                className="!mt-[15px]"
                variant="contained"
                color="error"
                onClick={async () => {
                  await handleRefusal!(refusalComment, selectedExerciceId);
                }}
              >
                {refusalLoading ? (
                  <CircularProgress sx={{ color: "white" }} size={30} />
                ) : (
                  t("txt_refuse")
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                className="!mt-[15px]"
                variant="contained"
                color="primary"
                onClick={async () => {
                  console.log(formData);
                  await handleSubmit(
                    formData,
                    selectedExerciceId,
                    cleanFormData
                  );
                }}
              >
                {updateLoading ? (
                  <CircularProgress sx={{ color: "white" }} size={30} />
                ) : (
                  t("txt_submit")
                )}{" "}
              </Button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ReadImage;

import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  Button,
  Skeleton,
  CircularProgress,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ExerciceUpdateProps } from "@/interfaces/ExerciceCrudProps";
import { LessonInterface } from "@/interfaces/LessonInterface";
import { AppDispatch } from "@/redux/Store";
import { useDispatch } from "react-redux";
import { getAllLessons } from "@/redux/lessonSlice";
import { getExercice, updatExercice } from "@/redux/exerciceSlice";

const QcmImageWords: React.FC<ExerciceUpdateProps> = ({
  handleSubmit,
  setErrors,
  updateLoading,
  selectedExerciceId,
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
  //initial loading variable
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  //form inputs variable
  const [formData, setFormData] = useState<any>({
    typeQuestion: "",
    content: {
      text: "",
      options: [{ text: "", image: "", isCorrect: false }],
    },
    courId: "",
    description: "",
    isLocked: false,
  });
  //handle changing the options attribute
  const handleOptionChange = (index: number, field: string, value: any) => {
    const newOptions = [...formData.content.options];
    if (field === "isCorrect") {
      newOptions.forEach((option, i) => {
        if (i !== index) {
          option.isCorrect = false;
        }
      });
    }
    newOptions[index] = { ...newOptions[index], [field]: value };
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        options: newOptions,
      },
    }));
  };
  //handles changing the content attrbiute
  const handleContentChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }));
  };
  //remove an option
  const removeOption = (index: number) => {
    const newOptions = [...formData.content.options];
    newOptions.splice(index, 1);
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        options: newOptions,
      },
    }));
  };
  //add option
  const addOption = () => {
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        options: [...prev.content.options, { text: "", isCorrect: false }],
      },
    }));
  };
  //change the form variable attributes directly under it
  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
  //handle updating exercice

  //getting exercice
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
  //getting lessons
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
            required
            error={!!errors["content.text"]}
            helperText={errors["content.text"]}
            label={t("txt_text")}
            value={formData.content.text || ""}
            onChange={(e) => handleContentChange("text", e.target.value)}
            fullWidth
            className="!mt-[15px]"
          />
          {formData.content.options.map((option: any, index: number) => (
            <Box key={index} className="!mt-[15px]">
              <TextField
                disabled={isApproval}
                required
                error={!!errors[`content.options.${index}.text`]}
                helperText={errors[`content.options.${index}.text`]}
                label={`${t("txt_text")} ${index + 1}`}
                value={option.text}
                onChange={(e) =>
                  handleOptionChange(index, "text", e.target.value)
                }
                fullWidth
              />
              <TextField
                disabled={isApproval}
                error={!!errors[`content.options.${index}.image`]}
                helperText={errors[`content.options.${index}.image`]}
                required
                label={`${t("txt_image")} ${index + 1}`}
                value={option.image}
                onChange={(e) =>
                  handleOptionChange(index, "image", e.target.value)
                }
                fullWidth
              />
              <FormControlLabel
                label={t("txt_is_correct")}
                control={
                  <Checkbox
                    disabled={isApproval}
                    checked={option.isCorrect}
                    aria-label={"is correct"}
                    onChange={(e) =>
                      handleOptionChange(index, "isCorrect", e.target.checked)
                    }
                  />
                }
              />
              {/* <IconButton onClick={() => removeOption(index)}>
                {t("txt_remove")}
              </IconButton> */}
            </Box>
          ))}
          {!!errors[`content.options`] && (
            <FormHelperText sx={{ color: "red" }}>
              {errors[`content.options`]}
            </FormHelperText>
          )}
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
              <Button onClick={addOption} className="!mt-[15px]">
                {t("txt_add")}
              </Button>
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

export default QcmImageWords;

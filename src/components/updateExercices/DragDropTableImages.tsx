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
  Select,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ExerciceUpdateProps } from "@/interfaces/ExerciceCrudProps";
import { LessonInterface } from "@/interfaces/LessonInterface";
import { AppDispatch } from "@/redux/Store";
import { useDispatch } from "react-redux";
import { getExercice, updatExercice } from "@/redux/exerciceSlice";
import { getAllLessons } from "@/redux/lessonSlice";
import { CiCircleRemove } from "react-icons/ci";

const DragDropTableImages: React.FC<ExerciceUpdateProps> = ({
  handleSubmit,
  setErrors,
  updateLoading,
  selectedExerciceId,
  handleApproval,
  isApproval,
  errors,
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
      options: [{ text: "", isCorrect: false }],
      columns: [{ text: "", background: "" }],
    },
    courId: "",
    description: "",
    isLocked: false,
  });
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
  //handle changing the columns attribute
  const handleColumnsChange = (index: number, field: string, value: any) => {
    const newColumns = formData.content.columns
      ? [...formData.content.columns]
      : [];
    const newOptions = [...formData.content.options];
    if (field === "columnIndex" || field === "image") {
      newOptions[index] = { ...newOptions[index], [field]: value };
      setFormData((prev: any) => ({
        ...prev,
        content: {
          ...prev.content,
          columns: newColumns,
          options: newOptions,
        },
      }));
    } else if (field === "text" || field === "background") {
      newColumns[index] = { ...newColumns[index], [field]: value };
      setFormData((prev: any) => ({
        ...prev,
        content: {
          ...prev.content,
          options: newOptions,
          columns: newColumns,
        },
      }));
    }
    console.log(formData);
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
  //changing the columns
  const handleColumnChange = (index: number, field: string, value: any) => {
    const newColumns = [...formData.content.columns];
    newColumns[index] = { ...newColumns[index], [field]: value };
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        columns: newColumns,
      },
    }));
  };
  // Removes a column
  const removeColumn = (index: number) => {
    const newColumns = [...formData.content.columns];
    newColumns.splice(index, 1);
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        columns: newColumns,
      },
    }));
  };
  // Adds a column
  const addColumn = () => {
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        columns: [...prev.content.columns, { text: "", background: "" }],
      },
    }));
  };
  // Handles changes in options and columns attributes
  const handleOptionChange = (index: number, field: string, value: any) => {
    const newOptions = [...formData.content.options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        options: newOptions,
      },
    }));
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
              value={formData.courId}
              disabled={isApproval}
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
              error={!!errors[`description`]}
              disabled={isApproval}
              helperText={errors[`description`]}
              label={t("txt_description")}
              value={formData.description}
              onChange={(e) => handleFormChange("description", e.target.value)}
              fullWidth
            />
          </FormControl>
          <TextField
            label={t("txt_text")}
            disabled={isApproval}
            value={formData.content.text || ""}
            required
            error={!!errors[`content.text`]}
            helperText={errors[`content.text`]}
            onChange={(e) => handleContentChange("text", e.target.value)}
            fullWidth
            className="!mt-[15px]"
          />
          <Box>
            <Typography
              variant="h6"
              className="!mt-[15px]"
              sx={{ fontWeight: "bold" }}
            >
              {t("txt_columns")}
            </Typography>
            {formData.content.columns.map((column: any, index: number) => (
              <Box key={index} className="!mt-[15px]">
                <TextField
                  label={`${t("txt_column_text")} ${index + 1}`}
                  disabled={isApproval}
                  value={column.text}
                  required
                  error={!!errors[`content.columns.${index}.text`]}
                  helperText={errors[`content.columns.${index}.text`]}
                  onChange={(e) =>
                    handleColumnChange(index, "text", e.target.value)
                  }
                  fullWidth
                />
                <TextField
                  label={`${t("txt_background")} ${index + 1}`}
                  disabled={isApproval}
                  value={column.background}
                  required
                  error={!!errors[`content.columns.${index}.background`]}
                  helperText={errors[`content.columns.${index}.background`]}
                  onChange={(e) =>
                    handleColumnChange(index, "background", e.target.value)
                  }
                  fullWidth
                />
                <IconButton
                  disabled={isApproval}
                  sx={{ fontSize: "medium" }}
                  onClick={() => removeColumn(index)}
                >
                  <CiCircleRemove className="mr-[5px]" />{" "}
                  {t("txt_remove_column")}
                </IconButton>
              </Box>
            ))}
            {!!errors[`content.columns`] && (
              <FormHelperText sx={{ color: "red" }}>
                {errors[`content.columns`]}
              </FormHelperText>
            )}

            <Button
              disabled={isApproval}
              onClick={addColumn}
              className="!mt-[15px]"
            >
              {t("txt_add_column")}
            </Button>
          </Box>
          <Box>
            <Typography
              variant="h6"
              className="!mt-[15px]"
              sx={{ fontWeight: "bold" }}
            >
              {t("txt_options")}
            </Typography>{" "}
            {formData.content.options.map((option: any, index: number) => (
              <Box key={index} className="!mt-[15px]">
                <TextField
                  disabled={isApproval}
                  label={`${t("txt_column_index")} ${index + 1}`}
                  value={option.columnIndex}
                  error={!!errors[`content.options.${index}.columnIndex`]}
                  helperText={errors[`content.options.${index}.columnIndex`]}
                  type="number"
                  onChange={(e) =>
                    handleOptionChange(
                      index,
                      "columnIndex",
                      e.target.value === "" ? "" : parseInt(e.target.value)
                    )
                  }
                  fullWidth
                />
                <TextField
                  disabled={isApproval}
                  label={`${t("txt_image")} ${index + 1}`}
                  value={option.image}
                  error={!!errors[`content.options.${index}.image`]}
                  helperText={errors[`content.options.${index}.image`]}
                  onChange={(e) =>
                    handleOptionChange(index, "image", e.target.value)
                  }
                  fullWidth
                />
                <IconButton
                  disabled={isApproval}
                  sx={{ fontSize: "medium" }}
                  onClick={() => removeOption(index)}
                >
                  <CiCircleRemove className="mr-[5px]" />{" "}
                  {t("txt_remove_option")}
                </IconButton>
              </Box>
            ))}
            {!!errors[`content.options`] && (
              <FormHelperText sx={{ color: "red" }}>
                {errors[`content.options`]}
              </FormHelperText>
            )}
            <Button
              disabled={isApproval}
              onClick={addOption}
              className="!mt-[15px]"
            >
              {t("txt_add_option")}
            </Button>
          </Box>
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

export default DragDropTableImages;

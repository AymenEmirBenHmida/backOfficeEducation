import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  Button,
  Skeleton,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CiCircleRemove } from "react-icons/ci";
import { ExerciceUpdateProps } from "@/interfaces/ExerciceCrudProps";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/Store";
import { getExercice, updatExercice } from "@/redux/exerciceSlice";
import { getAllLessons } from "@/redux/lessonSlice";
import { LessonInterface } from "@/interfaces/LessonInterface";

const SelectTable: React.FC<ExerciceUpdateProps> = ({
  selectedExerciceId,
  handleSubmit,
  setErrors,
  errors,
  handleApproval,
  isApproval,
  handleRefusal,
  refusalLoading,
}) => {
  //refusal comment
  const [refusalComment, setRefusalComment] = useState("");
  //variabl for the lessons gotten
  const [lessons, setLessons] = useState<LessonInterface[]>([]);
  //responsible for the initial loading animation
  const [loading, setLoading] = useState(true);
  //responsible for the update animation
  const [updateLoading, setUpdateLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  //variable representing the inputs
  const [formData, setFormData] = useState<any>({
    typeQuestion: "",
    content: {
      text: "",
      columns: [
        {
          text: "",
          background: "",
          options: [{ image: "", isCorrect: false }],
        },
      ],
    },
    courId: "",
    description: "",
    isLocked: false,
  });
  // handles the column attribute changes
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
  //handles specifically the options changes
  const handleOptionChange = (
    indexColumn: number,
    indexOption: number,
    field: string,
    value: any
  ) => {
    const newColumns = [...formData.content.columns];
    if (field === "isCorrect") {
      newColumns[indexColumn].options.forEach((option: any, i: number) => {
        if (i !== indexOption) {
          option.isCorrect = false;
        }
      });
    }
    newColumns[indexColumn].options[indexOption] = {
      ...newColumns[indexColumn].options[indexOption],
      [field]: value,
    };
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        columns: newColumns,
      },
    }));
  };
  // adding an option to the columns attribute
  const addOptionColumn = (indexColumn: number) => {
    const newColumns = [...formData.content.columns];
    newColumns[indexColumn].options = [
      ...newColumns[indexColumn].options,
      { image: "", isCorrect: false },
    ];
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        columns: newColumns,
      },
    }));
  };
  //removing an option from the columns attribute
  const removeOptionColumn = (indexColumn: number, indexOption: number) => {
    const newColumns = [...formData.content.columns];
    newColumns[indexColumn].options.splice(indexOption, 1);
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        columns: newColumns,
      },
    }));
  };
  // adding a column to the column attribute
  const addColumn = () => {
    const newColumns = [
      ...formData.content.columns,
      {
        text: "",
        background: "",
        options: [{ image: "", isCorrect: false }],
      },
    ];
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        columns: newColumns,
      },
    }));
  };
  //removing a column
  const removeColumn = (index: number) => {
    const newColumns = formData.content.columns.filter(
      (_: any, i: number) => i !== index
    );
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        columns: newColumns,
      },
    }));
  };
  //changing or adding the attributes directly under the form variable
  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
  //update an exercice

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
  //cleaning and leaving out unnecessary data from the formdata variable
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
  //getting all lessons
  const getLessons = async () => {
    const result = await dispatch(getAllLessons());
    if (getAllLessons.fulfilled.match(result)) {
      setLessons(result.payload as LessonInterface[]);
    } else {
      console.error("Failed to fetch lessons");
    }
  };
  //the initial functions necessary to be called at the beginning
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
              disabled={isApproval}
              error={!!errors[`description`]}
              helperText={errors[`description`]}
              label={t("txt_description")}
              value={formData.description}
              onChange={(e) => handleFormChange("description", e.target.value)}
              fullWidth
            />
          </FormControl>
          {formData.content.columns.map((column: any, indexColumn: number) => (
            <Box key={indexColumn} className="!mt-[15px]">
              <TextField
                className="!mt-[5px] !mb-[5px]"
                label={`${t("txt_text")} ${indexColumn + 1}`}
                required
                disabled={isApproval}
                error={!!errors[`content.columns.${indexColumn}.text`]}
                helperText={errors[`content.columns.${indexColumn}.text`]}
                value={column.text}
                onChange={(e) =>
                  handleColumnChange(indexColumn, "text", e.target.value)
                }
                fullWidth
              />
              <TextField
                className="!mt-[5px] !mb-[5px]"
                label={`${t("txt_background")} ${indexColumn + 1}`}
                value={column.background}
                required
                disabled={isApproval}
                error={!!errors[`content.columns.${indexColumn}.background`]}
                helperText={errors[`content.columns.${indexColumn}.background`]}
                onChange={(e) =>
                  handleColumnChange(indexColumn, "background", e.target.value)
                }
                fullWidth
              />
              {column.options.map((option: any, index: number) => (
                <Box
                  className="!mt-[5px] !mb-[5px]"
                  key={`${indexColumn}-${index}`}
                  display={"flex"}
                  flexDirection={"row"}
                >
                  <TextField
                    className="!mr-[5px]"
                    label={`${t("txt_image")} ${index + 1}`}
                    value={option.image}
                    disabled={isApproval}
                    required
                    error={
                      !!errors[
                        `content.columns.${indexColumn}.options.${index}.image`
                      ]
                    }
                    helperText={
                      errors[
                        `content.columns.${indexColumn}.options.${index}.image`
                      ]
                    }
                    onChange={(e) =>
                      handleOptionChange(
                        indexColumn,
                        index,
                        "image",
                        e.target.value
                      )
                    }
                    fullWidth
                  />
                  <FormControlLabel
                    label={t("txt_is_correct")}
                    control={
                      <Checkbox
                        checked={option.isCorrect}
                        disabled={isApproval}
                        onChange={(e) =>
                          handleOptionChange(
                            indexColumn,
                            index,
                            "isCorrect",
                            e.target.checked
                          )
                        }
                      />
                    }
                  />
                  <IconButton
                    disabled={isApproval}
                    onClick={() => removeOptionColumn(indexColumn, index)}
                  >
                    <CiCircleRemove />
                  </IconButton>
                </Box>
              ))}
              {!!errors[`content.columns.${indexColumn}.options`] && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors[`content.columns.${indexColumn}.options`]}
                </FormHelperText>
              )}
              <Box
                className="!mt-[15px]"
                display={"flex"}
                flexDirection={"row"}
              >
                <Button onClick={() => addOptionColumn(indexColumn)}>
                  {t("txt_add_column")}
                </Button>
                <Button
                  className="!flex !justify-center !align-center"
                  disabled={isApproval}
                  onClick={() => removeColumn(indexColumn)}
                >
                  {t("txt_remove")}
                </Button>
              </Box>
            </Box>
          ))}
          {!!errors[`content.columns`] && (
            <FormHelperText sx={{ color: "red" }}>
              {errors[`content.columns`]}
            </FormHelperText>
          )}
          <Box display={"flex"} flexDirection={"row"}>
            <FormControlLabel
              className="!mt-[15px]"
              control={
                <Checkbox
                  disabled={isApproval}
                  value={formData.isLocked}
                  checked={formData.isLocked}
                  onChange={(e) =>
                    handleFormChange("isLocked", e.target.checked)
                  }
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
                <Button onClick={addColumn} className="!mt-[15px]">
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
          </Box>
        </>
      )}
    </>
  );
};

export default SelectTable;

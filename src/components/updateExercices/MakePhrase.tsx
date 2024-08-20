import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Button,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  Typography,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CiCircleRemove } from "react-icons/ci";
import { ExerciceUpdateProps } from "@/interfaces/ExerciceCrudProps";
import { LessonInterface } from "@/interfaces/LessonInterface";
import { AppDispatch } from "@/redux/Store";
import { useDispatch } from "react-redux";
import { getExercice, updatExercice } from "@/redux/exerciceSlice";
import { getAllLessons } from "@/redux/lessonSlice";

const MakePhrase: React.FC<ExerciceUpdateProps> = ({
  selectedExerciceId,
  handleSubmit,
  errors,
}) => {
  const { t } = useTranslation();
  //lessons variable
  const [lessons, setLessons] = useState<LessonInterface[]>([]);
  //initial loading variable
  const [loading, setLoading] = useState(true);
  //update loading variable
  const [updateLoading, setUpdateLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  //form inputs variable
  const [formData, setFormData] = useState<any>({
    typeQuestion: "",
    content: {
      text: "",
      words: [{ text: "", order: 0, correctOrder: 0 }],
    },
    courId: "",
    description: "",
    isLocked: false,
  });
  //handle changing the words attribute
  const handleWordChange = (index: number, field: string, value: any) => {
    const newWords = [...formData.content.words];
    newWords[index] = { ...newWords[index], [field]: value };
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        words: newWords,
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
  //change the form variable attributes directly under it
  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
  //remove an word
  const removeWord = (index: number) => {
    const newWords = [...formData.content.words];
    newWords.splice(index, 1);
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        words: newWords,
      },
    }));
  };

  //add a word
  const addWord = () => {
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        words: [...prev.content.words, { text: "", order: 0, correctOrder: 0 }],
      },
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
          <TextField
            label={t("txt_text")}
            value={formData.content.text || ""}
            onChange={(e) => handleContentChange("text", e.target.value)}
            fullWidth
            className="!mt-[15px]"
          />
          {formData.content.words.map((word: any, index: number) => (
            <Box
              className="!mt-[5px] !mb-[5px]"
              key={`${index}`}
              display={"flex"}
              flexDirection={"row"}
            >
              <TextField
                className="!mr-[5px]"
                label={`${t("txt_text")} ${index + 1}`}
                value={word.text}
                onChange={(e) =>
                  handleWordChange(index, "text", e.target.value)
                }
                fullWidth
              />
              <TextField
                className="!mr-[5px]"
                label={`${t("txt_order")} ${index + 1}`}
                value={word.order}
                onChange={(e) =>
                  handleWordChange(index, "order", e.target.value)
                }
                fullWidth
              />
              <TextField
                className="!mr-[5px]"
                label={`${t("txt_correct_order")} ${index + 1}`}
                value={word.correctOrder}
                onChange={(e) =>
                  handleWordChange(index, "correctOrder", e.target.value)
                }
                fullWidth
              />
              <IconButton onClick={() => removeWord(index)}>
                <CiCircleRemove />
              </IconButton>
            </Box>
          ))}
          <div className="!mt-[15px]">
            <FormControlLabel
              control={
                <Checkbox
                  value={formData.isLocked}
                  checked={formData.isLocked}
                  onChange={(e) =>
                    handleFormChange("isLocked", e.target.checked)
                  }
                />
              }
              label={t("txt_lcoked")}
            />
            <Button onClick={addWord}>{t("txt_add_word")}</Button>
            <Button
              className="!mt-[15px]"
              variant="contained"
              color="primary"
              onClick={async () => {
                console.log(formData);
                await handleSubmit(formData, selectedExerciceId, cleanFormData);
              }}
            >
              {updateLoading ? (
                <CircularProgress sx={{ color: "white" }} size={30} />
              ) : (
                t("txt_submit")
              )}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default MakePhrase;

import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CiCircleRemove } from "react-icons/ci";
import {
  ExerciceCreationProps,
  ExerciceUpdateProps,
} from "@/interfaces/ExerciceCreationProps";
import { getAllLessons } from "@/redux/lessonSlice";
import { LessonInterface } from "@/interfaces/LessonInterface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/Store";

const QcmImages: React.FC<ExerciceUpdateProps> = ({
  handleSubmit,
  selectedExerciceId,
  handleError,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [lessons, setLessons] = useState<LessonInterface[]>([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any>({
    typeQuestion: "",
    content: {
      text: "",
      options: [{ image: "", isCorrect: false }],
    },
    courId: "",
    description: "",
    isLocked: false,
  });

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
        // ...prev.content,
        options: newOptions,
      },
    }));
  };
  const handleContentChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }));
  };

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

  const addOption = () => {
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        options: [...prev.content.options, { text: "", isCorrect: false }],
      },
    }));
  };
  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
  const getLessons = async () => {
    const result = await dispatch(getAllLessons());
    if (getAllLessons.fulfilled.match(result)) {
      setLessons(result.payload as LessonInterface[]);
    } else {
      console.error("Failed to fetch lessons");
    }
  };

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
      {formData.content.options.map((option: any, index: number) => (
        <Box
          className="!mt-[5px] !mb-[5px]"
          key={`${index}`}
          display={"flex"}
          flexDirection={"row"}
        >
          <TextField
            className="!mr-[5px]"
            label={`${t("txt_image")} ${index + 1}`}
            value={option.image}
            onChange={(e) => handleOptionChange(index, "image", e.target.value)}
            fullWidth
          />
          <FormControlLabel
            label={t("txt_is_correct")}
            control={
              <Checkbox
                checked={option.isCorrect}
                aria-label={"is correct"}
                onChange={(e) =>
                  handleOptionChange(index, "isCorrect", e.target.checked)
                }
              />
            }
          />
          <IconButton onClick={() => removeOption(index)}>
            <CiCircleRemove />
          </IconButton>
        </Box>
      ))}
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
      <Button onClick={addOption} className="!mt-[15px]">
        {t("txt_add")}
      </Button>
      <Button
        className="!mt-[15px]"
        variant="contained"
        color="primary"
        onClick={async () => {
          console.log(formData);
          await handleSubmit({ formData });
        }}
      >
        {t("txt_submit")}
      </Button>
    </>
  );
};

export default QcmImages;

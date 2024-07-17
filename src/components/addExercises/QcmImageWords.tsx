import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ExerciceCreationProps } from "@/interfaces/ExerciceCreationProps";

const QcmImageWords: React.FC<ExerciceCreationProps> = ({
  handleSubmit,
  selectedTypeId,
  description,
  selectedLessonId,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<any>({
    typeQuestion: selectedTypeId,
    content: {
      text: "",
      options: [{ text: "", image: "", isCorrect: false }],
    },
    courId: selectedLessonId || "",
    description: description || "",
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

  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      ["courId"]: selectedLessonId,
      ["description"]: description,
    }));
  }, [selectedLessonId, description]);
  return (
    <>
      <TextField
        label={t("txt_text")}
        value={formData.content.text || ""}
        onChange={(e) => handleContentChange("text", e.target.value)}
        fullWidth
        className="!mt-[15px]"
      />
      {formData.content.options.map((option: any, index: number) => (
        <Box key={index} className="!mt-[15px]">
          <TextField
            label={`${t("txt_option_image")} ${index + 1}`}
            value={option.text}
            onChange={(e) => handleOptionChange(index, "text", e.target.value)}
            fullWidth
          />
          <TextField
            label={`image ${index + 1}`}
            value={option.image}
            onChange={(e) => handleOptionChange(index, "image", e.target.value)}
            fullWidth
          />
          <FormControlLabel
            label={"isCorrect"}
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
          <IconButton onClick={() => removeOption(index)}>remove</IconButton>
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
        label="Locked"
      />
      <Button onClick={addOption} className="!mt-[15px]">
        {/* <AddIcon /> {t("txt_add_option")} */}
        add
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

export default QcmImageWords;

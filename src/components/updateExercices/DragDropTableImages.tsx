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

const DragDropTableImages: React.FC<ExerciceCreationProps> = ({
  selectedTypeId,
  handleSubmit,
  description,
  selectedLessonId,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<any>({
    typeQuestion: selectedTypeId,
    content: {
      text: "",
      options: [{ text: "", isCorrect: false }],
      columns: [{ text: "", background: "" }],
    },
    courId: selectedLessonId || "",
    description: description || "",
    isLocked: false,
  });

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
          // ...prev.content,
          columns: newColumns,
          options: newOptions,
        },
      }));
    } else if (field === "text" || field === "background") {
      newColumns[index] = { ...newColumns[index], [field]: value };
      setFormData((prev: any) => ({
        ...prev,
        content: {
          // ...prev.content,
          options: newOptions,
          columns: newColumns,
        },
      }));
    }
    console.log(formData);
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
            value={option.text}
            label={`${t("txt_text")} ${index + 1}`}
            onChange={(e) => handleColumnsChange(index, "text", e.target.value)}
            fullWidth
          />
          <TextField
            value={option.background}
            label={`${t("txt_background")} ${index + 1}`}
            onChange={(e) =>
              handleColumnsChange(index, "background", e.target.value)
            }
            fullWidth
          />
          <TextField
            value={option.image}
            label={`${t("txt_image")} ${index + 1}`}
            onChange={(e) =>
              handleColumnsChange(index, "image", e.target.value)
            }
            fullWidth
          />
          <TextField
            value={option.columnIndex}
            label={`${t("txt_column_index")} ${index + 1}`}
            type="number"
            onChange={(e) =>
              handleColumnsChange(index, "columnIndex", e.target.value)
            }
            fullWidth
          />

          <IconButton onClick={() => removeOption(index)}>
            {t("txt_remove")}
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
        {t("txt_locked")}
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

export default DragDropTableImages;

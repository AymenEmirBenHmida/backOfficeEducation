import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ExerciceCreationProps } from "@/interfaces/ExerciceCreationProps";

const ReadImage: React.FC<ExerciceCreationProps> = ({
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
      image: "",
    },
    courId: selectedLessonId||"",
    description: description||"",
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
      <TextField
        label={t("txt_image")}
        value={formData.content.image || ""}
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
        onClick={async () => {
          console.log(formData);
          await handleSubmit({ formData });
        }}
        className="!mt-[15px]"
      >
        {t("txt_submit")}
      </Button>
    </>
  );
};

export default ReadImage;
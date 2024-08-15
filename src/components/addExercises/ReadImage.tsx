import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ExerciceCreationProps } from "@/interfaces/ExerciceCrudProps";

const ReadImage: React.FC<ExerciceCreationProps> = ({
  selectedTypeId,
  handleSubmit,
  description,
  selectedLessonId,
  errors,
  loading,
}) => {
  const { t } = useTranslation();
  //form inputs variable
  const [formData, setFormData] = useState<any>({
    typeQuestion: selectedTypeId,
    content: {
      text: "",
      image: "",
    },
    courId: selectedLessonId || "",
    description: description || "",
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
  //change the form variable attributes directly under it
  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
  //initialise courId and description inside the form variable
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
        required
        error={!!errors[`content.text`]}
        helperText={errors[`content.text`]}
        onChange={(e) => handleContentChange("text", e.target.value)}
        fullWidth
        className="!mt-[15px]"
      />
      <TextField
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
        {loading ? (
          <CircularProgress sx={{ color: "white" }} size={30} />
        ) : (
          t("txt_submit")
        )}
      </Button>
    </>
  );
};

export default ReadImage;

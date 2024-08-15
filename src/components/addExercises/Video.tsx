import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ExerciceCreationProps } from "@/interfaces/ExerciceCrudProps";

const Video: React.FC<ExerciceCreationProps> = ({
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
      link: "",
    },
    courId: selectedLessonId || "",
    description: description || "",
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
  //change the form variable attributes directly under it
  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
  //initialise courId and description
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
        label={t("txt_link")}
        value={formData.content.link || ""}
        required
        error={!!errors[`content.link`]}
        helperText={errors[`content.link`]}
        onChange={(e) => handleContentChange("link", e.target.value)}
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
        variant="contained"
        color="primary"
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

export default Video;

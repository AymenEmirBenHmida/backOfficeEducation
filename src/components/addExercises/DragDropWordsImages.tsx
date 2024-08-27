import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ExerciceCreationProps } from "@/interfaces/ExerciceCrudProps";

const DragDropWordsImages: React.FC<ExerciceCreationProps> = ({
  selectedTypeId,
  handleSubmit,
  description,
  selectedLessonId,
  errors,
  loading,
  numberOfOptions,
}) => {
  const { t } = useTranslation();
  //initialise the options depending on the number specified in the props
  const initialOptions = Array.from({ length: numberOfOptions }, () => ({
    text: "",
    isCorrect: false,
    order: 0,
    image: "",
  }));
  //form inputs variable
  const [formData, setFormData] = useState<any>({
    typeQuestion: selectedTypeId,
    content: {
      text: "",
      options: initialOptions,
    },
    courId: selectedLessonId || "",
    description: description || "",
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
  //handles changes in content attribute
  const handleContentChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }));
  };
  //removing an option
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
  //add an option
  const addOption = () => {
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        options: [
          ...prev.content.options,
          { text: "", isCorrect: false, order: 0, image: "" },
        ],
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
        required
        error={!!errors["content.text"]}
        helperText={errors["content.text"]}
        value={formData.content.text || ""}
        onChange={(e) => handleContentChange("text", e.target.value)}
        fullWidth
        className="!mt-[15px]"
      />
      {formData.content.options.map((option: any, index: number) => (
        <Box key={index} className="!mt-[15px]">
          <TextField
            label={`${t("txt_text")} ${index + 1}`}
            error={!!errors[`content.options.${index}.text`]}
            helperText={errors[`content.options.${index}.text`]}
            required
            value={option.text}
            onChange={(e) => handleOptionChange(index, "text", e.target.value)}
            fullWidth
          />
          <TextField
            label={`${t("text_image")} ${index + 1}`}
            className="!mt-[5px]"
            required
            error={!!errors[`content.options.${index}.image`]}
            helperText={errors[`content.options.${index}.image`]}
            value={option.image}
            onChange={(e) => handleOptionChange(index, "image", e.target.value)}
            fullWidth
          />
          <TextField
            label={`${t("txt_order")} ${index + 1}`}
            value={option.order}
            className="!mt-[5px]"
            required
            error={!!errors[`content.options.${index}.order`]}
            helperText={errors[`content.options.${index}.order`]}
            type="number"
            onChange={(e) =>
              handleOptionChange(
                index,
                "order",
                e.target.value === "" ? "" : parseInt(e.target.value)
              )
            }
            fullWidth
          />

          {/* <Button onClick={() => removeOption(index)}>{t("txt_remove")}</Button> */}
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
            value={formData.isLocked}
            checked={formData.isLocked}
            onChange={(e) => handleFormChange("isLocked", e.target.checked)}
          />
        }
        label={t("txt_locked")}
      />
      {/* <Button onClick={addOption} className="!mt-[15px]">
        {t("txt_add")}
      </Button> */}
      <Button
        className="!mt-[15px]"
        variant="contained"
        color="primary"
        onClick={async () => {
          console.log(formData);
          await handleSubmit({ formData });
        }}
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

export default DragDropWordsImages;

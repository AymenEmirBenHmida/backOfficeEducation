import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  Button,
  FormHelperText,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ExerciceCreationProps } from "@/interfaces/ExerciceCrudProps";
import { CiCircleRemove } from "react-icons/ci";

const DragDropTableImages: React.FC<ExerciceCreationProps> = ({
  selectedTypeId,
  handleSubmit,
  description,
  selectedLessonId,
  errors,
  loading,
}) => {
  const { t } = useTranslation();

  // Form inputs variable
  const [formData, setFormData] = useState<any>({
    typeQuestion: selectedTypeId,
    content: {
      text: "",
      options: [{ columnIndex: 0, image: "" }],
      columns: [{ text: "", background: "" }],
    },
    courId: selectedLessonId || "",
    description: description || "",
    isLocked: false,
  });

  // Handles changes in content attribute
  const handleContentChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
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

  // Adds an option
  const addOption = () => {
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        options: [...prev.content.options, { columnIndex: 0, image: "" }],
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

  // Removes an option
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

  // Change the form variable attributes directly
  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Initialize courId and description inside the form variable
  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      courId: selectedLessonId,
      description: description,
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
              sx={{ fontSize: "medium" }}
              onClick={() => removeColumn(index)}
            >
              <CiCircleRemove className="mr-[5px]" /> {t("txt_remove_column")}
            </IconButton>
          </Box>
        ))}
        {!!errors[`content.columns`] && (
          <FormHelperText sx={{ color: "red" }}>
            {errors[`content.columns`]}
          </FormHelperText>
        )}
        <Button onClick={addColumn} className="!mt-[15px]">
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
              sx={{ fontSize: "medium" }}
              onClick={() => removeOption(index)}
            >
              <CiCircleRemove className="mr-[5px]" /> {t("txt_remove_option")}
            </IconButton>
          </Box>
        ))}
        {!!errors[`content.options`] && (
          <FormHelperText sx={{ color: "red" }}>
            {errors[`content.options`]}
          </FormHelperText>
        )}
        <Button onClick={addOption} className="!mt-[15px]">
          {t("txt_add_option")}
        </Button>
      </Box>
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

export default DragDropTableImages;

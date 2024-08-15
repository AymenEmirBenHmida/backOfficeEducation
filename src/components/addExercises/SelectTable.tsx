import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  Button,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CiCircleRemove } from "react-icons/ci";
import { ExerciceCreationProps } from "@/interfaces/ExerciceCrudProps";

const SelectTable: React.FC<ExerciceCreationProps> = ({
  selectedTypeId,
  handleSubmit,
  description,
  selectedLessonId,
  loading,
  errors,
}) => {
  const { t } = useTranslation();
  //form inputs variable
  const [formData, setFormData] = useState<any>({
    typeQuestion: selectedTypeId,
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
    courId: selectedLessonId || "",
    description: description || "",
    isLocked: false,
  });
  //handle changing the columns attribute
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
  //handle changing the options attribute
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
  //add an option inside of the column
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
  //removing an option
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
  //add a column
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
  //remove a column
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
      {formData.content.columns.map((column: any, indexColumn: number) => (
        <Box key={indexColumn} className="!mt-[15px]">
          <TextField
            className="!mt-[5px] !mb-[5px]"
            label={`${t("txt_text")} ${indexColumn + 1}`}
            required
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
            required
            error={!!errors[`content.columns.${indexColumn}.background`]}
            helperText={errors[`content.columns.${indexColumn}.background`]}
            value={column.background}
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
                value={option.image}
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
          <Box className="!mt-[15px]" display={"flex"} flexDirection={"row"}>
            {" "}
            <Button onClick={() => addOptionColumn(indexColumn)}>
              {t("txt_add_column")}
            </Button>
            <Button
              className="!flex !justify-center !align-center"
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
              value={formData.isLocked}
              checked={formData.isLocked}
              onChange={(e) => handleFormChange("isLocked", e.target.checked)}
            />
          }
          label={t("txt_locked")}
        />
        <Button onClick={addColumn} className="!mt-[15px]">
          {t("txt_add")}
        </Button>
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
      </Box>
    </>
  );
};

export default SelectTable;

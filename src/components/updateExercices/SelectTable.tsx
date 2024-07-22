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
import { CiCircleRemove } from "react-icons/ci";
import {
  ExerciceCreationProps,
  ExerciceUpdateProps,
} from "@/interfaces/ExerciceCreationProps";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/Store";
import { getExercice, updatExercice } from "@/redux/exerciceSlice";

const SelectTable: React.FC<ExerciceUpdateProps> = ({
  selectedExerciceId,
  handleSubmit,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<any>({
    typeQuestion: "",
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
    courId: "",
    description: "",
    isLocked: false,
  });

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
  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateExercice = async () => {
    const response = await dispatch(
      updatExercice({ formData, id: selectedExerciceId })
    );
    console.log("response update ", response);
  };

  const handleGetExercice = async () => {
    const response = await dispatch(getExercice(selectedExerciceId));
    setFormData(response.payload.data);
    console.log(response);
  };
  useEffect(() => {
    handleGetExercice();
    console.log("entered use effect");
  }, []);

  return (
    <>
      {formData.content.columns.map((column: any, indexColumn: number) => (
        <Box key={indexColumn} className="!mt-[15px]">
          <TextField
            className="!mt-[5px] !mb-[5px]"
            label={`${t("txt_text")} ${indexColumn + 1}`}
            value={column.text}
            onChange={(e) =>
              handleColumnChange(indexColumn, "text", e.target.value)
            }
            fullWidth
          />
          <TextField
            className="!mt-[5px] !mb-[5px]"
            label={`${t("txt_background")} ${indexColumn + 1}`}
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
            await handleUpdateExercice();
          }}
          className="!mt-[15px]"
        >
          {t("txt_submit")}
        </Button>
      </Box>
    </>
  );
};

export default SelectTable;

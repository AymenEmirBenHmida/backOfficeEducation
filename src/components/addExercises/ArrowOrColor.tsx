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
import { ExerciceCreationProps } from "@/interfaces/ExerciceCreationProps";

const ArrowOrColor: React.FC<ExerciceCreationProps> = ({
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
      tuples: [{ text1: "", order1: 0, text2: "", order2: 0 }],
    },
    courId: selectedLessonId || "",
    description: description || "",
    isLocked: false,
  });

  const handleTupleChange = (
    index: number,
    field: string,
    value: any,
    subfield: string
  ) => {
    const newTuples = [...formData.content.tuples];
    newTuples[index] = { ...newTuples[index], [subfield]: value };
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        tuples: newTuples,
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

  const removeTuple = (index: number) => {
    const newTuples = [...formData.content.tuples];
    newTuples.splice(index, 1);
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        tuples: newTuples,
      },
    }));
  };

  const addTuple = () => {
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        tuples: [
          ...prev.content.tuples,
          { text1: "", order1: 0, text2: "", order2: 0 },
        ],
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
      {formData.content.tuples.map((tuple: any, index: number) => (
        <Box
          className="!mt-[5px] !mb-[5px]"
          key={`${index}`}
          display={"flex"}
          flexDirection={"row"}
        >
          <TextField
            className="!mr-[5px]"
            label={`${t("txt_text1")} ${index + 1}`}
            value={tuple.text1}
            onChange={(e) =>
              handleTupleChange(index, "text1", e.target.value, "text1")
            }
            fullWidth
          />
          <TextField
            className="!mr-[5px]"
            label={`${t("txt_order1")} ${index + 1}`}
            value={tuple.order1}
            onChange={(e) =>
              handleTupleChange(index, "order1", e.target.value, "order1")
            }
            fullWidth
          />
          <TextField
            className="!mr-[5px]"
            label={`${t("txt_text2")} ${index + 1}`}
            value={tuple.text2}
            onChange={(e) =>
              handleTupleChange(index, "text2", e.target.value, "text2")
            }
            fullWidth
          />
          <TextField
            className="!mr-[5px]"
            label={`${t("txt_order2")} ${index + 1}`}
            value={tuple.order2}
            onChange={(e) =>
              handleTupleChange(index, "order2", e.target.value, "order2")
            }
            fullWidth
          />
          <IconButton onClick={() => removeTuple(index)}>
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
        label="Locked"
      />
      <Button onClick={addTuple} className="!mt-[15px]">
        {t("txt_add_tuple")}
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
        {t("txt_submit")}
      </Button>
    </>
  );
};

export default ArrowOrColor;

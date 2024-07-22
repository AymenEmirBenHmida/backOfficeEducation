import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CiCircleRemove } from "react-icons/ci";
import { ExerciceCreationProps } from "@/interfaces/ExerciceCreationProps";

const ArrowSound: React.FC<ExerciceCreationProps> = ({
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
      tuples: [{ text: "", textOrder: 0, sound: "", soundOrder: 0 }],
    },
    courId: selectedLessonId || "",
    description: description || "",
    isLocked: false,
  });

  const handleTupleChange = (index: number, field: string, value: any) => {
    const newTuples = [...formData.content.tuples];
    newTuples[index] = { ...newTuples[index], [field]: value };
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
          { text: "", textOrder: 0, sound: "", soundOrder: 0 },
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
            label={`${t("txt_text")} ${index + 1}`}
            value={tuple.text}
            onChange={(e) => handleTupleChange(index, "text", e.target.value)}
            fullWidth
          />
          <TextField
            className="!mr-[5px]"
            label={`${t("txt_order")} ${index + 1}`}
            value={tuple.textOrder}
            onChange={(e) =>
              handleTupleChange(index, "textOrder", e.target.value)
            }
            fullWidth
          />
          <TextField
            className="!mr-[5px]"
            label={`${t("txt_sound")} ${index + 1}`}
            value={tuple.sound}
            onChange={(e) => handleTupleChange(index, "sound", e.target.value)}
            fullWidth
          />
          <TextField
            className="!mr-[5px]"
            label={`${t("txt_sound_order")} ${index + 1}`}
            value={tuple.soundOrder}
            onChange={(e) =>
              handleTupleChange(index, "soundOrder", e.target.value)
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
        label={t("txt_locked")}
      />
      <Button onClick={addTuple} className="!mt-[15px]">
        {t("txt_add")}
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

export default ArrowSound;

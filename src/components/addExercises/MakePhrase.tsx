import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Button,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CiCircleRemove } from "react-icons/ci";
import { ExerciceCreationProps } from "@/interfaces/ExerciceCrudProps";

const MakePhrase: React.FC<ExerciceCreationProps> = ({
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
      words: [{ text: "", order: 0, correctOrder: 0 }],
    },
    courId: selectedLessonId || "",
    description: description || "",
    isLocked: false,
  });
  //handle changing the words attribute
  const handleWordChange = (index: number, field: string, value: any) => {
    const newWords = [...formData.content.words];
    newWords[index] = { ...newWords[index], [field]: value };
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        words: newWords,
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
  //change the form variable attributes directly under it
  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
  //removes a word
  const removeWord = (index: number) => {
    const newWords = [...formData.content.words];
    newWords.splice(index, 1);
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        words: newWords,
      },
    }));
  };
  //add a word
  const addWord = () => {
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        words: [...prev.content.words, { text: "", order: 0, correctOrder: 0 }],
      },
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
      {formData.content.words.map((word: any, index: number) => (
        <Box
          className="!mt-[5px] !mb-[5px]"
          key={`${index}`}
          display={"flex"}
          flexDirection={"row"}
        >
          <TextField
            className="!mr-[5px]"
            label={`${t("txt_text")} ${index + 1}`}
            value={word.text}
            required
            error={!!errors[`content.words.${index}.text`]}
            helperText={errors[`content.words.${index}.text`]}
            onChange={(e) => handleWordChange(index, "text", e.target.value)}
            fullWidth
          />
          <TextField
            className="!mr-[5px]"
            label={`${t("txt_order")} ${index + 1}`}
            value={word.order}
            required
            error={!!errors[`content.words.${index}.order`]}
            helperText={errors[`content.words.${index}.order`]}
            onChange={(e) =>
              handleWordChange(
                index,
                "order",
                e.target.value === "" ? "" : parseInt(e.target.value)
              )
            }
            type="number"
            fullWidth
          />
          <TextField
            className="!mr-[5px]"
            label={`${t("txt_correct_order")} ${index + 1}`}
            value={word.correctOrder}
            required
            error={!!errors[`content.words.${index}.correctOrder`]}
            helperText={errors[`content.words.${index}.correctOrder`]}
            onChange={(e) =>
              handleWordChange(
                index,
                "correctOrder",
                e.target.value === "" ? "" : parseInt(e.target.value)
              )
            }
            type="number"
            fullWidth
          />
          <IconButton onClick={() => removeWord(index)}>
            <CiCircleRemove />
          </IconButton>
        </Box>
      ))}
      {!!errors[`content.words`] && (
        <FormHelperText sx={{ color: "red" }}>
          {errors[`content.words`]}
        </FormHelperText>
      )}
      <div className="!mt-[15px]">
        <FormControlLabel
          control={
            <Checkbox
              value={formData.isLocked}
              checked={formData.isLocked}
              onChange={(e) => handleFormChange("isLocked", e.target.checked)}
            />
          }
          label={t("txt_locked")}
        />
        <Button onClick={addWord}>{t("txt_add_word")}</Button>
        <Button
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
      </div>
    </>
  );
};

export default MakePhrase;

import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  Button,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CiCircleRemove } from "react-icons/ci";
import { ExerciceCreationProps } from "@/interfaces/ExerciceCrudProps";

const ArrowOrColor: React.FC<ExerciceCreationProps> = ({
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
  const initialTuples = Array.from({ length: numberOfOptions }, () => ({
    text1: "",
    order1: 0,
    text2: "",
    order2: 0,
  }));
  //form inputs variable
  const [formData, setFormData] = useState<any>({
    typeQuestion: selectedTypeId,
    content: {
      text: "",
      tuples: initialTuples,
    },
    courId: selectedLessonId || "",
    description: description || "",
    isLocked: false,
  });
  //change the tuple attribute
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
  //remove a tuple
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
  //add a tuple
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
        required
        error={!!errors[`content.text`]}
        helperText={errors[`content.text`]}
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
            label={`1.${t("txt_text")} ${index + 1}`}
            required
            error={!!errors[`content.tuples.${index}.text1`]}
            helperText={errors[`content.tuples.${index}.text1`]}
            value={tuple.text1}
            onChange={(e) =>
              handleTupleChange(index, "text1", e.target.value, "text1")
            }
            fullWidth
          />
          <TextField
            className="!mr-[5px]"
            label={`1.${t("txt_order")} ${index + 1}`}
            required
            error={!!errors[`content.tuples.${index}.order1`]}
            helperText={errors[`content.tuples.${index}.order1`]}
            value={tuple.order1}
            onChange={(e) =>
              handleTupleChange(
                index,
                "order1",
                e.target.value === "" ? "" : parseInt(e.target.value),
                "order1"
              )
            }
            type="number"
            fullWidth
          />
          <TextField
            className="!mr-[5px]"
            label={`2.${t("txt_text")} ${index + 1}`}
            value={tuple.text2}
            required
            error={!!errors[`content.tuples.${index}.text2`]}
            helperText={errors[`content.tuples.${index}.text2`]}
            onChange={(e) =>
              handleTupleChange(index, "text2", e.target.value, "text2")
            }
            fullWidth
          />
          <TextField
            className="!mr-[5px]"
            label={`2.${t("txt_order")} ${index + 1}`}
            required
            error={!!errors[`content.tuples.${index}.order2`]}
            helperText={errors[`content.tuples.${index}.order2`]}
            value={tuple.order2}
            onChange={(e) =>
              handleTupleChange(
                index,
                "order2",
                e.target.value === "" ? "" : parseInt(e.target.value),
                "order2"
              )
            }
            type="number"
            fullWidth
          />
          {/* <IconButton onClick={() => removeTuple(index)}>
            <CiCircleRemove />
          </IconButton> */}
        </Box>
      ))}
      {!!errors[`content.content.tuples`] && (
        <FormHelperText sx={{ color: "red" }}>
          {errors[`content.content.tuples`]}
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
      {/* <Button onClick={addTuple} className="!mt-[15px]">
        {t("txt_add_tuple")}
      </Button> */}
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

export default ArrowOrColor;

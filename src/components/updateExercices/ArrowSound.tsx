import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Button,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  Typography,
  Skeleton,
  CircularProgress,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CiCircleRemove } from "react-icons/ci";
import { ExerciceUpdateProps } from "@/interfaces/ExerciceCrudProps";
import { getAllLessons } from "@/redux/lessonSlice";
import { LessonInterface } from "@/interfaces/LessonInterface";
import { AppDispatch } from "@/redux/Store";
import { useDispatch } from "react-redux";
import { getExercice, updatExercice } from "@/redux/exerciceSlice";

const ArrowSound: React.FC<ExerciceUpdateProps> = ({
  selectedExerciceId,
  handleSubmit,
  setErrors,
  errors,
}) => {
  const { t } = useTranslation();
  //lessons variable
  const [lessons, setLessons] = useState<LessonInterface[]>([]);
  //initial loading variable
  const [loading, setLoading] = useState(true);
  //update loading variable
  const [updateLoading, setUpdateLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  //form inputs variable
  const [formData, setFormData] = useState<any>({
    typeQuestion: "",
    content: {
      text: "",
      tuples: [{ text: "", textOrder: 0, sound: "", soundOrder: 0 }],
    },
    courId: "",
    description: "",
    isLocked: false,
  });
  //handle changing the tuple attribute
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
          { text: "", textOrder: 0, sound: "", soundOrder: 0 },
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
  //handle updating exercice

  //getting exercice
  const handleGetExercice = async () => {
    try {
      const response = await dispatch(getExercice(selectedExerciceId));
      setFormData(response.payload.data);
      console.log(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  //leave out unnecessary attributes
  const cleanFormData = (data: any) => {
    const {
      cour, // Add the attributes you want to remove
      createById,
      createdAt,
      updatedAt,
      ...cleanedData
    } = data;
    return cleanedData;
  };
  //getting lessons
  const getLessons = async () => {
    const result = await dispatch(getAllLessons());
    if (getAllLessons.fulfilled.match(result)) {
      setLessons(result.payload as LessonInterface[]);
    } else {
      console.error("Failed to fetch lessons");
    }
  };
  useEffect(() => {
    handleGetExercice();
    getLessons();
    console.log("entered use effect");
    setErrors({});
  }, []);
  return (
    <>
      {loading ? (
        <>
          {" "}
          <Skeleton className="!mb-2" />
          <Skeleton className="!mb-2" animation="wave" />
          <Skeleton className="!mb-2" />
          <Skeleton className="!mb-2" />
          <Skeleton className="!mb-2" />
        </>
      ) : (
        <>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {formData.typeQuestion}
          </Typography>
          <FormControl required fullWidth className="!mt-[15px]">
            <InputLabel>{t("txt_lesson")}</InputLabel>
            <Select
              value={formData.courId}
              error={!!errors[`courId`]}
              label={t("txt_lesson")}
              onChange={(e) => {
                console.log("lesson id", e.target.value);
                handleFormChange("courId", e.target.value);
              }}
              className="w-full"
            >
              {lessons.map((lesson) => (
                <MenuItem key={lesson.id} value={lesson.id}>
                  {lesson.name}
                </MenuItem>
              ))}
            </Select>
            {!!errors[`courId`] && (
              <FormHelperText sx={{ color: "red" }}>
                {errors[`courId`]}
              </FormHelperText>
            )}
          </FormControl>
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
                required
                error={!!errors[`content.tuples.${index}.text`]}
                helperText={errors[`content.tuples.${index}.text`]}
                onChange={(e) =>
                  handleTupleChange(index, "text", e.target.value)
                }
                fullWidth
              />
              <TextField
                className="!mr-[5px]"
                label={`${t("txt_order")} ${index + 1}`}
                value={tuple.textOrder}
                required
                error={!!errors[`content.tuples.${index}.textOrder`]}
                helperText={errors[`content.tuples.${index}.textOrder`]}
                onChange={(e) =>
                  handleTupleChange(
                    index,
                    "textOrder",
                    e.target.value === "" ? "" : parseInt(e.target.value)
                  )
                }
                fullWidth
              />
              <TextField
                className="!mr-[5px]"
                label={`${t("txt_sound")} ${index + 1}`}
                value={tuple.sound}
                required
                error={!!errors[`content.tuples.${index}.sound`]}
                helperText={errors[`content.tuples.${index}.sound`]}
                onChange={(e) =>
                  handleTupleChange(index, "sound", e.target.value)
                }
                fullWidth
              />
              <TextField
                className="!mr-[5px]"
                label={`${t("txt_sound_order")} ${index + 1}`}
                value={tuple.soundOrder}
                required
                error={!!errors[`content.tuples.${index}.soundOrder`]}
                helperText={errors[`content.tuples.${index}.soundOrder`]}
                onChange={(e) =>
                  handleTupleChange(
                    index,
                    "soundOrder",
                    e.target.value === "" ? "" : parseInt(e.target.value)
                  )
                }
                fullWidth
              />
              {/* <IconButton onClick={() => removeTuple(index)}>
                <CiCircleRemove />
              </IconButton> */}
            </Box>
          ))}
          {!!errors[`content.tuples`] && (
            <FormHelperText sx={{ color: "red" }}>
              {errors[`content.tuples`]}
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
          <Button onClick={addTuple} className="!mt-[15px]">
            {t("txt_add")}
          </Button>
          <Button
            className="!mt-[15px]"
            variant="contained"
            color="primary"
            onClick={async () => {
              console.log(formData);
              await handleSubmit(formData, selectedExerciceId, cleanFormData);
            }}
          >
            {updateLoading ? (
              <CircularProgress sx={{ color: "white" }} size={30} />
            ) : (
              t("txt_submit")
            )}
          </Button>
        </>
      )}
    </>
  );
};

export default ArrowSound;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

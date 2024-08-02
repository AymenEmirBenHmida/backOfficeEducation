import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  Button,
  Select,
  MenuItem,
  Typography,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CiCircleRemove } from "react-icons/ci";
import { ExerciceUpdateProps } from "@/interfaces/ExerciceCrudProps";
import { getAllLessons } from "@/redux/lessonSlice";
import { LessonInterface } from "@/interfaces/LessonInterface";
import { getExercice, updatExercice } from "@/redux/exerciceSlice";
import { AppDispatch } from "@/redux/Store";
import { useDispatch } from "react-redux";

const ArrowOrColor: React.FC<ExerciceUpdateProps> = ({
  handleSubmit,
  selectedExerciceId,
  handleError,
  getExercices,
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
      tuples: [{ text1: "", order1: 0, text2: "", order2: 0 }],
    },
    courId: "",
    description: "",
    isLocked: false,
  });
  //handles changing the tuple attrbiute
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
  //adds a tuple
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
  //handle updating exercice
  const handleUpdateExercice = async () => {
    try {
      const data = cleanFormData(formData);
      setUpdateLoading(true);
      const response = await dispatch(
        updatExercice({ formData: data, id: selectedExerciceId })
      ).unwrap();
      setUpdateLoading(false);
      if (response && response.statusText === "OK") {
        console.log("response update ", response);
        handleSubmit!();
        await getExercices();
      } else {
        handleError!("error");
      }
    } catch (error) {
      handleError!("error");
      console.log(error);
    }
  };
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
  }, []);
  return (
    <>
      {" "}
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
          <Select
            value={formData.courId}
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
                label={`1.${t("txt_text")} ${index + 1}`}
                value={tuple.text1}
                onChange={(e) =>
                  handleTupleChange(index, "text1", e.target.value, "text1")
                }
                fullWidth
              />
              <TextField
                className="!mr-[5px]"
                label={`1.${t("txt_order")} ${index + 1}`}
                value={tuple.order1}
                onChange={(e) =>
                  handleTupleChange(index, "order1", e.target.value, "order1")
                }
                fullWidth
              />
              <TextField
                className="!mr-[5px]"
                label={`2.${t("txt_text")} ${index + 1}`}
                value={tuple.text2}
                onChange={(e) =>
                  handleTupleChange(index, "text2", e.target.value, "text2")
                }
                fullWidth
              />
              <TextField
                className="!mr-[5px]"
                label={`2.${t("txt_order")} ${index + 1}`}
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
            label={t("txt_add")}
          />
          <Button onClick={addTuple} className="!mt-[15px]">
            {t("txt_add_tuple")}
          </Button>
          <Button
            className="!mt-[15px]"
            variant="contained"
            color="primary"
            onClick={async () => {
              console.log(formData);
              await handleUpdateExercice();
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

export default ArrowOrColor;

import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Select,
  MenuItem,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Modal,
  Typography,
  FormHelperText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { LessonInterface } from "@/interfaces/LessonInterface";
import QcmText from "../addExercises/QcmText";
import QcmImageWords from "../addExercises/QcmImageWords";
import QcmImages from "../addExercises/QcmImages";
import DragDropWordsImages from "../addExercises/DragDropWordsImages";
import DragDropTableImages from "../addExercises/DragDropTableImages";
import SelectTable from "../addExercises/SelectTable";
import ArrowOrColor from "../addExercises/ArrowOrColor";
import ArrowSound from "../addExercises/ArrowSound";
import Read from "../addExercises/Read";
import ReadImage from "../addExercises/ReadImage";
import MakePhrase from "../addExercises/MakePhrase";
import Video from "../addExercises/Video";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/Store";
import { createExercice } from "@/redux/exerciceSlice";
import {
  createExerciceInputSchema,
  validateExerciceInput,
} from "@/zod/exercice";
import { z } from "zod";
import { getAllLessons } from "@/redux/lessonSlice";

interface ModalExerciceAddProps {
  lessons?: LessonInterface[];
  open: boolean;
  handleClose: () => void;
  selectedTypeImage: string;
  selectedTypeId: string;
  handleStartErrorMessage: (message: string, success: boolean) => void;
}

const ModalExerciceAdd: React.FC<ModalExerciceAddProps> = ({
  open,
  handleClose,
  selectedTypeImage,
  selectedTypeId,
  handleStartErrorMessage,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  //lessons
  const [lessons, setLessons] = useState<LessonInterface[]>([]);
  //loading animation
  const [loading, setLoading] = useState(false);
  //variable for the description
  const [description, setDescription] = useState<any>("");
  //the selected lesson id
  const [selectedLessonId, setSelectedLessonId] = useState("");
  //state variable for form validation
  const [errors, setErrors] = useState<any>({});
  // styling for the modal
  const style = {
    overflowX: "auto",
    overflowY: "auto",
    position: "relative",
    top: "50%",
    left: "50%",
    maxHeight: "100%",
    transform: "translate(-50%, -50%)",
    width: "90%", // Default to 90% of the screen width
    maxWidth: 600, // Maximum width for larger screens
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  //handles changing the state variable for the description
  const handleInputChange = (value: any) => {
    setDescription(value);
  };
  // submits data to the backend to create an exercice and is used by all the different questiontypes
  const handleSubmit = async ({ formData }: { formData: any }) => {
    console.log("Form Data:", formData);
    try {
      await validateExerciceInput(formData);
      setLoading(true);
      const data = await dispatch(createExercice({ formData }));
      handleStartErrorMessage(t("txt_success"), true);
      console.log("Exercise created:", data);
      setLoading(false);
      setErrors({});
      // handleClose();
    } catch (error) {
      setLoading(false);
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const newErrors = error.errors.reduce((acc: any, curr: any) => {
          acc[curr.path.join(".")] = curr.message;
          return acc;
        }, {});
        console.log(newErrors);
        setErrors(newErrors);
      } else {
        handleStartErrorMessage(t("txt_error"), false);
        console.log("failed to create exercice ", error);
      }
    }
  };
  //responsible for the components to be displayed depending on the type of the question
  const renderContentFields = () => {
    switch (selectedTypeId) {
      case "QCM_COMPLETE_PHRASE_WITH_WORD":
      case "QCM_COMPLETE_PHRASE_WITH_PHRASE":
      case "QCM_CHOOSE_PHRASE":
      case "QCM_CHOOSE_WORD":
      case "QCM_OPTION":
      case "QCM_DRAG_SMALL":
      case "QCM_DRAG_BIG":
      case "QCM_MULTI_ANSWER_WORDS":
      case "QCM_MULTI_ANSWER_PHRASE_SMALL":
        return (
          <QcmText
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
            errors={errors}
            loading={loading}
          />
        );
      case "QCM_MULTI_ANSWER_IMAGES":
        return (
          <QcmImages
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
            errors={errors}
            loading={loading}
          />
        );
      case "QCM_MULTI_ANSWER_WORDS_IMAGES":
        return (
          <QcmImageWords
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
            errors={errors}
            loading={loading}
          />
        );
      case "DRAG_DROP_WORDS_TO_IMAGE":
        return (
          <DragDropWordsImages
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
            errors={errors}
            loading={loading}
          />
        );
      case "DRAG_DROP_IN_TABLE_IMAGES":
        return (
          <DragDropTableImages
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
            errors={errors}
            loading={loading}
          />
        );
      case "SELECT_TABLE":
        return (
          <SelectTable
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
            errors={errors}
            loading={loading}
          />
        );
      case "COLOR":
        return (
          <ArrowOrColor
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
            errors={errors}
            loading={loading}
          />
        );
      case "ARROW":
        return (
          <ArrowOrColor
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
            errors={errors}
            loading={loading}
          />
        );
      case "ARROW_SOUND":
        return (
          <ArrowSound
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
            errors={errors}
            loading={loading}
          />
        );
      case "READ":
        return (
          <Read
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
            errors={errors}
            loading={loading}
          />
        );
      case "READ_IMAGE":
        return (
          <ReadImage
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
            errors={errors}
            loading={loading}
          />
        );
      case "MAKE_PHRASE":
        return (
          <MakePhrase
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
            errors={errors}
            loading={loading}
          />
        );
      case "MAKE_PHRASE_FROM_TABLE":
        return (
          <MakePhrase
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
            errors={errors}
            loading={loading}
          />
        );
      case "VIDEO":
        return (
          <Video
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
            errors={errors}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };
  //getting all lessons
  const getLessons = async () => {
    try {
      const result = await dispatch(getAllLessons());
      if (getAllLessons.fulfilled.match(result)) {
        setLessons(result.payload as LessonInterface[]);
      } else {
        console.error("Failed to fetch lessons");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // initially launching the functions necessary
  useEffect(() => {
    getLessons();
    console.log("use effect");
  }, []);
  useEffect(() => {
    setDescription("");
    setSelectedLessonId("");
  }, [selectedTypeId]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form>
          <img src={selectedTypeImage} alt="" />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedTypeId}
          </Typography>
          <FormControl required fullWidth className="!mt-[15px]">
            <InputLabel>{t("txt_lesson")}</InputLabel>
            <Select
              error={!!errors[`courId`]}
              value={selectedLessonId}
              label={t("txt_lesson")}
              onChange={(e) => {
                console.log("lesson id", e.target.value);
                setSelectedLessonId(e.target.value);
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
          <FormControl fullWidth className="!mt-[15px]">
            <TextField
              label={t("txt_description")}
              value={description}
              onChange={(e) => handleInputChange(e.target.value)}
              fullWidth
            />
          </FormControl>
          {renderContentFields()}
        </form>
      </Box>
    </Modal>
  );
};

export default ModalExerciceAdd;

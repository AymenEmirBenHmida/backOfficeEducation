import React, { useState, ChangeEvent } from "react";
import {
  Select,
  MenuItem,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Modal,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { LessonInterface } from "@/interfaces/LessonInterface";
import axios from "@/config/axiosConfig";
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

interface ModalExerciceAddProps {
  lessons: LessonInterface[];
  open: boolean;
  handleClose: () => void;
  selectedTypeImage: string;
  selectedTypeId: string;
}

const ModalExerciceAdd: React.FC<ModalExerciceAddProps> = ({
  lessons,
  open,
  handleClose,
  selectedTypeImage,
  selectedTypeId,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [description, setDescription] = useState<any>("");
  const [selectedLessonId, setSelectedLessonId] = useState("");

  const handleInputChange = (value: any) => {
    setDescription(value);
  };
  // submits data to the backend to create an exercice and is used by all the different questiontypes
  const handleSubmit = async ({ formData }: { formData: any }) => {
    console.log("Form Data:", formData);
    try {
      const data = await dispatch(createExercice({ formData }));

      console.log("Exercise created:", data);
      // handleClose();
    } catch (error) {
      console.error("Failed to create exercise:", error);
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
          />
        );
      case "QCM_MULTI_ANSWER_IMAGES":
        return (
          <QcmImages
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
          />
        );
      case "QCM_MULTI_ANSWER_WORDS_IMAGES":
        return (
          <QcmImageWords
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
          />
        );
      case "DRAG_DROP_WORDS_TO_IMAGE":
        return (
          <DragDropWordsImages
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
          />
        );
      case "DRAG_DROP_IN_TABLE_IMAGES":
        return (
          <DragDropTableImages
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
          />
        );
      case "SELECT_TABLE":
        return (
          <SelectTable
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
          />
        );
      case "COLOR":
        return (
          <ArrowOrColor
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
          />
        );
      case "ARROW":
        return (
          <ArrowOrColor
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
          />
        );
      case "ARROW_SOUND":
        return (
          <ArrowSound
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
          />
        );
      case "READ":
        return (
          <Read
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
          />
        );
      case "READ_IMAGE":
        return (
          <ReadImage
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
          />
        );
      case "MAKE_PHRASE":
        return (
          <MakePhrase
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
          />
        );
      case "MAKE_PHRASE_FROM_TABLE":
        return (
          <MakePhrase
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
          />
        );
      case "VIDEO":
        return (
          <Video
            selectedTypeId={selectedTypeId}
            selectedLessonId={selectedLessonId}
            description={description}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };
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
          <FormControl fullWidth className="!mt-[15px]">
            <InputLabel>{t("txt_lesson")}</InputLabel>
            <Select
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

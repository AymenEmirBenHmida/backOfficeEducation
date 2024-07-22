import { getAllLessons } from "../../../redux/lessonSlice";
import QuestionTypes from "../../../constants";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Typography,
  InputLabel,
  FormControl,
  Select,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import ModalExerciceAdd from "../../../components/modalExerciceAdd/ModalExerciceAdd";
import { LessonInterface } from "@/interfaces/LessonInterface";
import { AppDispatch } from "@/redux/Store";
import { refreshTokenService } from "@/services/authService";
import {
  deleteExercice,
  getAllExercices,
  getExercice,
} from "@/redux/exerciceSlice";
import { AxiosResponse } from "axios";
import QcmText from "@/components/updateExercices/QcmText";

// Define the types for your data
interface Option {
  text: string;
  isCorrect: boolean;
  image?: string;
}

interface Content {
  [key: string]: any;
}

interface Cour {
  id: string;
  description: string;
  name: string;
  isLocked: boolean;
}

interface Exercice {
  id: string;
  description: string;
  typeQuestion: string;
  content: Content;
  isLocked: boolean;
  cour: Cour;
}
const AllExercises: React.FC = () => {
  const questionTypes = QuestionTypes();
  const { t } = useTranslation();
  const [exercices, setExercices] = useState<Exercice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const [selectedExercice, setSelectedExercice] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarOpen = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
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
    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
    };
  const deleteExerciceHandler = async (id: string) => {
    await dispatch(deleteExercice(id));
    handleClose();
  };
  const handleClickOpen = (id: string) => {
    setOpenAlertDelete(true);
    setSelectedExercice(id);
  };

  const handleClose = () => {
    setOpenAlertDelete(false);
  };

  const handleOpenModal = async () => {
    setOpenModalEdit(true);
  };

  const getExercices = async () => {
    try {
      const result = await dispatch(getAllExercices()).unwrap();
      const data: Exercice[] = result.data;
      if (data) {
        setExercices(data);
      } else {
        console.error("No exercices found");
        setExercices([]);
      }
    } catch (error) {
      console.error("An error occurred while fetching exercices:", error);
      setExercices([]);
    } finally {
      setLoading(false);
    }
  };
  //responsible for the components to be displayed depending on the type of the question
  const renderContentFields = (exerciceId: string, selectedTypeId: string) => {
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
            selectedExerciceId={exerciceId}
            handleSubmit={handleCloseModalEdit}
            handleError={handleSnackbarOpen}
          />
        );
      // case "QCM_MULTI_ANSWER_IMAGES":
      //   return (
      //     <QcmImages
      //       selectedTypeId={selectedTypeId}
      //       selectedLessonId={selectedLessonId}
      //       description={description}
      //       handleSubmit={handleSubmit}
      //     />
      //   );
      // case "QCM_MULTI_ANSWER_WORDS_IMAGES":
      //   return (
      //     <QcmImageWords
      //       selectedTypeId={selectedTypeId}
      //       selectedLessonId={selectedLessonId}
      //       description={description}
      //       handleSubmit={handleSubmit}
      //     />
      //   );
      // case "DRAG_DROP_WORDS_TO_IMAGE":
      //   return (
      //     <DragDropWordsImages
      //       selectedTypeId={selectedTypeId}
      //       selectedLessonId={selectedLessonId}
      //       description={description}
      //       handleSubmit={handleSubmit}
      //     />
      //   );
      // case "DRAG_DROP_IN_TABLE_IMAGES":
      //   return (
      //     <DragDropTableImages
      //       selectedTypeId={selectedTypeId}
      //       selectedLessonId={selectedLessonId}
      //       description={description}
      //       handleSubmit={handleSubmit}
      //     />
      //   );
      // case "SELECT_TABLE":
      //   return (
      //     <SelectTable
      //       selectedTypeId={selectedTypeId}
      //       selectedLessonId={selectedLessonId}
      //       description={description}
      //       handleSubmit={handleSubmit}
      //     />
      //   );
      // case "COLOR":
      //   return (
      //     <ArrowOrColor
      //       selectedTypeId={selectedTypeId}
      //       selectedLessonId={selectedLessonId}
      //       description={description}
      //       handleSubmit={handleSubmit}
      //     />
      //   );
      // case "ARROW":
      //   return (
      //     <ArrowOrColor
      //       selectedTypeId={selectedTypeId}
      //       selectedLessonId={selectedLessonId}
      //       description={description}
      //       handleSubmit={handleSubmit}
      //     />
      //   );
      // case "ARROW_SOUND":
      //   return (
      //     <ArrowSound
      //       selectedTypeId={selectedTypeId}
      //       selectedLessonId={selectedLessonId}
      //       description={description}
      //       handleSubmit={handleSubmit}
      //     />
      //   );
      // case "READ":
      //   return (
      //     <Read
      //       selectedTypeId={selectedTypeId}
      //       selectedLessonId={selectedLessonId}
      //       description={description}
      //       handleSubmit={handleSubmit}
      //     />
      //   );
      // case "READ_IMAGE":
      //   return (
      //     <ReadImage
      //       selectedTypeId={selectedTypeId}
      //       selectedLessonId={selectedLessonId}
      //       description={description}
      //       handleSubmit={handleSubmit}
      //     />
      //   );
      // case "MAKE_PHRASE":
      //   return (
      //     <MakePhrase
      //       selectedTypeId={selectedTypeId}
      //       selectedLessonId={selectedLessonId}
      //       description={description}
      //       handleSubmit={handleSubmit}
      //     />
      //   );
      // case "MAKE_PHRASE_FROM_TABLE":
      //   return (
      //     <MakePhrase
      //       selectedTypeId={selectedTypeId}
      //       selectedLessonId={selectedLessonId}
      //       description={description}
      //       handleSubmit={handleSubmit}
      //     />
      //   );
      // case "VIDEO":
      //   return (
      //     <Video
      //       selectedTypeId={selectedTypeId}
      //       selectedLessonId={selectedLessonId}
      //       description={description}
      //       handleSubmit={handleSubmit}
      //     />
      //   );
      default:
        return null;
    }
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  useEffect(() => {
    getExercices();
  }, []);

  return (
    <>
      <Box
        sx={{ marginTop: "40px", width: "100%" }}
        display={"flex"}
        justifyContent={"end"}
      >
        <Button variant="contained" sx={{ marginRight: "10px" }}>
          {t("txt_add_an_exercise")}
        </Button>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        sx={{ marginTop: "40px" }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#1976d2" }}>
                <TableCell sx={{ color: "white" }}>Question Type</TableCell>
                <TableCell sx={{ color: "white" }}>Description</TableCell>
                <TableCell sx={{ color: "white" }}>Course Name</TableCell>
                <TableCell sx={{ color: "white" }}>Locked</TableCell>
                <TableCell sx={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? Array.from(new Array(5)).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  ))
                : exercices.map((exercice) => (
                    <TableRow key={exercice.id}>
                      <TableCell>{exercice.typeQuestion}</TableCell>
                      <TableCell>{exercice.description}</TableCell>
                      <TableCell>{exercice.cour.name}</TableCell>
                      <TableCell>{exercice.isLocked ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          className="!mr-3"
                          color="primary"
                          onClick={async () => {
                            setSelectedExercice(exercice.id);
                            setSelectedTypeId(exercice.typeQuestion);
                            await handleOpenModal();
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={async () => {
                            // await deleteExerciceHandler(exercice.id);
                            handleClickOpen(exercice.id);
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          open={openAlertDelete}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete the exercice?"}
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button
              onClick={async () =>
                await deleteExerciceHandler(selectedExercice)
              }
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Modal
          open={openModalEdit}
          onClose={handleCloseModalEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form>
              {/* <img src={selectedTypeImage} alt="" /> */}
              

              {renderContentFields(selectedExercice, selectedTypeId)}
            </form>
          </Box>
        </Modal>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
export default AllExercises;

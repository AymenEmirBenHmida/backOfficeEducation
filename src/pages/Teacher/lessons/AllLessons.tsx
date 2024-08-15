import { deleteLesson, getAllLessons } from "../../../redux/lessonSlice";
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
  DialogTitle,
  Modal,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/Store";
import { LessonInterface } from "@/interfaces/LessonInterface";
import UpdateLesson from "@/components/updateLesson/UpdateLesson";
import AddLessons from "@/components/addLessons/AddLessons";

const AllLessons: React.FC = () => {
  const { t } = useTranslation();
  //lessons
  const [lessons, setLessons] = useState<LessonInterface[]>([]);
  //variable responsible for the intial loading animation
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  //variable for the opening of the modal for the edit
  const [openModalEdit, setOpenModalEdit] = useState(false);
  //varibale for opening the add modal
  const [openModalAdd, setOpenModalAdd] = useState(false);
  //variable for opening the delete alert
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  //the selected lesson to be either updated or deleted
  const [selectedLesson, setSelectedLesson] = useState("");
  //variable snackbar opening varibale
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  //variable for the snackbar message
  const [snackbarMessage, setSnackbarMessage] = useState("");
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
  //opening snack bar and setting it's message
  const handleSnackbarOpen = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  //snack bar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  //deleting a lesson
  const deleteLessonHandler = async (id: string) => {
    await dispatch(deleteLesson(id));
    await handleGetLessons();
    handleClose();
  };
  //opening alert
  const handleClickOpen = (id: string) => {
    setOpenAlertDelete(true);
    setSelectedLesson(id);
  };
  //closing alert
  const handleClose = () => {
    setOpenAlertDelete(false);
  };
  //opening modal edit
  const handleOpenModal = async () => {
    setOpenModalEdit(true);
  };
  //handle open modal add
  const handleOpenModalAdd = async () => {
    setOpenModalAdd(true);
  };
  // getting lessons
  const handleGetLessons = async () => {
    try {
      setLoading(true);
      const result = await dispatch(getAllLessons()).unwrap();
      console.log(result);
      const data: LessonInterface[] = result;
      if (data) {
        setLessons(data);
      } else {
        console.error("No Lessons found");
        setLessons([]);
      }
    } catch (error) {
      console.error("An error occurred while fetching Lessons:", error);
      setLessons([]);
      handleSnackbarOpen(t("txt_error"));
    } finally {
      setLoading(false);
    }
  };
  //closing modal edit
  const handleCloseModalEdit = async () => {
    setOpenModalEdit(false);
  };
  //closing modal add
  const handleCloseModalAdd = async () => {
    setOpenModalAdd(false);
  };
  // getting lessons initially
  useEffect(() => {
    handleGetLessons();
  }, []);

  return (
    <>
      <Box
        sx={{ marginTop: "40px", width: "100%" }}
        display={"flex"}
        justifyContent={"end"}
      >
        <Button
          variant="contained"
          sx={{ marginRight: "10px" }}
          onClick={() => handleOpenModalAdd()}
        >
          {t("txt_add_a_lesson")}
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
                <TableCell sx={{ color: "white" }}>{t("txt_name")}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {t("txt_content")}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {t("txt_description")}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {t("txt_course_name")}
                </TableCell>
                <TableCell sx={{ color: "white" }}>{t("txt_locked")}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {t("txt_actions")}
                </TableCell>
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
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  ))
                : lessons.map((lesson) => (
                    <TableRow key={lesson.id}>
                      <TableCell>{lesson.name}</TableCell>
                      <TableCell sx={{ maxWidth: "400px" }}>
                        {lesson.content}
                      </TableCell>
                      <TableCell>{lesson.description}</TableCell>
                      <TableCell>{lesson.chapitre.name}</TableCell>
                      <TableCell>
                        {lesson.isLocked ? t("txt_yes") : t("txt_no")}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          className="!mr-3"
                          color="primary"
                          onClick={async () => {
                            setSelectedLesson(lesson.id);
                            await handleOpenModal();
                          }}
                        >
                          {t("txt_edit")}
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={async () => {
                            // await deleteExerciceHandler(exercice.id);
                            handleClickOpen(lesson.id);
                          }}
                        >
                          {t("txt_delete")}
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
            {t("txt_lesson_delete_alert")}
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleClose}>{t("txt_disagree")}</Button>
            <Button
              onClick={async () => await deleteLessonHandler(selectedLesson)}
              autoFocus
            >
              {t("txt_agree")}
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
            <UpdateLesson
              getLessons={handleGetLessons}
              selectedLessonId={selectedLesson}
              handleSubmit={handleCloseModalEdit}
              handleError={handleSnackbarOpen}
            ></UpdateLesson>
          </Box>
        </Modal>
        <Modal
          open={openModalAdd}
          onClose={handleCloseModalAdd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddLessons
              getLessons={handleGetLessons}
              selectedLessonId={selectedLesson}
              handleSubmit={handleCloseModalAdd}
              handleError={handleSnackbarOpen}
            ></AddLessons>
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
export default AllLessons;

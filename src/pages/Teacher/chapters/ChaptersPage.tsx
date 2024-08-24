import {
  Button,
  Box,
  Skeleton,
  Dialog,
  DialogActions,
  DialogTitle,
  Modal,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Typography,
  CardActions,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/Store";
import { deleteChapter, getAllChapters } from "@/redux/chaptersSlice";
import React from "react";
import ChapterInformation from "@/components/chapterInformation/ChapterInformation";
import AddChapter from "@/components/addChapter/AddChapter";
import UpdateChapter from "@/components/updateChapter/UpdateChapter";

const AllChapters: React.FC = () => {
  const { t } = useTranslation();
  //chapters
  const [chapters, setChapters] = useState<any[]>([]);
  //variable responsible for the intial loading animation
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  //variable for the opening of the modal for the edit
  const [openModalEdit, setOpenModalEdit] = useState(false);
  //variable for the opening of the modal to see the whole chapter info
  const [openModalInfo, setOpenModalInfo] = useState(false);
  //varibale for opening the add modal
  const [openModalAdd, setOpenModalAdd] = useState(false);
  //variable for opening the delete alert
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  //the selected chapter to be either updated or deleted
  const [selectedChapter, setSelectedChapter] = useState("");
  //variable snackbar opening varibale
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  //variable for the snackbar message
  const [snackbarMessage, setSnackbarMessage] = useState("");
  //variable for the snackbar message
  const [snackbarSuccess, setSnackbarSuccess] = useState(false);
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
  const handleSnackbarOpen = (message: string, success: boolean) => {
    setSnackbarSuccess(success);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  //snack bar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  //deleting a chapter
  const deleteChapterHandler = async (id: string) => {
    try {
      handleDeleteAlertClose();
      setLoading(true);
      await dispatch(deleteChapter(id));
      await handleGetChapters();
      handleClose();
      setLoading(false);
    } catch (error) {
      console.log("error ", error);
      setLoading(false);
    }
  };
  //opening alert
  const handleClickOpen = (id: string) => {
    setOpenAlertDelete(true);
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
  // getting chapters
  const handleGetChapters = async () => {
    try {
      setLoading(true);
      const result = await dispatch(getAllChapters()).unwrap();
      console.log(result);
      const data: any[] = result.data;
      if (data) {
        setChapters(data);
      } else {
        console.error("No chapters found");
        setChapters([]);
      }
    } catch (error) {
      console.error("An error occurred while fetching Chapters:", error);
      setChapters([]);
      handleSnackbarOpen(t("txt_error"));
    } finally {
      setLoading(false);
    }
  };
  //opening alert
  const handleClickDelete = (id: string) => {
    setOpenAlertDelete(true);
    setSelectedChapter(id);
  };
  //closing alert
  const handleDeleteAlertClose = () => {
    setOpenAlertDelete(false);
  };

  //closing modal edit
  const handleCloseModalEdit = async () => {
    setOpenModalEdit(false);
  };
  //closing modal edit
  const handleCloseModalInfo = async () => {
    setOpenModalInfo(false);
  };
  //closing modal add
  const handleCloseModalAdd = async () => {
    setOpenModalAdd(false);
  };
  // getting chapters initially
  useEffect(() => {
    handleGetChapters();
  }, []);

  return (
    <>
      <Box
        sx={{ marginTop: "40px", width: "100%" }}
        display={"flex"}
        justifyContent={"end"}
      >
        <Button variant="contained" onClick={() => handleOpenModalAdd()}>
          {t("txt_add_a_chapter")}
        </Button>
      </Box>
      <Box sx={{ marginTop: "40px" }}>
        <Grid container spacing={2}>
          {loading
            ? Array.from(new Array(5)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Skeleton variant="rectangular" width="100%" height={150} />
                </Grid>
              ))
            : chapters.map((chapter) => (
                <Grid item xs={12} sm={6} md={4} key={chapter.id}>
                  <Card variant="outlined" sx={{ height: "100%" }}>
                    <React.Fragment>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 20 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {t("txt_name") + " : " + chapter.name}
                        </Typography>
                        <Typography variant="body2">
                          {t("txt_description") + " : " + chapter.description}
                          <br />
                          {t("txt_status") +
                            " : " +
                            (chapter.estTermine
                              ? t("txt_completed")
                              : t("txt_not_completed"))}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => {
                            setOpenModalInfo(true);
                            setSelectedChapter(chapter.id);
                          }}
                        >
                          {t("txt_learn_more")}
                        </Button>
                        <Button
                          sx={{ color: "red" }}
                          size="small"
                          onClick={() => {
                            handleClickDelete(chapter.id);
                          }}
                        >
                          {t("txt_delete")}
                        </Button>
                        <Button
                          size="small"
                          onClick={async () => {
                            setSelectedChapter(chapter.id);
                            await handleOpenModal();
                          }}
                        >
                          {t("txt_edit")}
                        </Button>
                      </CardActions>
                    </React.Fragment>
                  </Card>
                </Grid>
              ))}
        </Grid>
        <Dialog
          open={openAlertDelete}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {t("txt_chapter_delete_alert")}
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleClose}>{t("txt_disagree")}</Button>
            <Button
              onClick={async () => await deleteChapterHandler(selectedChapter)}
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
            <UpdateChapter
              getChapters={handleGetChapters}
              chapterId={selectedChapter}
              handleSubmit={handleCloseModalEdit}
              handleError={handleSnackbarOpen}
            ></UpdateChapter>
          </Box>
        </Modal>
        <Modal
          open={openModalAdd}
          onClose={handleCloseModalAdd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddChapter
              getChapters={handleGetChapters}
              handleSubmit={handleCloseModalAdd}
              handleError={handleSnackbarOpen}
            ></AddChapter>
          </Box>
        </Modal>
        <Modal
          open={openModalInfo}
          onClose={handleCloseModalInfo}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ChapterInformation
              selectedChapterId={selectedChapter}
            ></ChapterInformation>
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
          severity={snackbarSuccess ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
export default AllChapters;

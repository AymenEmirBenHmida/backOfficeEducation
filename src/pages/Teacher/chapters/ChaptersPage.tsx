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
  Pagination,
  Paper,
  InputBase,
  IconButton,
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
import { Chapter } from "@/interfaces/Chapter";
import { GoSearch } from "react-icons/go";

const AllChapters: React.FC = () => {
  const { t } = useTranslation();
  //chapters
  const [chapters, setChapters] = useState<Chapter[]>([]);
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
  //filtered subjects
  const [filteredChapters, setFilteredChapters] = useState<Chapter[]>([]);
  //filter key word
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Pagination state
  const itemsPerPage = 9; // You can adjust this value
  const [page, setPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemsPerPage);
  const displayedChapters = filteredChapters.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setStartIndex((value - 1) * itemsPerPage);
    setEndIndex(value * itemsPerPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
        setFilteredChapters(data);
      } else {
        console.error("No chapters found");
        setChapters([]);
      }
    } catch (error) {
      console.error("An error occurred while fetching Chapters:", error);
      setChapters([]);
      handleSnackbarOpen(t("txt_error"), false);
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
  //function  for searching
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = chapters.filter((chapter) =>
      [chapter.name, chapter.description, chapter.matiere?.name].some((attr) =>
        attr?.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredChapters(filtered);
    setStartIndex(0);
    setEndIndex(itemsPerPage);
    setPage(1); // Reset to first page when filtering
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
        justifyContent={"space-between"}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 250,
          }}
        >
          <InputBase
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            sx={{ ml: 1, flex: 1 }}
            placeholder={t("txt_search")}
            inputProps={{ "aria-label": t("txt_search") }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <GoSearch />
          </IconButton>
        </Paper>
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
            : displayedChapters.map((chapter) => (
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
                          <br />
                          {t("txt_subject") + " : " + chapter.matiere?.name}
                          <br />
                          {t("txt_locked") +
                            " : " +
                            (chapter.isLocked ? t("txt_yes") : t("txt_no"))}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => {
                            setOpenModalInfo(true);
                            setSelectedChapter(chapter.id!);
                          }}
                        >
                          {t("txt_learn_more")}
                        </Button>
                        <Button
                          sx={{ color: "red" }}
                          size="small"
                          onClick={() => {
                            handleClickDelete(chapter.id!);
                          }}
                        >
                          {t("txt_delete")}
                        </Button>
                        <Button
                          size="small"
                          onClick={async () => {
                            setSelectedChapter(chapter.id!);
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
        <Pagination
          count={Math.ceil(filteredChapters.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{
            width: "100%",
            paddingTop: "40px",
            paddingBottom: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        />
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
          severity={snackbarSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
export default AllChapters;

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
import React from "react";
import { deleteSubject, getAllSubjects } from "@/redux/subjectsSlice";
import SubjectInformation from "@/components/subjectInformation/ChapterInformation";
import AddSubject from "@/components/addSubject/AddSubject";
import UpdateSubject from "@/components/updateSubject/UpdateSubject";
import { Subject } from "@/interfaces/Subject";
import { GoSearch } from "react-icons/go";

const AllSubjects: React.FC = () => {
  const { t } = useTranslation();
  //subjects
  const [subjects, setSubjects] = useState<Subject[]>([]);
  //variable responsible for the intial loading animation
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  //variable for the opening of the modal for the edit
  const [openModalEdit, setOpenModalEdit] = useState(false);
  //variable for the opening of the modal to see the whole subject info
  const [openModalInfo, setOpenModalInfo] = useState(false);
  //varibale for opening the add modal
  const [openModalAdd, setOpenModalAdd] = useState(false);
  //variable for opening the delete alert
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  //the selected subject to be either updated or deleted
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
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  //filter key word
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Pagination state
  const itemsPerPage = 9; // You can adjust this value
  const [page, setPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemsPerPage);
  const displayedSubject = filteredSubjects.slice(startIndex, endIndex);

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
  //deleting a subject
  const deleteSubjectHandler = async (id: string) => {
    try {
      handleDeleteAlertClose();
      setLoading(true);
      await dispatch(deleteSubject(id));
      await handleGetSubjects();
      handleClose();
      setLoading(false);
    } catch (error) {
      console.log(error);
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
  // getting subjects
  const handleGetSubjects = async () => {
    try {
      setLoading(true);
      const result = await dispatch(getAllSubjects()).unwrap();
      console.log(result);
      const data: any[] = result.data;
      if (data) {
        setSubjects(data);
        setFilteredSubjects(data);
      } else {
        console.error("No Lessons found");
        setSubjects([]);
      }
    } catch (error) {
      console.error("An error occurred while fetching Subjects:", error);
      setSubjects([]);
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
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = subjects.filter((subject) =>
      [subject.name, subject.description, subject.trimestre?.name].some(
        (attr) => attr?.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredSubjects(filtered);
    setStartIndex(0);
    setEndIndex(itemsPerPage);
    setPage(1); // Reset to first page when filtering
  };
  // getting subjects initially
  useEffect(() => {
    handleGetSubjects();
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
          {t("txt_add_a_subject")}
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
            : displayedSubject.map((subject) => (
                <Grid item xs={12} sm={6} md={4} key={subject.id}>
                  <Card variant="outlined" sx={{ height: "100%" }}>
                    <React.Fragment>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 20 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {t("txt_name") + " : " + subject.name}
                        </Typography>
                        <Typography variant="body2">
                          {t("txt_description") + " : " + subject.description}
                          <br />
                          {t("txt_trimester") + " : " + subject.trimestre?.name}
                          <br />
                          {t("txt_locked") +
                            " : " +
                            (subject.isLocked ? t("txt_yes") : t("txt_no"))}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => {
                            setOpenModalInfo(true);
                            setSelectedChapter(subject.id!);
                          }}
                        >
                          {t("txt_learn_more")}
                        </Button>
                        <Button
                          sx={{ color: "red" }}
                          size="small"
                          onClick={() => {
                            handleClickDelete(subject.id!);
                          }}
                        >
                          {t("txt_delete")}
                        </Button>
                        <Button
                          size="small"
                          onClick={async () => {
                            setSelectedChapter(subject.id!);
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
          count={Math.ceil(filteredSubjects.length / itemsPerPage)}
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
            {t("txt_subject_delete_alert")}
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleClose}>{t("txt_disagree")}</Button>
            <Button
              onClick={async () => await deleteSubjectHandler(selectedChapter)}
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
            <UpdateSubject
              getSubjects={handleGetSubjects}
              subjectId={selectedChapter}
              handleSubmit={handleCloseModalEdit}
              handleError={handleSnackbarOpen}
            ></UpdateSubject>
          </Box>
        </Modal>
        <Modal
          open={openModalAdd}
          onClose={handleCloseModalAdd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddSubject
              getSubjects={handleGetSubjects}
              handleSubmit={handleCloseModalAdd}
              handleError={handleSnackbarOpen}
            ></AddSubject>
          </Box>
        </Modal>
        <Modal
          open={openModalInfo}
          onClose={handleCloseModalInfo}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <SubjectInformation
              selectedChapterId={selectedChapter}
            ></SubjectInformation>
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
export default AllSubjects;

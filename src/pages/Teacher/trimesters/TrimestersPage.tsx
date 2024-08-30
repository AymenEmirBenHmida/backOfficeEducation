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
  IconButton,
  Paper,
  InputBase,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/Store";
import React from "react";
import { deleteTrimester, getAllTrimesters } from "@/redux/trimesterSlice";
import AddTrimester from "@/components/addTrimester/AddTrimester";
import UpdateTrimester from "@/components/updateTrimester/UpdateTrimester";
import { Trimester } from "@/interfaces/Trimester";
import { GoSearch } from "react-icons/go";

const AllTrimesters: React.FC = () => {
  const { t } = useTranslation();
  //trimesters
  const [trimesters, setTrimesters] = useState<Trimester[]>([]);
  //variable responsible for the intial loading animation
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  //variable for the opening of the modal for the edit
  const [openModalEdit, setOpenModalEdit] = useState(false);
  //varibale for opening the add modal
  const [openModalAdd, setOpenModalAdd] = useState(false);
  //variable for opening the delete alert
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  //the selected trimester to be either updated or deleted
  const [selectedTrimester, setSelectedTrimester] = useState("");
  //variable snackbar opening varibale
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  //variable for the snackbar message
  const [snackbarSuccess, setSnackbarSuccess] = useState(false);
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
  //filtered subjects
  const [filteredTrimesters, setFilteredTrimesters] = useState<Trimester[]>([]);
  //filter key word
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Pagination state
  const itemsPerPage = 9; // You can adjust this value
  const [page, setPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemsPerPage);
  const displayedTrimesters = filteredTrimesters.slice(startIndex, endIndex);
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
  //deleting a trimester
  const deleteTrimesterHandler = async (id: string) => {
    try {
      handleDeleteAlertClose();
      setLoading(true);
      await dispatch(deleteTrimester(id));
      await handleGetTrimesters();
      handleClose();
      setLoading(false);
    } catch (error) {
      console.log("error deleting trimester");
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
  // getting trimesters
  const handleGetTrimesters = async () => {
    try {
      setLoading(true);
      const result = await dispatch(getAllTrimesters()).unwrap();
      console.log(result);
      const data: any[] = result.data;
      if (data) {
        setTrimesters(data);
        setFilteredTrimesters(data);
      } else {
        console.error("No trimesters found");
        setTrimesters([]);
      }
    } catch (error) {
      console.error("An error occurred while fetching trimesters:", error);
      handleSnackbarOpen(t("txt_error"), false);
      setTrimesters([]);
    } finally {
      setLoading(false);
    }
  };
  //opening alert
  const handleClickDelete = (id: string) => {
    setOpenAlertDelete(true);
    setSelectedTrimester(id);
  };
  //closing alert
  const handleDeleteAlertClose = () => {
    setOpenAlertDelete(false);
  };
  //closing modal edit
  const handleCloseModalEdit = async () => {
    setOpenModalEdit(false);
  };
  //closing modal add
  const handleCloseModalAdd = async () => {
    setOpenModalAdd(false);
  };
  //filter the trimesters
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = trimesters.filter((trimester) =>
      [trimester.name, trimester.slug, trimester.niveau!.name].some((attr) =>
        attr?.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredTrimesters(filtered);
    setStartIndex(0);
    setEndIndex(itemsPerPage);
    setPage(1); // Reset to first page when filtering
  };
  // getting trimesters initially
  useEffect(() => {
    handleGetTrimesters();
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
          {t("txt_add_a_trimester")}
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
            : displayedTrimesters.map((trimester) => (
                <Grid item xs={12} sm={6} md={4} key={trimester.id}>
                  <Card variant="outlined" sx={{ height: "100%" }}>
                    <React.Fragment>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 20 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {t("txt_name") + " : " + trimester.name}
                        </Typography>
                        <Typography variant="body2">
                          {"slug" + " : " + trimester.slug}
                          <br />
                        </Typography>
                        <Typography variant="body2">
                          {t("txt_locked") +
                            " : " +
                            (trimester.isLocked ? t("txt_yes") : t("txt_no"))}
                        </Typography>
                        <Typography variant="body2">
                          {t("txt_level") + " : " + trimester.niveau!.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          sx={{ color: "red" }}
                          size="small"
                          onClick={() => {
                            handleClickDelete(trimester.id!);
                          }}
                        >
                          {t("txt_delete")}
                        </Button>
                        <Button
                          size="small"
                          onClick={async () => {
                            setSelectedTrimester(trimester.id!);
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
          count={Math.ceil(filteredTrimesters.length / itemsPerPage)}
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
            {t("txt_trimester_delete_alert")}
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleClose}>{t("txt_disagree")}</Button>
            <Button
              onClick={async () =>
                await deleteTrimesterHandler(selectedTrimester)
              }
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
            <UpdateTrimester
              getTrimesters={handleGetTrimesters}
              trimesterId={selectedTrimester}
              handleSubmit={handleCloseModalEdit}
              handleError={handleSnackbarOpen}
            ></UpdateTrimester>
          </Box>
        </Modal>
        <Modal
          open={openModalAdd}
          onClose={handleCloseModalAdd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddTrimester
              getTrimesters={handleGetTrimesters}
              handleSubmit={handleCloseModalAdd}
              handleError={handleSnackbarOpen}
            ></AddTrimester>
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
export default AllTrimesters;

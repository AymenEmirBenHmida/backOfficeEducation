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
  Pagination,
  InputBase,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/Store";
import {
  approvingAnExercice,
  deleteExercice,
  getAllExercices,
  getAllPendingExercices,
  refusingAnExercice,
  updatExercice,
} from "@/redux/exerciceSlice";
import QcmText from "@/components/updateExercices/QcmText";
import QcmImages from "@/components/updateExercices/QcmImages";
import QcmImageWords from "@/components/updateExercices/QcmImageWords";
import DragDropWordsImages from "@/components/updateExercices/DragDropWordsImages";
import DragDropTableImages from "@/components/updateExercices/DragDropTableImages";
import Video from "@/components/updateExercices/Video";
import MakePhrase from "@/components/updateExercices/MakePhrase";
import ReadImage from "@/components/updateExercices/ReadImage";
import Read from "@/components/updateExercices/Read";
import ArrowSound from "@/components/updateExercices/ArrowSound";
import ArrowOrColor from "@/components/updateExercices/ArrowOrColor";
import SelectTable from "@/components/updateExercices/SelectTable";
import { useNavigate } from "react-router-dom";
import { validateExerciceInput } from "@/zod/exercice";
import { z } from "zod";
import { Exercice } from "@/interfaces/Exercice";
import { GoSearch } from "react-icons/go";
import { selectUser } from "@/redux/adminSlice";

// // Define the types for your data
// interface Option {
//   text: string;
//   isCorrect: boolean;
//   image?: string;
// }

// interface Content {
//   [key: string]: any;
// }

// interface Cour {
//   id: string;
//   description: string;
//   name: string;
//   isLocked: boolean;
// }

// interface Exercice {
//   id: string;
//   description: string;
//   typeQuestion: string;
//   content: Content;
//   isLocked: boolean;
//   cour: Cour;
// }
const AllPendingExercises: React.FC = () => {
  const { t } = useTranslation();
  // exercices variable
  const [exercices, setExercices] = useState<Exercice[]>([]);
  //filtered subjects
  const [filteredExercices, setFilteredExercices] = useState<Exercice[]>([]);
  //filter key word
  const [searchQuery, setSearchQuery] = useState<string>("");
  // variable responsible for the initial loading animation
  const [loading, setLoading] = useState<boolean>(true);
  // variable responsible for the update animation
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  // variable responsible for the update animation
  const [refusalLoading, setRefusalLoading] = useState<boolean>(false);
  //getting the user's info
  const user = useSelector(selectUser);
  console.log(user);
  const dispatch = useDispatch<AppDispatch>();
  //variable responsible for opening modal edit
  const [openModalEdit, setOpenModalEdit] = useState(false);
  //variable responsible for opening
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  //selected exercice
  const [selectedExercice, setSelectedExercice] = useState("");
  //selected type of question
  const [selectedTypeId, setSelectedTypeId] = useState("");
  //state variable for form validation
  const [errors, setErrors] = useState<any>({});
  //variable responsible for opening snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  //variable for snack bar message
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();
  //variable for the snackbar message
  const [snackbarSuccess, setSnackbarSuccess] = useState(false);
  // Pagination state
  const itemsPerPage = 10; // You can adjust this value
  const [page, setPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemsPerPage);
  const displayedExercices = filteredExercices.slice(startIndex, endIndex);

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
  //snack bar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  //delete exercice
  const deleteExerciceHandler = async (id: string) => {
    await dispatch(deleteExercice(id));
    await handleGetExercices();
    handleClose();
  };
  //open alert and set message
  const handleClickOpen = (id: string) => {
    setOpenAlertDelete(true);
    setSelectedExercice(id);
  };
  //closing delete alert
  const handleClose = () => {
    setOpenAlertDelete(false);
  };
  // opening edit  modal
  const handleOpenModal = async () => {
    setOpenModalEdit(true);
  };
  // getting exercices
  const handleGetExercices = async () => {
    try {
      setLoading(true);
      const result = await dispatch(getAllPendingExercices(user)).unwrap();
      const data: Exercice[] = result.data.data;
      if (data) {
        console.log("data :", data);
        setExercices(data && data.length > 0 ? data : []);
        setFilteredExercices(data && data.length > 0 ? data : []);
      } else {
        console.error("No exercices found");
        setExercices([]);
      }
    } catch (error) {
      console.error("An error occurred while fetching exercices:", error);
      setExercices([]);
      handleSnackbarOpen(t("txt_error"), false);
    } finally {
      setLoading(false);
    }
  };

  //handle updating exercice
  const handleUpdateExercice = async (
    formData: any,
    selectedExerciceId: string,
    cleanFormData: (formData: any) => void
  ) => {
    try {
      console.log(formData);
      await validateExerciceInput(formData);
      const data = cleanFormData(formData);
      setUpdateLoading(true);
      const response = await dispatch(
        updatExercice({ formData: data, id: selectedExerciceId })
      ).unwrap();
      setUpdateLoading(false);
      if (response && response.statusText === "OK") {
        console.log("response update ", response);
        handleSnackbarOpen!(t("txt_success"), true);
        handleCloseModalEdit!();
        await handleGetExercices();
      } else {
        handleSnackbarOpen!(t("txt_error"), false);
      }
    } catch (error) {
      setUpdateLoading(false);
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const newErrors = error.errors.reduce((acc: any, curr: any) => {
          acc[curr.path.join(".")] = curr.message;
          return acc;
        }, {});
        console.log(newErrors);
        setErrors(newErrors);
      } else {
        handleSnackbarOpen(t("txt_error"), false);
        console.log("failed to create exercice ", error);
      }
    }
  };
  //handle refusing the exercice
  const handleRefusal = async (comment: string, selectedExerciceId: string) => {
    try {
      setRefusalLoading(true);
      const response = await dispatch(
        refusingAnExercice({ id: selectedExerciceId, comment })
      ).unwrap();
      setRefusalLoading(false);
      if (response && response.status === "OK") {
        console.log("response update ", response);
        handleSnackbarOpen!(t("txt_success"), true);
        handleCloseModalEdit!();
        await handleGetExercices();
      } else {
        handleSnackbarOpen!(t("txt_error"), false);
      }
    } catch (error) {
      setRefusalLoading(false);
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const newErrors = error.errors.reduce((acc: any, curr: any) => {
          acc[curr.path.join(".")] = curr.message;
          return acc;
        }, {});
        console.log(newErrors);
        setErrors(newErrors);
      } else {
        handleSnackbarOpen(t("txt_error"), false);
        console.log("failed to create exercice ", error);
      }
    }
  };
  //handle approving the exercice
  const handleApproval = async (
    formData: any,
    selectedExerciceId: string,
    cleanFormData: (formData: any) => void
  ) => {
    try {
      setUpdateLoading(true);
      const response = await dispatch(
        approvingAnExercice({ id: selectedExerciceId })
      ).unwrap();
      setUpdateLoading(false);
      if (response && response.status === "OK") {
        console.log("response update ", response);
        handleSnackbarOpen!(t("txt_success"), true);
        handleCloseModalEdit!();
        await handleGetExercices();
      } else {
        handleSnackbarOpen!(t("txt_error"), false);
      }
    } catch (error) {
      setUpdateLoading(false);
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const newErrors = error.errors.reduce((acc: any, curr: any) => {
          acc[curr.path.join(".")] = curr.message;
          return acc;
        }, {});
        console.log(newErrors);
        setErrors(newErrors);
      } else {
        handleSnackbarOpen(t("txt_error"), false);
        console.log("failed to create exercice ", error);
      }
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
            refusalLoading={refusalLoading}
            handleRefusal={handleRefusal}
            selectedExerciceId={exerciceId}
            handleSubmit={handleUpdateExercice}
            updateLoading={updateLoading}
            handleApproval={handleApproval}
            errors={errors}
            setErrors={setErrors}
            isApproval={true}
          />
        );
      case "QCM_MULTI_ANSWER_IMAGES":
        return (
          <QcmImages
            refusalLoading={refusalLoading}
            handleRefusal={handleRefusal}
            handleApproval={handleApproval}
            selectedExerciceId={exerciceId}
            handleSubmit={handleUpdateExercice}
            updateLoading={updateLoading}
            errors={errors}
            setErrors={setErrors}
            isApproval={true}
          />
        );
      case "QCM_MULTI_ANSWER_WORDS_IMAGES":
        return (
          <QcmImageWords
            handleRefusal={handleRefusal}
            refusalLoading={refusalLoading}
            handleApproval={handleApproval}
            selectedExerciceId={exerciceId}
            handleSubmit={handleUpdateExercice}
            updateLoading={updateLoading}
            errors={errors}
            isApproval={true}
            setErrors={setErrors}
          />
        );
      case "DRAG_DROP_WORDS_TO_IMAGE":
        return (
          <DragDropWordsImages
            handleRefusal={handleRefusal}
            refusalLoading={refusalLoading}
            handleApproval={handleApproval}
            selectedExerciceId={exerciceId}
            handleSubmit={handleUpdateExercice}
            updateLoading={updateLoading}
            errors={errors}
            isApproval={true}
            setErrors={setErrors}
          />
        );
      case "DRAG_DROP_IN_TABLE_IMAGES":
        return (
          <DragDropTableImages
            handleRefusal={handleRefusal}
            refusalLoading={refusalLoading}
            handleApproval={handleApproval}
            selectedExerciceId={exerciceId}
            handleSubmit={handleUpdateExercice}
            updateLoading={updateLoading}
            errors={errors}
            isApproval={true}
            setErrors={setErrors}
          />
        );
      case "SELECT_TABLE":
        return (
          <SelectTable
            handleRefusal={handleRefusal}
            refusalLoading={refusalLoading}
            handleApproval={handleApproval}
            selectedExerciceId={exerciceId}
            handleSubmit={handleUpdateExercice}
            updateLoading={updateLoading}
            errors={errors}
            isApproval={true}
            setErrors={setErrors}
          />
        );
      case "COLOR":
        return (
          <ArrowOrColor
            handleRefusal={handleRefusal}
            refusalLoading={refusalLoading}
            handleApproval={handleApproval}
            selectedExerciceId={exerciceId}
            handleSubmit={handleUpdateExercice}
            updateLoading={updateLoading}
            errors={errors}
            isApproval={true}
            setErrors={setErrors}
          />
        );
      case "ARROW":
        return (
          <ArrowOrColor
            handleRefusal={handleRefusal}
            refusalLoading={refusalLoading}
            handleApproval={handleApproval}
            selectedExerciceId={exerciceId}
            handleSubmit={handleUpdateExercice}
            updateLoading={updateLoading}
            errors={errors}
            isApproval={true}
            setErrors={setErrors}
          />
        );
      case "ARROW_SOUND":
        return (
          <ArrowSound
            handleRefusal={handleRefusal}
            refusalLoading={refusalLoading}
            handleApproval={handleApproval}
            selectedExerciceId={exerciceId}
            handleSubmit={handleUpdateExercice}
            updateLoading={updateLoading}
            errors={errors}
            isApproval={true}
            setErrors={setErrors}
          />
        );
      case "READ":
        return (
          <Read
            handleRefusal={handleRefusal}
            refusalLoading={refusalLoading}
            handleApproval={handleApproval}
            selectedExerciceId={exerciceId}
            handleSubmit={handleUpdateExercice}
            updateLoading={updateLoading}
            errors={errors}
            isApproval={true}
            setErrors={setErrors}
          />
        );
      case "READ_IMAGE":
        return (
          <ReadImage
            handleRefusal={handleRefusal}
            refusalLoading={refusalLoading}
            handleApproval={handleApproval}
            selectedExerciceId={exerciceId}
            handleSubmit={handleUpdateExercice}
            updateLoading={updateLoading}
            errors={errors}
            isApproval={true}
            setErrors={setErrors}
          />
        );
      case "MAKE_PHRASE":
        return (
          <MakePhrase
            handleRefusal={handleRefusal}
            refusalLoading={refusalLoading}
            handleApproval={handleApproval}
            selectedExerciceId={exerciceId}
            handleSubmit={handleUpdateExercice}
            updateLoading={updateLoading}
            errors={errors}
            isApproval={true}
            setErrors={setErrors}
          />
        );
      case "MAKE_PHRASE_FROM_TABLE":
        return (
          <MakePhrase
            handleRefusal={handleRefusal}
            refusalLoading={refusalLoading}
            handleApproval={handleApproval}
            selectedExerciceId={exerciceId}
            handleSubmit={handleUpdateExercice}
            updateLoading={updateLoading}
            errors={errors}
            isApproval={true}
            setErrors={setErrors}
          />
        );
      case "VIDEO":
        return (
          <Video
            handleRefusal={handleRefusal}
            refusalLoading={refusalLoading}
            handleApproval={handleApproval}
            selectedExerciceId={exerciceId}
            handleSubmit={handleUpdateExercice}
            updateLoading={updateLoading}
            errors={errors}
            isApproval={true}
            setErrors={setErrors}
          />
        );
      default:
        return null;
    }
  };
  //closing edit
  const handleCloseModalEdit = async () => {
    setOpenModalEdit(false);
  };
  //to filter the exercices
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = exercices.filter((exercice) =>
      [exercice.typeQuestion, exercice.description, exercice.cour!.name].some(
        (attr) => attr?.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredExercices(filtered);
    setStartIndex(0);
    setEndIndex(itemsPerPage);
    setPage(1); // Reset to first page when filtering
  };
  useEffect(() => {
    handleGetExercices();
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
                <TableCell sx={{ color: "white" }}>
                  {t("txt_question_type")}
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
                    </TableRow>
                  ))
                : displayedExercices.map((exercice) => (
                    <TableRow key={exercice.id}>
                      <TableCell>{exercice.typeQuestion}</TableCell>
                      <TableCell>{exercice.description}</TableCell>
                      <TableCell>{exercice.cour.name}</TableCell>
                      <TableCell>
                        {exercice.isLocked ? t("txt_yes") : t("txt_no")}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          className="!mr-3"
                          color="primary"
                          onClick={async () => {
                            setSelectedExercice(exercice.id!);
                            setSelectedTypeId(exercice.typeQuestion);
                            await handleOpenModal();
                          }}
                        >
                          {t("txt_verify")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil(filteredExercices.length / itemsPerPage)}
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
            {t("txt_exercice_delete_alert")}
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleClose}>{t("txt_disagree")}</Button>
            <Button
              onClick={async () =>
                await deleteExerciceHandler(selectedExercice)
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
            <form>{renderContentFields(selectedExercice, selectedTypeId)}</form>
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
export default AllPendingExercises;

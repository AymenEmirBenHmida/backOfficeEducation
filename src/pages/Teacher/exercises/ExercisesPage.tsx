import QuestionTypes from "../../../constants";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Pagination,
  Snackbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import ModalExerciceAdd from "../../../components/modalExerciceAdd/ModalExerciceAdd";
import { AppDispatch } from "@/redux/Store";
import { useNavigate } from "react-router-dom";
const Exercises: React.FC = () => {
  // importing the questions
  const questionTypes = QuestionTypes();
  const { t } = useTranslation();
  // variable responsible for opening the add modal
  const [open, setOpen] = useState(false);
  //the selected questions image
  const [selectedTypeImage, setSelectedTypeImage] = useState("");
  // the selected question type id
  const [selectedTypeId, setSelectedTypeId] = useState("");
  //number of items per page
  const itemPerpage = 6;
  //start index for each page
  const [startIndex, setStartIndex] = useState(0);
  //end index for each page
  const [endIndex, setEndIndex] = useState(itemPerpage);
  //number of the current page
  const [page, setPage] = useState(1);
  //variable for the snackbar message
  const [snackbarMessage, setSnackbarMessage] = useState("");
  //snackbar opening state
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  //snackbar success or error
  const [snackBarSuccess, setSnackBarSuccess] = useState(true);
  //the questions types to be actually displayed
  const displayedTypes = questionTypes.slice(startIndex, endIndex);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  //breakpont for centering the different exercices when there wil be only a solo item per row
  const screenSoloItemPerRow = useMediaQuery("(max-width: 864px)");

  //function that for each page change will smoothly return to the top of the list
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setStartIndex((value - 1) * itemPerpage);
    setEndIndex(value * itemPerpage);
    console.log(startIndex, " ", endIndex);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  //doing the necessary actions needed to open the add modal
  const handleOpen = (image: string, id: string) => {
    setSelectedTypeId(id);
    setSelectedTypeImage(image);
    setOpen(true);
  };
  //snack bar close
  const handleSnackbarClose = () => {
    setSnackBarOpen(false);
  };
  //opening snack bar and setting it's message
  const handleSnackbarOpen = (message: string, success: boolean) => {
    setSnackBarSuccess(success);
    setSnackbarMessage(message);
    setSnackBarOpen(true);
  };
  //closing the add modal
  const handleClose = () => setOpen(false);
 
  return (
    <>
      <Box
        sx={{ marginTop: "40px", width: "100%" }}
        display={"flex"}
        justifyContent={"end"}
      >
        <Button
          variant="contained"
          onClick={() => {
            navigate("/teacher/all-exercices");
          }}
        >
          {t("txt_consult_an_exercise")}
        </Button>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        justifyContent={screenSoloItemPerRow ? "center" : "space-between"}
        alignItems={"center"}
        sx={{ marginTop: "40px" }}
      >
        {displayedTypes.map((QuestionType) => {
          return (
            <Card sx={{ maxWidth: 360, marginTop: "20px" }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={QuestionType.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {QuestionType.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">{t("txt_details")}</Button>
                <Button
                  size="small"
                  onClick={() => {
                    handleOpen(QuestionType.image, QuestionType.id);
                  }}
                >
                  {t("txt_add")}
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
      <ModalExerciceAdd
        handleStartErrorMessage={handleSnackbarOpen}
        handleClose={handleClose}
        open={open}
        selectedTypeId={selectedTypeId}
        selectedTypeImage={selectedTypeImage}
      ></ModalExerciceAdd>
      <Pagination
        count={Math.ceil(questionTypes.length / itemPerpage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{
          paddingTop: "40px",
          paddingBottom: "40px",
          display: "flex",
          justifyContent: "center",
        }}
      />
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackBarSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
export default Exercises;

import { getAllLessons } from "../../../redux/lessonSlice";
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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import ModalExerciceAdd from "../../../components/modalExerciceAdd/ModalExerciceAdd";
import { LessonInterface } from "@/interfaces/LessonInterface";
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
  //lessons
  const [lessons, setLessons] = useState<LessonInterface[]>([]);
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
  //the questions types to be actually displayed
  const displayedTypes = questionTypes.slice(startIndex, endIndex);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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
  const handleSnackbarOpen = (message: string) => {
    setSnackbarMessage(message);
    setSnackBarOpen(true);
  };
  //closing the add modal
  const handleClose = () => setOpen(false);
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
        justifyContent={"space-between"}
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
        lessons={lessons}
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
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
export default Exercises;

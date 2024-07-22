import { getAllLessons } from "../../../redux/lessonSlice";
import QuestionTypes from "../../../constants";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Pagination,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import ModalExerciceAdd from "../../../components/modalExerciceAdd/ModalExerciceAdd";
import { LessonInterface } from "@/interfaces/LessonInterface";
import { AppDispatch } from "@/redux/Store";
import { refreshTokenService } from "@/services/authService";
import { useNavigate } from "react-router-dom";
const Exercises: React.FC = () => {
  const questionTypes = QuestionTypes();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedTypeImage, setSelectedTypeImage] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState("");
  const [lessons, setLessons] = useState<LessonInterface[]>([]);
  const itemPerpage = 6;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemPerpage);
  const [page, setPage] = useState(1);
  const displayedTypes = questionTypes.slice(startIndex, endIndex);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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

  const handleOpen = (image: string, id: string) => {
    setSelectedTypeId(id);
    setSelectedTypeImage(image);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const getLessons = async () => {
    const result = await dispatch(getAllLessons());
    if (getAllLessons.fulfilled.match(result)) {
      setLessons(result.payload as LessonInterface[]);
    } else {
      console.error("Failed to fetch lessons");
    }
  };

  

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
    </>
  );
};
export default Exercises;

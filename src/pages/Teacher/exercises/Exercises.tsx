import { getAllLessons } from "../../../redux/lessonSlice";
import QuestionTypes from "../../../constants";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UseDispatch, useDispatch } from "react-redux";
import { AppDispatch } from "@/src/redux/Store";
const Exercises: React.FC = () => {
  const questionTypes = QuestionTypes();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedTypeImage, setSelectedTypeImage] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState("");
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%", // Default to 90% of the screen width
    maxWidth: 600, // Maximum width for larger screens
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const itemPerpage = 6;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemPerpage);
  const [page, setPage] = useState(1);
  const displayedTypes = questionTypes.slice(startIndex, endIndex);
  const dispatch = useDispatch<AppDispatch>();

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
    const data = await dispatch(getAllLessons());
    console.log(data.payload.data.data);
  };

  useEffect(() => {
    // getLessons();
    // getLessons();

    console.log("get lessons");
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
          onClick={async () => {
            await getLessons();
          }}
        >
          {t("txt_add_an_exercise")}
        </Button>

        <Button variant="contained">{t("txt_consult_an_exercise")}</Button>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <img src={selectedTypeImage} alt="" />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedTypeId}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField placeholder="name"></TextField>
            </Typography>
          </form>{" "}
        </Box>
      </Modal>
      <Pagination
        count={Math.ceil(questionTypes.length / itemPerpage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />
    </>
  );
};
export default Exercises;

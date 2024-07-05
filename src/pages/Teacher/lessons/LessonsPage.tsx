import { LessonInterface } from "../../..//interfaces/LessonInterface";
import { AppDispatch } from "../../..//redux/Store";
import { getAllLessons } from "../../../redux/lessonSlice";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const LessonsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [lessons, setLessons] = useState<LessonInterface[]>([]);

  const getLessons = () => {
    const data = dispatch(getAllLessons());
    if (getAllLessons.fulfilled.match(data)) {
      setLessons(data.payload as LessonInterface[]);
    }
  };
  useEffect(() => {
    getLessons();
  }, []);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
      sx={{ width: "100%", height: "100%" }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell align="right">content</TableCell>
              <TableCell align="right">chapitreId</TableCell>
              <TableCell align="right">description</TableCell>
              <TableCell align="right">isLocked</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lessons.map((lesson) => (
              <TableRow
                key={lesson.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {lesson.name}
                </TableCell>
                <TableCell align="right">{lesson.content}</TableCell>
                <TableCell align="right">{lesson.chapitreId}</TableCell>
                <TableCell align="right">{lesson.description}</TableCell>
                <TableCell align="right">{lesson.isLocked}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LessonsPage;

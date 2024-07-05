import React, { useState } from "react";
import {
  Select,
  MenuItem,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Modal,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { LessonInterface } from "@/src/interfaces/LessonInterface";
interface ModalExerciceAddProps {
  lessons: LessonInterface[];
  open: boolean;
  handleClose: () => void;
  selectedTypeImage: string;
  selectedTypeId: string;
}
const ModalExerciceAdd: React.FC<ModalExerciceAddProps> = ({
  lessons,
  open,
  handleClose,
  selectedTypeImage,
  selectedTypeId,
}) => {
  const { t } = useTranslation();
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
  return (
    <>
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
            <FormControl fullWidth className="!mt-[15px]">
              <InputLabel>{t("txt_lesson")}</InputLabel>

              <Select
                // value={age}
                label={t("txt_lesson")}
                placeholder={t("txt_lesson")}
                className="w-full"
                // onChange={handleChange}
              >
                {lessons.map((lesson) => {
                  return <MenuItem> {lesson.name} </MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth className="!mt-[15px]">
              <TextField
                placeholder={t("txt_name")}
                className="!w-full"
              ></TextField>
            </FormControl>
            <FormControl className="!mt-[15px]">
              <h3>Options to be completed</h3>
            </FormControl>
          </form>{" "}
        </Box>
      </Modal>
    </>
  );
};

export default ModalExerciceAdd;

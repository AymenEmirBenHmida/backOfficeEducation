import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Skeleton,
  CircularProgress,
  Select,
  MenuItem,
  Input,
  Box,
  FormControl,
  FormLabel,
  InputLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "@/redux/Store";
import { useDispatch } from "react-redux";
import { createLesson, getAllLessons, getLesson } from "@/redux/lessonSlice";
import { getAllChapters } from "@/redux/chaptersSlice";
import { LessonUpdateProps } from "@/interfaces/LessonCrudProps";

const AddLessons: React.FC<LessonUpdateProps> = ({
  handleSubmit,
  handleError,
  getLessons,
}) => {
  const { t } = useTranslation();
  //state variable responsible for the images files
  const [images, setImages] = useState<any[]>([]);
  //state variable responsible for the videos files
  const [videos, setVideos] = useState<any[]>([]);
  //state variable responsible for the audio files
  const [audio, setAudio] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({
    name: "",
    content: "",
    chapitre: "",
    chapitreId: "",
    description: "",
    isLocked: false,
    images: [""],
    video: "",
    audio: "",
  });
  const [chapters, setChapters] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreatelesson = async () => {
    try {
      setUpdateLoading(true);
      const response = await dispatch(
        createLesson({
          formData: formData,
          images: images,
        })
      ).unwrap();
      setUpdateLoading(false);
      if (response && response.statusText === "OK") {
        console.log("response create ", response);
        handleSubmit!();
        await getLessons();
      } else {
        handleError!("error");
      }
    } catch (error) {
      handleError!("error");
      console.log(error);
    }
  };

  const getChapters = async () => {
    try {
      const result = await dispatch(getAllChapters()).unwrap();
      console.log("chapters :", result);
      setChapters(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  //function handeling setting the image files selected to be manipulated
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log("images inputted");
      setImages(Array.from(event.target.files));
    }
  };
  //function handeling setting the audio files selected to be manipulated
  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log("audio files inputted");
      setAudio(Array.from(event.target.files));
    }
  };
  //function handeling setting the video files selected to be manipulated
  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log("videos inputted");
      setVideos(Array.from(event.target.files));
    }
  };
  useEffect(() => {
    getChapters();
    setChapters([]);
    console.log("entered use effect");
  }, []);

  return (
    <>
      {loading ? (
        <>
          {" "}
          <Skeleton className="!mb-2" />
          <Skeleton className="!mb-2" animation="wave" />
          <Skeleton className="!mb-2" />
          <Skeleton className="!mb-2" />
          <Skeleton className="!mb-2" />
        </>
      ) : (
        <>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {t("txt_course")}
            </InputLabel>
            <Select
              value={formData.courId}
              label={t("txt_course")}
              onChange={(e) => {
                console.log("lesson id", e.target.value);
                handleFormChange("chapitreId", e.target.value);
              }}
              className="w-full"
            >
              {chapters.map((chapter) => (
                <MenuItem key={chapter.id} value={chapter.id}>
                  {chapter.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className="!mt-[15px]"
            label={t("txt_description")}
            value={formData.description}
            onChange={(e) => handleFormChange("description", e.target.value)}
            fullWidth
          />
          <TextField
            label={t("txt_name")}
            value={formData.name}
            onChange={(e) => handleFormChange("name", e.target.value)}
            fullWidth
            className="!mt-[15px]"
          />
          <TextField
            label={t("txt_content")}
            value={formData.content}
            onChange={(e) => handleFormChange("content", e.target.value)}
            fullWidth
            className="!mt-[15px]"
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <FormControl className="!mt-[5px]" fullWidth>
              <FormLabel>{t("txt_images")}</FormLabel>
              <input
                type="file"
                multiple
                accept=".jpg, .jpeg, .png .mp4, .avi, .mov .mp3, .wav .pdf .txt"
                onChange={handleImageChange}
                className="!mt-[15px]"
                style={{ marginTop: "8px", marginBottom: "8px" }}
              />
            </FormControl>
            {/* 
            <FormControl fullWidth>
              <FormLabel>Videos</FormLabel>
              <input
                type="file"
                multiple
                accept=".mp4, .avi, .mov"
                onChange={handleVideoChange}
                className="!mt-[15px]"
                style={{ marginTop: "8px", marginBottom: "8px" }}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Audios</FormLabel>
              <input
                type="file"
                multiple
                accept=".mp3, .wav"
                onChange={handleAudioChange}
                className="!mt-[15px]"
                style={{ marginTop: "8px", marginBottom: "8px" }}
              />
            </FormControl> */}
          </Box>
          <FormControlLabel
            className="!mt-[15px]"
            control={
              <Checkbox
                value={formData.isLocked}
                checked={formData.isLocked}
                onChange={(e) => handleFormChange("isLocked", e.target.checked)}
              />
            }
            label={t("txt_locked")}
          />
          <Button
            className="!mt-[15px]"
            variant="contained"
            color="primary"
            onClick={async () => {
              console.log(formData);
              await handleCreatelesson();
            }}
          >
            {updateLoading ? (
              <CircularProgress sx={{ color: "white" }} size={30} />
            ) : (
              t("txt_submit")
            )}
          </Button>
        </>
      )}
    </>
  );
};

export default AddLessons;

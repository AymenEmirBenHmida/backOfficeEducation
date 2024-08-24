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
  Box,
  FormControl,
  FormLabel,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "@/redux/Store";
import { useDispatch } from "react-redux";
import { createLesson } from "@/redux/lessonSlice";
import { getAllChapters } from "@/redux/chaptersSlice";
import { LessonUpdateProps } from "@/interfaces/LessonCrudProps";
import { createCourInputSchema, validateCourInput } from "@/zod/cour";
import { z } from "zod";
import { CiCircleRemove } from "react-icons/ci";

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
  //state variable for form validation
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<any>({
    name: "",
    content: "",
    chapitre: "",
    chapitreId: "",
    description: "",
    isLocked: false,
    images: [],
    video: "",
    audio: "",
  });
  //chaptres
  const [chapters, setChapters] = useState<any>([]);
  //initial loading variable
  const [loading, setLoading] = useState(false);
  //state variable used to manage adding newImages
  const [addImageText, setAddImageText] = useState("");
  //loading variable for updating
  const [updateLoading, setUpdateLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  //form variable editing first level attribute
  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
  //cerating a lesson
  const handleCreatelesson = async () => {
    try {
      const createCourValidation = await validateCourInput({
        ...formData,
        images: [
          ...formData.images,
          ...images.map((image: any) => String(image)),
        ],
      });
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
        handleError!(t("txt_success"), true);
        handleSubmit!();
        await getLessons();
      } else {
        handleError!(t("txt_error"), false);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const newErrors = error.errors.reduce((acc: any, curr: any) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        console.log(newErrors);
        setErrors(newErrors);
      } else {
        handleError!(t("txt_error"), false);
        console.log(error);
      }
    }
  };
  //function responsible for removing the selected image
  const removeImage = (image: string) => {
    const revisedImages = formData.images.filter(
      (item: string) => item !== image
    );
    setFormData((prev: any) => ({
      ...prev,
      ["images"]: [...revisedImages],
    }));
  };
  //on pressing enter the new image will be added
  const handleKeyDownImage = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setFormData((prev: any) => ({
        ...prev,
        ["images"]: [...prev.images, addImageText],
      }));
    }
  };
  //getting chapters
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
          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">
              {t("txt_course")}
            </InputLabel>
            <Select
              error={!!errors.chapitreId}
              value={formData.chapitreId}
              label={t("txt_course")}
              onChange={(e) => {
                console.log("chapter id", e.target.value);
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
            {errors.chapitreId && (
              <FormHelperText sx={{ color: "red" }}>
                {errors.chapitreId}
              </FormHelperText>
            )}
          </FormControl>
          <TextField
            required
            label={t("txt_name")}
            value={formData.name}
            onChange={(e) => handleFormChange("name", e.target.value)}
            fullWidth
            className="!mt-[15px]"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            className="!mt-[15px]"
            label={t("txt_description")}
            value={formData.description}
            onChange={(e) => handleFormChange("description", e.target.value)}
            fullWidth
            error={!!errors.description}
            helperText={errors.description}
          />

          <TextField
            label={t("txt_content")}
            value={formData.content}
            onChange={(e) => handleFormChange("content", e.target.value)}
            fullWidth
            className="!mt-[15px]"
            required
            error={!!errors.content}
            helperText={errors.content}
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
              <FormLabel>{t("txt_images") + " *"}</FormLabel>
              {formData.images.map((image: string) => {
                return (
                  <div
                    style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
                  >
                    {image.substring(0, 100)}
                    <Button
                      onClick={() => {
                        removeImage(image);
                      }}
                      startIcon={<CiCircleRemove></CiCircleRemove>}
                    ></Button>
                  </div>
                );
              })}
              <TextField
                label={t("txt_new_images")}
                value={addImageText}
                onKeyDown={handleKeyDownImage}
                onChange={(e) => setAddImageText(e.target.value)}
                fullWidth
                className="!mt-[15px]"
              />
              {t("txt_or")}
              <input
                type="file"
                multiple
                accept=".jpg, .jpeg, .png .mp4, .avi, .mov .mp3, .wav .pdf .txt"
                onChange={handleImageChange}
                className="!mt-[15px]"
                style={{ marginTop: "8px", marginBottom: "8px" }}
              />
              {errors.images && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.images}
                </FormHelperText>
              )}
            </FormControl>
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

import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Skeleton,
  CircularProgress,
  Typography,
  Select,
  MenuItem,
  FormLabel,
  FormControl,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "@/redux/Store";
import { useDispatch } from "react-redux";
import { updatExercice } from "@/redux/exerciceSlice";
import { getLesson, updatLesson } from "@/redux/lessonSlice";
import { getAllChapters } from "@/redux/chaptersSlice";
import { LessonUpdateProps } from "@/interfaces/LessonCrudProps";
import { CiCircleRemove } from "react-icons/ci";

const UpdateLesson: React.FC<LessonUpdateProps> = ({
  handleSubmit,
  selectedLessonId,
  handleError,
  getLessons,
}) => {
  const { t } = useTranslation();
  //the variable responsible for the inputs
  const [formData, setFormData] = useState<any>({
    id: "",
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
  //the chapters gotten from the backend
  const [chapters, setChapters] = useState([]);
  //variable responsible for the initial loading of info
  const [loading, setLoading] = useState(true);
  //variable responsible the update loading
  const [updateLoading, setUpdateLoading] = useState(false);
  //responsible for showing the add image input
  const [addImageHidden, setAddImageHidden] = useState(true);
  //state variable used to manage adding newImages
  const [addImageText, setAddImageText] = useState("");
  //state variable responsible for the images actually being handled
  const [images, setImages] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  //handles the change to form variables direct attributes
  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
  //handles the update of the Lesson
  const handleUpdateLesson = async () => {
    try {
      const data = cleanFormData(formData);
      setUpdateLoading(true);
      const response = await dispatch(
        updatLesson({ formData: data, images: images })
      ).unwrap();
      setUpdateLoading(false);
      if (response && response.statusText === "OK") {
        console.log("response update ", response);
        handleSubmit!();
        await getLessons();
      } else {
        handleError!("error");
      }
    } catch (error) {
      handleError!("error");
      console.error(error);
    }
  };
  // getting the lesson to be updated
  const handleGetLesson = async () => {
    try {
      const response = await dispatch(getLesson(selectedLessonId));
      setFormData(response.payload.data);
      console.log(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  //remove unnecessary attributes gotten initially from the get
  //exercice
  const cleanFormData = (data: any) => {
    const {
      cour, // Add the attributes you want to remove
      createById,
      createdAt,
      updatedAt,
      ...cleanedData
    } = data;
    return cleanedData;
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
  //on pressing enter the new image will be added
  const handleKeyDownImage = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setAddImageHidden(true);
      setFormData((prev: any) => ({
        ...prev,
        ["images"]: [...prev.images, addImageText],
      }));
    }
  };
  //function handeling setting the image files selected to be manipulated
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log("images inputted");
      setImages(Array.from(event.target.files));
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
  //initial functions called
  useEffect(() => {
    handleGetLesson();
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {formData.name}
          </Typography>
          <Select
            value={formData.chapitreId}
            label={t("txt_lesson")}
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
          <div
            style={{ maxWidth: "100%", padding: "10px", overflow: "hidden" }}
          >
            <FormLabel>{t("txt_images")}</FormLabel>
            {formData.images.map((image: string) => {
              return (
                <div style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
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
          </div>
          <div style={{ display: addImageHidden ? "none" : "" }}>
            <TextField
              label={t("txt_new_images")}
              value={addImageText}
              onKeyDown={handleKeyDownImage}
              onChange={(e) => setAddImageText(e.target.value)}
              fullWidth
              className="!mt-[15px]"
            />
            Or
            <FormControl className="!mt-[5px]" fullWidth>
              <input
                type="file"
                multiple
                accept=".jpg, .jpeg, .png .mp4, .avi, .mov .mp3, .wav .pdf .txt"
                onChange={handleImageChange}
                className="!mt-[15px]"
                style={{ marginTop: "8px", marginBottom: "8px" }}
              />
            </FormControl>
          </div>
          <Button
            className="!mt-[15px]"
            onClick={() => {
              setAddImageHidden(!addImageHidden);
            }}
          >
            A{t("txt_add_image")}
          </Button>
          {/* {JSON.stringify(formData.images)} */}
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
              await handleUpdateLesson();
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

export default UpdateLesson;
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
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "@/redux/Store";
import { useDispatch } from "react-redux";
import { getChapter, updateChapter } from "@/redux/chaptersSlice";
import { ChapterUpdateProps } from "@/interfaces/chaptersCrudInterface";
import { getAllSubjects } from "@/redux/subjectsSlice";
import { z } from "zod";
import { createChapterInputSchema } from "@/zod/chapitre";

const AddLessons: React.FC<ChapterUpdateProps> = ({
  handleSubmit,
  handleError,
  getChapters,
  chapterId,
}) => {
  const { t } = useTranslation();
  //the form state variable
  const [formData, setFormData] = useState<any>({
    name: "",
    description: "",
    matiereId: "",
    isLocked: false,
  });
  //state variable for form validation
  const [errors, setErrors] = useState<any>({});
  //list of subjects
  const [subjects, setSubjects] = useState([]);
  //used when the initial loading is done
  const [loading, setLoading] = useState(true);
  //used when the update is happening
  const [updateLoading, setUpdateLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  // change form state variables direct attribute
  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
  //update chapter
  const handleUpdateChapter = async () => {
    try {
      const createChapterValidation = await createChapterInputSchema();
      createChapterValidation.parse(formData);
      setUpdateLoading(true);
      const response = await dispatch(
        updateChapter({
          formData: formData,
          id: chapterId,
        })
      ).unwrap();
      setUpdateLoading(false);
      if (response && response.statusText === "OK") {
        handleError!(t("txt_success"), true);
        console.log("response create ", response);
        handleSubmit!();
        await getChapters();
      } else {
        handleError!(t("txt_error"), false);
      }
    } catch (error) {
      console.log("error help");
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const newErrors = error.errors.reduce((acc: any, curr: any) => {
          acc[curr.path[0]] = curr.message;
          console.log(acc.message);
          return acc;
        }, {});
        setErrors(newErrors);
      } else {
        handleError!(t("txt_error"), false);
        console.log(error);
      }
    }
  };
  //getting subjects
  const getSubjects = async () => {
    try {
      const result = await dispatch(getAllSubjects()).unwrap();
      console.log("chapters :", result);

      setSubjects(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  //get the chosen chapters data to be modified
  const getChapterUpdate = async () => {
    try {
      setLoading(true);
      const result = await dispatch(getChapter(chapterId)).unwrap();
      console.log("chapters :", result);
      setFormData(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubjects();
    getChapterUpdate();
    console.log("entered use effect");
  }, []);

  return (
    <>
      {loading ? (
        <>
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
              {t("txt_subject")}
            </InputLabel>
            <Select
              value={formData.matiereId}
              label={t("txt_subject")}
              error={!!errors.matiereId}
              onChange={(e) => {
                console.log("matiereId", e.target.value);
                handleFormChange("matiereId", e.target.value);
              }}
              className="w-full"
            >
              {subjects.map((subject) => (
                <MenuItem key={subject.id} value={subject.id}>
                  {subject.name}
                </MenuItem>
              ))}
            </Select>
            {errors.matiereId && (
              <FormHelperText sx={{ color: "red" }}>
                {errors.matiereId}
              </FormHelperText>
            )}
          </FormControl>
          <TextField
            required
            label={t("txt_name")}
            value={formData.name}
            error={!!errors.name}
            helperText={errors.name}
            onChange={(e) => handleFormChange("name", e.target.value)}
            fullWidth
            className="!mt-[15px]"
          />
          <TextField
            className="!mt-[15px]"
            label={t("txt_description")}
            value={formData.description}
            onChange={(e) => handleFormChange("description", e.target.value)}
            fullWidth
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          ></Box>
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
              await handleUpdateChapter();
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

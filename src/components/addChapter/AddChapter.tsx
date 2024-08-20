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
import { createChapter } from "@/redux/chaptersSlice";
import { ChapterCreationProps } from "@/interfaces/chaptersCrudInterface";
import { getAllSubjects } from "@/redux/subjectsSlice";
import { createChapterInputSchema } from "@/zod/chapitre";
import { z } from "zod";

const AddChapter: React.FC<ChapterCreationProps> = ({
  handleSubmit,
  handleError,
  getChapters,
}) => {
  const { t } = useTranslation();
  //the form state variable
  const [formData, setFormData] = useState<any>({
    name: "",
    description: "",
    matiereId: "",
    isLocked: false,
    estTermine: false,
  });
  //list of subjects
  const [subjects, setSubjects] = useState([]);
  //used on initial loading
  const [loading, setLoading] = useState(false);
  //state variable for form validation
  const [errors, setErrors] = useState<any>({});
  //used when updating database
  const [updateLoading, setUpdateLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  //change formData direct attribute
  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
  //create chapter
  const handleCreateChapter = async () => {
    try {
      const createChapterValidation = await createChapterInputSchema();
      createChapterValidation.parse(formData);
      setUpdateLoading(true);
      const response = await dispatch(
        createChapter({
          formData: formData,
        })
      ).unwrap();
      setUpdateLoading(false);
      if (response && response.statusText === "OK") {
        console.log("response create ", response);
        handleSubmit!();
        await getChapters();
      } else {
        handleError!("error");
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
        handleError!("error");
        console.log(error);
      }
    }
  };
  //getting list of subjects
  const getSubjects = async () => {
    try {
      const result = await dispatch(getAllSubjects()).unwrap();
      console.log("chapters :", result);

      setSubjects(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubjects();
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
              error={!!errors.matiereId}
              label={t("txt_subject")}
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
            label={t("txt_name")}
            required
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
            error={!!errors.description}
            helperText={errors.description}
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
          <FormControl error={!!errors.estTermine}>
            <FormControlLabel
              className="!mt-[15px]"
              control={
                <Checkbox
                  value={formData.estTermine}
                  checked={formData.estTermine}
                  onChange={(e) =>
                    handleFormChange("estTermine", e.target.checked)
                  }
                />
              }
              label={t("txt_completed")}
            />
            {errors.estTermine && (
              <FormHelperText>{errors.estTermine}</FormHelperText>
            )}
          </FormControl>
          <Button
            className="!mt-[15px]"
            variant="contained"
            color="primary"
            onClick={async () => {
              console.log(formData);
              await handleCreateChapter();
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

export default AddChapter;

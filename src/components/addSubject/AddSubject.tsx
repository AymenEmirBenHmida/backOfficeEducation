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
import { createSubject } from "@/redux/subjectsSlice";
import { getAllTrimesters } from "@/redux/trimesterSlice";
import { SubjectCreationProps } from "@/interfaces/subjectsCrudInterface";
import { z } from "zod";
import { createSubjectInputSchema } from "@/zod/matiere";
import { Subject } from "@/interfaces/Subject";
import { Trimester } from "@/interfaces/Trimester";

const AddSubject: React.FC<SubjectCreationProps> = ({
  handleSubmit,
  handleError,
  getSubjects,
}) => {
  const { t } = useTranslation();
  //the form state variable
  const [formData, setFormData] = useState<Subject>({
    name: "",
    description: "",
    trimestreId: "",
    isLocked: false,
  });
  //list of subjects
  const [trimesters, setTrimesters] = useState<Trimester[]>([]);
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
  //create a subject
  const handleCreateSubject = async () => {
    try {
      const createSubejctValidation = await createSubjectInputSchema();
      createSubejctValidation.parse(formData);
      setUpdateLoading(true);
      const response = await dispatch(
        createSubject({
          formData: formData,
        })
      ).unwrap();
      setUpdateLoading(false);
      if (response && response.statusText === "OK") {
        handleError!(t("txt_success"), true);
        console.log("response create ", response);
        handleSubmit!();
        await getSubjects();
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
        setErrors(newErrors);
      } else {
        handleError!(t("txt_error"), false);
        console.log(error);
      }
    }
  };
  //getting list of subjects
  const getTrimesters = async () => {
    try {
      const result = await dispatch(getAllTrimesters()).unwrap();
      console.log("subjects :", result);

      setTrimesters(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrimesters();
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
              {t("txt_trimester")}
            </InputLabel>
            <Select
              value={formData.trimestreId}
              label={t("txt_trimester")}
              error={!!errors.trimestreId}
              onChange={(e) => {
                console.log("trimestreId", e.target.value);
                handleFormChange("trimestreId", e.target.value);
              }}
              className="w-full"
            >
              {trimesters.map((trimester) => (
                <MenuItem key={trimester.id} value={trimester.id}>
                  {trimester.name}
                </MenuItem>
              ))}
            </Select>
            {errors.trimestreId && (
              <FormHelperText sx={{ color: "red" }}>
                {errors.trimestreId}
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
            error={!!errors.description}
            helperText={errors.description}
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
              await handleCreateSubject();
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

export default AddSubject;

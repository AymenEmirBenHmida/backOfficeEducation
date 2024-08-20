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
import { getTrimester, updateTrimester } from "@/redux/trimesterSlice";

import { TrimesterUpdateProps } from "@/interfaces/trimestersCrudInterface";
import { getAllLevels } from "@/redux/levelSlice";
import { createTrimesterInputSchema } from "@/zod/trimestre";
import { z } from "zod";

const UpdateTrimester: React.FC<TrimesterUpdateProps> = ({
  handleSubmit,
  handleError,
  getTrimesters,
  trimesterId,
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
  const [levels, setLevels] = useState([]);
  //state variable for form validation
  const [errors, setErrors] = useState<any>({});
  //used on initial loading
  const [loading, setLoading] = useState(true);
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
  //leave out unnecessary attributes
  const cleanFormData = (data: any) => {
    const { niveau, ...cleanedData } = data;
    return cleanedData;
  };
  //update the subject
  const handleUpdateSubject = async () => {
    try {
      const craeteTrimesterSchema = await createTrimesterInputSchema();
      craeteTrimesterSchema.parse(formData);
      setUpdateLoading(true);
      const data = cleanFormData(formData);
      console.log("data ", data);
      const response = await dispatch(
        updateTrimester({ id: trimesterId, formData: data })
      ).unwrap();
      setUpdateLoading(false);
      if (response && response.statusText === "OK") {
        console.log("response create ", response);
        handleSubmit!();
        await getTrimesters();
      } else {
        handleError!("error");
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
        handleError!("error");
        console.log(error);
      }
    }
  };
  //getting list of subjects
  const getLevels = async () => {
    try {
      const result = await dispatch(getAllLevels()).unwrap();
      console.log("levels :", result);
      setLevels(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  //getting the subject to be
  const getTrimesterUpdate = async () => {
    try {
      const response = await dispatch(getTrimester(trimesterId));
      setFormData(response.payload.data);
      console.log(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getLevels();
    getTrimesterUpdate();
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
              {t("txt_level")}
            </InputLabel>
            <Select
              value={formData.niveauId}
              error={!!errors.niveauId}
              label={t("txt_level")}
              onChange={(e) => {
                console.log("niveauId", e.target.value);
                handleFormChange("niveauId", e.target.value);
              }}
              className="w-full"
            >
              {levels.map((level) => (
                <MenuItem key={level.id} value={level.id}>
                  {level.name}
                </MenuItem>
              ))}
            </Select>
            {errors.niveauId && (
              <FormHelperText sx={{ color: "red" }}>
                {errors.niveauId}
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
            label={t("txt_slug")}
            required
            value={formData.slug}
            error={!!errors.slug}
            helperText={errors.slug}
            onChange={(e) => handleFormChange("slug", e.target.value)}
            fullWidth
          />
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
              await handleUpdateSubject();
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

export default UpdateTrimester;

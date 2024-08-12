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
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "@/redux/Store";
import { useDispatch } from "react-redux";
import { createTrimester, getAllTrimesters } from "@/redux/trimesterSlice";
import { getAllLevels } from "@/redux/levelSlice";
import { TrimesterCreationProps } from "@/interfaces/trimestersCrudInterface";

const AddTrimester: React.FC<TrimesterCreationProps> = ({
  handleSubmit,
  handleError,
  getTrimesters,
}) => {
  const { t } = useTranslation();
  //the form state variable
  const [formData, setFormData] = useState<any>({
    name: "",
    slug: "",
    levelId: "",
    isLocked: false,
  });
  //list of levels
  const [levels, setLevels] = useState([]);
  //used on initial loading
  const [loading, setLoading] = useState(false);
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
  const handleCreateTrimester = async () => {
    try {
      setUpdateLoading(true);
      const response = await dispatch(
        createTrimester({
          formData: formData,
        })
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
      handleError!("error");
      console.log(error);
    }
  };
  //getting list of levels
  const getLevels = async () => {
    try {
      const result = await dispatch(getAllLevels()).unwrap();
      console.log("levels :", result);
      setLevels(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLevels();
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {t("txt_trimester")}
            </InputLabel>
            <Select
              value={formData.niveauId}
              label={t("txt_trimester")}
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
          </FormControl>
          <TextField
            label={t("txt_name")}
            value={formData.name}
            onChange={(e) => handleFormChange("name", e.target.value)}
            fullWidth
            className="!mt-[15px]"
          />
          <TextField
            className="!mt-[15px]"
            label={t("txt_slug")}
            value={formData.slug}
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
              await handleCreateTrimester();
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

export default AddTrimester;

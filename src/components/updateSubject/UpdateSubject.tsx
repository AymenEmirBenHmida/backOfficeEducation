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
import { createSubject, getSubject, updatSubject } from "@/redux/subjectsSlice";
import { getAllTrimesters } from "@/redux/trimesterSlice";
import {
  SubjectCreationProps,
  SubjectUpdateProps,
} from "@/interfaces/subjectsCrudInterface";

const UpdateSubject: React.FC<SubjectUpdateProps> = ({
  handleSubmit,
  handleError,
  getSubjects,
  subjectId,
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
  const [trimesters, setTrimesters] = useState([]);
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
    const { trimestre, chapitres, ...cleanedData } = data;
    return cleanedData;
  };
  //update the subject
  const handleUpdateSubject = async () => {
    try {
      setUpdateLoading(true);
      const data = cleanFormData(formData);
      console.log("data ", data);
      const response = await dispatch(
        updatSubject({ id: subjectId, formData: data })
      ).unwrap();
      setUpdateLoading(false);
      if (response && response.statusText === "OK") {
        console.log("response create ", response);
        handleSubmit!();
        await getSubjects();
      } else {
        handleError!("error");
      }
    } catch (error) {
      handleError!("error");
      console.log(error);
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
  //getting the subject to be
  const getSubjectUpdate = async () => {
    try {
      const response = await dispatch(getSubject(subjectId));
      setFormData(response.payload.data);
      console.log(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getTrimesters();
    getSubjectUpdate();
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
              value={formData.trimestreId}
              label={t("txt_trimester")}
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
          >
            {/* <FormControl className="!mt-[5px]" fullWidth>
              <FormLabel>{t("txt_images")}</FormLabel>
              <input
                type="file"
                multiple
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
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

export default UpdateSubject;

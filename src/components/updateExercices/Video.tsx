import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Skeleton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  ExerciceCreationProps,
  ExerciceUpdateProps,
} from "@/interfaces/ExerciceCreationProps";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/Store";
import { getExercice, updatExercice } from "@/redux/exerciceSlice";

const Video: React.FC<ExerciceUpdateProps> = ({
  selectedExerciceId,
  handleSubmit,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<any>({
    typeQuestion: "",
    content: {
      text: "",
      image: "",
    },
    courId: "",
    description: "",
    isLocked: false,
  });
  const [loading, setLoading] = useState(true);
  const handleContentChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }));
  };
  const handleFormChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleUpdateExercice = async () => {
    const response = await dispatch(
      updatExercice({ formData, id: selectedExerciceId })
    );
    console.log("response update ", response);
  };

  const handleGetExercice = async () => {
    try {
      const response = await dispatch(getExercice(selectedExerciceId));
      setFormData(response.payload.data);
      console.log(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetExercice();
    console.log("entered use effect");
  }, []);

  return (
    <>
      {loading ? (
        <>
          {" "}
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </>
      ) : (
        <>
          <TextField
            label={t("txt_text")}
            value={formData.content.text || ""}
            onChange={(e) => handleContentChange("text", e.target.value)}
            fullWidth
            className="!mt-[15px]"
          />
          <TextField
            label={t("txt_link")}
            value={formData.content.text || ""}
            onChange={(e) => handleContentChange("link", e.target.value)}
            fullWidth
            className="!mt-[15px]"
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
            variant="contained"
            color="primary"
            onClick={async () => {
              console.log(formData);
              await handleUpdateExercice();
            }}
            className="!mt-[15px]"
          >
            {t("txt_submit")}
          </Button>
        </>
      )}
    </>
  );
};

export default Video;

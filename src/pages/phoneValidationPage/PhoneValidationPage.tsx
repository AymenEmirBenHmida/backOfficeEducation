import {
  Box,
  Button,
  Card,
  CircularProgress,
  TextField,
} from "@mui/material";
import telephoneSvg from "/images/telephone-svgrepo-com.svg";
import { activateUser, selectUserInfo } from "../../redux/adminSlice";
import { AppDispatch } from "../../redux/Store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const PhoneValidationPage: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState("");
  //used to see what the current status for the submit
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  //hancle chane in the input of the code
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(event.target.value);
  };
  //function called on submitting
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const userInfo = useSelector(selectUserInfo);
    try {
      setIsSubmitting(true);
      const response = await dispatch(
        activateUser({
          email: userInfo.email!,
          phone: userInfo.phone!,
          password: userInfo.password!,
          verificationCode: verificationCode,
        })
      );
      console.log(response);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="bg-[#fffff] h-[90vh] w-full relative flex items-center justify-center">
        <div className="max-w-[600px] w-full">
          <Card
            sx={{ backgroundColor: "#eeee", padding: "2em" }}
            variant="outlined"
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignContent={"center"}
              alignItems={"center"}
            >
              <h1 className="text-xl font-bold mb-[15px]">
                {t("txt_phone_verification")}
              </h1>
              <img src={telephoneSvg} className="w-1/4" alt="" />
              <form onSubmit={submit} className="!mt-[30px]">
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {" "}
                  <TextField
                    className="!bg-white !h-[55px]"
                    type="number"
                    id="outlined-basic"
                    label={t("txt_code")}
                    variant="outlined"
                    name="verifCodeInput"
                    onChange={handleChange}
                  />
                  <Button
                    className="!h-[55px]"
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {" "}
                    {isSubmitting ? (
                      <CircularProgress size={24} />
                    ) : (
                      t("txt_verify")
                    )}
                  </Button>
                </Box>
              </form>
            </Box>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PhoneValidationPage;

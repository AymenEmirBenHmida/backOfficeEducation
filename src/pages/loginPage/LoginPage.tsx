import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  CircularProgress,
} from "@mui/material";
import logoSvg from "/images/school-svgrepo-com.svg";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/Store";
import { loginUser } from "../../redux/adminSlice";
import { FormData } from "../../interfaces/FormData";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import SnackAlert from "../../components/snackAlert/SnackAlert";
import { Link, useNavigate } from "react-router-dom";
import { selectUserRole } from "../../redux/adminSlice";

const LogingPage: React.FC = ({}) => {
  //to navigate
  const navigate = useNavigate();
  //use for translation
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const userRole = useSelector(selectUserRole);

  //variables used to open and close the snack bar message
  const [open, setOpen] = useState(false);

  //function used to open and close the snack bar message
  const handleErreur = () => {
    setOpen(!open);
  };
  //figure out wether the value is email or password
  const validateIdentifier = (value: string | undefined) => {
    if (typeof value !== "string")
      return t("txt_login_credential_email_phone_validation_message");

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isPhone = /^\d{8}$/.test(value);
    if (isEmail || isPhone) return true;
    return t("txt_login_credential_email_phone_validation_message");
  };
  // library that help with handeling forms
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  // login the user
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!data.identifier) {
      alert("Identifier (email or phone) is required.");
      return;
    }
    const requestBody = {
      identifier: data.identifier,
      password: data.password,
    };
    const loginResponse = await dispatch(loginUser(requestBody));

    if (loginResponse.payload?.status === "OK") {
      //saving refresh token
      localStorage.setItem(
        "refreshToken",
        loginResponse.payload.data.refreshToken
      );
      //saving accessToken
      localStorage.setItem(
        "accessToken",
        loginResponse.payload.data.accessToken
      );
    } else {
      handleErreur();
      return;
    }
  };
  useEffect(() => {
    if (userRole === "Teacher") navigate("/teacher/exercises");
  }, [userRole]);

  return (
    <>
      <div className="bg-[#fffff] h-[90vh] w-full relative flex items-center justify-center">
        <div className="max-w-[900px] w-full">
          <Card
            sx={{ backgroundColor: "#eeee", padding: "2em" }}
            variant="outlined"
          >
            <div></div>
            <h1 className="m-0 text-2xl font-semibold leading-1.3 pb-15">
              {t("txt_login_account")}
            </h1>
            <CardContent>
              <Grid container rowSpacing={1} spacing={2}>
                <form
                  className="xs:w-full sm:w-full md:w-1/2"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Grid item>
                    <h2 className="mb-[5px] font-bold">
                      {t("txt_login_credential_email_phone")}
                    </h2>
                    <Controller
                      name="identifier"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: t(
                          "txt_login_credential_email_phone_validation_message"
                        ),
                        validate: validateIdentifier,
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          id="outlined-basic"
                          label={t("txt_login_credential_email_phone")}
                          variant="outlined"
                          sx={{ backgroundColor: "white" }}
                          error={!!errors.name}
                          helperText={
                            errors.identifier ? errors.identifier.message : ""
                          }
                        />
                      )}
                    ></Controller>

                    <h2 className="mb-[5px] font-bold">{t("txt_password")}</h2>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      rules={{ required: t("txt_password_validation_message") }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="password"
                          id="outlined-basic"
                          label={t("txt_password")}
                          variant="outlined"
                          sx={{ backgroundColor: "white" }}
                          error={!!errors.name}
                          helperText={
                            errors.password ? errors.password.message : ""
                          }
                        />
                      )}
                    ></Controller>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        marginTop: "10px",
                        padding: "10px 60px",
                        fontSize: "21px",
                        fontWeight: "600",
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <CircularProgress size={24} />
                      ) : (
                        t("txt_login")
                      )}
                    </Button>
                    <Link to={"/signup"}>
                      <h3 className="p-[5px] pl-[0px] pb-[0px] underline">
                        {t("txt_want_signup")}
                      </h3>
                    </Link>
                  </Grid>
                </form>
                <Grid
                  item
                  xs={6}
                  className="xs:hidden flex justify-center align-center"
                >
                  <img src={logoSvg} alt="Logo" className="w-1/2" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <SnackAlert
            handleErreur={handleErreur}
            message={t("txt_message_error_logging")}
            open={open}
            severity="error"
          />
        </div>
      </div>
    </>
  );
};
export default LogingPage;

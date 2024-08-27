import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  CircularProgress,
} from "@mui/material";
import schoolSvg from "/images/school-svgrepo-com.svg";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createCompteUser,
  loginUser,
  selectUserRole,
  sendActivationCode,
} from "../../redux/adminSlice";
import { FormData } from "../../interfaces/FormData";
import { signUpArgsSchema } from "../../zod/auth";
import { useTranslation } from "react-i18next";
import SnackAlert from "../../components/snackAlert/SnackAlert";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "@/redux/Store";

const SignupPage: React.FC = ({}) => {
  const userRole = useSelector(selectUserRole);
  //to navigate
  const navigate = useNavigate();
  //variable used for translating
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  //variables used to open and close the snack bar message
  const [open, setOpen] = useState(false);
  //error message
  const [errorMessage, setErrorMessage] = useState("");

  //function used to open and close the snack bar message
  const handleErreur = (open: boolean) => {
    setOpen(open);
  };
  // library that help with handeling forms
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  // this is not finnished yet just wanted to test creating a user and logging him in
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const body = signUpArgsSchema.safeParse(data);
    if (!body.success) {
      alert("Error validating fields");
      return;
    }
    try {
      const userResponse = await dispatch(
        createCompteUser({
          email: data.email,
          password: data.password,
          phone: data.phone,
        })
      );
      console.log(userResponse);

      if (createCompteUser.rejected.match(userResponse)) {
        if (userResponse.payload.message) {
          console.log("entereds");
          const error = userResponse.payload as {
            message: string;
            status?: string;
          };
          console.log("error", error);
          if (error.status === "EMAIL_ALREADY_EXIST") {
            setErrorMessage("txt_email_already");
            console.log("1", errorMessage);
            handleErreur(true);
            return;
          } else if (error.status === "PHONE_ALREADY_EXIST") {
            setErrorMessage("txt_phone_already");
            console.log("2", errorMessage);
            handleErreur(true);
            return;
          }
        }
      }

      if (
        userResponse.payload?.data &&
        userResponse.payload?.data.status === "OK"
      ) {
        if (!userResponse.payload.data.data.app_metadata.phone_confirm) {
          const response = await dispatch(
            sendActivationCode({
              phone: data.phone,
              password: data.password,
            })
          );
          navigate("/validate-phone");
          return;
        }
        // Attempt to log the user in
        const loginResponse = await dispatch(
          loginUser({ identifier: data.email, password: data.password })
        );

        // Check if the login response is valid and the status is OK
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
          handleErreur(true);
          setErrorMessage(t("txt_message_error_signup"));
        }
      } else {
        handleErreur(true);
        setErrorMessage(t("txt_message_error_signup"));
      }
    } catch (error) {
      console.error(error);
      handleErreur(true);
      setErrorMessage(t("txt_message_error_signup"));
    }
  };

  useEffect(() => {
    if (userRole === "Teacher") navigate("/teacher/exercises");
  }, [userRole]);
  return (
    <>
      <div className="bg-[#ffff] w-full h-[90vh] relative flex items-center justify-center">
        <div className="max-w-[900px] w-full">
          <Card
            sx={{ backgroundColor: "#eeee", padding: "2em" }}
            variant="outlined"
          >
            <h1 className="m-0 text-2xl font-semibold leading-1.3 pb-15">
              {t("txt_signup_account")}
            </h1>
            <CardContent>
              <Grid container rowSpacing={1} spacing={2}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="xs:w-full sm:w-full md:w-1/2"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Grid item>
                    <h2 className="mb-[5px] font-bold">{t("txt_phone")}</h2>
                    <Controller
                      name="phone"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: t("txt_phone_validation_message"),
                        pattern: {
                          value: /^\d{8}$/, // This regex allows numbers that precisely 8 digits
                          message: t("txt_phone_format_validation_message"), // Custom validation message
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          id="outlined-basic"
                          label={t("txt_phone")}
                          variant="outlined"
                          sx={{ backgroundColor: "white" }}
                          error={!!errors.phone}
                          helperText={errors.phone ? errors.phone.message : ""}
                        />
                      )}
                    ></Controller>

                    <h2 className="mb-[5px] font-bold">{t("txt_email")}</h2>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: t("txt_email_validation_message"),
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                          message: t("txt_email_format_validation_message"),
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          id="outlined-basic"
                          label={t("txt_email")}
                          variant="outlined"
                          sx={{ backgroundColor: "white" }}
                          error={!!errors.name}
                          helperText={errors.email ? errors.email.message : ""}
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
                        t("txt_signup")
                      )}
                    </Button>
                    <Link to={"/login"}>
                      <h3 className="p-[5px] pl-[0px] pb-[0px] underline">
                        {t("txt_want_login")}
                      </h3>
                    </Link>
                  </Grid>
                </form>

                <Grid
                  item
                  xs={6}
                  className="xs:hidden flex justify-center align-center"
                >
                  <img src={schoolSvg} alt="Logo" className="w-1/2" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <SnackAlert
            handleErreur={() => {
              handleErreur(false);
            }}
            message={t(errorMessage)}
            open={open}
            severity="error"
          />
        </div>
      </div>
    </>
  );
};
export default SignupPage;

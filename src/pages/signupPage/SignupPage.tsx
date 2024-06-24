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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/redux/Store";
import { createCompteUser, loginUser } from "../../redux/adminSlice";
import { FormData } from "../../interfaces/FormData";
import { signUpArgsSchema } from "../../zod-model/auth";
import { useTranslation } from "react-i18next";

const SignupPage: React.FC = ({}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
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
    const userResponse = await dispatch(
      createCompteUser({
        email: data.email,
        name: data.name,
        password: data.password,
      })
    );
    const loginResponse = await dispatch(
      loginUser({ email: data.email, password: data.password })
    );
    console.log(data);
    console.log("user response " + userResponse);
    console.log("login response " + loginResponse);
  };
  return (
    <>
      <div className="bg-[#ffff] w-full h-[90vh] relative flex items-center justify-center">
        <div className="max-w-[900px] w-full">
          <Card
            sx={{ backgroundColor: "#eeee", padding: "2em" }}
            variant="outlined"
          >
            {" "}
            <h1 className="m-0 text-2xl font-semibold leading-1.3 pb-15">
              {t("txt_signup_account")}
            </h1>
            <CardContent>
              <Grid container rowSpacing={1} spacing={2}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  style={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Grid item>
                    <h2 className="mb-[5px] font-bold">{t("txt_name")}</h2>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      rules={{ required: t("txt_name_validation_message") }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          id="outlined-basic"
                          label={t("txt_name")}
                          variant="outlined"
                          sx={{ backgroundColor: "white" }}
                          error={!!errors.name}
                          helperText={errors.name ? errors.name.message : ""}
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
                          value: /^\S+@\S+$/i,
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
                  </Grid>
                </form>
                <Grid item xs={6} className="flex justify-center align-center">
                  <img src={schoolSvg} alt="Logo" className="w-1/2" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
export default SignupPage;

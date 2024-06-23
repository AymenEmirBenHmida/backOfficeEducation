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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/redux/Store";
import { createCompteUser, loginUser } from "../../redux/adminSlice";
import { FormData } from "../../interfaces/FormData";

const LogingPage: React.FC = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  // library that help with handeling forms
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  // login the user
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const loginResponse = await dispatch(
      loginUser({ email: data.email, password: data.password })
    );
    console.log(data);
    console.log("login response " + loginResponse);
  };
  return (
    <>
      <div className="bg-[#fffff] h-full w-full absolute flex items-center justify-center">
        <div className="max-w-[900px] w-full">
          <Card
            sx={{ backgroundColor: "#eeee", padding: "2em" }}
            variant="outlined"
          >
            {" "}
            <h1 className="m-0 text-2xl font-semibold leading-1.3 pb-15">
              Login to your account
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
                    <h2 className="mb-[5px] font-bold">Email</h2>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          id="outlined-basic"
                          label="Email"
                          variant="outlined"
                          sx={{ backgroundColor: "white" }}
                          error={!!errors.name}
                          helperText={errors.email ? errors.email.message : ""}
                        />
                      )}
                    ></Controller>

                    <h2 className="mb-[5px] font-bold">Password</h2>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Password is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="password"
                          id="outlined-basic"
                          label="Password"
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
                        "Login"
                      )}
                    </Button>
                  </Grid>
                </form>
                <Grid item xs={6} className="flex justify-center align-center">
                  <img src={logoSvg} alt="Logo" className="w-1/2" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
export default LogingPage;

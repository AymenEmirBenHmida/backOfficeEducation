import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupPage from "./pages/signupPage/SignupPage";
import LogingPage from "./pages/loginPage/LoginPage";
import Layout from "./components/layout/Layout";
import Exercises from "./pages/Teacher/exercises/ExercisesPage";
import PhoneValidationPage from "./pages/phoneValidationPage/PhoneValidationPage";
import AuthWrapper from "./components/authWrapper/AuthWrapper";
import AllExercises from "./pages/Teacher/exercises/AllExercices";
import AllLessons from "./pages/Teacher/lessons/AllLessons";
import AllChapters from "./pages/Teacher/chapters/ChaptersPage";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { createTheme, GlobalStyles, ThemeProvider } from "@mui/material";
import AllSubjects from "./pages/Teacher/subjects/SubjectsPage";
import AllTrimesters from "./pages/Teacher/trimesters/TrimestersPage";

const routes: RouteConfig[] = [
  { path: "/signup", component: <SignupPage /> },
  { path: "/login", component: <LogingPage /> },
  { path: "/validate-phone", component: <PhoneValidationPage /> },
  {
    path: "/teacher/all-exercices",
    component: <AllExercises />,
    requiredRoles: ["Teacher"],
  },
  {
    path: "/teacher/lessons",
    component: <AllLessons />,
    requiredRoles: ["Teacher"],
  },
  {
    path: "/teacher/exercises",
    component: <Exercises />,
    requiredRoles: ["Teacher"],
  },
  {
    path: "/teacher/subjects",
    component: <AllSubjects />,
    requiredRoles: ["Teacher"],
  },
  {
    path: "/teacher/chapters",
    component: <AllChapters />,
    requiredRoles: ["Teacher"],
  },
  {
    path: "/teacher/trimesters",
    component: <AllTrimesters />,
    requiredRoles: ["Teacher"],
  },
];

function App() {
  const { i18n } = useTranslation();

  // Create a theme that sets direction based on the language
  const theme = useMemo(
    () =>
      createTheme({
        components: {
          MuiTypography: {
            styleOverrides: {
              root: {
                textAlign: i18n.language === "ar" ? "right" : "left",
              },
            },
          },
        },
      }),
    [i18n.language]
  );
  // //Function to check if user allowed to route
  // const isRouteAllowed = (route: RouteConfig): boolean => {
  //   var currentdate = new Date();

  //   if (!route.requiredRoles || route.requiredRoles.length === 0) {
  //     console.log("protected route no roles");
  //     return true;
  //   }
  //   console.log(
  //     "resposne from route is protected ",
  //     role !== null && route.requiredRoles.includes(role)
  //   );
  //   return role !== null && route.requiredRoles.includes(role);
  // };
  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyles
            styles={{
              "p, h1, h2, h3, h4, h5, h6, div, span, .text-element": {
                textAlign: i18n.language === "ar" ? "right" : "left",
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/" element={<Layout />}>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <AuthWrapper route={route}>{route.component}</AuthWrapper>
                  }
                />
              ))}
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;

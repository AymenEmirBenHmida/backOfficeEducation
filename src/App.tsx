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
import { useSelector } from "react-redux";
import { selectUserRole } from "./redux/adminSlice";
import LessonsPage from "./pages/Teacher/lessons/LessonsPage";
import PhoneValidationPage from "./pages/phoneValidationPage/PhoneValidationPage";
import AuthWrapper from "./components/authWrapper/AuthWrapper";
import AllExercises from "./pages/Teacher/exercises/AllExercices";
import AllLessons from "./pages/Teacher/lessons/AllLessons";

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
    path: "/teacher/all-lessons",
    component: <AllLessons />,
    requiredRoles: ["Teacher"],
  },
  {
    path: "/teacher/exercises",
    component: <Exercises />,
    requiredRoles: ["Teacher"],
  },
  {
    path: "/teacher/lessons",
    component: <LessonsPage />,
    requiredRoles: ["Teacher"],
  },
];

function App() {
  //get current role
  const role = useSelector(selectUserRole);

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
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/" element={<Layout />}>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <AuthWrapper route={route}>
                    {route.component}
                  </AuthWrapper>
                }
              />
            ))}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

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
import Exercises from "./pages/Teacher/exercises/Exercises";
import { useSelector } from "react-redux";
import { selectUserRole } from "./redux/adminSlice";

type RouteConfig = {
  path: string;
  component: React.ReactNode;
  requiredRoles?: string[];
};

const routes: RouteConfig[] = [
  { path: "/signup", component: <SignupPage /> },
  { path: "/login", component: <LogingPage /> },
  {
    path: "/teacher/exercises",
    component: <Exercises />,
    requiredRoles: ["Teacher"],
  },
];

function App() {
  //get current role
  const role = useSelector(selectUserRole);

  //Function to check if user allowed to route
  const isRouteAllowed = (route: RouteConfig): boolean => {
    var currentdate = new Date();

    if (!route.requiredRoles || route.requiredRoles.length === 0) {
      console.log("protected route no roles");
      return true;
    }
    console.log(
      "resposne from route is protected ",
      role !== null && route.requiredRoles.includes(role)
    );
    return role !== null && route.requiredRoles.includes(role);
  };
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />

            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  isRouteAllowed(route) ? (
                    route.component
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            ))}
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;

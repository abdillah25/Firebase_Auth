// App.jsx
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { UserAuthContextProvider } from "./Context/UserAuthContext";
import { PrivateRoute } from "./Private/PrivateRoute";
import { ForgotPassword } from "./Pages/ForgotPassword";
import { Dashboard } from "./Pages/DashBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/resetPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute />,
    children: [
      {
        path: "home",
        element: <Dashboard />,
      },
    ],
  },
]);

const App = () => {
  return (
    <UserAuthContextProvider>
      <RouterProvider router={router} />
    </UserAuthContextProvider>
  );
};

export default App;

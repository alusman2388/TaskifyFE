import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import SignUpPage from "./components/SignUpPage.tsx";
import LoginPage from "./components/LoginPage.tsx";
import App from "./routes/App.tsx";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Dashboard from "./components/Dashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Table from "./components/Table.tsx";
import AddTaskCard from "./components/AddTaskCard.tsx";
import UpdateTaskCrad from "./components/UpdateTaskCrad.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute children={undefined} />, // Protects all child routes
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/table",
        element: <ProtectedRoute children={undefined} />, // Protects all child routes
        children: [
          {
            path: "",
            element: <Table />,
          },
        ],
      },
      {
        path: "/add-new-task",
        element: <ProtectedRoute children={undefined} />, // Protects all child routes
        children: [
          {
            path: "",
            element: <AddTaskCard />,
          },
        ],
      },
      {
        path: "/update-task",
        element: <ProtectedRoute children={undefined} />, // Protects all child routes
        children: [
          {
            path: "",
            element: <UpdateTaskCrad />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

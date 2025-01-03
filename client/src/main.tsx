import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import POSRolloutIssueReporting from "./pages/POSRolloutIssueReporting.tsx";
import CreateTicket from "./pages/CreateTicket.tsx";
import Feedback from "./pages/Feedback.tsx";
import { LoginForm } from "./pages/LoginForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "ticket",
        element: <POSRolloutIssueReporting />,
      },
      {
        path: "service",
        element: <CreateTicket />,
      },
      {
        path: "feedback",
        element: <Feedback />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <LoginForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <RouterProvider router={router} />
      </SidebarProvider>
    </ThemeProvider>
  </React.StrictMode>
);

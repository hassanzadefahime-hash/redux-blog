import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";

import { store } from "./store/index.js";
import MainLayout from "./layout/MainLayout.jsx";

import App from "./App.jsx";

import SingleBlogPage from "./components/blog/SingleBlogPage.jsx";
import AddBlog from "./components/blog/AddBlog.jsx";
import EditBlog from "./components/blog/EditBlog.jsx";

import UsersList from "./components/user/UsersList.jsx";
import SingleUserPage from "./components/user/SingleUserPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "blogs/:blogId",
        element: <SingleBlogPage />,
      },
      {
        path: "blogs/add-post",
        element: <AddBlog />,
      },
      {
        path: "blogs/editblog/:blogId",
        element: <EditBlog />,
      },
      {
        path: "users",
        element: <UsersList />,
      },
      {
        path: "users/:userId",
        element: <SingleUserPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {" "}
    <Provider store={store}>
      {" "}
      <RouterProvider router={router} />{" "}
    </Provider>{" "}
  </StrictMode>
);

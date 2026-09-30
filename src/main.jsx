import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { Provider } from "react-redux";
import {store} from "./store/index.js";
import SingleBlogPage from "./components/SingleBlogPage.jsx";
import AddBlog from "./components/AddBlog.jsx";
import EditBlog from "./components/EditBlog.jsx";
import UsersList from "./components/UsersList.jsx";
import SingleUserPage from "./components/SingleUserPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path:"blogs/:blogId",
        element:<SingleBlogPage/>
      },{
        path:"/blogs/add-post",
        element:<AddBlog />
      },{
        path:"/blogs/editblog/:blogId",
        element:<EditBlog />
      },{
        path:"/users",
        element:<UsersList />},{
          path:"/users/:userId",
          element:<SingleUserPage />
        }
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
);


// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Provider } from "react-redux";

// import { store } from "./store/index.js";
// import MainLayout from "./layout/MainLayout.jsx";

// const App = () => {
//   return <h2>صفحه اصلی وبلاگ</h2>;
// };

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       {
//         index: true,
//         element: <App />,
//       },
//     ],
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Provider store={store}>
//       <RouterProvider router={router} />
//     </Provider>
//   </StrictMode>
// );

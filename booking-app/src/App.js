import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MyLayout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Hotels from "./pages/Hotels";
import NotFound from "./pages/NotFound";

import "./App.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyLayout />,
    errorElement: <div>Something went wrong!</div>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/hotels",
        element: <Hotels />
      },
      {
        path: "/hotels/:city",
        element: <Hotels />
      },
      {
        path: "/aboutus",
        element: <About />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])

export default function App() {

  return (
    <RouterProvider router={router} />
  );
}
import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import { hotelsLoader } from "./loaders/hotelsLoader";

import MyLayout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Hotels from "./pages/Hotels";
import HotelsDetails from "./pages/Hotels/HotelDetails";
import NotFound from "./pages/NotFound";
import { Legal, Terms, Contact, AboutBooking } from "./pages/About";
import Favorites from "./pages/Favorites";

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
        element: <Hotels />,
        loader: hotelsLoader
      },
      {
        path: "/hotels/:city",
        element: <Hotels />
      },
      {
        path: "/hotel/:name",
        element: <HotelsDetails />
      },
      {
        path: "/aboutus",
        element: <About />,
        children: [
          {
            index: true,
            element: <Navigate to="/aboutus/aboutbooking" replace={true} />
          },
          {
            path: "/aboutus/aboutbooking",
            element: <AboutBooking/>,
          },
          {
            path: "/aboutus/legal",
            element: <Legal />
          },
          {
            path: "/aboutus/terms",
            element: <Terms />
          },
          {
            path: "/aboutus/contact",
            element: <Contact />
          },
        ]
      },
      {
        path: "/favorites",
        element: <Favorites/>
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
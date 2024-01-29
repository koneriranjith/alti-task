import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

// Router
import Layout from "Layout";
import Home from "pages/Home";
import Services from "pages/Services";
import ContactUs from "pages/ContactUs";
import Gallery from "pages/Gallery";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "*",
        element: <Home />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={MainRouter} />;
}

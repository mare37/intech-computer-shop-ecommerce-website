import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store";
import MainLayout from "./Layout/MainLayout";
import AddBrand from "./pages/brand/addbrand";
import AddColour from "./pages/colour/addcolor";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/admin",
    element: <MainLayout/>,
    children: [
      {
        path: "addbrand",
        element: < AddBrand />,
      },
      {
        path: "addcolor",
        element: < AddColour />,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

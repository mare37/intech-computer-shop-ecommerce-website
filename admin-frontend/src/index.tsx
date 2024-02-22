import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store";
import MainLayout from "./Layout/MainLayout";
import { ChakraProvider } from "@chakra-ui/react";

//pages
import AddBrand from "./pages/brand/addbrand";
import UpdateBrand from "./pages/brand/updatebrand";
import AddColour from "./pages/colour/addcolor";
import ProductCategory from "./pages/productCategory/productcategory";
import BrandList from "./pages/brand/brandlist";
import ColourList from "./pages/colour/colourlist";
import ProductCategoryList from "./pages/productCategory/productcategorylist";
import AddProduct from "./pages/product/addproduct";
import UpdateProduct from "./pages/product/updateproduct";
import ProductList from "./pages/product/productlist";
import WriteBlog from "./pages/blog/writeblog";
import UpdateBlog from "./pages/blog/updateblog";
import AddBlogCategory from "./pages/blog/addblogcategory";
import BlogCategoryList from "./pages/blog/blogcategorylist";
import BlogList from "./pages/blog/bloglist";
import AddCoupon from "./pages/coupon/addcoupon";
import UpdateCoupon from "./pages/coupon/updatecoupon";
import CouponList from "./pages/coupon/couponlist";
import Orders from "./pages/orders/orders";
import Enquiries from "./pages/enquiries/enquiries";
import Customers from "./pages/customers/customers";
import Dashboard from "./pages/dashboard/dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      {
        path: "addbrand",
        element: <AddBrand />,
      },
      {
        path: "updatebrand/:id",
        element: <UpdateBrand />,
      },
      {
        path: "addcolor",
        element: <AddColour />,
      },
      {
        path: "updatecolour/:id",
        element: <AddColour />,
      },
      {
        path: "productcategory",
        element: <ProductCategory />,
      },
      {
        path: "updateproductcategory/:id",
        element: <ProductCategory />,
      },
      {
        path: "brandlist",
        element: <BrandList />,
      },
      {
        path: "colourlist",
        element: <ColourList />,
      },
      {
        path: "productcategorylist",
        element: <ProductCategoryList />,
      },
      {
        path: "addproduct",
        element: <AddProduct />,
      },
      {
        path: "updateproduct/:id",
        element: <UpdateProduct />,
      },

      {
        path: "productlist",
        element: <ProductList />,
      },
      {
        path: "writeblog",
        element: <WriteBlog />,
      },

      {
        path: "updateblog/:id",
        element: <UpdateBlog />,
      },
      {
        path: "addblogcategory",
        element: <AddBlogCategory />,
      },
      {
        path: "updateblogcategory/:id",
        element: <AddBlogCategory />,
      },
      {
        path: "blogcategorylist",
        element: <BlogCategoryList />,
      },
      {
        path: "bloglist",
        element: <BlogList />,
      },
      {
        path: "addcoupon",
        element: <AddCoupon />,
      },
      {
        path: "updatecoupon/:id",
        element: <UpdateCoupon />,
      },
      {
        path: "couponlist",
        element: <CouponList />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "enquiries",
        element: <Enquiries />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
       <ChakraProvider   resetCSS={false}    >
    <Provider store={store}>
      <RouterProvider router={router} />
   
        <App />
     
    </Provider>
     </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

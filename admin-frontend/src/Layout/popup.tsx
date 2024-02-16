import style from "./MainLayout.module.scss";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setPopUpToFalse } from "../redux/popupSlice";
import {
  setDeleteActionToTrue,
  setDeleteActionToFalse,
} from "../redux/deleteActionSlice";
import { deleteBrand } from "../api/brand";
import { deleteColour } from "../api/colour";
import { deleteProductCategory } from "../api/productcatetory";
import { deleteProduct } from "../api/product";
import { deleteBlogCategory } from "../api/blogcategory";
import { deleteBlog } from "../api/blog";
import { removeCoupon } from "../api/coupon";
import { useState } from "react";

function Popup() {
  const dispatch = useAppDispatch();

  const { popup, id } = useAppSelector((state) => {
    return state.popUpController;
  });

  console.log(id);

  console.log(window.location.pathname);
  const handleDelete = () => {
    if (window.location.pathname === "/admin/brandlist") {
      dispatch(setPopUpToFalse());

      deleteBrand(id, dispatch).then((response) => {
        if( response.brandDeleted){
          dispatch(setDeleteActionToTrue());
        }else{
          dispatch(setDeleteActionToFalse())
        }
      });
    }

    if (window.location.pathname === "/admin/colourlist") {
      dispatch(setPopUpToFalse());

      deleteColour(id, dispatch).then((response) => {

        console.log(response);
        
     

        if( response.colourDeleted){
          dispatch(setDeleteActionToTrue());
        }else{
          dispatch(setDeleteActionToFalse())
        }



      });
    }

    if (window.location.pathname === "/admin/productcategorylist") {
      dispatch(setPopUpToFalse());

      deleteProductCategory(id, dispatch).then((response) => {
        console.log(response);
        if (response.productCatDeleted) {
          dispatch(setDeleteActionToTrue());
        } else {
          dispatch(setDeleteActionToFalse());
        }
      });
    }

    if (window.location.pathname === "/admin/productlist") {
      dispatch(setPopUpToFalse());

      deleteProduct(id, dispatch).then((response) => {
        console.log(response);

        dispatch(setDeleteActionToTrue());
      });
    }

    if (window.location.pathname === "/admin/blogcategorylist") {
      dispatch(setPopUpToFalse());

      deleteBlogCategory(id, dispatch).then((response) => {
        console.log(response);
        if( response.blogCatDeleted){
          dispatch(setDeleteActionToTrue());
        }else{
          dispatch(setDeleteActionToFalse())
        }

        
      })
    }

    if (window.location.pathname === "/admin/bloglist") {
      dispatch(setPopUpToFalse());

      deleteBlog(id, dispatch).then((response) => {

        console.log(response);

        if( response.blogDeleted){
          dispatch(setDeleteActionToTrue());
        }else{
          console.log("Toggle delete action");
          
          dispatch(setDeleteActionToFalse())
        }
        

      //  dispatch(setDeleteActionToTrue());
      });
    }

    if (window.location.pathname === "/admin/couponlist") {
      dispatch(setPopUpToFalse());

      removeCoupon(id, dispatch).then(() => {
        console.log(id);

        dispatch(setDeleteActionToTrue());
      });
    }
  };

  // console.log(popup);

  return (
    <div className={!popup ? style.removePopup : style.popup}>
      <div>
        <h3>Confirmation</h3>
        <p>Are you sure you want to delete this?</p>

        <section>
          <button
            onClick={() => {
              dispatch(setPopUpToFalse());
            }}
          >
            Cancel
          </button>
          <button onClick={handleDelete}>Ok</button>
        </section>
      </div>
    </div>
  );
}

export default Popup;

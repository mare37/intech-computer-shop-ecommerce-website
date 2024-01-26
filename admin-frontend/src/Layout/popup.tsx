import style from "./MainLayout.module.scss";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setPopUpToFalse } from "../redux/popupSlice";
import { setDeleteActionToTrue } from "../redux/deleteActionSlice";
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
    
      deleteBrand(id, dispatch).then(() => {
       
        dispatch(setPopUpToFalse());
        dispatch(setDeleteActionToTrue())
      });
    }

    if (window.location.pathname === "/admin/colourlist") {

      console.log("DELETING");
      
    
      deleteColour(id, dispatch).then(() => {
        dispatch(setPopUpToFalse());
        dispatch(setDeleteActionToTrue())
      });
    }

    if (window.location.pathname === "/admin/productcategorylist") {

      console.log("DELETING");
      
    
      deleteProductCategory(id, dispatch).then(() => {
        dispatch(setPopUpToFalse());
      });
    }

    if (window.location.pathname === "/admin/productlist") {

      console.log("DELETING");
      
    
      deleteProduct (id, dispatch).then(() => {
        dispatch(setPopUpToFalse());
        dispatch(setDeleteActionToTrue())
      });
    }

    if (window.location.pathname === "/admin/blogcategorylist") {

      console.log("DELETING");
      
    
      deleteBlogCategory (id, dispatch).then(() => {
        dispatch(setPopUpToFalse());
        dispatch(setDeleteActionToTrue())
      });
    }


    if (window.location.pathname === "/admin/bloglist") {

      console.log("DELETING");
      
    
      deleteBlog(id, dispatch).then(() => {

        dispatch(setPopUpToFalse());
        dispatch(setDeleteActionToTrue())
      });
    }


    if (window.location.pathname === "/admin/couponlist") {

      console.log("DELETING");
     
      
    
      removeCoupon(id, dispatch).then(() => {
        console.log(id);
      
        dispatch(setPopUpToFalse());
        dispatch(setDeleteActionToTrue())
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

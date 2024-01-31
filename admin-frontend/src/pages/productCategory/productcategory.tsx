import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ToastContainer, toast } from "react-toastify";


import {
  addProductCategory,
  getOneProductCategory,
  updateProductCategory,
} from "../../api/productcatetory";

import styles from "./productcategory.module.scss";
import tableStyles from "../table.module.scss";

const schema = yup.object().shape({
  productCategory: yup.string().required(),
});

function ProductCategory() {
  const [productCategory, setProductCategory] = useState("");
  const [productCatRetrieval, setProductCatRetrieval] = useState(false);

  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { isLoading, isError, isSuccess } = useAppSelector(
    (state) => state.productCategory
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const notify = () => toast.success("Product Category added Successfully!");
  const notifyError = () => toast.error("Failed to add Product Category!");

  useEffect(() => {
    if (id != undefined) {
      getOneProductCategory(id, dispatch)
        .then((response) => {
          console.log(response.result);
          setProductCatRetrieval(true);
          setProductCategory(response.result.title);
        })
        .catch((error) => {
          setProductCatRetrieval(false);
        });
    }

    /// dispatch(reset());
  }, []);

  return (
    <div
      onSubmit={handleSubmit((data) => {
        if (id === undefined) {
        
          addProductCategory(data.productCategory, dispatch).then((response )=>{
             if(response.productCatCreated){
              notify()

             }else{
              notifyError()
             }
            
          })
        } else {
          setProductCatRetrieval(false);
          updateProductCategory(id, productCategory, dispatch);
        }
      })}
      className={styles.addProductCategory}
    >
      <div className={styles.addProductCategoryContainer}>
      <ToastContainer theme="light"   position="top-center"/>
        <form>
          <h3>{id === undefined ? "Add" : "Edit"} product category</h3>
          <input
           value={productCategory}
            {...register("productCategory")}
            onChange={(e) => {
              setProductCategory(e.target.value);
            }}
          />
          {errors.productCategory && <p>Product category is required.</p>}
         

          <div className={tableStyles.buttonAndLoaderContainer}>
            <button
              className={tableStyles.universalButton}
              disabled={isLoading}
            >
              {id === undefined ? "Add" : "Edit"}
            </button>
            {isLoading ? <span className={tableStyles.loader}></span> : ""}
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default ProductCategory;

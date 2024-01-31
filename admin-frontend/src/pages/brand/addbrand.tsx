import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { ToastContainer, toast } from "react-toastify";

import styles from "./addbrand.module.scss";
import tableStyles from "../table.module.scss"

import { addBrand } from "../../api/brand";
import { reset } from "../../redux/brandSlice";
import { useEffect } from "react";

const schema = yup.object().shape({
  brand: yup.string().required(),
});

function AddBrand() {
  const dispatch = useAppDispatch();
  const { isLoading, isError, isSuccess } = useAppSelector(
    (state) => state.brand
  );


  const notify = () => toast.success("Brand added Successfully!");
 const notifyError = () => toast.error("Failed to add brand!");

  useEffect(() => {
    dispatch(reset());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div
      onSubmit={handleSubmit((data) =>
        addBrand(data.brand.toLocaleLowerCase(), dispatch).then((response)=>{
          console.log(response);
          if( response.brandCreated  ){
            notify()
          }else{
            notifyError()
          }
          
        })
      )}
      className={styles.addbrand}
    >
      <div className={styles.addbrandContainer}>
      <ToastContainer theme="light"   position="top-center"/>

        <form>
          <h3>Add Brand</h3>
          <input {...register("brand")} placeholder="" />
          {errors.brand && <p>Brand is required.</p>}
       


          
          <div className={tableStyles.buttonAndLoaderContainer}>
            <button
              className={tableStyles.universalButton}
              disabled={isLoading}
            >
             Add brand
            </button>
            {isLoading ? <span className={tableStyles.loader}></span> : ""}
          </div>
          
        
        </form>
      </div>
    </div>
  );
}

export default AddBrand;

import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { ToastContainer, toast } from "react-toastify";

import tableStyles from "../table.module.scss"
import styles from "./addbrand.module.scss";

import { getOneBrand, updateBrand } from "../../api/brand";
import { reset } from "../../redux/brandSlice";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
  brand: yup.string().required(),
});

function UpdateBrand() {
  const [brand, setBrand] = useState("");
  const [brandRetreival, setBrandRetreival] = useState(false);
  const dispatch = useAppDispatch();

  const { isLoading, isError, isSuccess } = useAppSelector(
    (state) => state.brand
  );

  const { id } = useParams();


  const notify = () => toast.success("Brand updated Successfully!", {position: "top-center"});
 const notifyError = () => toast.error("Failed to update brand!", {autoClose:false});
 const notifyLoadError = () => toast.error("Failed to load brand! Something is wrong!", {autoClose:false}  );


  useEffect(() => {
    if (id) {
      console.log("Loading " + isLoading );

      getOneBrand(id, dispatch).then((response) => {
        console.log(response);
        console.log("Loading " + isLoading );

        if(response.brandRetrieved){
          setBrand(response.result.title);
        }else{
          notifyLoadError()
        }
       
       
      }).catch((error)=>{
        console.log(error);
        
       
      })
    }

  
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
      onSubmit={handleSubmit(() => {
        if (id) {
          
          updateBrand(id, brand, dispatch).then((response)=>{
            console.log(response);

            if(response.brandUpdated ){
              notify()
            }else{
              notifyError()

            }
            
          })
        
        }
      })}
      className={styles.addbrand}
    >
      <div className={styles.addbrandContainer}>
      <ToastContainer theme="light"  />

        <form>
          <h3  className={tableStyles.heading   }                   >Update Brand</ h3>
          
          <input
            value={brand}
            {...register("brand")}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
            placeholder={""}
          />
          {errors.brand && <p>Brand is required.</p>}
       


          <div className={tableStyles.buttonAndLoaderContainer}>
            <button
              className={tableStyles.universalButton}
              disabled={isLoading}
            >
             Update brand
            </button>
            {isLoading ? <span className={tableStyles.loader}></span> : ""}
          </div>
        
        </form>
      </div>
    </div>
  );
}

export default UpdateBrand;

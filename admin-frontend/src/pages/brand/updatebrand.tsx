import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppSelector, useAppDispatch } from "../../hooks";
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

  useEffect(() => {
    if (id) {
      getOneBrand(id, dispatch).then((response) => {
        console.log(response.result);
        setBrandRetreival(true)
        setBrand(response.result.title);
      }).catch((error)=>{
        setBrandRetreival(false)
      })
    }

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
      onSubmit={handleSubmit(() => {
        if (id) {
            setBrandRetreival(false)
          updateBrand(id, brand, dispatch);
        
        }
      })}
      className={styles.addbrand}
    >
      <div className={styles.addbrandContainer}>
        <form>
          <h3>Update Brand</ h3>
          {isLoading && <p>Loading...</p>}
          <input
            value={brand}
            {...register("brand")}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
            placeholder={""}
          />
          {errors.brand && <p>Brand is required.</p>}
          <button disabled={isLoading}>Update brand</button>
          {(isSuccess === true  && brandRetreival === false) && (
            <span className={styles.success}>Brand Updated successfully.</span>
          )}
          {isError && (
            <span className={styles.error}>Something went wrong.Try again</span>
          )}
        </form>
      </div>
    </div>
  );
}

export default UpdateBrand;

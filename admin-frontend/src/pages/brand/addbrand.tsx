import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppSelector, useAppDispatch } from "../../hooks";
import styles from "./addbrand.module.scss";

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
        addBrand(data.brand.toLocaleLowerCase(), dispatch)
      )}
      className={styles.addbrand}
    >
      <div className={styles.addbrandContainer}>
        <form>
          <h3>Add Brand</h3>
          <input {...register("brand")} placeholder="" />
          {errors.brand && <p>Brand is required.</p>}
          <button disabled={isLoading}>Add brand</button>
          {isSuccess && (
            <span className={styles.success}>Brand created successfully.</span>
          )}
          {isError && (
            <span className={styles.error}>Something went wrong.Try again</span>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddBrand;

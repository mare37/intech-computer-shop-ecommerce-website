



import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./productcategory.module.scss";

const schema = yup.object().shape({
  colour: yup.string().required(),
});

function  ProductCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div
      onSubmit={handleSubmit((data) => console.log(data))}
      className={styles.addcolor}
    >
      <div    className={styles.addcolorContainer}  >
        <form>
           <h3>Add product category</h3>
          <input {...register("colour")}  />
          {errors.colour && <p>Product category is required.</p>}
          <button>Add product category</button>
        </form>
      </div>
    </div>
  );
}

export default ProductCategory;

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./coupon.module.scss";

const schema = yup.object().shape({
  coupon: yup.string().required(),
  date:yup.date().required(),
  discount:yup.number().required()
});

function AddCoupon() {
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
      className={styles.coupon}
    >
      <div    className={styles.couponContainer}  >
        <form>
           <h3>Add Coupon</h3>
          <input {...register("coupon")} placeholder="Enter coupon" />
          {errors.coupon && <p>Coupon is required.</p>}
          <input   type="date" {...register("date")} placeholder="Enter expiry date" />
          {errors.date && <p>Date is required.</p>}
          <input   type="number" {...register("discount")} placeholder="Enter  discount" />
          {errors.discount && <p>Discount is required.</p>}
          <button>Add brand</button> 
        </form> 
      </div>
    </div>
  );
}

export default  AddCoupon

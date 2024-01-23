import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import voucher_codes, { generate } from "voucher-code-generator";

import styles from "./coupon.module.scss";
import { useState } from "react";

const schema = yup.object().shape({
  coupon: yup.string().required(),
  date: yup.date().required(),
  discount: yup.number().required(),
});

function AddCoupon() {
  const [coupon, setCoupon] = useState("");
  const [prefix, setPrefix] = useState("");
  const [postfix, setPostfix] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const generateCoupon = () => {
    const results = voucher_codes.generate({
      prefix: prefix.length === 0 ? "" : prefix + "-",
      postfix: postfix.length === 0 ? "" : "-" + postfix,
      length: 8,
      count: 1,
      charset: voucher_codes.charset("alphabetic"),
    });

    setCoupon(results[0]);
  };

  return (
    <div
      onSubmit={handleSubmit((data) => console.log(data))}
      className={styles.coupon}
    >
      <div className={styles.couponContainer}>
        <div className={styles.firstSection}         >
         {" "}
          <span>
            <input   onChange={(e)=>{setPrefix(e.target.value)}}           placeholder="Prefix" />
            <input    onChange={(e)=>{setPostfix(e.target.value)}}               placeholder="Postfix" />
          </span>{" "}
          <button onClick={generateCoupon}>Generate Coupon Code</button>
          <p>{coupon.length === 0 ? "Generated coupon code will be displayed here" : coupon}</p>
        </div>

        <form>
          <h3>Add Coupon</h3>

          <input
            {...register("coupon")}
            placeholder="Enter coupon"
          />
          {errors.coupon && <p>Coupon is required.</p>}
          <input
            type="date"
            {...register("date")}
            placeholder="Enter expiry date"
          />
          {errors.date && <p>Date is required.</p>}
          <input
            type="number"
            {...register("discount")}
            placeholder="Enter  discount"
          />
          {errors.discount && <p>Discount is required.</p>}
          <button>Add Coupon</button>
        </form>
      </div>
    </div>
  );
}

export default AddCoupon;

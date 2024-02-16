import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppSelector, useAppDispatch } from "../../hooks";
import voucher_codes, { generate } from "voucher-code-generator";
import { ToastContainer, toast } from "react-toastify";
import styles from "./coupon.module.scss";
import tableStyles from "../table.module.scss"
import { useState } from "react";

import { addCoupon } from "../../api/coupon";
import { response } from "express";

const schema = yup.object().shape({
  coupon: yup.string().required(),
  date: yup.date().required(),
  discount: yup.number().required(),
});

function AddCoupon() {
  const [coupon, setCoupon] = useState("");
  const [prefix, setPrefix] = useState("");
  const [postfix, setPostfix] = useState("");

  const dispatch = useAppDispatch();
  const { isLoading, isError, isSuccess } = useAppSelector(
    (state) => state.coupon
  );

  const notify = () => toast.success("Coupon Added Successfully!");

  const notifyError = () => toast.error("Failed to add coupon!", {autoClose:false});

  const notifyLoadError = () =>
    toast.error("Failed to load coupon!", { autoClose: false });

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
      onSubmit={handleSubmit((data) => {
        console.log(data);

        addCoupon(data.coupon, data.date, data.discount, dispatch).then(
          (response) => {
            if (response.couponCreated) {
              notify();
            } else {
              notifyError();
            }
          }
        );
      })}
      className={styles.coupon}
    >
      <div className={styles.couponContainer}>
        <ToastContainer theme="light" position="top-center" />
        <div className={styles.firstSection}>
          <h3>Add Coupon</h3>
          <span>
            <input
              onChange={(e) => {
                setPrefix(e.target.value);
              }}
              placeholder="Prefix"
            />
            <input
              onChange={(e) => {
                setPostfix(e.target.value);
              }}
              placeholder="Postfix"
            />
          </span>{" "}
          <button onClick={generateCoupon}>Generate Coupon Code</button>
          <p>
            {coupon.length === 0
              ? "Generated coupon code will be displayed here"
              : coupon}
          </p>
        </div>

        <form>
          <input {...register("coupon")} placeholder="Enter coupon" />
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
          <div>
            {" "}
            <button disabled={isLoading}>Add Coupon</button>
            {isLoading  ?  <span className={tableStyles.loader}></span>: ""   }
          
           
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddCoupon;

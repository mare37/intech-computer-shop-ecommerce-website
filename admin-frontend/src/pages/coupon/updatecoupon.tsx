import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppSelector, useAppDispatch } from "../../hooks";
import voucher_codes, { generate } from "voucher-code-generator";
import { ToastContainer, toast } from "react-toastify";
import styles from "./coupon.module.scss";
import tableStyles from "../table.module.scss";
import { useEffect, useState } from "react";

import { updateCoupon, getOneCoupon } from "../../api/coupon";
import { response } from "express";

const schema = yup.object().shape({
  coupon: yup.string().required(),
  date: yup.date().required(),
  discount: yup.number().required(),
});

function UpdateCoupon() {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [expiry, setExpiry] = useState<any>();
  const [prefix, setPrefix] = useState("");
  const [postfix, setPostfix] = useState("");

  const notify = () => toast.success("Coupon Updated Successfully!");

  const notifyError = () => toast.error("Failed to update coupon!" ,{autoClose: false,}  );

  const notifyLoadError = () => toast.error("Failed to load coupon!"  ,{autoClose: false,}  );

  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { isLoading, isError, isSuccess } = useAppSelector(
    (state) => state.coupon
  );

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

  useEffect(() => {
    if (id) {
      getOneCoupon(id, dispatch)
        .then((response) => {
          console.log(response.result);
          setCoupon(response.result.name);
          setDiscount(response.result.discount);

          console.log(response.result.expiry);

          const dateObject = new Date(response.result.expiry);
          const date = dateObject.toLocaleString("en-UK", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          });

          console.log("date " + date);

          var year = dateObject.getFullYear();
          var month =
            dateObject.getMonth() < 9
              ? `0${dateObject.getMonth() + 1}`
              : dateObject.getMonth() + 1;
          var day =
            dateObject.getDate() < 10
              ? `0${dateObject.getDate()}`
              : dateObject.getDate();

          var formattedDate = [year, month, day].join("-");

          console.log(formattedDate);
          console.log("month " + dateObject.getMonth());
          console.log("day " + dateObject.getDay());

          setExpiry(formattedDate);
        })
        .catch((error) => {
          console.log(error);
          notifyLoadError();
        });
    }
  }, []);

  return (
    <div
      onSubmit={(e) => {
        e.preventDefault();
        console.log("SUBMITTING");

        if (id !== undefined)
          updateCoupon(id, coupon, expiry, discount, dispatch).then(
            (response) => {
              console.log(response);

              if (response.couponUpdated) {
                notify();
              } else {
                notifyError();
              }
            }
          );
      }}
      className={styles.coupon}
    >
      <div className={styles.couponContainer}>
        <div>
          {" "}
          <ToastContainer theme="light"    position="top-center"       />{" "}
        </div>

        <div className={styles.firstSection}>
          <h3>Update Coupon</h3>
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
          <input
            value={coupon}
            onChange={(e) => {
              setCoupon(e.target.value);
            }}
            placeholder="Enter coupon"
          />

          <input
            value={expiry}
            onChange={(e) => {
              setExpiry(e.target.value);
            }}
            type="date"
            placeholder="Enter expiry date"
          />

          <input
            value={discount}
            onChange={(e) => {
              setDiscount(e.target.valueAsNumber);
            }}
            type="number"
            placeholder="Enter  discount"
          />

          <div>
            {" "}
            <button disabled={isLoading}>Update Coupon</button>
            {isLoading  ?  <span className={tableStyles.loader}></span>: ""   }
          
           
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateCoupon;

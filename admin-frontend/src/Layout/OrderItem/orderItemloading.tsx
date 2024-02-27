import { useEffect, useState } from "react";
import tableStyles from "../../pages/table.module.scss";
import styles from "./orderitem.module.scss";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setOrderItemToFalse } from "../../redux/orderItemSlice";

import { resetSingleOrder } from "../../redux/ordersSlice";

import {reset} from "../../redux/ordersSlice"

import { IoCloseSharp } from "react-icons/io5";

import { getOneOrder } from "../../api/orders";

function LoadingOrderItem() {
  const dispatch = useAppDispatch();

  const { orderItem, id } = useAppSelector((state) => {
    return state.orderItem;
  });

  const { isError } = useAppSelector((state) => state.order);

  /*useEffect(() => {
    console.log("Getting order  " + id);

    if (orderItem) {
      getOneOrder(id, dispatch).then((response) => {
        console.log(response.result);

        if (response.orderRetreived) {
          const formatedDate = new Date(response.result.paymentIntent.created);
          console.log(formatedDate);
        }
      });
    }
  }, [orderItem]);*/

  return (
    <div className={ styles.orderItem}>
      <div className={styles.orderItemsContainer}>
        <section>
          <section className={styles.closeContainer}>
            <section>Order</section>
            <IoCloseSharp
              className={styles.close}
              onClick={() => {
                dispatch(setOrderItemToFalse());
                dispatch(resetSingleOrder())
              }}
            />
          </section>
        </section>

        <section    className={styles.loadingItem}       >
          <span className={styles.loader}></span>
        </section>
      </div>
    </div>
  );
}

export default LoadingOrderItem;

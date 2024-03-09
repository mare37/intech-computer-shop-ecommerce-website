import { useEffect, useState } from "react";
import tableStyles from "../../pages/table.module.scss";
import styles from "./enquiry.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setDisplayEnquiryToFalse } from "../../../redux/displayEnquirySlice";

import { reset } from "../../../redux/enquirySlice";

import { IoCloseSharp } from "react-icons/io5";


function LoadingEnquiry() {
  const dispatch = useAppDispatch();

  

  

 

  return (
    <div className={ styles.orderItem}>
      <div className={styles.orderItemsContainer}>
        <section>
          <section className={styles.closeContainer}>
            <section>Enquiry</section>
            <IoCloseSharp
              className={styles.close}
              onClick={() => {
                dispatch( setDisplayEnquiryToFalse ());
                dispatch(reset())
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

export default LoadingEnquiry

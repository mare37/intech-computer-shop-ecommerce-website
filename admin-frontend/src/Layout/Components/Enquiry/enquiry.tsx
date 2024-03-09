import { useState, useEffect } from "react";
import styles from "./enquiry.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setDisplayEnquiryToFalse } from "../../../redux/displayEnquirySlice";


import LoadingEnquiry from "./enquiryloading";

import { IoCloseSharp } from "react-icons/io5";

import { getOneEnquiry ,updateEnquiry} from "../../../api/enquiry";

function Enquiry() {
  const [data, setData] = useState<any>([]);
  const [enquiry, setEnquiry] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [date, setDate] = useState<any>();
  const [orderId, setEnquiryId] = useState("");
  const [orderStatus, setEnquiryStatus] = useState();

  const dispatch = useAppDispatch();

  const { displayEquiry, id } = useAppSelector((state) => state.displayEquiry);
 const {isLoading} = useAppSelector((state)=> state.oneMessage)

  console.log(id);

  useEffect(() => {
    console.log("Getting order  " + id);

    //Order item pop up is in view , hence its true.Therefore fetch data

    if (displayEquiry) {
      getOneEnquiry(id, dispatch).then((response) => {
        console.log(response.result);

        if (response.enquiryRetrieved) {
          const formatedDate = new Date(response.result.created);
          //  console.log(formatedDate);

          setName(response.result.name);
          setMobileNumber(response.result.mobile);
          setEmail(response.result.email);
          setEnquiry(response.result.comment);
          setDate(formatedDate.toUTCString());
          setEnquiryId(response.result._id);
          setEnquiryStatus(response.result.orderStatus);
          // setId(response.result._id)
        }
      });
    }
  }, [displayEquiry]);

  return (
    <>
      {isLoading ? (
        <LoadingEnquiry />
      ) : (
        <div
          className={!displayEquiry ? styles.removeOrderItem : styles.orderItem}
        >
          <div className={styles.orderItemsContainer}>
            <section>
              <section className={styles.closeContainer}>
                <section>Enquiry</section>
                <IoCloseSharp
                  className={styles.close}
                  onClick={() => {
                    dispatch(setDisplayEnquiryToFalse());
                    updateEnquiry(id, dispatch).then((response)=>{
                      console.log(response);
                      
                    })
                  }}
                />
              </section>
            </section>

            <section>
              <p>Date: {date}</p>

              <h3>From: {name}</h3>
              <p>Phone: {mobileNumber}</p>
              <p>City: Nairobi</p>
              <p>Email: {email}</p>
            </section>
            <section>
                {enquiry}
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default Enquiry

import { useEffect, useState } from "react";
import styles from "./orders.module.scss";
import tableStyles from "../table.module.scss";
import statusCell from "./statuscell";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { ToastContainer, toast } from "react-toastify";

import { getAllOrders } from "../../api/orders";
import { getOrdersWithoutLoading } from "../../api/orders";
import { setOrderId } from "../../redux/orderItemSlice";
import { setorderItemToTrue } from "../../redux/orderItemSlice";
import { setPopUpToTrue } from "../../redux/popupSlice";
import { setId } from "../../redux/popupSlice";

//React icons
import { IoFileTrayOutline } from "react-icons/io5";
import { BiError } from "react-icons/bi";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import { BiSolidTrashAlt } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { error } from "console";

interface orderby {
  firstName: string;
  lastName: string;
}

interface orderStatus {
  status: string;
  colour: string;
}

interface paymentIntent {
  amount: number;
}

type Order = {
  _id: number;
  orderby: orderby;
  orderStatus: orderStatus;
  paymentIntent: paymentIntent;
  createdAt: string;
};

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor("orderby", {
    header: "Name",
    cell: (info) => {
      return info.getValue().firstName + " " + info.getValue().lastName;
    },
  }),

  columnHelper.accessor("orderStatus", {
    header: "Order Status",
    cell: statusCell,
    size: 2000,
  }),
  columnHelper.accessor("createdAt", {
    header: "Date",
    //cell: (info) => info.getValue() ,
    cell: (info) => {
      const dateObject = new Date(info.row.original.createdAt);
      const date = dateObject.toLocaleString("en-UK", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return date;
    },
  }),

  columnHelper.accessor("paymentIntent", {
    header: "Amount",
    cell: (info) => info.getValue().amount,
  }),
];

function Orders() {
  const [data, setData] = useState<any>([]);
  const [ordersError, setOrdersError] = useState(false);

  const dispatch = useAppDispatch();

  const { isLoading, isSuccess, isError } = useAppSelector(
    (state) => state.order
  );


  const notifySingleOrderLoadError = () =>
    toast.error("Failed to load order! Something is wrong!", {
      autoClose: false,
    });


  useEffect(() => {
    getAllOrders(dispatch)
      .then((response) => {
        console.log(response);
        if (response.ordersRetrieved) {
          setData(response.result);
        } else {
          setOrdersError(true);
        }
      })
      .catch((error) => {
        console.log(error);

        setOrdersError(true);
      });
  }, []);

  useEffect(() => {
    // console.log("Now setting error");
    //  console.log(isError);
    //  setOrdersError(isError)
  }, [isError]);

  /*useEffect(() => {
    console.log("triggered");

    getAllOrders(dispatch).then((response) => {
      console.log(response);
      if (response.ordersRetrieved) {
        setData(response.result);
      }
    });
  }, [isSuccess]);*/

  


  useEffect(() => { 
    console.log("triggered");

    getOrdersWithoutLoading(dispatch).then((response) => {
      console.log(response);
      if (response.ordersRetrieved) {
        setData(response.result);
      } else {
       // notifyError();
      }
    });
  }, [isSuccess]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // console.log(table.getRowModel().rows);

  return (
    <div className={styles.orders}>
      <div className={styles.ordersContainer}>
        <div className={styles.table}>
          <h1>Recent Orders</h1>
          <section    className={tableStyles.boxShadow}            >
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <div key={headerGroup.id} className={styles.headerContainer}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <div key={header.id} className={styles.header}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    );
                  })}
                  <div className={styles.header}>Action</div>
                </div>
              );
            })}
          </section>

          {isLoading ? (
            <div className={tableStyles.noData}>
              <span className={tableStyles.loader2}></span>
            </div>
          ) : ordersError ? (
            <div className={tableStyles.noData}>
              <BiError className={tableStyles.errorIcon} />
              <p>Error!!</p>
            </div>
          ) : data.length === 0 ? (
            <div className={tableStyles.noData}>
              <IoFileTrayOutline className={tableStyles.doDataIcon} /> 
              <p>No data</p>
            </div>
          ) : (
            <section  className={tableStyles.boxShadow}      >
              {table.getRowModel().rows.map((row) => (
                <div className={styles.dataContainer} key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <div className={styles.data} key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  ))}
                  <div className={styles.data}>
                    <BiEditAlt
                      className={styles.edit}
                      size={30}
                      onClick={() => {
                        dispatch(setorderItemToTrue());
                        dispatch(setOrderId({ id: row.original._id }));
                        // setDeleteButton(true)
                      }}
                    />
                    <BiSolidTrashAlt
                      className={styles.trash}
                      size={30}
                      onClick={() => {
                        dispatch(setPopUpToTrue());
                        dispatch(setId({ id: row.original._id }));
                        // setDeleteButton(true)
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                  </div>
                </div>
              ))}
            </section>
          )}

          <br />

          <section            >
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </section>
          <br />
          <div className={tableStyles.navigatepages}>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;

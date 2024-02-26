import { useEffect, useState } from "react";
import isOnline from "is-online";
import styles from "./orders.module.scss";
import tableStyles from "../table.module.scss";
import statusCell from "./statuscell";
import { ToastContainer, toast } from "react-toastify";

import Loading from "../../Layout/Loading/loading";
import ConnectionError from "../../Layout/ConnectionError/connectionerror";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { setPopUpToTrue, setId } from "../../redux/popupSlice";
import { resetSetDeleteAction } from "../../redux/deleteActionSlice";
import { setorderItemToTrue, setOrderId } from "../../redux/orderItemSlice";

import { getAllOrders, getOrdersWithoutLoading } from "../../api/orders";

import { IoFileTrayOutline } from "react-icons/io5";
import { BiSolidTrashAlt } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";

import { IoIosOpen } from "react-icons/io";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

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
  const [online, setOnline] = useState<boolean>();
  const [showError, setShowError] = useState<boolean>();
  const [data, setData] = useState<any>([]);
  const [fetchingData, setFetchingData] = useState(false);

  const dispatch = useAppDispatch();

  const { isLoading, isSuccess } = useAppSelector((state) => state.order);
  const { deleteAction } = useAppSelector((state) => state.deleteAction);

  const notifyError = () =>
    toast.error("Failed to load orders! Something is wrong!", {
      autoClose: false,
    });

  const notifyDeleteError = () =>
    toast.error("Failed to delete! Something is wrong!", {
      autoClose: false,
    });
  useEffect(() => {
    isOnline()
      .then((response: boolean) => {
        setOnline(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    getAllOrders(dispatch).then((response) => {
      console.log(response);
      if (response.ordersRetrieved) {
        setData(response.result);
      } else {
        notifyError();
      }
    });
  }, []);

  useEffect(() => {
    console.log("triggered");

    getOrdersWithoutLoading(dispatch).then((response) => {
      console.log(response);
      if (response.ordersRetrieved) {
        setData(response.result);
      } else {
        notifyError();
      }
    });
  }, [isSuccess]);

  useEffect(() => {
    if (deleteAction === true) {
      getAllOrders(dispatch).then((response) => {
        console.log(response);
        if (response.ordersRetrieved) {
          setData(response.result);
        } else {
          notifyError();
        }
      });
    }

    if (deleteAction === false) {
      notifyDeleteError();
    }

    dispatch(resetSetDeleteAction());
  }, [deleteAction]);

  // Hide error component when page loads and internet connection exists
  useEffect(() => {
    const timer = setTimeout(() => setShowError(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // console.log(table.getRowModel().rows);

  return (
    <div>
      {online === true || online === false ?(
        isLoading ? (
          <Loading />
        ) : (
          <div className={styles.orders}>
            <ToastContainer theme="light" position="top-center" />
            <div className={styles.ordersContainer}>
              <div className={tableStyles.table}>
                <h1 className={tableStyles.heading}>Orders</h1>
                <section className={tableStyles.boxShadow}>
                  {table.getHeaderGroups().map((headerGroup) => {
                    return (
                      <div
                        key={headerGroup.id}
                        className={styles.headerContainer}
                      >
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

                {data.length === 0 ? (
                  <div className={tableStyles.noData}>
                    {" "}
                    <IoFileTrayOutline
                      className={tableStyles.doDataIcon}
                    />{" "}
                    <p>No data</p>{" "}
                  </div>
                ) : (
                  <section className={tableStyles.boxShadow}>
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
                          <IoIosOpen
                            className={styles.open}
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

                <section>
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
        )
      ) : showError ? (
        <ConnectionError />
      ) : (
        ""
      )}
    </div>
  );
}

export default Orders;

import { useState, useEffect } from "react";
import styles from "./enquiries.module.scss";
import tableStyles from "../table.module.scss";
import isOnline from "is-online";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  setDisplayEnquiryToTrue,
  setEquiryId,
} from "../../redux/displayEnquirySlice";
import { setPopUpToTrue, setId } from "../../redux/popupSlice";
import { resetSetDeleteAction } from "../../redux/deleteActionSlice";
import { setDisplayEnquiryToFalse } from "../../redux/displayEnquirySlice";
import { resetOneMessage } from "../../redux/oneMessageSlice";

import Loading from "../../Layout/Loading/loading";
import ConnectionError from "../../Layout/ConnectionError/connectionerror";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import {
  getAllEnquiries,
  getAllEnquiriesWithoutLoading,
} from "../../api/enquiry";

import { BiSolidTrashAlt } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { IoIosOpen } from "react-icons/io";
import { IoFileTrayOutline } from "react-icons/io5";

/*const DATA = [
  {
    sNo: 1,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    status: "unread"
  },
  {
    sNo: 2,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    status: "unread"
  },
  
 
];*/

type Enquiry = {
  _id: number;
  sNo: number;
  name: string;
  email: string;
  mobile: string;
  enquiryStatus: string;
};

const columnHelper = createColumnHelper<Enquiry>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("mobile", {
    header: "Mobile",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("enquiryStatus", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
];

function Enquiries() {
  const [data, setData] = useState<any>([]);
  const [online, setOnline] = useState<boolean>();
  const [showError, setShowError] = useState<boolean>();

  const dispatch = useAppDispatch();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { isLoading, isSuccess } = useAppSelector((state) => state.enquiry);
  const { deleteAction } = useAppSelector((state) => state.deleteAction);
  const { isError } = useAppSelector((state) => state.oneMessage);

  const notifyLoadError = () =>
    toast.error("Failed to load! Something is wrong! ", { autoClose: false });
  const notify = () => toast.success("Deleted Successfully!");
  const notifyError = () => toast.error("Failed to delete!");
  const notifyEnquiryloadError = () =>
    toast.error("Failed to load Enquiry!", { autoClose: false });

  useEffect(() => {
    isOnline()
      .then((response: boolean) => {
        setOnline(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    getAllEnquiries(dispatch)
      .then((response) => {
        console.log(response);
        console.log("triggered");
        if (response.enquiriesRetrieved) {
          setData(response.result.reverse());
        } else {
          notifyLoadError();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getAllEnquiriesWithoutLoading(dispatch)
      .then((response) => {
        console.log(response);
        console.log("triggered");
        if (response.enquiriesRetrieved) {
          setData(response.result.reverse());
        } else {
          notifyLoadError();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isSuccess]);

  useEffect(() => {
    if (deleteAction === true) {
      getAllEnquiries(dispatch)
        .then((response) => {
          //console.log(response.result);

          setData(response.result.reverse());
          notify();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (deleteAction === false) {
      notifyError();
    }

    dispatch(resetSetDeleteAction());
  }, [deleteAction]);

  // Hide error component when page loads and internet connection exists
  useEffect(() => {
    const timer = setTimeout(() => setShowError(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isError) {
      console.log(isError);

      dispatch(setDisplayEnquiryToFalse());
      dispatch(resetOneMessage());

      //unable to load one message
      notifyEnquiryloadError();
    }
  }, [isError]);

  console.log(table.getRowModel().rows);

  return (
    <div>
      {online ? (
        isLoading ? (
          <Loading />
        ) : (
          <div className={styles.enquiries}>
            <ToastContainer theme="light" position="top-center" />
            <div className={styles.enquiriesContainer}>
              <div className={tableStyles.table}>
                <h1 className={tableStyles.heading}>Enquiries</h1>
                <section className={tableStyles.boxShadow}>
                  {table.getHeaderGroups().map((headerGroup) => {
                    return (
                      <div
                        key={headerGroup.id}
                        className={tableStyles.headerContainer}
                      >
                        {headerGroup.headers.map((header) => {
                          return (
                            <div key={header.id} className={tableStyles.header}>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                          );
                        })}
                        <div className={tableStyles.header}>Action</div>
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
                        {row.getVisibleCells().map((cell) => {
                          console.log(cell);

                          if (row.original.enquiryStatus === "Unread") {
                            return (
                              <div className={styles.data} key={cell.id}>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </div>
                            );
                          }

                          if (row.original.enquiryStatus === "Read") {
                            return (
                              <div
                                style={{ color: "gray" }}
                                className={styles.data}
                                key={cell.id}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </div>
                            );
                          }
                        })}
                        <div className={tableStyles.data}>
                          <IoIosOpen
                            className={tableStyles.open}
                            size={30}
                            onClick={() => {
                              dispatch(setDisplayEnquiryToTrue());
                              dispatch(setEquiryId({ id: row.original._id }));
                              // setDeleteButton(true)
                            }}
                          />
                          <BiSolidTrashAlt
                            className={tableStyles.trash}
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

export default Enquiries;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import isOnline from "is-online";
import Loading from "../../Layout/Loading/loading";
import ConnectionError from "../../Layout/ConnectionError/connectionerror";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllBrands } from "../../api/brand";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { reset } from "../../redux/brandSlice";
import { setPopUpToFalse, setPopUpToTrue, setId } from "../../redux/popupSlice";
import { setDeleteActionToFalse } from "../../redux/deleteActionSlice";
import { isLoading, isSuccess, isError } from "../../redux/brandSlice";
import styles from "./addbrand.module.scss";
import tableStyles from "../table.module.scss";
import { IoFileTrayOutline } from "react-icons/io5";
import { Column } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { BiSolidTrashAlt } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { error } from "console";

type Brand = {
  _id: Number;
  title: string;
  /* createdAt:string
  status:string
   updatedAt:string
    __v:number*/
};

const columnHelper = createColumnHelper<Brand>();

const columns = [
  columnHelper.accessor("_id", {
    header: "Serial No.",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("title", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
];

function BrandList() {
  const [online, setOnline] = useState<boolean>();
  const [showError, setShowError] = useState<boolean>();
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const popup = useAppSelector((state) => {
    return state.popUpController.popup;
  });
  const { isSuccess, isError, isLoading } = useAppSelector((state) => {
    return state.brand;
  });
  const { deleteAction } = useAppSelector((state) => state.deleteAction);

  const notify = () => toast.success("Deleted Successfully!");
  const notifyError = () => toast.error("Failed to delete!");

  // Hide error component when page loads and internet connection exists
  useEffect(() => {
    const timer = setTimeout(() => setShowError(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (deleteAction) {
      getAllBrands(dispatch)
        .then((response) => {
          //console.log(response.result);
          console.log("triggered");

          setData(response.result.reverse());
          dispatch(setDeleteActionToFalse());
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [deleteAction]);

  useEffect(() => {
    isOnline()
      .then((response: boolean) => {
        setOnline(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    getAllBrands(dispatch)
      .then((response) => {
        console.log(response.result);
        console.log("triggered");

        setData(response.result.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      notify();
      console.log("success");
      dispatch(reset());
    }
    if (isError) {
      notifyError();
      dispatch(reset());
    }
  }, [isSuccess, isError]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  //console.log(table.getRowModel().rows);

  return (
    <div>
      {online ? (
        isLoading ? (
          <Loading />
        ) : (
          <div className={styles.addbrand}>
            <div className={styles.addbrandContainer}>
              <ToastContainer theme="light" />
              <div className={styles.table}>
                <h1>Brands</h1>
                <section>
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
                   <div className={tableStyles.noData}  > <IoFileTrayOutline  className={tableStyles.doDataIcon} />  <p>No data</p>   </div>
                ) : (
                  <section className={styles.tableData}>
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
                            onClick={() => {
                              navigate(
                                `/admin/updatebrand/${row.original._id}`
                              );
                            }}
                            className={styles.edit}
                            size={30}
                          />

                          <BiSolidTrashAlt
                            onClick={() => {
                              dispatch(setPopUpToTrue());
                              dispatch(setId({ id: row.original._id }));
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className={styles.trash}
                            size={30}
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
                <div className={styles.navigatepages}>
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

export default BrandList;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import isOnline from "is-online";
import Loading from "../../Layout/Loading/loading";
import ConnectionError from "../../Layout/ConnectionError/connectionerror";
import { ToastContainer, toast } from "react-toastify";
import { setPopUpToTrue, setId } from "../../redux/popupSlice";
import { setDeleteActionToFalse } from "../../redux/deleteActionSlice";
import { reset } from "../../redux/colourSlice";
import styles from "./addcolor.module.scss";
import tableStyles from "../table.module.scss";
import { IoFileTrayOutline } from "react-icons/io5";
import { getAllColours } from "../../api/colour";
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

type Colour = {
  _id: string;
  title: string;
  /* createdAt:string
  status:string
   updatedAt:string
    __v:number*/
};

const columnHelper = createColumnHelper<Colour>();

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

function ColourList() {
  const [online, setOnline] = useState<boolean>();
  const [showError, setShowError] = useState<boolean>();
  const [data, setData] = useState<any>([]);

  const navigate = useNavigate();

  // const notify = () => toast.success("Deleted Successfully!")
  const notify = () =>
    toast("Deleted successfully", { position: "top-center", type: "success" });
  const notifyError = () => toast.error("Failed to delete!");

  const dispatch = useAppDispatch();
  const popup = useAppSelector((state) => {
    return state.popUpController.popup;
  });

  const { isError, isLoading, isSuccess } = useAppSelector(
    (state) => state.colour
  );

  const { deleteAction } = useAppSelector((state) => state.deleteAction);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Hide error component when page loads and internet connection exists
  useEffect(() => {
    const timer = setTimeout(() => setShowError(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    isOnline()
      .then((response: boolean) => {
        setOnline(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    getAllColours(dispatch)
      .then((response) => {
        console.log(response?.result);
        console.log("triggered");

        setData(response?.result.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // If user has decided to to click ok button on delete in pop up window,
  // go ahead and fetch data again to refresh the page
  useEffect(() => {
    if (deleteAction) {
      getAllColours(dispatch).then((response) => {
        console.log(response.result);
        console.log("triggered");

        setData(response.result.reverse());
        dispatch(setDeleteActionToFalse());
      });
    }
  }, [deleteAction]);

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

  return (
    <div>
      {online ? (
        isLoading ? (
          <Loading />
        ) : (
          <div className={styles.addcolor}>
            <div className={styles.addcolorContainer}>
              <ToastContainer theme="light" />
              <div className={tableStyles.table}>
                <h1>Colours</h1>
                <section>
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
                  <section className={tableStyles.tableData}>
                    {table.getRowModel().rows.map((row) => (
                      <div className={tableStyles.dataContainer} key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <div className={tableStyles.data} key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        ))}
                        <div className={tableStyles.data}>
                          <BiEditAlt
                            onClick={() => {
                              navigate(
                                `/admin/updatecolour/${row.original._id}`
                              );
                            }}
                            className={tableStyles.edit}
                            size={30}
                          />
                          <BiSolidTrashAlt
                            onClick={() => {
                              dispatch(setPopUpToTrue());
                              dispatch(setId({ id: row.original._id }));
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className={tableStyles.trash}
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

export default ColourList;

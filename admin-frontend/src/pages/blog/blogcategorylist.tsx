import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import isOnline from "is-online";
import Loading from "../../Layout/Loading/loading";
import ConnectionError from "../../Layout/ConnectionError/connectionerror";
import styles from "./blog.module.scss";
import tableStyles from "../table.module.scss";
import { IoFileTrayOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";

import { setDeleteActionToFalse,resetSetDeleteAction } from "../../redux/deleteActionSlice";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { setPopUpToTrue, setId } from "../../redux/popupSlice";
import { getAllBlogCategories } from "../../api/blogcategory";
import {
  reset,
  resetGettingBlogCategories,
} from "../../redux/blogcategorySlice";

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

type BlogCategory = {
  _id: string;
  title: string;
};

const columnHelper = createColumnHelper<BlogCategory>();

const columns = [
  columnHelper.accessor("_id", {
    header: "Serial No.",
    cell: (info) => {
      if (info.row.original._id.length > 5) {
        return info.row.original._id.slice(0, 8) + "...";
      }
    },
  }),
  columnHelper.accessor("title", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
];

function BlogCategoryList() {
  const [online, setOnline] = useState<boolean>();
  const [showError, setShowError] = useState<boolean>();
  const [data, setData] = useState<any>([]);
  const [pageFetchingData, setPageFetchingData] = useState(false);
  const [delectingAction, setDeletingAction] = useState(false);

  const navigate = useNavigate();

  const { popup } = useAppSelector((state) => state.popUpController);
  const { isSuccess, isLoading, isError, gettingBlogCategories } =
    useAppSelector((state) => state.blogCategory);

  const { deleteAction } = useAppSelector((state) => state.deleteAction);

  const dispatch = useAppDispatch();

  //  Notify that the deletion was successfull when this page loads
  const notify = () => toast.success("Deleted Successfully!");

  //server error
  const notifyServerError = () => toast.error("Something went wrong! Failed to load");

  //Notify if there was an error during delection. :)
  const notifyError = () => toast.error("Failed to delete!");

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
    console.log("Delete action " + deleteAction);

    if (deleteAction  === true) {
      console.log("Deleted action complete");

      getAllBlogCategories(dispatch)
      .then((response) => {
        console.log(response);
        setData(response.result   );
        notify();
        //  dispatch(reset());
        dispatch(resetGettingBlogCategories());
      })
      .catch((err) => {
        console.log();
      });
    } 

    if(deleteAction === false){
      notifyError();
    }
    dispatch(resetSetDeleteAction());
  }, [deleteAction]);


















  useEffect(() => {
    isOnline().then((response: boolean) => {
      setOnline(response);
      console.log(response);
    });

    getAllBlogCategories(dispatch)
      .then((response) => {
        console.log(response);
        if(response.blogCatRetrieved) {
          setData(response.result);
        }else{
          notifyServerError()
          
        }
       
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  

  return (
    <div>
      {online ? (
        isLoading ? (
          <Loading />
        ) : (
          <div className={styles.blog}>
           <ToastContainer theme="light"   position="top-center"/>
            <div className={styles.blogContainer}>
              <div className={tableStyles.table}>
                <h1      className={tableStyles.heading}         >Blog categories</h1>
                <section       className={tableStyles.boxShadow }             >
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
                  <section  className={tableStyles.boxShadow }>
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
                                `/admin/updateblogcategory/${row.original._id}`
                              );
                            }}
                            className={tableStyles.edit}
                            size={30}
                          />
                          <BiSolidTrashAlt
                            onClick={() => {
                              dispatch(setPopUpToTrue());
                              dispatch(setId({ id: row.original._id }));
                              // setDeleteButton(true)
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

export default BlogCategoryList;

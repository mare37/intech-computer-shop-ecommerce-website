import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isOnline from "is-online";
import Loading from "../../Layout/Loading/loading";
import ConnectionError from "../../Layout/ConnectionError/connectionerror";
import { getAllProductCategories } from "../../api/productcatetory";
import { useDispatch } from "react-redux";
import {
  setDeleteActionToFalse,
  resetSetDeleteAction,
} from "../../redux/deleteActionSlice";
import { setId, setPopUpToTrue } from "../../redux/popupSlice";
import {
  reset,
  resetGettingProductCategories,
} from "../../redux/productcategorySlice";
import styles from "./productcategory.module.scss";
import tableStyles from "../table.module.scss";
import { ToastContainer, toast } from "react-toastify";
import { IoFileTrayOutline } from "react-icons/io5";

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
import { useAppSelector } from "../../hooks";

const DATA = [
  {
    sNo: 1,
    title: "Smartphones",
  },
  {
    sNo: 2,
    title: "Tvs",
  },
];

type ProductCategory = {
  _id: number;
  title: string;
};

const columnHelper = createColumnHelper<ProductCategory>();

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

function ProductCategoryList() {
  const [online, setOnline] = useState<boolean>();
  const [showError, setShowError] = useState<boolean>();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const popup: any = useAppSelector((state) => state.popUpController.popup);
  const { isSuccess, isError, gettingProductCategories, isLoading } =
    useAppSelector((state) => state.productCategory);
  const { deleteAction } = useAppSelector((state) => state.deleteAction);

  const notify = () => toast.success("Deleted Successfully!");
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
    isOnline()
      .then((response: boolean) => {
        setOnline(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    getAllProductCategories(dispatch).then((response) => {
      console.log(response.result);

      setData(response.result.reverse());
    });
  }, []);

  useEffect(() => {
    console.log("Delete action " + deleteAction);

    if (deleteAction  === true) {
      console.log("Deleted action complete");

      getAllProductCategories(dispatch).then((response) => {
        console.log(response.result);

        setData(response.result.reverse());
        notify();
      });
    } 

    if(deleteAction === false){
      notifyError();
    }
    dispatch(resetSetDeleteAction());
  }, [deleteAction]);

  /*useEffect(()=>{
    if (isSuccess === true  && gettingProductCategories === false) { 

      console.log("Getting " +  gettingProductCategories);
      
     
      console.log("success");
      notify()
      dispatch(reset());
   
     // dispatch( resetGet())
    }
    if (isSuccess === true  && gettingProductCategories === true) {
     
      console.log("success");
     // notify()
     dispatch( reset())
     dispatch( resetGettingProductCategories())
   
    
    }
  

  

  },[isSuccess, isError])*/

  return (
    <div>
      {online ? (
        isLoading ? (
          <Loading />
        ) : (
          <div className={styles.addProductCategory}>
            <div className={styles.addProductCategoryContainer}>
              <ToastContainer theme="light" />
              <div className={tableStyles.table}>
                <h1 className={tableStyles.heading}>Product Categories</h1>
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
                  <section className={tableStyles.boxShadow}>
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
                                `/admin/updateproductcategory/${row.original._id}`
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

export default ProductCategoryList;

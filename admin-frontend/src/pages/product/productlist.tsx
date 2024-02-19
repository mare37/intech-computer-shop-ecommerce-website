import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import isOnline from "is-online";
import Loading from "../../Layout/Loading/loading";
import ConnectionError from "../../Layout/ConnectionError/connectionerror";
import { ToastContainer, toast } from "react-toastify";
import { setPopUpToTrue, setId } from "../../redux/popupSlice";
import { reset, resetGettingProducts } from "../../redux/productSlice";
import {
  setDeleteActionToFalse,
  resetSetDeleteAction,
} from "../../redux/deleteActionSlice";
import { getAllProducts } from "../../api/product";
import { IoFileTrayOutline } from "react-icons/io5";
import styles from "./product.module.scss";
import tableStyles from "../table.module.scss";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { BiSolidTrashAlt } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";

interface brand {
  title: string;
}

interface category {
  title: string;
}

interface colour {
  title: string;
}

type Product = {
  _id: string;
  title: string;
  brand: brand;
  quantity: number;
  category: category;
  colour: colour;
  price: number;
};

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("brand", {
    header: "Brand",
    cell: (info) => info.getValue().title,
  }),
  columnHelper.accessor("quantity", {
    header: "Quantity",
    size: 150,
    minSize: 20,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => info.getValue().title,
  }),
  columnHelper.accessor("colour", {
    header: "Colour",
    cell: (info) => info.getValue().title,
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => info.getValue() + "/-",
  }),
];

function ProductList() {
  const [online, setOnline] = useState<boolean>();
  const [showError, setShowError] = useState<boolean>();
  const [data, setData] = useState([]);
  const [deleteButton, setDeleteButton] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { deleteAction } = useAppSelector((state) => state.deleteAction);
  const {
    productIsError,
    productIsSuccess,
    productIsLoading,
    gettingProducts,
  } = useAppSelector((state) => state.product);

  const { popup } = useAppSelector((state) => state.popUpController);

  const dataloaded = () => toast.success("Data loaded ");
  const notify = () => toast.success("Deleted Successfully!", {position:"top-center"});
  const notifyError = () => toast.error("Failed to delete!",{autoClose:false});
  const notifyLoadError = () => toast.error("Failed to load! Something is wrong!",{autoClose:false});


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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

    getAllProducts(dispatch)
      .then((response) => {
        console.log(response);

        if(response.productRetrieved ){
          setData(response?.result.reverse());
        }else{
          notifyLoadError()
        }

       
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Hide error component when page loads and internet connection exists
  useEffect(() => {
    const timer = setTimeout(() => setShowError(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (deleteAction === true) {
      getAllProducts(dispatch)
        .then((response) => {
       

          if(response.productRetrieved ){
            setData(response?.result.reverse());
            notify();
          }else{
            notifyLoadError()
          }

        
        
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (deleteAction === false) {
      notifyError();
    }

    dispatch(resetSetDeleteAction());
  }, [deleteAction]);
  

  return (
    <div>
      {online ? (
        productIsLoading ? (
          <Loading />
        ) : (
          <div className={styles.product}>
            <ToastContainer theme="light" />
            <div
              className={`${styles.productContainer}     ${tableStyles.verticalScroll}`}
            >
              <div className={tableStyles.table}>
                <h1>Products</h1>
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
                                `/admin/updateproduct/${row.original._id}`
                              );
                            }}
                            className={tableStyles.edit}
                            size={30}
                          />
                          <BiSolidTrashAlt
                            onClick={() => {
                              dispatch(setPopUpToTrue());
                              dispatch(setId({ id: row.original._id }));
                              setDeleteButton(true);
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

export default ProductList;

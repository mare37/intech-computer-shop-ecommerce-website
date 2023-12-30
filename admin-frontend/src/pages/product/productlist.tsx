import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { setPopUpToTrue, setId } from "../../redux/popupSlice";
import { reset, resetGettingProducts } from "../../redux/productSlice";
import { getAllProducts } from "../../api/product";
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
  const [data, setData] = useState([]);
  const [deleteButton, setDeleteButton] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    productIsError,
    productIsSuccess,
    productIsLoading,
    gettingProducts,
  } = useAppSelector((state) => state.product);

  const { popup } = useAppSelector((state) => state.popUpController);

  const dataloaded = () => toast.success("Data loaded ");
  const notify = () => toast.success("Deleted Successfully!");
  const notifyError = () => toast.error("Failed to delete!");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    getAllProducts(dispatch)
      .then((response) => {
        console.log(response?.data);

        setData(response?.data?.result.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getAllProducts(dispatch)
      .then((response) => {
        console.log(response?.data?.result);

        setData(response?.data?.result.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [popup]);
  useEffect(() => {
    if (productIsSuccess === true && gettingProducts === true) {
      console.log("success");
      dispatch(reset());
      dispatch(resetGettingProducts());
    }
    if (productIsSuccess === true && gettingProducts === false) {
      //dataloaded successfully
      notify();
      console.log("success");
      dispatch(reset());
    }
    if (productIsError) {
      notifyError();
      dispatch(reset());
    }
  }, [productIsSuccess, productIsError]);

  return (
    <div className={styles.product}>
      <ToastContainer theme="light" />
      <div className={styles.productContainer}>
        <div className={tableStyles.table}>
          <h1>Products</h1>
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

          <section className={tableStyles.tableData}>
            {table.getRowModel().rows.map((row) => (
              <div className={tableStyles.dataContainer} key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <div className={tableStyles.data} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
                <div className={tableStyles.data}>
                  <BiEditAlt
                    onClick={() => {
                      navigate(`/admin/updateproduct/${row.original._id}`);
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
  );
}

export default ProductList;

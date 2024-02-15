import { useEffect, useState } from "react";
import styles from "./coupon.module.scss";
import { useNavigate } from "react-router-dom";
import isOnline from "is-online";
import Loading from "../../Layout/Loading/loading";
import ConnectionError from "../../Layout/ConnectionError/connectionerror";
import { setDeleteActionToFalse } from "../../redux/deleteActionSlice";
import tableStyles from "../table.module.scss";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setPopUpToTrue } from "../../redux/popupSlice";
import { setId } from "../../redux/popupSlice";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { getAllCoupons } from "../../api/coupon";

import { BiSolidTrashAlt } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { IoFileTrayOutline } from "react-icons/io5";

type Coupon = {
  _id: string;
  name: string;
  discount: number;
  expiry: string;
};

const columnHelper = createColumnHelper<Coupon>();

const columns = [
  columnHelper.accessor("_id", {
    header: "Serial No.",
    cell: (info) => {
      if (info.row.original._id.length > 5) {
        return info.row.original._id.slice(0, 8) + "...";
      }
    },
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("discount", {
    header: "Discount",
    cell: (info) => {
      return info.row.original.discount + "%";
    },
  }),
  columnHelper.accessor("expiry", {
    header: "Expiry",
    cell: (info) => {
      const dateObject = new Date(info.row.original.expiry);
      const date = dateObject.toLocaleString("en-UK", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return date;
    },
  }),
];

function CouponList() {
  const [online, setOnline] = useState<boolean>();
  const [showError, setShowError] = useState<boolean>();
  const [data, setData] = useState<any>([]);

  const [ serverError , setServerError] = useState(false)

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.coupon);
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
    if (deleteAction) {
      getAllCoupons(dispatch)
        .then((response) => {
          setData(response.result.reverse());
          dispatch(setDeleteActionToFalse());
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [deleteAction]);

  useEffect(() => {
    //First we check if there is an internet connection
    isOnline()
      .then((response: boolean) => {
        setOnline(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    getAllCoupons(dispatch)
      .then((response) => {
        console.log(response);
        if(response.couponsRetrieved ){
          setData(response.result.reverse());
        }else{
          console.log("SERVER ERROR");
          
          setServerError(true)
        }
       
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {online ? (
        isLoading ? (
          <Loading />
        ) : (
          <div className={styles.coupon}>
            <div className={styles.couponContainer}>
              <div className={tableStyles.table}>
                <h1  className={tableStyles.heading}   >Coupons</h1>
                <section   className={tableStyles.boxShadow }        >
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

                { serverError? <p>Something went wrong</p>   :          (data.length === 0 ? (
                   <div className={tableStyles.noData}  > <IoFileTrayOutline  className={tableStyles.doDataIcon} />  <p>No data</p>   </div>
                ) :(              <section className={tableStyles.boxShadow }>
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
                          className={tableStyles.edit}
                          size={30}
                          onClick={() => {
                            navigate(`/admin/updatecoupon/${row.original._id}`);
                          }}
                        />
                        <BiSolidTrashAlt
                          className={tableStyles.trash}
                          size={30}
                          onClick={() => {
                            dispatch(setPopUpToTrue());
                            dispatch(setId({ id: row.original._id }));
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </section>                          ))}
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

export default CouponList;

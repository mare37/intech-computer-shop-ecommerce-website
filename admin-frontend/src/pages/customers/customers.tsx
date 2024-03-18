import { useState, useEffect } from "react";
import styles from "./customers.module.scss";
import tableStyles from "../table.module.scss";
import isOnline from "is-online";
import { useAppDispatch, useAppSelector } from "../../hooks";
import StatusCell from "./statucell";

import ConnectionError from "../../Layout/ConnectionError/connectionerror";
import Loading from "../../Layout/Loading/loading";
import { getAllUsers,getAllUsersWithoutLoading } from "../../api/users";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";



import { IoIosOpen } from "react-icons/io";



type Customer = {
  firstName: string;
  lastName: string;
  status: string;
  name: string;
  email: string;
  mobile: string;
};

const columnHelper = createColumnHelper<Customer>();

const columns = [
  columnHelper.accessor("firstName", {
    header: "First Name",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("lastName", {
    header: "Last Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: StatusCell,
  }),

  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("mobile", {
    header: "Mobile",
    cell: (info) => info.getValue(),
  }),
];

function Customers() {
  const [online, setOnline] = useState<boolean>();
  const [showError, setShowError] = useState<boolean>();
  const [data, setData] = useState<any>([]);

  const dispatch = useAppDispatch();

  const { isLoading, isSuccess } = useAppSelector((state) => state.user);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    /*isOnline()
      .then((response: boolean) => {
        setOnline(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });*/

      isOnline()
      .then((response: boolean) => {
        setOnline(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    getAllUsers(dispatch)
      .then((response) => {
        console.log(response);

        if (response.usersRetrieved) {
          setData(response.result);
        } else {
          //notifyLoadError()
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    /*isOnline()
      .then((response: boolean) => {
        setOnline(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });*/

      getAllUsersWithoutLoading(dispatch)
      .then((response) => {
        console.log(response);

        if (response.usersRetrieved) {
          setData(response.result);
        } else {
          //notifyLoadError()
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isSuccess]);

  // Hide error component when page loads and internet connection exists
  useEffect(() => {
    const timer = setTimeout(() => setShowError(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  console.log(table.getRowModel().rows);

  return (
    <div>
      {online ? (
        isLoading ? (
          <Loading />
        ) : (
          <div className={styles.customers}>
            <div className={styles.customersContainer}>
              <div className={tableStyles.table}>
                <h1 className={tableStyles.heading}>Customers</h1>
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
                        <div className={tableStyles.header}>Actions</div>
                      </div>
                    );
                  })}
                </section>

                <section className={tableStyles.boxShadow}>
                  {table.getRowModel().rows.map((row) => (
                    <div className={tableStyles.dataContainer} key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <div className={tableStyles.data} key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        );
                      })}
                      <div className={tableStyles.data}>
                        <IoIosOpen
                          className={styles.open}
                          size={30}
                          onClick={() => {
                            //dispatch(setorderItemToTrue());
                            //  dispatch(setOrderId({ id: row.original._id }));
                            // setDeleteButton(true)
                          }}
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
        )
      ) : showError ? (
        <ConnectionError />
      ) : (
        ""
      )}
    </div>
  );
}

export default Customers;

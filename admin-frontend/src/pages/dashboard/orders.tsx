import { useState } from "react";
import styles from "./orders.module.scss";
import tableStyles from "../table.module.scss";
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

const DATA = [
  {
    sNo: 1,
    name: "Will",
    product: ["o",'fcfhhv'],
    date: "6/6/2023",
    amount: "555",
  },
  {
    sNo: 2,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 3,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 4,
    name: "Will",
    product: ["o",'fcfhhv'],
    date: "6/6/2023",
    amount: "555",
  },
  {
    sNo: 5,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 6,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 7,
    name: "Will",
    product: ["o",'fcfhhv'],
    date: "6/6/2023",
    amount: "555",
  },
  {
    sNo: 8,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 9,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 10,
    name: "Will",
    product: ["o",'fcfhhv'],
    date: "6/6/2023",
    amount: "555",
  },
  {
    sNo: 11,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 12,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 1,
    name: "Will",
    product: ["o",'fcfhhv'],
    date: "6/6/2023",
    amount: "555",
  },
  {
    sNo: 2,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 3,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 4,
    name: "Will",
    product: ["o",'fcfhhv'],
    date: "6/6/2023",
    amount: "555",
  },
  {
    sNo: 5,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 6,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 7,
    name: "Will",
    product: ["o",'fcfhhv'],
    date: "6/6/2023",
    amount: "555",
  },
  {
    sNo: 8,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 9,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 10,
    name: "Will",
    product: ["o",'fcfhhv'],
    date: "6/6/2023",
    amount: "555",
  },
  {
    sNo: 11,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 12,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },
  {
    sNo: 1,
    name: "Will",
    product: ["o",'fcfhhv'],
    date: "6/6/2023",
    amount: "555",
  },
  {
    sNo: 2,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 3,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 4,
    name: "Will",
    product: ["o",'fcfhhv'],
    date: "6/6/2023",
    amount: "555",
  },
  {
    sNo: 5,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 6,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 7,
    name: "Will",
    product: ["o",'fcfhhv'],
    date: "6/6/2023",
    amount: "555",
  },
  {
    sNo: 8,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 9,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 10,
    name: "Will",
    product: ["o",'fcfhhv'],
    date: "6/6/2023",
    amount: "555",
  },
  {
    sNo: 11,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },

  {
    sNo: 12,
    name: "Will",
    product: ["g"],
    date: "6/6/2023",
    amount: "555",
  },
];

type Order = {
  sNo: number;
  name: string;
  product: string[];
  date: string;
  amount: string;
};

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor("sNo", {
    header: "Serial No.",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("product", {
    header: "Products",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) => info.getValue(),
  }),
];

function Orders() {
  const [data, setData] = useState(DATA);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  console.log(table.getRowModel().rows);

  return (
    <div className={styles.orders}>
      <div className={styles.ordersContainer}>
        <div className={styles.table}>
          <h1>Recent Orders</h1>
          <section>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <div key={headerGroup.id} className={styles.headerContainer}>
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

          <section className={styles.tableData}>
            {table.getRowModel().rows.map((row) => (
              <div className={styles.dataContainer} key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <div className={styles.data} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
                <div className={styles.data}>
                  <BiEditAlt className={styles.edit} size={30} />
                  <BiSolidTrashAlt className={styles.trash} size={30} />
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

export default Orders;

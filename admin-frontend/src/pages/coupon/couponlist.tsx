import { useState } from "react";
import styles from "./coupon.module.scss";
import tableStyles from "../table.module.scss"
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
    title: "4HQV",
    discount: 5,
    expiry: "6/6/2023"
  },
  {
    sNo: 2,
    title: "4HQV",
    discount: 5,
    expiry: "6/6/2023"
  },
 
];

type Coupon= {
  sNo: number;
  title: string;
  discount:number,
  expiry:string

};

const columnHelper = createColumnHelper<Coupon>();



const columns = [
  columnHelper.accessor("sNo", {
    header: "Serial No.",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("title", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("discount", {
    header: "Discount",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("expiry", {
    header: "Expiry",
    cell: (info) => info.getValue(),
  }),
];

function CouponList() {
  const [data, setData] = useState(DATA);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  console.log(table.getRowModel().rows);

  return (
    <div className={styles.coupon}>
      <div className={styles.couponContainer}>
        <div className={tableStyles.table}>
          <h1>Coupons</h1>
          <section>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <div key={headerGroup.id} className={tableStyles.headerContainer}>
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
                  <BiEditAlt className={tableStyles.edit} size={30} />
                  <BiSolidTrashAlt className={tableStyles.trash} size={30} />
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

export default CouponList

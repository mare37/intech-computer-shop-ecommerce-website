import { useState } from "react";
import styles from "./blog.module.scss";
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
    title: "How to 1",
    category: "reviews"
  },
  {
    sNo: 2,
    title: "How to 2",
    category: "news update",
  },
 
];

type Blog= {
  sNo: number;
  title: string;
  category:string
};

const columnHelper = createColumnHelper<Blog>();



const columns = [
  columnHelper.accessor("sNo", {
    header: "Serial No.",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("title", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => info.getValue(),
  }),
];

function BlogList() {
  const [data, setData] = useState(DATA);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  console.log(table.getRowModel().rows);

  return (
    <div className={styles.blog}>
      <div className={styles.blogContainer}>
        <div className={tableStyles.table}>
          <h1>Blogs</h1>
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

export default BlogList

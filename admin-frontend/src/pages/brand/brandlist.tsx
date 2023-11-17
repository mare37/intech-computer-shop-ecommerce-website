import { useState } from "react";
import styles from "./addbrand.module.scss";
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
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

const DATA = [
  {
    sNo: 1,
    title: "samsung",
  },
  {
    sNo: 2,
    title: "lenovo",
  },
 
];

type Brand = {
  sNo: number;
  title: string;
};

const columnHelper = createColumnHelper<Brand>();

/*
columnHelper.group({

  header: 'Serial',

   columns: [

    columnHelper.accessor('sNo', {
      cell: (props:any) =>{return props.getValue()}
      
    }),]

})


columnHelper.group({

  header: 'Name',

   columns: [

    columnHelper.accessor('title', {
      cell: (props:any) =>{return props.getValue()}
      
    }),]

})







const columns = [
  {
    accessorkey: "sNo",
    header: "Serial",
    cell: (props:any) =>{return props.getValue()}
  },
  {
    accessorkey: "title",
    header: "Name",
    cell: (props:any) =>{return props.getValue()}
  },
];*/

const columns = [
  columnHelper.accessor("sNo", {
    header: "Serial No.",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("title", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
];

function BrandList() {
  const [data, setData] = useState(DATA);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  console.log(table.getRowModel().rows);

  return (
    <div className={styles.addbrand}>
      <div className={styles.addbrandContainer}>
        <div className={styles.table}>
          <h1>Brands</h1>
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
          <div className={styles.navigatepages}>
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

export default BrandList;

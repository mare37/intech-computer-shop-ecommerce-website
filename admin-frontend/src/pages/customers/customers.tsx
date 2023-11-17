import { useState } from "react";
import styles from "./customers.module.scss";
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
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    
  },
  {
    sNo: 2,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
   
  },

  {
    sNo: 1,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    
  },
  {
    sNo: 2,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
   
  },

  {
    sNo: 1,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    
  },
  {
    sNo: 2,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
   
  },

  {
    sNo: 1,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    
  },
  {
    sNo: 2,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
   
  },

  {
    sNo: 1,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    
  },
  {
    sNo: 2,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
   
  },

  {
    sNo: 1,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    
  },
  {
    sNo: 2,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
   
  },

  {
    sNo: 1,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    
  },
  {
    sNo: 2,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
   
  },

  {
    sNo: 1,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    
  },
  {
    sNo: 2,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
   
  },
  

  {
    sNo: 1,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    
  },
  {
    sNo: 2,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
   
  },

  {
    sNo: 1,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    
  },
  {
    sNo: 2,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
   
  },

  {
    sNo: 1,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    
  },
  {
    sNo: 2,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
   
  },

  {
    sNo: 1,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    
  },
  {
    sNo: 2,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
   
  },

  {
    sNo: 1,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    
  },
  {
    sNo: 2,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
   
  },

  {
    sNo: 1,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    
  },
  {
    sNo: 2,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
   
  },

  {
    sNo: 1,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    
  },
  {
    sNo: 2,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
   
  },

  {
    sNo: 1,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    
  },
  {
    sNo: 2,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
   
  },
  
 
];

type  Customer = {
  sNo: number;
  name:string
  email: string;
  mobile:string,
 

};

const columnHelper = createColumnHelper<Customer>();



const columns = [
  columnHelper.accessor("sNo", {
    header: "Serial No.",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
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
  const [data, setData] = useState(DATA);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  console.log(table.getRowModel().rows);

  return (
    <div className={styles.customers}>
      <div className={styles.customersContainer}>
        <div className={tableStyles.table}>
          <h1>Customers</h1>
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

export default Customers

import { useEffect, useState } from "react";
import styles from "./orders.module.scss";
import tableStyles from "../table.module.scss";
import statusCell from "./statuscell";

import { useAppDispatch, useAppSelector } from "../../hooks";

import { getAllOrders } from "../../api/orders";




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



interface orderby{
  firstName:string
  lastName: string
}

interface orderStatus{
  status:string
  colour: string
}

interface paymentIntent {
  amount:number
}


type Order = {
  orderby: orderby;
  orderStatus: orderStatus;
  paymentIntent: paymentIntent;
  createdAt: string;
 
};

const columnHelper = createColumnHelper<Order>();

const columns = [
 
  columnHelper.accessor("orderby", {
    header: "Name",
    cell: (info) => {
      return info.getValue().firstName + " " + info.getValue().lastName
    }
    ,
  }),

  columnHelper.accessor("orderStatus", {
    header: "Order Status",
    cell: statusCell,
    size: 2000
  }),
  columnHelper.accessor("createdAt", {
    header: "Date",
    //cell: (info) => info.getValue() ,
    cell: (info) => {
      const dateObject = new Date(info.row.original.createdAt);
      const date = dateObject.toLocaleString("en-UK", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return date;
    },

  }),

  columnHelper.accessor("paymentIntent", {
    header: "Amount",
    cell: (info) => info.getValue().amount,
  }),
];

function Orders() {
  const [data, setData] = useState<any>([]);

  const dispatch = useAppDispatch();

  const {isLoading, isSuccess} = useAppSelector((state)=> state.order)


useEffect(()=>{

  getAllOrders(dispatch).then((response)=>{
    console.log(response);
    if(response.ordersRetrieved ){
      setData(response.result)
    }
    
  })






},[])


useEffect(()=>{
  console.log("triggered");
  
  getAllOrders(dispatch).then((response)=>{
    console.log(response);
    if(response.ordersRetrieved ){
      setData(response.result)
    }
    
    
  })
},[isSuccess])









  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

 // console.log(table.getRowModel().rows);

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

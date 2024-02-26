import { useEffect, useState} from "react";
import tableStyles from "../../pages/table.module.scss"
import styles from "./orderitem.module.scss";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setOrderItemToFalse } from "../../redux/orderItemSlice";


import { IoCloseSharp } from "react-icons/io5";

import { getOneOrder } from "../../api/orders";

import statusCell from "../../pages/orders/statuscell";

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    getPaginationRowModel,
  } from "@tanstack/react-table";


  interface brand {
    title: string;
  }
  
  interface category {
    title: string;
  }
  
  interface colour {
    title: string;
  }
  
  interface Product {
    _id: string;
    title: string;
    brand: brand;
    quantity: number;
    category: category;
    colour: colour;
    price: number;
  };

  type Order = {
    product:Product,
    count: string,
    _id:string

  }
  
  const columnHelper = createColumnHelper<Order>();
  
  const columns = [
    columnHelper.accessor("product.title", {
      header: "Title",
      cell: (info) => info.getValue()
    }),
  
    columnHelper.accessor("product.brand.title", {
      header: "Brand",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("count", {
      header: "Count",
      size: 150,
      minSize: 20,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("product.category.title", {
      header: "Category",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("product.colour.title", {
      header: "Colour",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("product.price", {
      header: "Price",
      cell: (info) => info.getValue() + "/-",
    }),
  ];


function OrderItem() {
    const [data, setData] = useState<any>([]);
  const dispatch = useAppDispatch();

  const { orderItem, id } = useAppSelector((state) => { 
    return state.orderItem;
  });

  const { isError } = useAppSelector((state) => state.order); 

  // console.log(popup);

 







useEffect(()=>{

    console.log("Getting order  "    +  id);



    if(orderItem){
        getOneOrder(id, dispatch).then((response)=>{
            console.log(response.result.products)
            if(response.orderRetreived){
                setData(response.result.products)
            }
           
            
        })
    }
 

},[orderItem])

const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });



  return (
    <div className={!orderItem ? styles.removeOrderItem : styles.orderItem}>
      <div     className={styles.orderItemsContainer }        >
       
       <section>
       <section className={styles.closeContainer}>
        <section>Order</section>
          <IoCloseSharp
            className={styles.close}
            onClick={() => {
              dispatch(setOrderItemToFalse());
            }}
          />
        </section>

       </section>
     


        <section>
            <p>Date: 7/7/2024</p>

            <h3>From: Wilson Bond</h3>
            <p>Phone: 072222222</p>
            <p>City: Nairobi</p>
            <p>Email: email@gmail.com</p>

            <p>Order ID: g2pc48iolsyz42po</p>
        </section>


        <section  className={styles.tableData}      >

        <section   className={styles.dataBoxShadow  }                >
                  {table.getHeaderGroups().map((headerGroup) => {
                    return (
                      <div
                        key={headerGroup.id}
                        className={styles.headerContainer}
                      >
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

        <section     className={styles.dataBoxShadow  }                       >
                    {table.getRowModel().rows.map((row) => (
                      <div className={styles.dataContainer} key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <div className={styles.data} key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        ))}
                        <div className={styles.data}>
                         
                        </div>
                      </div>
                    ))}
                  </section>


        </section>
      

      </div>
    </div>
  );
}

export default OrderItem;

import { useEffect, useState } from "react";
import tableStyles from "../../pages/table.module.scss";
import styles from "./orderitem.module.scss";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setOrderItemToFalse } from "../../redux/orderItemSlice";
import Status from "./status";

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
import LoadingOrderItem from "./orderItemloading";

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
}

type Order = {
  product: Product;
  count: string;
  _id: string;
};

type orderStatus = {
  colour: string;
  status: string;
  
};

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor("product.title", {
    header: "Title",
    cell: (info) => info.getValue(),
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [date, setDate] = useState<any>();
  const [orderId, setOrderId] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [orderStatus, setOrderStatus] = useState<orderStatus>();
  //const [id, setId] = useState("")
  const dispatch = useAppDispatch();

  const { orderItem, id } = useAppSelector((state) => {
    return state.orderItem;
  });

  const { isLoading, isError, isLoadingSingleOrder } = useAppSelector(
    (state) => state.order
  );

  // console.log(popup);

  useEffect(() => {
    console.log("Getting order  " + id);

    if (orderItem) {
      getOneOrder(id, dispatch).then((response) => {
        console.log(response.result);

        if (response.orderRetreived) {
          const formatedDate = new Date(response.result.paymentIntent.created);
          console.log(formatedDate);

          setData(response.result.products);
          setFirstName(response.result.orderby.firstName);
          setLastName(response.result.orderby.lastName);
          setMobileNumber(response.result.orderby.mobile);
          setEmail(response.result.orderby.email);
          setDate(formatedDate.toUTCString());
          setOrderId(response.result.paymentIntent.id);
          setTotalAmount(response.result.paymentIntent.amount);
          setCurrency(response.result.paymentIntent.currency);
          setOrderStatus(response.result.orderStatus);
         // setId(response.result._id)
        }
      });
    }
  }, [orderItem]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {isLoadingSingleOrder ? (
        <LoadingOrderItem />
      ) : (
        <div className={!orderItem ? styles.removeOrderItem : styles.orderItem}>
          <div className={styles.orderItemsContainer}>
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
              <p>Date: {date}</p>

              <h3>
                From: {firstName} {lastName}
              </h3>
              <p>Phone: {mobileNumber}</p>
              <p>City: Nairobi</p>
              <p>Email: {email}</p>

              <p>Order ID: {orderId}</p>
              <Status
                status={orderStatus?.status}
                colour={orderStatus?.colour}
                id={id}
              />
            </section>

            <section className={styles.tableData}>
              <section className={styles.dataBoxShadow}>
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

              <section className={styles.dataBoxShadow}>
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
                    <div className={styles.data}></div>
                  </div>
                ))}
              </section>
            </section>
            <section className={styles.totalAmount}>
              <h4>
                Total Amount: {currency} {totalAmount}/-
              </h4>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderItem;

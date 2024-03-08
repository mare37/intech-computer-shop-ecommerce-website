import { useState,useEffect } from "react";
import styles from "./enquiries.module.scss";
import tableStyles from "../table.module.scss"
import isOnline from "is-online";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch,useAppSelector } from "../../hooks";
import { setDisplayEnquiryToTrue, setEquiryId } from "../../redux/displayEnquirySlice";
import { setPopUpToTrue,setId } from "../../redux/popupSlice";

import Loading from "../../Layout/Loading/loading";
import ConnectionError from "../../Layout/ConnectionError/connectionerror";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import { getAllEnquiries } from "../../api/enquiry";

import { BiSolidTrashAlt } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { IoIosOpen } from "react-icons/io";
import { IoFileTrayOutline } from "react-icons/io5";

/*const DATA = [
  {
    sNo: 1,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    status: "unread"
  },
  {
    sNo: 2,
    name: "John Doe",
    email: "email@gmail.com",
    mobile: "0722888999",
    status: "unread"
  },
  
 
];*/

type  Enquiry = {
  _id: number;
  sNo: number;
  name:string
  email: string;
  mobile:string,
  enquiryStatus:string

};

const columnHelper = createColumnHelper<Enquiry>();



const columns = [
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
  columnHelper.accessor("enquiryStatus", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
];

function Enquiries() {
  const [data, setData] = useState<any>([]);
  const [online, setOnline] = useState<boolean>();
  const [showError, setShowError] = useState<boolean>();

  const dispatch = useAppDispatch()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });


  const {isLoading} = useAppSelector((state)=> state.enquiry)

  const notifyLoadError = () => toast.error("Failed to load! Something is wrong! ", {autoClose:false, });



  useEffect(() => {
    isOnline()
      .then((response: boolean) => {
        setOnline(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

      getAllEnquiries(dispatch)
      .then((response) => {
        console.log(response);
        console.log("triggered");
        if(response.enquiriesRetrieved){
          setData(response.result.reverse());
        }else{
          notifyLoadError()
        }

        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);




  console.log(table.getRowModel().rows);

  return (
    <div>
      {online ? (
        isLoading ? (
          <Loading />
        ) : (
          <div className={styles.enquiries}>
          <div className={styles.enquiriesContainer}>

            <div className={tableStyles.table}>
              <h1     className={tableStyles.heading}      >Enquiries</h1>
              <section   className={tableStyles.boxShadow}        >
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

              {data.length === 0 ? (
                  <div className={tableStyles.noData}>
                    {" "}
                    <IoFileTrayOutline
                      className={tableStyles.doDataIcon}
                    />{" "}
                    <p>No data</p>{" "}
                  </div>
                ) : (
                  <section  className={tableStyles.boxShadow} >
                  {table.getRowModel().rows.map((row) => (
                    <div className={styles.dataContainer} key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <div className={styles.data} key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      ))}
                      <div className={tableStyles.data}>
                        <IoIosOpen className={tableStyles.open} size={30}     onClick={() => {
                                dispatch(setDisplayEnquiryToTrue());
                                dispatch(setEquiryId({ id: row.original._id })); 
                                // setDeleteButton(true)
                              }}        />
                        <BiSolidTrashAlt className={tableStyles.trash} size={30}
                         onClick={() => {
                          dispatch(setPopUpToTrue());
                          dispatch(setId({ id: row.original._id }));
                          // setDeleteButton(true)
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        />
                      </div>
                    </div>
                  ))}
                </section>
                )}













    
             
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
      ) : (
          showError ? <ConnectionError />: ""
      )}
    </div>
  );






















}

export default Enquiries

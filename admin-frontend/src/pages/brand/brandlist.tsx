import { useState, useEffect } from "react";
import { Link,useNavigate  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllBrands } from "../../api/brand";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { reset } from "../../redux/brandSlice";
import { setPopUpToFalse, setPopUpToTrue, setId } from "../../redux/popupSlice";
import { isLoading, isSuccess,isError } from "../../redux/brandSlice";
import styles from "./addbrand.module.scss";
import { Column } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { BiSolidTrashAlt } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";


type Brand = {
  _id: Number;
  title: string;
  /* createdAt:string
  status:string
   updatedAt:string
    __v:number*/
};

const columnHelper = createColumnHelper<Brand>();

const columns = [
  columnHelper.accessor("_id", {
    header: "Serial No.",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("title", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
];

function BrandList() {
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate();

  
  const popup = useAppSelector((state) => {return state.popUpController.popup} )
  const {isSuccess, isError} = useAppSelector((state)=>{return state.brand})
  
  const notify = () => toast.success("Deleted Successfully!");
  const notifyError = () => toast.error("Failed to delete!");

  

  const dispatch = useAppDispatch();

  

 

  useEffect(() => {
    getAllBrands(dispatch).then((response) => {
      //console.log(response.result);
      console.log("triggered");
      

      setData(response.result.reverse());
    });
  }, [popup]);

  useEffect(() => {
    getAllBrands(dispatch).then((response) => {
      console.log(response.result);
      console.log("triggered");
      

      setData(response.result.reverse());
    });
  }, []);

  useEffect(()=>{
    if(isSuccess){
       notify()
      console.log("success");
      dispatch(reset())
     
    }
    if(isError){
      notifyError()
      dispatch(reset())
    }

  

  },[isSuccess, isError])

 

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  //console.log(table.getRowModel().rows);

  return (
    <div className={styles.addbrand}>
      <div className={styles.addbrandContainer}>
    
      <ToastContainer theme="light"   />
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
                <BiEditAlt   onClick={()=>{navigate(`/admin/updatebrand/${row.original._id}`)}}     className={styles.edit} size={30} />    
                 
                  <BiSolidTrashAlt
                    onClick={() => {
                      dispatch(setPopUpToTrue());
                      dispatch(setId({ id: row.original._id }));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={styles.trash}
                    size={30}
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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ToastContainer, toast } from 'react-toastify';
import { setPopUpToTrue, setId } from "../../redux/popupSlice";
import { reset } from "../../redux/colourSlice";
import styles from "./addcolor.module.scss";
import tableStyles from "../table.module.scss";
import { getAllColours } from "../../api/colour";
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

type Colour = {
  _id: string;
  title: string;
  /* createdAt:string
  status:string
   updatedAt:string
    __v:number*/
};

const columnHelper = createColumnHelper<Colour>();

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

function ColourList() {
  const [data, setData] = useState<any>([]);

  const navigate = useNavigate()

 // const notify = () => toast.success("Deleted Successfully!")
 const notify = () => toast("Deleted successfully",{position:"top-center", type:"success"})
  const notifyError = () => toast.error("Failed to delete!");

  const dispatch = useAppDispatch();
  const popup = useAppSelector((state) => {
    return state.popUpController.popup;
  });

  const {isError,isLoading,isSuccess} = useAppSelector(state => state.colour)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    getAllColours(dispatch).then((response) => {
      console.log(response.result);
      console.log("triggered");

      setData(response.result.reverse());
    });
  }, []);


  useEffect(() => {
    getAllColours(dispatch).then((response) => {
      console.log(response.result);
      console.log("triggered");

      setData(response.result.reverse());
    });
  }, [popup]);

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

  
  return (
    <div className={styles.addcolor}>
      <div className={styles.addcolorContainer}>
    <ToastContainer        theme="light"          />
        <div className={tableStyles.table}>
          <h1>Colours</h1>
          <section>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <div
                  key={headerGroup.id}
                  className={tableStyles.headerContainer}
                >
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
                  <BiEditAlt    onClick={()=>{navigate(`/admin/updatecolour/${row.original._id}`)}}           className={tableStyles.edit} size={30} />
                  <BiSolidTrashAlt
                    onClick={() => {
                      dispatch(setPopUpToTrue());
                      dispatch(setId({ id: row.original._id }));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={tableStyles.trash}
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

export default ColourList;

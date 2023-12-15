import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./blog.module.scss";
import tableStyles from "../table.module.scss"
import { ToastContainer, toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { setPopUpToTrue,setId } from "../../redux/popupSlice";
import { getAllBlogCategories } from "../../api/blogcategory";
import { reset,resetGettingBlogCategories } from "../../redux/blogcategorySlice";

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




type BlogCategory = {
  _id: string;
  title: string;
};

const columnHelper = createColumnHelper<BlogCategory>();



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

function BlogCategoryList() {
  const [data, setData] = useState<any>([]);
  const [pageFetchingData, setPageFetchingData] = useState(false)
  const [delectingAction, setDeletingAction] = useState(false)

  const  navigate = useNavigate()

  const {popup} = useAppSelector(state => state.popUpController)
  const {isSuccess, isLoading, isError, gettingBlogCategories } = useAppSelector(state => state.blogCategory)

  const dispatch = useAppDispatch()


  //  Notify that the deletion was successfull when this page loads
  const notify = () => toast.success("Deleted Successfully!");

  //Notify if there was an error during delection. :)
  const notifyError = () => toast.error("Failed to delete!");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(()=>{
    
    getAllBlogCategories(dispatch).then((response)=>{ 
     
      console.log(response);
      setData(response) 
    //  dispatch(reset());
      dispatch( resetGettingBlogCategories())
     

  
    }).catch((err)=>{
      console.log();
      
    })
  
  
  
  },[])



  useEffect(()=>{

    getAllBlogCategories(dispatch).then((response)=>{
      console.log(response);
      setData(response) 
     
      
  
    }).catch((err)=>{
      console.log();
      
    })
  
  
  
  },[popup])

  console.log("Getting " +  gettingBlogCategories);

  useEffect(() => {
    
    // If deletion successfull and page is not fetching data
    if (isSuccess === true  && gettingBlogCategories === false) { 

      console.log("Getting " +  gettingBlogCategories);
      
     
      console.log("success");
      notify()
      dispatch(reset());
   
     // dispatch( resetGet())
    }
    if (isSuccess === true  && gettingBlogCategories === true) {
     
      console.log("success");
     // notify()
     dispatch( reset())
     dispatch( resetGettingBlogCategories())
   
    
    }
  
    if (isError   && pageFetchingData === false   ) {
    ///  notifyError();
      dispatch(reset());
    }
  }, [isSuccess, isError]);












  return (
    <div className={styles.blog}>
        <ToastContainer theme="light" />
      <div className={styles.blogContainer}>
        <div className={tableStyles.table}>
          <h1>Blog categories</h1>
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
                  <BiEditAlt     onClick={() => {
                      navigate(`/admin/updateblogcategory/${row.original._id}`);
                    }}         className={tableStyles.edit} size={30} />
                  <BiSolidTrashAlt  onClick={() => {
                       
                      dispatch(setPopUpToTrue());
                      dispatch(setId({ id: row.original._id }));
                     // setDeleteButton(true)
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}                            className={tableStyles.trash} size={30} />
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

export default BlogCategoryList

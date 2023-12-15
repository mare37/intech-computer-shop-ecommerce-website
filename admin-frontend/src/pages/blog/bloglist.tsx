import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ToastContainer, toast } from "react-toastify";
import { reset, resetGettingBlogs } from "../../redux/blogSlice";

import styles from "./blog.module.scss";
import tableStyles from "../table.module.scss"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";


import { getAllBlogs } from "../../api/blog";

import { setPopUpToTrue,setId } from "../../redux/popupSlice";


import { BiSolidTrashAlt } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";




interface category {
  title: string;
}


type Blog= {
  _id: number;
  title: string;
  category:category
};

const columnHelper = createColumnHelper<Blog>();



const columns = [
 
  columnHelper.accessor("title", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => info.getValue()?.title,
  }),
];

function BlogList() {
  const [data, setData] = useState<any>([]);

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const {popup} =  useAppSelector(state => state.popUpController)
  const {isSuccess, isError,isLoading, gettingBlogs}  = useAppSelector(state => state.blog)


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

    getAllBlogs(dispatch).then((response)=>{
      console.log(response.blogs);
      setData(response?.blogs) 
      
  
    }).catch((err)=>{
      console.log(err);
      
    })
  
  
  
  },[])


  useEffect(()=>{

    getAllBlogs(dispatch).then((response)=>{
      console.log(response.blogs);
      setData(response?.blogs) 
      
  
    }).catch((err)=>{
      console.log(err);
      
    })
  
  
  
  },[popup])



  useEffect(() => {
    
    // If deletion successfull and page is not fetching data
    if (isSuccess === true  && gettingBlogs === false) { 

      console.log("Getting " +  gettingBlogs);
      
     
      console.log("success");
      notify()
      dispatch(reset());
   
     // dispatch( resetGet())
    }
    if (isSuccess === true  && gettingBlogs === true) {
     
      console.log("success");
     // notify()
     dispatch( reset())
     dispatch( resetGettingBlogs())
   
    
    }
  
    if (isError     ) {
    ///  notifyError();
      dispatch(reset());
    }
  }, [isSuccess, isError]);










 // console.log(table.getRowModel().rows);

  return (
    <div className={styles.blog}>
         <ToastContainer theme="light" />
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
                  <BiEditAlt onClick={() => {
                      navigate(`/admin/updateblog/${row.original._id}`);
                    }}  className={tableStyles.edit} size={30} />
                  <BiSolidTrashAlt    onClick={() => {
                      dispatch(setPopUpToTrue());
                      dispatch(setId({ id: row.original._id }));
                     // setDeleteButton(true)
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}     className={tableStyles.trash} size={30} />
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

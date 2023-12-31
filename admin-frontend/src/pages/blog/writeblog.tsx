import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";

import styles from "./blog.module.scss";

import { getAllBlogCategories } from "../../api/blogcategory";

import { createBlog } from "../../api/blog";

const schema = yup.object().shape({
  title: yup.string().required(),
  category: yup.string().required(),
  // description: yup.string().required(),
});

const DATA = [
  {
    sNo: 1,
    title: "review",
  },
  {
    sNo: 2,
    title: "news update",
  },
];

const handleChange = () => {

};

function isQuillEmpty(value: string) {
  if (
    value.replace(/<(.|\n)*?>/g, "").trim().length === 0 &&
    !value.includes("<img")
  ) {
    return true;
  }
  return false;
}

function WriteBlog() {
  const [acceptedFiles, setAcceptedFile] = useState<File[]>([]);

  const [productCategories, setProductCategories] = useState<any>([]);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();


  const notify = () => toast.success("Blog posted Successfully!");

  //Notify if there was an error during delection. :)
  const notifyError = () => toast.error("Failed to post blog!");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getAllBlogCategories(dispatch)
      .then((response) => {
        console.log(response);

        setProductCategories(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.blog}>
       <ToastContainer theme="light" />
      <div className={styles.blogContainer}>
        <form
          onSubmit={handleSubmit((data:any) => {
            const isempty = isQuillEmpty(description);

            if (isempty) {
              console.log("Description is empty");
            } else {
              data["description"] = description;
              createBlog(data, dispatch).then((response)=>{

                console.log(response);
                if(response.blogPosted){
                  notify()
                }else{
                  notifyError()
                }
                
                

              })
              console.log(data);
            }
          })}
        >
          <h3>Write blog</h3>
          <input {...register("title")} placeholder="Enter blog title" />
          {errors.title && <p>Title is required.</p>}

          <select {...register("category")}>
            <option value="">Select blog category</option>
            {productCategories.map((item: any) => {
              return (
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              );
            })}
          </select>
          {errors.category && <p>Blog category is required.</p>}

          <ReactQuill
            theme="snow"
            style={{ width: "100%", marginBottom: "10px" }}
            placeholder="Write here"
            onChange={(value)=>{setDescription(value)}}
          />

          <Dropzone
            onDrop={(acceptedFiles: File[]) => {
              setAcceptedFile(acceptedFiles);
              console.log(acceptedFiles);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section className={styles.dropzone}>
                <div className={styles.dropzoneContainer} {...getRootProps()}>
                  <input {...getInputProps()} />

                  {acceptedFiles.length > 0 &&
                    acceptedFiles.map((item) => {
                      return (
                        <div className={styles.imageItems}>
                          {"IMAGE " + item.name}
                        </div>
                      );
                    })}
                  {acceptedFiles.length === 0 && (
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  )}
                </div>
              </section>
            )}
          </Dropzone>

          <button>Add Blog</button>
        </form>
      </div>
    </div>
  );
}

export default WriteBlog;

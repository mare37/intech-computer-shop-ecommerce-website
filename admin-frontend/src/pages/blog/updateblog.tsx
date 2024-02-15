import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import isOnline from "is-online";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import { ToastContainer, toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";

import styles from "./blog.module.scss";
import tableStyles from "../table.module.scss";

import { getAllBlogCategories } from "../../api/blogcategory";

import { createBlog, getOneBlog, updateBlog } from "../../api/blog";

const schema = yup.object().shape({
  title: yup.string().required(),
  category: yup.string().required(),
  // description: yup.string().required(),
});

const handleChange = () => {};

function isQuillEmpty(value: string) {
  if (
    value.replace(/<(.|\n)*?>/g, "").trim().length === 0 &&
    !value.includes("<img")
  ) {
    return true;
  }
  return false;
}

function UpdateBlog() {
  const [acceptedFiles, setAcceptedFile] = useState<File[]>([]);
  const [serverError, setServerError] = useState(false);

  const [productCategories, setProductCategories] = useState<any>([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [dislikes, setDislikes] = useState([]);
  const [likes, setLikes] = useState([]);
  const [images, setImages] = useState([]);
  const [numViews, setNumViews] = useState(0);
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const { id } = useParams();

  const { isSuccess, isError, isLoading, gettingBlogs } = useAppSelector(
    (state) => state.blog
  );

  const notifyUpdate = () => toast.success("Blog updated Successfully!");
  const notifyUpdateError = () =>
    toast.error("Failed to update blog!", { autoClose: false });

  const notifyLoadError = () =>
    toast.error("You are offline! Check your connection");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    isOnline().then((online: boolean) => {
      if (online || !online) {
        getAllBlogCategories(dispatch)
          .then((response) => {
            console.log(response);

            if (response.blogCatRetrieved) {
              setProductCategories(response.result);
            } else {
              setServerError(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });

        if (id !== undefined) {
          getOneBlog(id, dispatch)
            .then((response) => {
              console.log(response);
              setTitle(response.title);
              setDescription(response.description);
              setCategory(response.category);
              setDislikes(response.dislikes);
              setImages(response.images);
              setLikes(response.likes);
              setNumViews(response.numViews);
              setStatus(response.status);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        notifyLoadError();
      }
    });
  }, []);

  return (
    <div className={styles.blog}>
      <ToastContainer theme="light" position="top-center" />

      <div className={styles.blogContainer}>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const blogUpdate: any = {};

            blogUpdate["title"] = title;
            blogUpdate["likes"] = likes;
            blogUpdate["dislikes"] = dislikes;
            blogUpdate["category"] = category;
            blogUpdate["numViews"] = numViews;
            blogUpdate["status"] = status;
            blogUpdate["images"] = images;
            blogUpdate["description"] = description;

            if (id !== undefined) {
              console.log(blogUpdate);

              updateBlog(id, blogUpdate, dispatch).then((response) => {
                console.log(response);
                if (response.blogUpdated) {
                  notifyUpdate();
                } else {
                  notifyUpdateError();
                }
              });
            }
          }}
        >
          <h3 className={tableStyles.heading}>Edit blog</h3>
          <input
            value={title}
            placeholder="Enter blog title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="">
              {isLoading ? "Please wait..." : "Select blog categories"}
            </option>
            {productCategories.map((item: any) => {
              return (
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              );
            })}
          </select>

          <ReactQuill
            value={description}
            theme="snow"
            style={{ width: "100%", marginBottom: "10px" }}
            placeholder="Write here"
            onChange={(value) => {
              setDescription(value);
            }}
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

          <div className={tableStyles.buttonAndLoaderContainer}>
            <button
              className={tableStyles.universalButton}
              disabled={isLoading}
            >
              Edit Blog
            </button>
            {isLoading ? <span className={tableStyles.loader}></span> : ""}
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateBlog;

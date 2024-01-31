import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ToastContainer, toast } from "react-toastify";

import styles from "./blog.module.scss";
import tableStyles from "../table.module.scss";

import {
  addBlogCategory,
  getOneBlogCategory,
  updateBlogCategory,
} from "../../api/blogcategory";

const schema = yup.object().shape({
  title: yup.string().required(),
});

function AddBlogCategory() {
  const [blogCategory, setBlogCategory] = useState("");
  const [blogCatRetreival, setBlogCatRetreival] = useState(false);

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { isSuccess, isError, isLoading } = useAppSelector(
    (state) => state.blogCategory
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const notify = () => toast.success("Blog category posted Successfully!");

  const notifyError = () =>
    toast.error("Failed to post blog category!", { autoClose: false });
  const notifyLoadError = () =>
    toast.error("You are offline! Check your connection");

  const notifyServerError = () => toast.error("Something went wrong!");

  //update notifications
  const notifyUpdate = () =>
    toast.success("Blog category updated Successfully!");
  const notifyUpdateError = () =>
    toast.error("Failed to update blog category!", { autoClose: false });

  useEffect(() => {
    if (id != undefined) {
      getOneBlogCategory(id, dispatch)
        .then((response) => {
          console.log(response.result);
          setBlogCatRetreival(true);
          setBlogCategory(response.result.title);
        })
        .catch((error) => {
          setBlogCatRetreival(false);
        });
    }

    /// dispatch(reset());
  }, []);

  return (
    <div
      onSubmit={handleSubmit((data) => {
        if (id === undefined) {
          addBlogCategory(data.title, dispatch).then((response) => {
            console.log(response);
            if (response.blogCatCreated) {
              notify();
            } else {
              notifyError();
            }
          });
        } else {
          setBlogCatRetreival(false);
          updateBlogCategory(id, blogCategory, dispatch).then((response) => {
            console.log(response);
            if (response.blogCatUpdated) {
              notifyUpdate();
            } else {
              notifyUpdateError();
            }
          });
        }
      })}
      className={styles.blog}
    >
      <div className={styles.blogContainer}>
        <ToastContainer theme="light" position="top-center" />
        <form>
          <h3>{id === undefined ? "Add" : "Edit"} Blog Category</h3>
          <input
            value={blogCategory}
            {...register("title")}
            placeholder=""
            onChange={(e) => {
              setBlogCategory(e.target.value);
            }}
          />
          {errors.title && <p>Blog category is required.</p>}

          <div className={tableStyles.buttonAndLoaderContainer}>
            <button
              className={tableStyles.universalButton}
              disabled={isLoading}
            >
              {id === undefined ? "Add" : "Edit"} blog category
            </button>
            {isLoading ? <span className={tableStyles.loader}></span> : ""}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBlogCategory;

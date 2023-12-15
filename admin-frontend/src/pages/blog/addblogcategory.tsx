import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks";

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
  const { isSuccess, isError } = useAppSelector((state) => state.blogCategory);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
          addBlogCategory(data.title, dispatch);
        } else {
          setBlogCatRetreival(false);
          updateBlogCategory(id, blogCategory, dispatch);
        }
      })}
      className={styles.blog}
    >
      <div className={styles.blogContainer}>
        <form>
          <h3>{id === undefined ? "Add" : "Edit"} Blog Category</h3>
          <input
            value={blogCategory}
            {...register("title")}
            placeholder=""
            onChange={(e)=>{setBlogCategory(e.target.value)}}
          
          />
          {errors.title && <p>Blog category is required.</p>}
          <button>{id === undefined ? "Add" : "Edit"} blog category</button>
          {isSuccess === true && blogCatRetreival === false && (
            <span className={tableStyles.success}>
              Blog category {id !== undefined ? "updated" : "created"} successfully.
            </span>
          )}
          {isError && (
            <span className={tableStyles.error}>
              Something went wrong.Try again
            </span>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddBlogCategory;

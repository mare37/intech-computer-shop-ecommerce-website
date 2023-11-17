import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./blog.module.scss";

const schema = yup.object().shape({
  blogCategory: yup.string().required(),
});

function AddBlogCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div
      onSubmit={handleSubmit((data) => console.log(data))}
      className={styles.blog}
    >
      <div    className={styles.blogContainer}  >
        <form>
           <h3>Add Blog Category</h3>
          <input {...register("blogCategory")} placeholder="" />
          {errors. blogCategory && <p>Blog category is required.</p>}
          <button>Add blog category</button> 
        </form>
      </div>
    </div>
  );
}

export default AddBlogCategory

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styles from "./blog.module.scss";
import { useState } from "react";
import Item from "antd/es/list/Item";

const schema = yup.object().shape({
  title: yup.string().required(),
  category: yup.string().required(),
  description: yup.string().required(),
  
 
  
 
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

function WriteBlog() {
  const [acceptedFiles, setAcceptedFile] = useState<File[]>([]);

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
      <div className={styles.blogContainer}>
        <form>
          <h3>Write blog</h3>
          <input {...register("title")} placeholder="Enter blog title" />
          {errors.title && <p>Title is required.</p>}

          <select {...register("category")}>
            <option value="">Select blog category</option>
            {DATA.map((item) => {
              return <option key={item.sNo}>{item.title}</option>;
            })}
          </select>
          {errors.category && <p>Blog category is required.</p>}

          <ReactQuill
            theme="snow"
            style={{ width: "100%", marginBottom: "10px" }}
            placeholder="Write here"
            onChange={handleChange}
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

          <button>Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default WriteBlog;

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styles from "./product.module.scss";
import { useState } from "react";
import Item from "antd/es/list/Item";

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  brand: yup.string().required(),
  price: yup.number().required(),
  category: yup.string().required(),
  colour: yup.string().required(),
  statusCategory: yup.string().required(),
});

const DATA = [
  {
    sNo: 1,
    title: "samsung",
  },
  {
    sNo: 2,
    title: "lenovo",
  },
];

const handleChange = () => {};

function isQuillEmpty(value: string) {
    if (value.replace(/<(.|\n)*?>/g, '').trim().length === 0 && !value.includes("<img")) {
       return true;
     }
       return false;
    }

function AddProduct() {
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
      className={styles.product}
    >
      <div className={styles.productContainer}>
        <form>
          <h3>Add Product</h3>
          <input {...register("title")} placeholder="Enter product title" />
          {errors.title && <p>Brand is required.</p>}

          <input {...register("price")} placeholder="Enter price" />
          {errors.price && <p>Price is required.</p>}
          <ReactQuill
          
            theme="snow"
            style={{ width: "100%", marginBottom: "10px" }}
            placeholder="Enter description"
            onChange={handleChange}
          />

          <select {...register("brand")}>
            <option value="">Select Brand</option>
            {DATA.map((item) => {
              return <option key={item.sNo}>{item.title}</option>;
            })}
          </select>
          {errors.brand && <p>Brand is required.</p>}

          <select {...register("category")}>
            <option value="">Select product category</option>
            {DATA.map((item) => {
              return <option key={item.sNo}>{item.title}</option>;
            })}
          </select>
          {errors.category && <p>Product category is required.</p>}


          <select {...register("statusCategory")}>
            <option value="">Select Status category</option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          {errors.statusCategory && <p>Status category is required.</p>}

          <select {...register("colour")}>
            <option value="">Select colour</option>
            {DATA.map((item) => {
              return <option key={item.sNo}>{item.title}</option>;
            })}
          </select>
          {errors.colour && <p>Price is required.</p>}

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
                      return <p className={styles.imageItems}>{"IMAGE "+item.name}</p>;
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

export default AddProduct;

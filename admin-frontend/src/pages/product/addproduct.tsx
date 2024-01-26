import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../hooks";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styles from "./product.module.scss";
import tableStyles from "../table.module.scss";

import { reset,resetGettingProducts } from "../../redux/productSlice";

import { addProduct, getOneProduct, updateProduct } from "../../api/product";
import { getAllBrands } from "../../api/brand";
import { getAllColours } from "../../api/colour";
import { getAllProductCategories } from "../../api/productcatetory";

const schema = yup.object().shape({
  title: yup.string().required(),
  quantity: yup.number().required(),
  brand: yup.string().required(),
  price: yup.number().required(),
  category: yup.string().required(),
  colour: yup.string().required(),
  tag: yup.string().required(),
});

function isQuillEmpty(value: string) {
  if (
    value.replace(/<(.|\n)*?>/g, "").trim().length === 0 &&
    !value.includes("<img")
  ) {
    return true;
  }
  return false;
}

interface brand {
  title: string;
  id: string;
}

interface category {
  title: string;
  id: string;
}

type Product = {
  _id: string;
  title: string;
  brand: brand;
  quantity: number;
  category: category;
  colour: string;
  price: number;
};

const price: number | string = 0;
const brand: string | brand = "";
const category: string | category = "";

function AddProduct() {
  const [acceptedFiles, setAcceptedFile] = useState<File[]>([]);
  const [brands, setBrands] = useState<any>([]);
  const [colours, setColours] = useState<any>([]);
  const [productCategories, setProductCategories] = useState<any>([]);
  const [description, setDescription] = useState("");

  const notify = () => toast.success("Product added Successfully!");

  //Notify if there was an error during delection. :)
  const notifyError = () => toast.error("Failed to add product!");

  const { productIsLoading, productIsError, productIsSuccess, gettingProducts } = useAppSelector(
    (state) => state.product
  );

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getAllBrands(dispatch)
      .then((response) => {
        console.log(response.result);
        console.log("triggered");

        setBrands(response.result.reverse());
      })
      .catch((err) => {
        console.log(err);
      });

    getAllColours(dispatch)
      .then((response) => {
        console.log(response.result);
       

        setColours(response.result.reverse());
      })
      .catch((err) => {
        console.log(err);
      });

    getAllProductCategories(dispatch)
      .then((response) => {
        console.log(response.result);

        setProductCategories(response.result.reverse());
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch(reset());
  }, []);

  
  

  useEffect(() => {
   

    dispatch(reset());
  
  }, [productIsSuccess, productIsError]);

  return (
    <div
      onSubmit={handleSubmit(
        (data: any) => {
          const isempty = isQuillEmpty(description);

          if (isempty) {
            console.log("Description is empty");
          } else {
            data["description"] = description;
            addProduct(data, dispatch).then((response)=>{
              console.log(response);
              if(response.productCreated ){ 
                notify()
              }else{
                notifyError()
              }
              
            })
           
          }
        },
        (error) => {
          console.log(error);
        }
      )}
      className={styles.product}
    >
      <div className={styles.productContainer}>
        <ToastContainer theme="light" />
        <form>
          <h1>Add Product</h1>
          <input
            type="text"
            {...register("title")}
            placeholder="Enter product title"
          />
          {errors.title && <p>Brand is required.</p>}

          <input
            type="number"
            {...register("price")}
            placeholder="Enter price"
          />
          {errors.price && <p>Price is required.</p>}

          <input
            type="number"
            {...register("quantity")}
            placeholder="Enter quantity"
          />
          {errors.quantity && <p>Quantity is required.</p>}

          <ReactQuill
            theme="snow"
            style={{ width: "100%", marginBottom: "10px" }}
            placeholder="Enter description"
            onChange={(value) => {
              setDescription(value);
            }}
          />

          <select {...register("brand")}>
            <option value="">Select Brand</option>
            {brands.map((item: any) => {
              return (
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              );
            })}
          </select>
          {errors.brand && <p>Brand is required.</p>}

          <select {...register("category")}>
            <option value="">Select product category</option>
            {productCategories.map((item: any) => {
              return (
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              );
            })}
          </select>
          {errors.category && <p>Product category is required.</p>}

          <select {...register("tag")}>
            <option value="">Select Tag</option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          {errors.tag && <p>Status category is required.</p>}

          <select {...register("colour")}>
            <option value="">Select colour</option>
            {colours.map((item: any) => {
              return (
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              );
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
                      return (
                        <p className={styles.imageItems}>
                          {"IMAGE " + item.name}
                        </p>
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

          <button disabled={productIsLoading}>Add Product</button>
          {productIsSuccess && (
            <span className={tableStyles.success}>
              Product Created successfully.
            </span>
          )}
          {productIsError && (
            <span className={tableStyles.error}>
              Something went wrong.Try again
            </span>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddProduct;

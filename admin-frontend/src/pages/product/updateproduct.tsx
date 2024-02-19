import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../hooks";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";

import styles from "./product.module.scss";
import tableStyles from "../table.module.scss";

import { reset } from "../../redux/productSlice";

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



function UpdateProduct() {
  const [acceptedFiles, setAcceptedFile] = useState<File[]>([]);
  const [brands, setBrands] = useState<any>([]);
  const [colours, setColours] = useState<any>([]);
  const [productCategories, setProductCategories] = useState<any>([]);
  //const [description, setDescription] = useState("");

  //Set product to state
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [tag, setTag] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [colour, setColour] = useState("");
  const [price, setPrice] = useState(0);

  const { id } = useParams();

  const {
    productIsLoading,
    productIsError,
    productIsSuccess,
    gettingProducts,
  } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const notifyLoadError = () =>
    toast.error("Failed to load! Something is wrong!");
  const notify = () =>
    toast.success("Product updated successfully!", { position: "top-center" });
  const notifyError = () => toast.error("Failed to update product");

  useEffect(() => {
    if (id != undefined) {
      getOneProduct(id, dispatch)
        .then((response) => {
          console.log(response);

          if (response.productRetrieved) {
            setTitle(response.result.title);
            setPrice(response.result.price);
            setQuantity(response.result.quantity);
            setDescription(response.result.description);
            setCategory(response.result.category._id);
            setBrand(response.result.brand._id);
            setTag(response.result.tag);
            setColour(response.result.colour);
          } else {
            notifyLoadError();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    /// dispatch(reset());
  }, []);

  useEffect(() => {
    getAllBrands(dispatch)
      .then((response) => {
        console.log(response);
        console.log("triggered");

        if (response.brandsRetrieved) {
          setBrands(response.result.reverse());
        } else {
          notifyLoadError();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    getAllColours(dispatch)
      .then((response) => {
        console.log(response);

        if (response.coloursRetrieved) {
          setColours(response.result.reverse());
        } else {
          notifyLoadError();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    getAllProductCategories(dispatch)
      .then((response) => {
        console.log(response);

        if (response.productCatRetrieved) {
          setProductCategories(response.result.reverse());
        } else {
          notifyLoadError();
        }
      })
      .catch((err) => {
        console.log(err);
      });

   // dispatch(reset());
  }, []);

  return (
    <div
      onSubmit={(e) => {
        e.preventDefault();
        // const isempty = isQuillEmpty(product.description);

        const productUpdate: any = {};

        productUpdate["title"] = title;
        productUpdate["brand"] = brand;
        productUpdate["price"] = price;
        productUpdate["category"] = category;
        productUpdate["tag"] = tag;
        productUpdate["quantity"] = quantity;
        productUpdate["colour"] = colour;
        productUpdate["description"] = description;

        console.log(productUpdate);

        if (id !== undefined) {
          updateProduct(id, productUpdate, dispatch).then((response) => {
            console.log(response);
            if (response.productUpdated) {
              notify();
            } else {
              notifyError();
            }
          });
        }
      }}
      className={styles.product}
    >
      <ToastContainer theme="light" />
      <div className={styles.productContainer}>
        <form>
          <h1>Edit Product</h1>
          <input
            value={title}
            placeholder="Enter product title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {errors.title && <p>Title is required.</p>}

          <input
            value={price}
            type="number"
            placeholder="Enter price"
            onChange={(e) => {
              setPrice(e.target.valueAsNumber);
            }}
          />
          {errors.price && <p>Price is required.</p>}

          <input
            value={quantity}
            type="number"
            placeholder="Enter quantity"
            onChange={(e) => {
              setQuantity(e.target.valueAsNumber);
            }}
          />
          {errors.quantity && <p>Quantity is required.</p>}

          <ReactQuill
            theme="snow"
            value={description}
            style={{ width: "100%", marginBottom: "10px" }}
            placeholder="Enter description"
            onChange={(value) => {
              const updateDescription = { description: value };
              setDescription(value);
            }}
          />

          <select
            value={brand}
            onChange={(e) => {
              //  console.log("Updated brand " + updatebrand);

              setBrand(e.target.value);
            }}
          >
            <option value="">
              {" "}
              {productIsLoading ? "Please wait..." : "Select brand"}
            </option>
            {brands.map((item: any) => {
              return (
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              );
            })}
          </select>
          {errors.brand && <p>Brand is required.</p>}

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="">
              {productIsLoading ? "Please wait..." : "Select product category"}
            </option>
            {productCategories.map((item: any) => {
              return (
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              );
            })}
          </select>
          {errors.category && <p>Product category is required.</p>}

          <select
            value={tag}
            onChange={(e) => {
              setTag(e.target.value);
            }}
          >
            <option value="">Select Tag</option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          {errors.tag && <p>Status category is required.</p>}

          <select
            value={colour}
            onChange={(e) => {
              setColour(e.target.value);
            }}
          >
            <option value="">
              {productIsLoading ? "Please wait..." : "Select colour"}
            </option>
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

          <button disabled={productIsLoading}>
            {productIsLoading ? (
              <span className={tableStyles.loader}></span>
            ) : (
              "Edit Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;

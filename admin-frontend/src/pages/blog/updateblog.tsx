import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styles from "./blog.module.scss";

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
  }, []);

  return (
    <div className={styles.blog}>
      <div className={styles.blogContainer}>
        <form
          onSubmit={(e)=>{

            e.preventDefault()

            const blogUpdate: any = {};

            blogUpdate["title"] = title;
          //  blogUpdate["likes"] = likes;
          //  blogUpdate["dislikes"] = dislikes;
           blogUpdate["category"] = category;
         //   blogUpdate["numViews"] = numViews;
         //   blogUpdate["status"] = status;
         //   blogUpdate["images"] = images;
            blogUpdate["description"] = description;


            if (id !== undefined) {
              console.log(blogUpdate);
              
              updateBlog(id,blogUpdate, dispatch);
            }


          }



          }
        >
          <h3>Edit blog</h3>
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
            <option value="">Select blog category</option>
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

          <button>Edit blog</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBlog;

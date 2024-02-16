import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ToastContainer, toast } from "react-toastify";

import { addColour, updateColour, getOneColour } from "../../api/colour";

import styles from "./addcolor.module.scss";
import tableStyles from "../table.module.scss";

const schema = yup.object().shape({
  colour: yup.string().required(),
});

function AddColour() {
  const [colour, setColour] = useState("");
  const [colourRetreival, setColourRetreival] = useState(false);

  const { id } = useParams();

  const notify = () => toast.success("Colour added Successfully!");
  const notifyError = () => toast.error("Failed to add colour!");
  const notifyUpdate = () => toast.success("Colour updated Successfully!");
  const notifyUpdateError = () => toast.error("Failed to update colour!");
  const notifyServerError = () => toast.success("Something went wrong!");

  useEffect(() => {
    if (id != undefined) {
      getOneColour(id, dispatch)
        .then((response) => {
          console.log(response.result);
          setColourRetreival(true);
          setColour(response.result.title);
        })
        .catch((error) => {
          setColourRetreival(false);
        });
    }

    /// dispatch(reset());
  }, []);

  const dispatch = useAppDispatch();

  const { isLoading, isError, isSuccess } = useAppSelector(
    (state) => state.colour
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div
      onSubmit={handleSubmit((data) => {
        if (id === undefined) {
          addColour(data.colour, dispatch).then((response) => {
            console.log(response);

            if (response.colourCreated) {
              notify();
            } else {
              notifyError();
            }
          });
        } else {
          setColourRetreival(false);
          updateColour(id, colour, dispatch).then((response) => {
            console.log(response);

            if (response.colourUpdated) {
              notifyUpdate();
            } else {
              notifyUpdateError();
            }
          });
        }
      })}
      className={styles.addcolor}
    >
      <div className={styles.addcolorContainer}>
        <ToastContainer theme="light" position="top-center" />
        <form>
          <h3 className={tableStyles.heading}>
            {id === undefined ? "Add" : "Edit"} Colour
          </h3>
          <input
            value={colour}
            {...register("colour")}
            onChange={(e) => {
              setColour(e.target.value);
            }}
            placeholder="ENTER COLOUR"
          />
          {errors.colour && <p>Colour is required.</p>}

          <div className={tableStyles.buttonAndLoaderContainer}>
            <button
              className={tableStyles.universalButton}
              disabled={isLoading}
            >
              {id === undefined ? "Add" : "Edit"} colour
            </button>
            {isLoading ? <span className={tableStyles.loader}></span> : ""}
          </div>

        
        </form>
      </div>
    </div>
  );
}

export default AddColour;

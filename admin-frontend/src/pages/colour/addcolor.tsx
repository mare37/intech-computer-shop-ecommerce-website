import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAppDispatch, useAppSelector } from "../../hooks";

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
          addColour(data.colour, dispatch);
        } else {
          setColourRetreival(false);
          updateColour(id, colour, dispatch);
        }
      })}
      className={styles.addcolor}
    >
      <div className={styles.addcolorContainer}>
        <form>
          <h3>{id === undefined ? "Add" : "Edit"} Colour</h3>
          <input
            value={colour}
            {...register("colour")}
            onChange={(e) => {
              setColour(e.target.value);
            }}
            placeholder="ENTER COLOUR"
          />
          {errors.colour && <p>Colour is required.</p>}
          <button>{id === undefined ? "Add" : "Edit"} colour</button> 
          {isSuccess === true && colourRetreival === false && (
            <span className={tableStyles.success}>
              Colour {id !== undefined ? "updated" : "created"} successfully.
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

export default AddColour;

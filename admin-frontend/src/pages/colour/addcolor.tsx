import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./addcolor.module.scss";

const schema = yup.object().shape({
  colour: yup.string().required(),
});

function AddColour() {
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
      className={styles.addcolor}
    >
      <div    className={styles.addcolorContainer}  >
        <form>
           <h3>Add Colour</h3>
          <input {...register("colour")} placeholder="ENTER COLOUR" />
          {errors.colour && <p>Colour is required.</p>}
          <button>Add colour</button>
        </form>
      </div>
    </div>
  );
}

export default AddColour;

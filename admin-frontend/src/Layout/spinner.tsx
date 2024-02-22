import style from "./spinner.module.scss";
import { useAppSelector, useAppDispatch } from "../hooks";
import { reset } from "../redux/ordersSlice";
import { setSpinnerToFalse } from "../redux/spinnerSlice";

function Spinner() {
  const dispatch = useAppDispatch();

  const { spinner } = useAppSelector((state) => {
    return state.spinner;
  });

  const { isError } = useAppSelector((state) => state.order);

  // console.log(popup);

  console.log("ERROR " + isError);
  

  return (
    <div className={!spinner ? style.removePopup : style.popup}>
      <section>
        {isError ? (
          <div>
            <p>Error</p>{" "}
            <button
              onClick={() => {
                dispatch(setSpinnerToFalse());
                dispatch(reset());
              }}
            >
              Try again later
            </button>{" "}
          </div>
        ) : (
          <span className={style.loader}></span>
        )}
      </section>
    </div>
  );
}

export default Spinner;

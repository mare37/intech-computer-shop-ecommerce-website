import styles from "./Navbar.module.scss";

import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";

import { useAppSelector, useAppDispatch } from "../../hooks";

import { setSiderBar, setSiderBarToFalse } from "../../features/sidebarSlice";

function Navbar() {
  const sidebar: boolean = useAppSelector(
    (state) => state.sidebarController.value
  );
  const dispatch = useAppDispatch();
  console.log(sidebar);

  return (
    <div id={styles.navbar}>
      <div className={styles.nav}>
        <div className={styles.navbarlinks}>
          <AiOutlineMenuUnfold
            onClick={() => {
              console.log(sidebar);
              dispatch(setSiderBar());
            }}
            className={styles.menu}
          />

          <div className={styles.innerContainer}>
            <span>
              <IoIosNotifications className={styles.notification} />
            </span>

            <img src={"./image.jpg"} />

            <div  className={styles.textContainer}   >
              <section className={styles.name}>Admin</section>
              <ImCancelCircle
                onClick={() => {
                  console.log(sidebar);
                  dispatch(setSiderBarToFalse());
                }}
                className={
                  sidebar ? styles.cancelButton : styles.removeCancelButton
                }
              />

              <section className={styles.email}>marewilson35@gmail.com</section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

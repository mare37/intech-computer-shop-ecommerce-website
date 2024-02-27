import { useRef } from "react";
import { updateOrderStatus } from "../../api/orders";
import tableStyles from "../table.module.scss";
import styles from "./orderitem.module.scss"
import { loading, error, success, reset } from "../../redux/ordersSlice";
import { setSpinnerToFalse } from "../../redux/spinnerSlice";
import { setOrderItemToFalse } from "../../redux/orderItemSlice";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../hooks";


interface response{

}


const menuList = [
  { status: "Not Processed", colour: "red" },
  { status: "Processing", colour: "blue" },
  { status: "Dispatched", colour: "orange" },
  { status: "Cancelled", colour: "red" },
  { status: "Delivered", colour: "green" },
];

const Status = ({ status, colour, id } : any) => {
  
  const Element = useRef<any>();

  const focusOnElement = () => {
    console.log(Element.current);
    if (Element.current) {
      console.log(Element);
      return true
    }

    return false
  };

  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useAppSelector((state) => state.order);

  return (
    <div    className={styles.status}         >
      <Menu>
        <MenuButton
          ref={Element}
          bg={"white"}
          color={colour}
          padding={"5px"}
          border={"none"}
        
        >
          {status}       
        </MenuButton>
        <MenuList>
          {menuList.map((statusItem, key) => {
            return (
              <MenuItem
                key={key}
                onClick={() => {
                  console.log(id);
                  dispatch(setOrderItemToFalse())
            
                 // window.scrollTo({ top: 0 })

                  console.log(statusItem);
                  updateOrderStatus(id, statusItem, dispatch)
                    .then((response) => { 
                      console.log(response);
                      if (response.orderStatusUpdated) {
                        dispatch(setSpinnerToFalse())
                        dispatch(success());
                      }else{
                        dispatch(error());
                      }
                    })
                    .finally(() => {
                     dispatch(reset());
                    });
                }}
              >
                {statusItem.status}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </div>
  );
};
export default Status;

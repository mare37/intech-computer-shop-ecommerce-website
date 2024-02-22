import { useRef } from "react";
import { updateOrderStatus } from "../../api/orders";
import tableStyles from "../table.module.scss";
import { loading, error, success, reset } from "../../redux/ordersSlice";
import { setSpinnerToFalse } from "../../redux/spinnerSlice";
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

const StatusCell = ({ getValue, row, column, table, rowInfo }: any) => {
  const { status, colour } = getValue();
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
    <>
      <Menu>
        <MenuButton
          ref={Element}
          bg={"white"}
          color={colour}
          padding={"5px"}
          border={"none"}
          onClick={() => {
            console.log(row);
          }}
        >
          {status}       
        </MenuButton>
        <MenuList>
          {menuList.map((statusItem, key) => {
            return (
              <MenuItem
                key={key}
                onClick={() => {
                  console.log(row.original._id);
                  console.log(row);
                 // window.scrollTo({ top: 0 })

                  console.log(statusItem);
                  updateOrderStatus(row.original._id, statusItem, dispatch)
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
                   //   dispatch(reset());
                    });
                }}
              >
                {statusItem.status}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
};
export default StatusCell;

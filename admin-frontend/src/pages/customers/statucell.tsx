import { useRef } from "react";
import { removeUser,reactivateOneuser } from "../../api/users";
import tableStyles from "../table.module.scss";
import { loading,error, success,reset } from "../../redux/userSlice"
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

interface response {}

const menuList = ["Activate", "Inactivate"];

const StatusCell = ({ getValue, row, column, table, rowInfo }: any) => {
  const status = getValue();
  const Element = useRef<any>();

  const focusOnElement = () => {
    console.log(Element.current);
    if (Element.current) {
      console.log(Element);
      return true;
    }

    return false;
  };

  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useAppSelector((state) => state.user);

  return (
    <>
      <Menu>
        <MenuButton
          ref={Element}
          bg={"white"}
          color={status === "Active" ? "Green" : "black"}
          padding={"5px"}
          border={"none"}
          onClick={() => {
            console.log(row.original);
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
                  if (row.original.role !== "Admin") {
                    if (statusItem === "Inactivate") {
                      removeUser(row.original._id, dispatch)
                        .then((response) => {
                            
                            
                        
                          if (response.userUpdated) {
                            console.log(response);
                         //   dispatch(setSpinnerToFalse());
                        dispatch(success());
                          } else {
                            dispatch(error());
                          }
                        })
                        .finally(() => {
                          dispatch(reset());
                        });
                    }
                    if (statusItem === "Activate") {
                        //Activate user's account 

                       reactivateOneuser(row.original._id, dispatch)
                        .then((response) => { 
                         
                          if (response.userUpdated) {
                            console.log(response);
                           /// dispatch(setSpinnerToFalse())
                         dispatch(success());
                          }else{
                            dispatch(error());
                          }
                        })
                        .finally(() => {
                         dispatch(reset());
                        });

                      console.log("Time to activate");
                    }
                  }
                }}
              >
                {statusItem}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
};
export default StatusCell;

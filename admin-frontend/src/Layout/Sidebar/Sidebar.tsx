import styles from "./Sidebar.module.scss";
import { Link } from "react-router-dom";

import { AiOutlineDashboard } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FaBloggerB } from "react-icons/fa";
import { SiCoinmarketcap } from "react-icons/si";
import { BiMessageRounded, BiSolidDownArrow } from "react-icons/bi";
import { GoListOrdered } from "react-icons/go";
import { SlOptions } from "react-icons/sl";
import { VscTriangleDown } from "react-icons/vsc";

import { useAppSelector, useAppDispatch } from "../../hooks";

import { setSiderBar,setSiderBarToFalse } from "../../features/sidebarSlice";
import { useState } from "react";

function Sidebar() {
  const sidebar: boolean = useAppSelector(
    (state) => state.sidebarController.value
  );
  const dispatch = useAppDispatch();

  const [expandMenu, setExpandMenu] = useState(false);
  const [expandMarketingMenu, setExpandMarketingMenu] = useState(false);
  const [expandBlogMenu, setExpandBlogMenu] = useState(false);

  console.log(sidebar);

  return (
    <div className={styles.parent}>
      <div className={sidebar ? styles.sidebar : styles.removeSidebar}>
        <div className={styles.heading}>Intech Computer</div>

        <div className={styles.body}>
          <section>
            <AiOutlineDashboard /> <p>Dashboard</p>
          </section>
          <section>
            <BsFillPersonFill /> <p>Customers</p>
          </section>
          <section>
            <SlOptions /> <p>Options</p>{" "}
            <VscTriangleDown
              onClick={() => {
                setExpandMenu((prev) => {
                  return !prev;
                });
              }}
              className={styles.arrow}
            />
          </section>

          <div   onClick={() => {
                  console.log(sidebar);
                  dispatch(setSiderBarToFalse());
                }}       className={expandMenu ? styles.expandMenu : styles.contractMenu}>
            <p>Add product</p>
            <p>Products List</p>
            <p> <Link to="addbrand">Add brand</Link>   </p>
            <p>Brands list</p>
            <p>Add Category</p>
            <p>Categories list</p>
            <p><Link to="addcolor">Add color</Link> </p>
            <p>Colours list</p>
          </div>
          <section>
            <GoListOrdered /> <p>Orders</p>
          </section>
          <section>
            <SiCoinmarketcap /> <p>Marketing</p>
            <VscTriangleDown
              onClick={() => {
                setExpandMarketingMenu((prev) => {
                  return !prev;
                });
              }}
              className={styles.arrow}
            />
          </section>
          <div
            className={
              expandMarketingMenu ? styles.expandMenu : styles.contractMenu
            }
          >
            <p>Add Coupon</p>
            <p>Coupon List</p>
          </div>
          <section>
            <FaBloggerB /> <p>Blog</p>{" "}
            <VscTriangleDown
              onClick={() => {
                setExpandBlogMenu((prev) => {
                  return !prev;
                });
              }}
              className={styles.arrow}
            />
          </section>
          <div
            className={expandBlogMenu ? styles.expandMenu : styles.contractMenu}
          >
            <p>Write a blog</p>
            <p>Blogs list</p>
            <p>Add a blog Category</p>
            <p>Blog Category List</p>
          </div>
          <section>
            <BiMessageRounded /> <p>Enquiries</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

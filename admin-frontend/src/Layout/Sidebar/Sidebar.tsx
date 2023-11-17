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

import { setSiderBar, setSiderBarToFalse } from "../../features/sidebarSlice";
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
            <AiOutlineDashboard /> <p><Link to="dashboard">Dashboard</Link></p>
          </section>
          <section>
            <BsFillPersonFill /> <p> <Link to="customers">Customers</Link></p>
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

          <div
            onClick={() => {
              console.log(sidebar);
              dispatch(setSiderBarToFalse());
            }}
            className={expandMenu ? styles.expandMenu : styles.contractMenu}
          >
            <p>
              <Link to="addproduct">Add product</Link>
            </p>
            <p>Products List</p>
            <p>
              {" "}
              <Link to="addbrand">Add brand</Link>
            </p>
            <p>
              {" "}
              <Link to="brandlist">Brand list</Link>{" "}
            </p>
            <p>
              <Link to="productcategory">Add product category</Link>
            </p>
            <p>
              {" "}
              <Link to="productcategorylist">Categories list</Link>
            </p>
            <p>
              <Link to="addcolor">Add color</Link>
            </p>
            <p>
              <Link to="colourlist">Colour list</Link>
            </p>
          </div>
          <section>
            <GoListOrdered />{" "}
            <p>
              <Link to="orders">Orders</Link>
            </p>
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
            <p>
              <Link to="addcoupon">Add coupon</Link>
            </p>

            <p>
              <Link to="couponlist">Coupon list</Link>
            </p>
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
            <p>
              {" "}
              <Link to="writeblog">Write a blog</Link>
            </p>
            <p>
              <Link to="bloglist">Blog list</Link>
            </p>
            <p>
              {" "}
              <Link to="addblogcategory">Add a blog category</Link>
            </p>
            <p>
              <Link to="blogcategorylist">Blog category list</Link>
            </p>
          </div>
         
          <section>
            <BiMessageRounded /> <p><Link to="enquiries">Enquiries</Link></p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

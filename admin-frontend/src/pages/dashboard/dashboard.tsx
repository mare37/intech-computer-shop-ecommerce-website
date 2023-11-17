import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  defaults,
  CategoryScale,
  BarElement,
} from "chart.js/auto";
import { Chart } from "react-chartjs-2";

import { Bar } from "react-chartjs-2";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaChartBar } from "react-icons/fa";
import { IoLogoAppleAr } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
import { FaMoneyBillWave  } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

import { RiFacebookCircleLine } from "react-icons/ri";
import { BsCash } from "react-icons/bs";
import styles from "./dashboard.module.scss";
import { useState } from "react";
import Item from "antd/es/list/Item";
import Orders from "./orders";
const schema = yup.object().shape({
  title: yup.string().required(),
  category: yup.string().required(),
  description: yup.string().required(),
});

const data = [
  { month: "January", sales: 100430 },
  { month: "February", sales: 242830 },
  { month: "March", sales: 153218 },
  { month: "April", sales: 250000 },
  { month: "May", sales: 223333 },
  { month: "June", sales: 178993 },
  { month: "July", sales: 283999 },
];

const handleChange = () => {};

function isQuillEmpty(value: string) {
  if (
    value.replace(/<(.|\n)*?>/g, "").trim().length === 0 &&
    !value.includes("<img")
  ) {
    return true;
  }
  return false;
}

function Dashboard() {
  ChartJS
    .register(
      BarElement
    );

  const data1: any = {
    labels: data.map((item) => {
      return item.month;
    }),

    datasets: [
      {
        label: "Dataset 1",
        data: data.map((Item) => Item.sales),
        backgroundColor: "#ffd333",
      },
    ],
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardContainer}>
        <section className={styles.firstSection}>
          <div className={styles.firstSectionDiv}    >
            <section>
              <h3>{"Ksh "}3000000</h3>
              <p> Total earnings</p>
            </section>

            <FaChartBar className={styles.icon} />
          </div>

          <div    className={styles.firstSectionDiv}         >
            <section>
              <h3>{"Ksh "}7000000</h3>
              <p>Goal this year</p>
            </section>

            <IoLogoAppleAr style={{ color: "green" }} className={styles.icon} />
          </div>

          <div className={styles.pageViews}  >
            <section>
              <h3>{"Ksh "}45000</h3>
              <p>Total page views</p>
            </section>

            <MdRemoveRedEye style={{ color: "blue" }} className={styles.icon} />
          </div>
        </section>

        <section className={styles.secondSection}>
          <div    className={styles.secondSectionDiv}            >
            <span>Ksh</span>

            <section>
              <h4>Revenue</h4>
              <h2>{"Ksh "}450000</h2>
              <p>{"Ksh "}50000 Last Month</p>
            </section>
          </div>
          <div   className={styles.secondSectionDiv}          style={{ backgroundColor: "rgb(250, 173, 20)" }}>
            <FaMoneyBillWave 
              style={{
               
                opacity: "0.6",
                height: "70px",
                width: "70px",
                marginLeft: "20px",
                color: "gray",
              }}
            />

            <section>
              <h4>Orders Received</h4>
              <h2>455</h2>
              <p>20% Increase</p>
            </section>
          </div>
          <div  className={styles.totalSales}      style={{ backgroundColor: "rgb(82, 196, 26)" }}>
            <BsCash
              style={{
                opacity: "0.6",
                height: "70px",
                width: "70px",
                marginLeft: "20px",
                color: "gray",
              }}
            />

            <section>
              <h4>Total Sales</h4>
              <h2>50</h2>
              <p>100 Last Month</p>
            </section>
          </div>
        </section>

        <section className={styles.thirdSection}>
          <div style={{ backgroundColor: "rgb(22, 119, 255)" }}>
            <section>
              <h2>1078 +</h2>
              <p>Facebook users</p>
            </section>

            <FaSquareFacebook className={styles.socialIcons} />
          </div>

          <div
            style={{
              backgroundColor: "black",
              backgroundImage: "linear-gradient(-90deg,rgb(47 4 11) , black)",
            }}
          >
            <section>
              <h2>10078 +</h2>
              <p>Tiktok users</p>
            </section>

            <FaTiktok className={styles.socialIcons} />
          </div>

          <div
            style={{
              backgroundColor: "black",
              backgroundImage: "linear-gradient(30deg,red, blue )",
            }}
          >
            <section>
              <h2>2000 +</h2>
              <p>Instagram users</p>
            </section>

            <AiFillInstagram className={styles.socialIcons} />
          </div>

          <div
            style={{
              backgroundColor: "black",
            }}
          >
            <section>
              <h2>2000 +</h2>
              <p>X users</p>
            </section>

            <RiTwitterXFill className={styles.socialIcons} />
          </div>
        </section>

        <section       className={styles.fourthSection}             >
          <h2>Income overview</h2>

          <Bar
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Sales in the last six months",
                },
                legend: {
                  display: false,
                },
              },
            }}
            data={data1}
          />
        </section>

       <section    className={styles.fifthSection}          >

       <Orders/>
       </section>
      </div>
    </div>
  );
}

export default Dashboard;

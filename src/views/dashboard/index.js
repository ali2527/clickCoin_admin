import React, { useState, lazy, Suspense } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  DatePicker,
  Layout,
  Checkbox,
  Space,
  Table,
  Select,
  Card,
  Image,
  Progress,
  Pagination,
} from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";
import Vectr1 from "../../assets/vectr1.png";
import Vector2 from "../../assets/vector2.png";
import Vector3 from "../../assets/vector3.png";
import Vector4 from "../../assets/vector4.png";
import { Line } from "react-chartjs-2";

import ClientLayout from "../../components/ClientLayout";
import { FaSearch, FaFilter, FaCaretDown, FaEye } from "react-icons/fa";
// import { AiFillApple } from "react-icons/ai";
import { FaCode, FaChartLine } from "react-icons/fa";
import styles from "../../styles/Home.module.css";
import { render } from "react-dom";
import { useNavigate } from "react-router-dom";


ChartJS.register(CategoryScale);
ChartJS.register(LinearScale);
ChartJS.register(PointElement);
ChartJS.register(LineElement);

const data = {
  labels: [
    "Nov 2015",
    "March 2016",
    "July 2017",
    "August 2018",
    "Sep 2019",
    "Oct 2020",
    "July 2021",
  ],
  datasets: [
    {
      label: "Users",
      data: [30000, 20000, 30000, 25000, 35000, 49000, 40000],
      fill: true,
      backgroundColor: "rgba(157,98,245,0.2)",
      borderColor: "#9D62F5",
      pointRadius: 3,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      title: {
        display: true,
        text: "Users",
        color: "#000000",
      },
      min: 0,
      max: 50000,
    },
    x: {
      title: {
        display: true,
        text: "Months",
        color: "#000000",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const data2 = {
  labels: [
    "Nov 2015",
    "March 2016",
    "July 2017",
    "August 2018",
    "Sep 2019",
    "Oct 2020",
    "July 2021",
  ],
  datasets: [
    {
      label: "Users",
      data: [30000, 48000, 30000, 25000, 35000, 40000, 15000],
      fill: true,
      backgroundColor: "rgba(157,98,245,0.2)",
      borderColor: "#4fc068",
      pointRadius: 3,
    },
  ],
};

const options2 = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      title: {
        display: true,
        text: "Service Providers",
        color: "#000000",
      },
      min: 0,
      max: 50000,
    },
    x: {
      title: {
        display: true,
        text: "Months",
        color: "#000000",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const data3 = {
  labels: [
    "Nov 2015",
    "March 2016",
    "July 2017",
    "August 2018",
    "Sep 2019",
    "Oct 2020",
    "July 2021",
  ],
  datasets: [
    {
      label: "Users",
      data: [30000, 50000, 30000, 35000, 35000, 40000, 45000],
      fill: true,
      backgroundColor: "rgba(157,98,245,0.2)",
      borderColor: "#2299db",
      pointRadius: 3,
    },
  ],
};

const options3 = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      title: {
        display: true,
        text: "Service Providers",
        color: "#000000",
      },
      min: 0,
      max: 50000,
    },
    x: {
      title: {
        display: true,
        text: "Months",
        color: "#000000",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const cardsdata = [
  {
    imageSrc: Vectr1,
    title: "Total Earnings",
    dolarnumbers: "75%",
    smallText: "on avg."
  },
  {
    imageSrc: Vector2,
    title: "Listed Content Creators",
    dolarnumbers: "14.9 M",
  },
  {
    imageSrc: Vector3,
    title: "Active Campaigns",
    dolarnumbers: "75% on",
    smallText: "on avg."
  },
  {
    imageSrc: Vector4,
    title: "Total Traffic",
    dolarnumbers: "75% on",
    smallText: "on avg."
  },
];


const columns = [
  {
    title: "#",
    dataIndex: "key",
    key: "key",
    width: 100,
    render: (value, item, index) => (index < 10 && "0") + (index + 1),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Popularity",
    dataIndex: "popularity",
    key: "popularity",
  },
  {
    title: "Earnings",
    dataIndex: "earnings",
    key: "earnings",
  },
];


const columns2 = [
  {
    title: "#",
    dataIndex: "key",
    key: "key",
    width: 100,
    render: (value, item, index) => (index < 10 && "0") + (index + 1),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "App Installs",
    dataIndex: "appInstalls",
    key: "appInstalls",
  },
  {
    title: "Earnings",
    dataIndex: "earnings",
    key: "earnings",
  },
];


export default function Home() {
  const [serviceProviders, setServiceProviders] = useState([
    { id: 1, name: 'Farrukh Khaan', popularity: <Progress percent={50} showInfo={false} />, earnings: "50%" },
    { id: 2, name: 'Raamish Lutfi', popularity: <Progress percent={80} showInfo={false} />, earnings: "80%" },
    { id: 3, name: 'Sana Anjum', popularity: <Progress percent={30} showInfo={false} />, earnings: "30%" },
    // Add more user objects as needed
  ]);
  const [performingCampaigns, setPerformingCampaigns] = useState([
    { id: 1, name: 'Farrukh Khaan1', appInstalls: "1500", earnings: "5.5k" },
    { id: 2, name: 'Raamish Lutfi', appInstalls: "1100", earnings: "2.5k" },
    { id: 3, name: 'Sana Anjum', appInstalls: "1200", earnings: "3.0k" },
    // Add more user objects as needed
  ]);
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  return (
    <Layout className="configuration">

      <Row
        style={{ width: "100%", display: "flex", alignItems: "center" }}
      >
        <Col md={12}>
          <h5 className="heading-18">Overview</h5>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: "right" }}>
          <Space direction="vertical" size={12}>
            <RangePicker />
          </Space>
        </Col>
      </Row>
      {/* ================================ROW ONE START========================================= */}
      <Row gutter={[20, 10]} style={{}}>
        {cardsdata.map((item, index) => (
          <Col xs={12} lg={6} key={index}>
            <Card
              // hoverable
              className="dashboard-mini-card"
            >
              <Image
                preview={false}
                alt={"Failed to load image"}
                src={item.imageSrc}
                className="dashbord-icn-pics"
              />
              <p>{item.title}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h4>{item.dolarnumbers}</h4>
                <p>{item.smallText}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ================================ROW ONE END========================================= */}

      <br />

      {/* ================================ROW ONE START========================================= */}
      <Row gutter={[20, 10]} style={{}}>
        <Col md={24} lg={12}>
          <Row style={{ padding: 20, overflow: "auto" }}>
            <div className="web-card">
              <h5 className="heading-18">Top Creators</h5>
              <Table
                className="styledTable"
                dataSource={serviceProviders}
                columns={columns}
                pagination={false}
              />
            </div>
          </Row>
        </Col>
        <Col md={24} lg={12}>
          <Row style={{ padding: 20, overflow: "auto" }}>
            <div className="web-card">
              <h5 className="heading-18">Top Performing Campaigns</h5>
              <Table
                className="styledTable"
                dataSource={performingCampaigns}
                columns={columns2}
                pagination={false}
              />
            </div>
          </Row>
        </Col>
      </Row>

      {/* ================================ROW ONE END========================================= */}
      <br />
      {/* ================================ROW TWO START========================================= */}
      <Row gutter={[20, 10]}>
        <Col xs={24}>
          <div class="boxDetails" style={{ padding: "30px" }}>
            <Row
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Col xs={24} md={12}>
                <h5 class="sectionTitle">Content Engagemen</h5>
              </Col>
              <Col xs={24} md={12} style={{ textAlign: "right" }}>
                <Select
                  size={"large"}
                  className="chartSelectBox"
                  defaultValue="All Creators"
                  // onChange={handleChange}
                  style={{
                    width: 200,
                    textAlign: "left",
                  }}
                  options={[
                    { value: "All Creators", label: "All Creators" },
                    { value: "halfYearly", label: "6 Months" },
                    { value: "yearly", label: "Yearly" },
                  ]}
                />
              </Col>
            </Row>
            <Row style={{ minHeight: "400px", overflowX: "auto" }}>
              <div style={{ minWidth: "600px", width: "100%" }}>
                <Line options={options} data={data} />
              </div>
            </Row>
          </div>
        </Col>
      </Row>

      {/* ================================ROW TWO END========================================= */}
      <br />
      <br />
      <br />
    </Layout>
  );
}

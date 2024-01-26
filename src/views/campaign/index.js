import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Modal,
  Button,
  Popover,
  Layout,
  Checkbox,
  Skeleton,
  Table,
  Spin,
  Select,
  Image,
  Pagination,
  DatePicker,
  message,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaSearch, FaFilter, FaCaretDown, FaEye } from "react-icons/fa";
import ClientLayout from "../../components/ClientLayout";
import { Get } from "../../config/api/get";
import { FEEDBACK } from "../../config/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Campaign() {
  const token = useSelector((state) => state.user.userToken);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [serviceProviders, setServiceProviders] = useState([
    { id: 1, listedCampaigns: 'Sweatcoin App - Walking Step..', costper: '$2.1', listedplaforms: '5', isActive: true },
    { id: 2, listedCampaigns: 'Airbrush - Best Photo Editor', costper: '$4.1', listedplaforms: '3', isActive: false },
    { id: 3, listedCampaigns: 'Celebs - Celebrity Look Alikes', costper: '$5.1', listedplaforms: '9', isActive: false },
    // Add more user objects as needed
  ]);;
  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    status: null,
    keyword: "",
    from: null,
    to: null,
  });

  const startIndex =
    (paginationConfig.pageNumber - 1) * paginationConfig.limit + 1;
  const endIndex = Math.min(
    startIndex + paginationConfig.limit - 1,
    paginationConfig.totalDocs
  );
  const message = `Showing records ${endIndex} of ${paginationConfig.totalDocs}`;

  useEffect(() => {
    getServiceProviders();
  }, []);



  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });

    getServiceProviders(pageNumber);
  };

  const handleSearch = (value) => {
    setFilter({
      ...filter,
      keyword: value,
    });
  };

  const handleStatusChange = (value) => {
    setFilter({
      ...filter,
      status: value,
    });
  };

  const resetFilter = () => {
    setFilter({
      status: null,
      keyword: "",
      from: null,
      to: null,
    });
    getServiceProviders(paginationConfig.pageNumber, paginationConfig.limit, "", true);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleFrom = (date) => {
    setFilter({
      ...filter,
      from: date,
    });
  };

  const handleTo = (date) => {
    setFilter({
      ...filter,
      to: date,
    });
  };

  const handleLimitChange = (pageSize) => {
    setPaginationConfig({
      ...paginationConfig,
      limit: pageSize,
      current: 1,
    });

    getServiceProviders(1, pageSize);
  };

  const handleStatus = async () => {
    try {
      const index = serviceProviders.findIndex((user) => user._id == selectedUser._id);

      console.log(index)
      const response = await Get(FEEDBACK.toggleStatus + "/" + selectedUser._id, token, {});
      const newUsers = [...serviceProviders];

      console.log(">>>>", newUsers[index].isActive)
      console.log(">>>>", selectedUser.isActive)
      newUsers[index].isActive = !selectedUser.isActive;
      setModalOpen(false);
      setServiceProviders(newUsers);
    } catch (error) {
      console.log(error.message);
    }

  };




  const getServiceProviders = async (pageNumber, pageSize, search, reset = false) => {
    setLoading(true);
    try {
      const response = await Get(FEEDBACK.get, token, {
        page: pageNumber
          ? pageNumber.toString()
          : paginationConfig.pageNumber.toString(),
        limit: pageSize
          ? pageSize.toString()
          : paginationConfig.limit.toString(),
        status: reset ? "" : filter.status || null,
        keyword: search ? search : null,
        from: reset ? "" : filter?.from ? filter?.from.toISOString() : "",
        to: reset ? "" : filter?.to ? filter?.to.toISOString() : "",
      });
      setLoading(false);
      console.log("response", response);
      if (response?.docs) {
        setServiceProviders(response?.docs);
        setPaginationConfig({
          pageNumber: response?.page,
          limit: response?.limit,
          totalDocs: response?.totalDocs,
          totalPages: response?.totalPages,
        });
      } else {
        message.error("Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  console.log("paginationConfig", paginationConfig);

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const columns = [
    // {
    //   title: "S. No.	",
    //   dataIndex: "key",
    //   key: "key",
    //   width: 100,
    //   render: (value, item, index) => (index < 10 && "0") + (index + 1),
    // },
    {
      title: "Listed Campaigns",
      dataIndex: "listedCampaigns",
      key: "listedCampaigns",
    },
    {
      title: "Cost per download",
      dataIndex: "costper",
      key: "costper",
    },
    {
      title: "Initiated on",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => <span>{dayjs(item).format("M/D/YYYY")}</span>,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (item) => (
        <span style={{ fontSize: "16px", color: "#385790", cursor: "pointer" }}
          onClick={() => navigate("/campaign/" + item)}>View Profile</span>
        // <FaEye

        // />
      ),
    },
  ];

  const filterContent = (
    <div className="filterDropdown">
      <div>
        <p className="mainLabel" style={{ padding: "10px" }}>
          Filter
        </p>
      </div>
      <hr style={{ margin: 0 }} />

      <div className="filterDropdownBody">
        {/* <p className="mainLabel">Creation Date:</p>
        <DatePicker
          className="mainInput filterInput"
          value={filter.from}
          onChange={(e) => handleFrom(e)}
        />
        <DatePicker
          className="mainInput filterInput"
          value={filter.to}
          onChange={(e) => handleTo(e)}
        /> */}

        <p className="mainLabel">Employee:</p>
        <Select
          size={"large"}
          className="filterSelectBox"
          placeholder="Employee"
          value={filter.status}
          onChange={(e) => handleStatusChange(e)}
          style={{
            width: "100%",
            marginBottom: "10px",
            textAlign: "left",
          }}
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
        />
        <p className="mainLabel">Type</p>
        <Select
          size={"large"}
          className="filterSelectBox"
          placeholder="Select Type"
          value={filter.status}
          onChange={(e) => handleStatusChange(e)}
          style={{
            width: "100%",
            marginBottom: "10px",
            textAlign: "left",
          }}
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
        />
        <p className="mainLabel">Filter by Status:</p>
        <Select
          size={"large"}
          className="filterSelectBox"
          placeholder="Select Status"
          value={filter.status}
          onChange={(e) => handleStatusChange(e)}
          style={{
            width: "100%",
            marginBottom: "10px",
            textAlign: "left",
          }}
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
        />

        <Button
          type="primary"
          shape="round"
          block
          size={"large"}
          style={{ marginBottom: "10px" }}
          className="mainButton primaryButton"
          onClick={() => getServiceProviders()}
        >
          Apply
        </Button>
        <Button
          type="primary"
          shape="round"
          block
          size={"large"}
          className="mainButton primaryButton2"
          onClick={() => resetFilter()}
        >
          Clear All
        </Button>
      </div>
    </div>
  );

  return (
    <Layout className="configuration">
      <div className="boxDetails">
        <Row style={{ padding: "10px 20px" }}>
          <h1 className="pageTitle">Creator Listing</h1>
        </Row>

        <Row style={{textAlign:"end"}}>
          <Col md={24}>
            <Button
              type="button"
              size={"large"}
              style={{ padding: "12px 40px", height: "auto" }}
              className="mainButton graden-bg"
              onClick={() => navigate("/campaign/initiateCampaign")}
            >
              + Initiate Campaign
            </Button>
          </Col>
        </Row>

        <Row style={{ padding: "10px 20px" }}>
            <Col md={24}>
                <h4 className="pageTitle">My Apps</h4>
            </Col>
        </Row>


        <Row style={{ padding: 20, overflow: "auto" }}>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Skeleton active />
              <br />
            </div>
          ) : (
            <Table
              className="styledTable"
              dataSource={serviceProviders}
              columns={columns}
              pagination={false}
            />
          )}
        </Row>
        <Row style={{ padding: "10px 20px" }}>
          <Col xs={24} md={12}>
            <p>{message}</p>
          </Col>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Pagination
              className="styledPagination"
              onChange={(e) => handlePageChange(e)}
              current={parseInt(paginationConfig.pageNumber)}
              pageSize={paginationConfig.limit}
              total={paginationConfig.totalDocs}
              itemRender={itemRender}
            />
          </Col>
        </Row>
        <br />
      </div>
      <br />
      <br />
      <Modal
        visible={modalOpen}
        onOk={() => handleStatus()}
        onCancel={() => setModalOpen(false)}
        okText="Yes"
        className="StyledModal"
        style={{
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
        cancelText="No"
        cancelButtonProps={{
          style: {
            border: "2px solid #385790",
            color: "#385790",
            height: "auto",
            padding: "6px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            marginTop: "15px",
          },
        }}
        okButtonProps={{
          style: {
            backgroundColor: "#385790",
            color: "white",
            marginTop: "15px",
            height: "auto",
            padding: "5px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            border: "2px solid #385790",
          },
        }}
      >
        <Image
          src="./images/question.png"
          preview={false}
          width={100}
          height={120}
        />
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
          {selectedUser?.isActive ? "Deactivate" : "Activate"}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Do You Want To  {selectedUser?.isActive ? "Deactivate" : "Activate"} This Service Provider?
        </Typography.Text>
      </Modal>
    </Layout>
  );
}

export default Campaign;

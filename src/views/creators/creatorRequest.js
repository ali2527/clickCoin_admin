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
    Tabs,
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
import { PAYMENT } from "../../config/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PaymentLogs() {
    const token = useSelector((state) => state.user.userToken);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([
        { id: 1, name: 'Farrukh Khan', requestedCommunity: 'requested with 1 community platform' },
        { id: 2, name: 'Farrukh Khan', requestedCommunity: 'requested with 1 community platform' },
        { id: 3, name: 'Farrukh Khan', requestedCommunity: 'requested with 1 community platform' },
        // Add more user objects as needed
    ]);
    const [historyreq, setHistoryreq] = useState([
        { id: 1, name: 'Farrukh Khan' },
        { id: 2, name: 'Farrukh Khan' },
        { id: 3, name: 'Farrukh Khan' },
        // Add more user objects as needed
    ]);
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
        getPaymentLogs();
    }, []);



    const handlePageChange = (pageNumber) => {
        setPaginationConfig({
            ...paginationConfig,
            pageNumber: pageNumber,
        });

        getPaymentLogs(pageNumber);
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
        getPaymentLogs(paginationConfig.pageNumber, paginationConfig.limit, "", true);
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

        getPaymentLogs(1, pageSize);
    };

    const handleStatus = async () => {
        try {
            const index = users.findIndex((user) => user._id == selectedUser._id);

            console.log(index)
            const response = await Get(PAYMENT.toggleStatus + "/" + selectedUser._id, token, {});
            const newUsers = [...users];

            console.log(">>>>", newUsers[index].isActive)
            console.log(">>>>", selectedUser.isActive)
            newUsers[index].isActive = !selectedUser.isActive;
            setModalOpen(false);
            setUsers(newUsers);
        } catch (error) {
            console.log(error.message);
        }

    };


    console.log("users", users.map(item => item.isActive))


    const getPaymentLogs = async (pageNumber, pageSize, search, reset = false) => {
        setLoading(true);
        try {
            const response = await Get(PAYMENT.get, token, {
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
                setUsers(response?.docs);
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
        //   title: "Payment ID",
        //   dataIndex: "key",
        //   key: "key",
        //   render: (value, item, index) => (index < 9 && "0") + (index + 1),
        // },
        {
            title: "",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "",
            dataIndex: "requestedCommunity",
            key: "requestedCommunity",
        },
        {
            title: "",
            dataIndex: "id",
            key: "id",
            render: (item) => (
                <span style={{ fontSize: "16px", color: "#385790", cursor: "pointer" }}
                    onClick={() => navigate("/creators/" + item)}>View Profile</span>
                // <FaEye

                // />
            ),
        },
    ];

    const columns2 = [
        // {
        //   title: "Payment ID",
        //   dataIndex: "key",
        //   key: "key",
        //   render: (value, item, index) => (index < 9 && "0") + (index + 1),
        // },
        {
            title: "",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (item) => <span>{dayjs(item).format("M/D/YYYY")}</span>,
        },
        {
            title: "",
            dataIndex: "id",
            key: "id",
            render: (item) => (
                <span style={{ fontSize: "16px", color: "#385790", cursor: "pointer" }}
                    onClick={() => navigate("/creators/" + item)}>View Profile</span>
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

                <p className="mainLabel">Filter:</p>

                <Select
                    size={"large"}
                    className="filterSelectBox"
                    placeholder="Last 30 days"
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
                    onClick={() => getPaymentLogs()}
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

    const onChange = (key) => {
        console.log(key);
    };
    const [tabPosition, setTabPosition] = useState('left');
    const changeTabPosition = (e) => {
        setTabPosition(e.target.value);
    };
    const items = [
        {
            key: '1',
            label: 'Creator Requests',
            children: <div className="boxDetails">
                <Row style={{ padding: "10px 20px" }}>
                    <h1 className="pageTitle">Creator Requests</h1>
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
                            dataSource={users}
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
            </div>,
        },
        {
            key: '2',
            label: 'Request History',
            children: <div className="boxDetails">
                <Row style={{ padding: "10px 20px" }}>
                    <h1 className="pageTitle">Request History</h1>
                </Row>
                <Row style={{ padding: "10px 20px" }}>
                    <h1 className="fs-18">300 Listed Creators</h1>
                </Row>
                <Row style={{ padding: "10px 20px" }}>
                    <Col xs={24} md={12}>
                        <h5 style={{ display: "inline", fontSize: 16 }}>Show : </h5>
                        <Select
                            size={"large"}
                            className="chartSelectBox"
                            defaultValue={paginationConfig.limit}
                            onChange={(e) => handleLimitChange(e)}
                            style={{
                                width: 70,
                                textAlign: "left",
                            }}
                            options={[
                                { value: 10, label: "10" },
                                { value: 20, label: "20" },
                                { value: 30, label: "30" },
                                { value: 40, label: "40" },
                                { value: 50, label: "50" },
                            ]}
                        />
                        &emsp;
                        <h5 style={{ display: "inline", fontSize: 16 }}>Entries</h5>
                    </Col>
                    <Col
                        xs={24}
                        md={12}
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                        }}
                    >
                        <Input
                            style={{ width: "250px" }}
                            className="mainInput dashInput"
                            placeholder="Search"
                            onChange={(e) => handleSearch(e.target.value)}
                            suffix={
                                <FaSearch
                                    style={{
                                        color: "#3c5a92",
                                        fontSize: 16,
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        getPaymentLogs(1, paginationConfig.limit, filter.keyword)
                                    }
                                />
                            }
                            onPressEnter={(e) =>
                                getPaymentLogs(1, paginationConfig.limit, filter.keyword)
                            }
                        />
                        &emsp;
                        <Popover
                            content={filterContent}
                            trigger="click"
                            open={open}
                            onOpenChange={handleOpenChange}
                            placement="bottomRight"
                            arrow={false}
                        >

                        </Popover>
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
                            dataSource={historyreq}
                            columns={columns2}
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
            </div>,
        },
    ];

    return (
        <Layout className="configuration">
            <Row>
                <Col md={22}>
                    <Tabs tabPosition={tabPosition} defaultActiveKey="1" items={items} onChange={onChange} />
                </Col>
            </Row>

            <br />
            <br />
        </Layout>
    );
}

export default PaymentLogs;

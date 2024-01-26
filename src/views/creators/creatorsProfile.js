import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  Button,
  Layout,
  Table,
  Image,
  Modal,
  Skeleton,
} from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { USERS } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CreatorPic from "../../assets/creatorPic.png";

function FeedbackDetails() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([
    { id: 1, name: 'Farrukh Haider', email: 'farrukh.khan@outlook.com', networth: '$19,623.00 USD', listedplaforms: '5', isActive: true, creatorPic: CreatorPic, subtitle: "@farrukh.khan", gender: "male", contact: "0300-00000000" , aboutcreator:"I'm Farrukh, the heart and mind behind the enchanting world you'll find on this corner of the internet. First things first, a big virtual hug to each one of you for being a part of this amazing journey. Ever since I can remember, I've been on a quest to unravel the beauty and wonder that life has to offer. From the bustling city streets to the tranquil embrace of nature, every moment holds a story waiting to be told. And that's where my journey as a content creator began." },
    { id: 2, name: 'Raamish Lutfi', email: 'farrukh.khan@outlook.com', networth: '$29,623.00 USD', listedplaforms: '3', isActive: false, creatorPic: CreatorPic, subtitle: "@farrukh.khan", gender: "female", contact: "0300-00000000" , aboutcreator:"I'm Farrukh, the heart and mind behind the enchanting world you'll find on this corner of the internet. First things first, a big virtual hug to each one of you for being a part of this amazing journey. Ever since I can remember, I've been on a quest to unravel the beauty and wonder that life has to offer. From the bustling city streets to the tranquil embrace of nature, every moment holds a story waiting to be told. And that's where my journey as a content creator began." },
    { id: 3, name: 'Sana Anjum', email: 'farrukh.khan@outlook.com', networth: '$12,623.00 USD', listedplaforms: '9', isActive: false, creatorPic: CreatorPic, subtitle: "@farrukh.khan", gender: "male", contact: "0300-00000000", aboutcreator:"I'm Farrukh, the heart and mind behind the enchanting world you'll find on this corner of the internet. First things first, a big virtual hug to each one of you for being a part of this amazing journey. Ever since I can remember, I've been on a quest to unravel the beauty and wonder that life has to offer. From the bustling city streets to the tranquil embrace of nature, every moment holds a story waiting to be told. And that's where my journey as a content creator began."  },
    // Add more user objects as needed
  ]);

  const [serviceProviders, setServiceProviders] = useState([
    { id: 1, apps: 'Youtube', engagement: '58%', users: '1k+' , netrevenue: '$3500', },
    { id: 2, apps: 'Sana Anjum Blog', engagement: '58%', users: '1k+' , netrevenue: '$3500', },
    { id: 3, apps: 'Patreon', engagement: '58%', users: '1k+' , netrevenue: '$3500', },
    // Add more user objects as needed
  ]);;

  useEffect(() => {
    getUser();
  }, []);

  console.log("JJJJJ", window.location);

  const getUser = async () => {
    setLoading(true);
    // const user = await Get(`${USERS.getOne}${id}`, token);
    // setUser(user);

    let _user = users.find((item) => item.id == id);

    console.log("_user", _user);
    setUser(_user);
    setLoading(false);
  };

  const handleStatus = async () => {
    try {
      const response = await Get(
        USERS.toggleStatus + "/" + user._id,
        token,
        {}
      );
      const newUser = { ...user };

      newUser.isActive = !user.isActive;
      setModalOpen(false);
      setUser(newUser);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeleteButtonClick = () => {
    setModalOpen(true);
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
      title: "Apps",
      dataIndex: "apps",
      key: "apps",
    },
    {
      title: "Engagement",
      dataIndex: "engagement",
      key: "engagement",
    },
    {
      title: "Users",
      dataIndex: "users",
      key: "users",
    },
    {
      title: "Net Revenue",
      dataIndex: "netrevenue",
      key: "netrevenue",
    },
    {
      title: "Action",
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

  return (
    <Layout className="configuration">
      <div className="boxDetails">
        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FaArrowLeft
              style={{ fontWeight: "bold", fontSize: "20px" }}
              onClick={() => navigate(-1)}
            />
            &emsp;
            <h1 className="pageTitle" style={{ margin: 0 }}>
              Back to Creators
            </h1>
          </Col>
        </Row>
        <br />

        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Skeleton active paragraph={{ rows: 10 }} />
          </div>
        )}

        {!loading && user && (
          <>
            <Row style={{ padding: "20px" }}>
              <Col xs={24} md={22}>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={6}>
                    <div className="creator-profile-box">
                      <Image
                        preview={false}
                        alt={"Failed to load image"}
                        src={user.creatorPic}
                        className="forimg-border"
                      />
                      <div>
                        <h4 className="heading-inner-medium" style={{ padding: "0" }}>{user?.name}</h4>
                        <h5 className="heading-inner-text">{user?.subtitle}</h5>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={6}>
                    <span>Youtuber, Podcaster</span>
                  </Col>
                </Row>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={8}>
                    <div className="inner-content-flex">
                      <h4>Gender:</h4>
                      <span className="fs-18">{user.gender}</span>
                    </div>
                  </Col>
                  <Col xs={24} md={8}>
                    <div className="inner-content-flex">
                      <h4>Email</h4>
                      <span className="fs-18">{user.email}</span>
                    </div>
                  </Col>
                  <Col xs={24} md={8}>
                    <div className="inner-content-flex">
                      <h4>Contact:</h4>
                      <span className="fs-18">{user.contact}</span>
                    </div>
                  </Col>
                </Row>
                <Row style={{ padding: "20px 10px" }}>
                  <Col md={24}>
                    <h6 className="fs-18">About</h6>
                    <p>{user.aboutcreator}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        )}

        <br />
        <br />
        <Row style={{ padding: 20, overflow: "auto" }}>
          <h5 className="pageTitle">Apps</h5>
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

      </div>
    </Layout>
  );
}
export default FeedbackDetails;

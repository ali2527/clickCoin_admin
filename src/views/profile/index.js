import { useState } from "react";
import { Col, Row, Layout, Avatar, Form, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UPLOAD_URL } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [editMode,setEditMode] = useState(false)
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    email: "bellaedward@gmail.com",
  });

  return (
    <Layout className="configuration">
      <div className="boxDetails">
        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <h1 className="pageTitle" style={{ margin: 0 }}>
              My Profile
            </h1>
          </Col>
        </Row>
        <br />
        <>
          <Row style={{ padding: "10px 20px" }}>
            <Col
              xs={24}
              md={24}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                size={100}
                icon={
                  !user?.image ? (
                    <UserOutlined />
                  ) : (
                    <Avatar size={40} src={UPLOAD_URL + user.image} />
                  )
                }
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />{" "}
            </Col>
            <Col
              xs={24}
              md={24}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h5 className="change-pas-link" onClick={() => navigate("/profile/changePass")}>Change Password</h5>
            </Col>
          </Row>
          <Row style={{ padding: "20px" }}>
            <Col xs={24} md={24}>
              <Row style={{ justifyContent: "center", textAlign: "center"}}>
                <Col xs={24} md={20} lg={8}>
                  <Row style={{ padding: "10px" }}>
                    <Col xs={24} md={12}>
                      <h5
                        style={{
                          display: "inline",
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        Name{" "}
                      </h5>
                      <h5
                        style={{
                          display: "block",
                          fontSize: 16,
                          color: "#7a7e7f",
                        }}
                      >
                        {user?.name}
                      </h5>
                    </Col>
                    <Col xs={24} md={12}>
                      <h5
                        style={{
                          display: "block",
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        Email Address{" "}
                      </h5>
                      <h5
                        style={{
                          display: "inline",
                          fontSize: 16,
                          color: "#7a7e7f",
                        }}
                      >
                        {user?.email}
                      </h5>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
        <br />
        <br />
        <Row justify="center">
          <Form.Item>
            <Button
              type="button"
              size={"large"}
              style={{ padding: "12px 40px", height: "auto" }}
              className="mainButton graden-bg"
              onClick={() => navigate("/profile/editProfile")}
            >
              Edit Profile
            </Button>
          </Form.Item>
        </Row>
      </div>
    </Layout>
  );
}
export default Profile;

import { useState } from "react";
import { Col, Row, Layout, Upload, Avatar, Form, Button, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FaArrowLeft } from "react-icons/fa";
import { UPLOAD_URL } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { TbCameraPlus } from "react-icons/tb";

function EditProfile() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [editMode, setEditMode] = useState(false);
  const [imageNew, setImageNew] = useState();
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    email: "bellaedward@gmail.com",
  });

  const onFinish = (values) => {
    console.log("Success:", values);

    // swal("System Message!", "You Profile Has Been Updated Successfully!", "success");
    // setEditMode(false);
    swal({
      title: "System Message!",
      text: "You Profile Has Been Updated Successfully!",
      icon: "success",
      buttons: {
          confirm : {text:'Okay',className:'graden-bg '},
      },
  })

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
            <h1 className="pageTitle" style={{ margin: 0 }}>
              edit Profile
            </h1>
          </Col>
        </Row>
        <br />
        <>
         
          <Row style={{ padding: "20px" }}>
            <Col xs={24} md={24}>
              <Row style={{ justifyContent: "center", textAlign: "center" }}>
                <Col xs={24} md={20} lg={11}>
                  <Form
                    layout="vertical"
                    name="basic"
                    labelCol={{
                      span: 0,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    initialValues={user}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <Row justify={"center"}>
                      <Col>{editMode ? (
                        <Form.Item name="image">
                          <Upload
                            name="image"
                            showUploadList={false}
                            style={{ position: "relative" }}
                            beforeUpload={(file) => {
                              setImageNew(URL.createObjectURL(file));
                              return false;
                            }}
                          >
                            {" "}
                            <div
                              style={{
                                padding: "8px",
                                position: "absolute",
                                right: -10,
                                zIndex: 2,
                                bottom: 40,
                                backgroundColor: "#243D62",
                                display: "flex",
                                maxWidth: "fit-content",
                                color: "white",
                                borderRadius: "20px",
                              }}
                            >
                              <TbCameraPlus />
                            </div>{" "}
                            <Avatar
                              size={120}
                              src={
                                imageNew
                                  ? imageNew
                                  : !user?.image
                                  ? "/images/avatar.png"
                                  : UPLOAD_URL + "/" + user?.image
                              }
                            />
                          </Upload>
                        </Form.Item>
                      ) : (
                        <Avatar
                          size={120}
                          src={
                            !user?.image
                              ? "/images/avatar.png"
                              : UPLOAD_URL + "/" + user?.image
                          }
                        />
                      )}
                       <h5
                        className="change-pas-link"
                        onClick={() => navigate("/profile/changePass")}
                      >
                        Change Password
                      </h5>
                      </Col>
                    </Row>
                    <br/>
                    <br/>
                    <Row
                      style={{
                        padding: "10px",
                        justifyContent: "space-between",
                      }}
                    >
                      <Col xs={24} md={11}>
                        {editMode ? (
                          <Form.Item
                            label="Full Name"
                            name="name"
                            rules={[
                              {
                                type: "text",
                                // warningOnly: true,
                              },
                              {
                                required: true,
                                message: "Please input name!",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="Bella"
                              style={{
                                borderRadius: "5px",
                                background: "white",
                                fontSize: "14px",
                                padding: "10px 20px",
                              }}
                            />
                          </Form.Item>
                        ) : (
                          <>
                            {" "}
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
                          </>
                        )}
                      </Col>
                      <Col xs={24} md={11}>
                        {editMode ? (
                          <Form.Item
                            label="Email Address"
                            name="email"
                            rules={[
                              {
                                type: "text",
                                // warningOnly: true,
                              },
                              {
                                required: true,
                                message: "Please input name!",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              disabled
                              placeholder="bellaedward@gmail.com"
                              style={{
                                borderRadius: "5px",
                                background: "white",
                                fontSize: "14px",
                                padding: "10px 20px",
                              }}
                            />
                          </Form.Item>
                        ) : (
                          <>
                            {" "}
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
                          </>
                        )}
                      </Col>
                    </Row>

                    <Row justify="center">
                      {editMode && (
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            size={"large"}
                            style={{ padding: "12px 40px", height: "auto" }}
                            className="mainButton graden-bg"
                            // onClick={() => setEditMode(true)}
                          >
                            Update Profile
                          </Button>
                        </Form.Item>
                      )}
                    </Row>
                  </Form>
                </Col>
              </Row>
              {!editMode && (
                <Row justify="center">
                  <Button
                    type="primary"
                    htmlType="button"
                    size={"large"}
                    style={{ padding: "12px 40px", height: "auto" }}
                    className="mainButton graden-bg"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </Button>
                </Row>
              )}
            </Col>
          </Row>
        </>
        <br />
      </div>
    </Layout>
  );
}
export default EditProfile;

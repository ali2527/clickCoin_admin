import React from "react";
import AuthLayout from "../../components/AuthLayout";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Layout,
  Input,
  Button,
  Checkbox,
  Tabs,
  Table,
  Image,
  Divider,
} from "antd";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../config/api/post";
import { AUTH } from "../../config/constants";
import Logo from "../../assets/logo.png";
import { addUser, removeUser } from "../../redux/slice/authSlice";
import swal from "sweetalert";

// import router from "next/router";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = React.useState(false);

  // useEffect if user is already logged in
  React.useEffect(() => {
    if (user && token) {
      navigate("/", { replace: true });
    }
  }, [user, token]);

  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);

    let data = {
      email: values.email,
      password: values.password,
      devideId: "123456789",
    };
    Post(AUTH.signin, data)
      .then((response) => {
        setLoading(false);
        if (response?.data) {
          console.log("response", response.data.token);
          console.log("response", response.data.user);
          dispatch(
            addUser({ user: response.data.user, token: response.data.token })
          );
          navigate("/", { replace: true });
        } else {
          swal("Oops!", response.response.data.message, "error");
        }
      })
      .catch((e) => {
        console.log(":::;", e);
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AuthLayout
      head={{ title: "User Management", description: "Some Description." }}
    >
      <Layout style={{ backgroundColor: "#fff" }}>
        <Row
          style={{
            minHeight: "100vh",
            padding: "30px",
            justifyContent: "center",
          }}
        >
          <Col xs={24} md={14} className="formMainWrap">
            <Row style={{ width: "100%", justifyContent: "center" }}>
              <Col xs={20} md={20} className="formWrap">
                <Row style={{ width: "100%", textAlign: "center" }}>
                  <Col xs={24} md={0}>
                    <Image
                      src={Logo}
                      style={{ maxWidth: "200px" }}
                      alt=""
                      preview={false}
                    />
                  </Col>
                  <Col xs={0} md={24}>
                    <Image
                      src={Logo}
                      style={{ maxWidth: "250px" }}
                      alt=""
                      preview={false}
                    />
                  </Col>
                </Row>
                
                <h4 className="auth-card-title">Sign in to your workspace</h4>
                <br />
                <Form
                  layout="vertical"
                  name="basic"
                  labelCol={{
                    span: 0,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Username"
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Please input valid Username!",
                        // warningOnly: true,
                      },
                      {
                        required: true,
                        message: "Please input your Username!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Username"
                      style={{
                        borderRadius: "12px",
                        background: "white",
                        fontSize: "14px",
                        padding: "18px 20px",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      {
                        type: "string",
                        min: 8,
                        message: "password must be atleast 8 characters!",
                      },
                    ]}
                    style={{ marginBottom: "0" }}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Enter Password"
                      style={{
                        borderRadius: "12px",
                        background: "white",
                        fontSize: "14px",
                        padding: "18px 20px",
                      }}
                    />
                  </Form.Item>
                  <Row>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        style={{ marginBottom: 0 }}
                      >
                        <Checkbox>Remember me</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Button
                        type="link"
                        style={{
                          float: "right",
                          color: "#21201E",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                        onClick={() => navigate("/forgot-password")}
                      >
                        Forgot Password?
                      </Button>
                    </Col>
                  </Row>
                  <br />

                  <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="web-btn"
                    style={{
                      cursor: "pointer",
                      width: "100%",
                    }}
                    onClick={() => navigate("/")}
                  >
                    {loading ? "Loading..." : "Continue"}
                  </Button>
                </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout>
    </AuthLayout>
  );
}

export default Signin;

// import router from "next/router";

import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Button,
  Popover,
  Layout,
  Avatar,
  Tabs,
  Table,
  Select,
  Image,
  Modal,
  Skeleton,
  message,
  Upload,
} from "antd";
import { FileImageOutlined } from "@ant-design/icons";

function PostBox() {
  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
      <div className="post-box">
        <Row>
          <Col xs={24} md={24}>
            <div className="for-d-flex">
              <div className="for-flex-shrink-0">
                <Image
                  src={"/images/profilepicture.png"}
                  alt="Analytics Image"
                  preview={false}
                />
              </div>
              <div className="for-flex-grow">
                <Input
                  size="medium"
                  placeholder="Would you like to post something"
                  style={{
                    borderRadius: "100px",
                    background: "#fff",
                    fontSize: "14px",
                    padding: "14px 20px",
                  }}
                />
              </div>
            </div>
            <div className="for-line"></div>
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={12}>
            <Upload {...props}>
              <Button className="img-upload-btn" icon={<FileImageOutlined />}>Image Upto (5MB)</Button>
            </Upload>
          </Col>
          <Col xs={24} md={12} style={{textAlign:"end"}}>
            <Button
              type="button"
              size={"large"}
              style={{ padding: "12px 40px", height: "auto" }}
              className="mainButton graden-bg"
            >
              Post
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default PostBox;

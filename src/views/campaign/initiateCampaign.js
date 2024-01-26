import { useEffect, useState } from "react";
import {
    Col,
    Row,
    Typography,
    Button,
    Layout,
    Table,
    Image,
    message,
    Upload,
    Form,
    Input,
    Skeleton,
} from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { USERS } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CreatorPic from "../../assets/appicn.png";
import Vectr1 from "../../assets/vectr1.png";
import Vector2 from "../../assets/vector2.png";
import Vector3 from "../../assets/vector3.png";
import Vector4 from "../../assets/vector4.png";

function CampaignView() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.user.userToken);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [user, setUser] = useState({});


    const { TextArea } = Input;
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


    const { Dragger } = Upload;
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                        &emsp;
                        <h1 className="pageTitle" style={{ margin: 0 }}>
                            Back to Campaigns123
                        </h1>
                    </Col>
                </Row>
                <Row style={{ padding: "10px 20px" }}>
                    <Col xs={24} md={24}>
                        <label>Add Media</label>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        </Dragger>
                    </Col>
                </Row>
                <Row style={{ padding: "10px 20px" }}>
                    <Col xs={24} md={24}>
                        <Form
                            layout="vertical"
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="App Name"
                                name="appName"
                                style={{margin:"30px 0"}}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input style={{
                                    borderRadius: "12px",
                                    background: "white",
                                    fontSize: "14px",
                                    padding: "18px 20px",
                                }} />
                            </Form.Item>
                            <Form.Item
                                label="Add URL"
                                name="addURL"
                                style={{margin:"30px 0"}}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input style={{
                                    borderRadius: "12px",
                                    background: "white",
                                    fontSize: "14px",
                                    padding: "18px 20px",
                                }} />
                            </Form.Item>
                            <Form.Item
                                label="App description"
                                name="appdescription"
                                style={{margin:"30px 0"}}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                 <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                <br />
                <br />
                <br />

            </div>
        </Layout>
    );
}
export default CampaignView;

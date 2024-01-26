import { useEffect, useState } from "react";
import {
    Col,
    Row,
    Typography,
    Button,
    Layout,
    Table,
    Image,
    Card,
    Skeleton,
} from "antd";
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
    const [users, setUsers] = useState([
        { id: 1, listedCampaigns: 'Sweatcoin App - Walking Step..', creatorPic: CreatorPic, subtitle: "clickcoin.com/airbrushapp-best-photo-editor", appDescription: "To modify and install images and add effects to them, and it is easy for the average user, the program contains a set of wonderful effects and filters in addition to the wonderful and easy-to-use format .It helps in the possibility of lightening the image, resizing the image or cropping the image, in addition to writing in the Arabic language on the images, because the program supports the Arabic language and the program has many advantages.It is one of the most powerful and best programs and applications for editing and improving professional images that improve images and remove blemishes and anything unwanted in the image using artificial intelligence technology and without the need to learn, a method of modification and without any prior experience in how to deal with image improvement programs, and the program allows you to change the shape of The entire face, and the ability to change the size and shape of each (nose, eyes, mouth, eyebrows, eyelashes), remove pimples and dark circles, clear the skin, and even add makeup such as lipstick, eyeshadow, powder, mascara, and change the color of the eyes and everything related to makeup tools In an easy and simple way. It contains all paid tools, add-ons, and features, and you can use them for free.Photo retouching includes a series of special procedures to change the nature of the image and increase its beauty. The retouching can be seen in many cases, such as video, photos, etc. A large number of reputable branded cosmetics are digitally digitized using this application, so you can try different types of makeup with different tools on your face and the interesting thing is that all makeup.Creating effects on photos is a bit difficult and time consuming, and to apply each effect you have to spend a lot of time and effort to be able to achieve the result, you can easily set a set of special effects on your photos within seconds, remove wrinkles from your face and eliminate different types pimples and generally make your face more beautiful than usual", appPromote: "To modify and install images and add effects to them, and it is easy for the average user, the program contains a set of wonderful effects and filters in addition to the wonderful and easy-to-use format .It helps in the possibility of lightening the image, resizing the image or cropping the image, in addition to writing in the Arabic language on the images, because the program supports the Arabic language and the program has many advantages.It is one of the most powerful and best programs and applications for editing and improving professional images that improve images and remove blemishes and anything unwanted in the image using artificial intelligence technology and without the need to learn, a method of modification and without any prior experience in how to deal with image improvement programs, and the program allows you to change the shape of The entire face, and the ability to change the size and shape of each (nose, eyes, mouth, eyebrows, eyelashes), remove pimples and dark circles, clear the skin, and even add makeup such as lipstick, eyeshadow, powder, mascara, and change the color of the eyes and everything related to makeup tools In an easy and simple way. It contains all paid tools, add-ons, and features, and you can use them for free.Photo retouching includes a series of special procedures to change the nature of the image and increase its beauty. The retouching can be seen in many cases, such as video, photos, etc. A large number of reputable branded cosmetics are digitally digitized using this application, so you can try different types of makeup with different tools on your face and the interesting thing is that all makeup.Creating effects on photos is a bit difficult and time consuming, and to apply each effect you have to spend a lot of time and effort to be able to achieve the result, you can easily set a set of special effects on your photos within seconds, remove wrinkles from your face and eliminate different types pimples and generally make your face more beautiful than usual", },
        { id: 2, listedCampaigns: 'Airbrush - Best Photo Editor', creatorPic: CreatorPic, subtitle: "clickcoin.com/airbrushapp-best-photo-editor", appDescription: "To modify and install images and add effects to them, and it is easy for the average user, the program contains a set of wonderful effects and filters in addition to the wonderful and easy-to-use format .It helps in the possibility of lightening the image, resizing the image or cropping the image, in addition to writing in the Arabic language on the images, because the program supports the Arabic language and the program has many advantages.It is one of the most powerful and best programs and applications for editing and improving professional images that improve images and remove blemishes and anything unwanted in the image using artificial intelligence technology and without the need to learn, a method of modification and without any prior experience in how to deal with image improvement programs, and the program allows you to change the shape of The entire face, and the ability to change the size and shape of each (nose, eyes, mouth, eyebrows, eyelashes), remove pimples and dark circles, clear the skin, and even add makeup such as lipstick, eyeshadow, powder, mascara, and change the color of the eyes and everything related to makeup tools In an easy and simple way. It contains all paid tools, add-ons, and features, and you can use them for free.Photo retouching includes a series of special procedures to change the nature of the image and increase its beauty. The retouching can be seen in many cases, such as video, photos, etc. A large number of reputable branded cosmetics are digitally digitized using this application, so you can try different types of makeup with different tools on your face and the interesting thing is that all makeup.Creating effects on photos is a bit difficult and time consuming, and to apply each effect you have to spend a lot of time and effort to be able to achieve the result, you can easily set a set of special effects on your photos within seconds, remove wrinkles from your face and eliminate different types pimples and generally make your face more beautiful than usual", appPromote: "To modify and install images and add effects to them, and it is easy for the average user, the program contains a set of wonderful effects and filters in addition to the wonderful and easy-to-use format .It helps in the possibility of lightening the image, resizing the image or cropping the image, in addition to writing in the Arabic language on the images, because the program supports the Arabic language and the program has many advantages.It is one of the most powerful and best programs and applications for editing and improving professional images that improve images and remove blemishes and anything unwanted in the image using artificial intelligence technology and without the need to learn, a method of modification and without any prior experience in how to deal with image improvement programs, and the program allows you to change the shape of The entire face, and the ability to change the size and shape of each (nose, eyes, mouth, eyebrows, eyelashes), remove pimples and dark circles, clear the skin, and even add makeup such as lipstick, eyeshadow, powder, mascara, and change the color of the eyes and everything related to makeup tools In an easy and simple way. It contains all paid tools, add-ons, and features, and you can use them for free.Photo retouching includes a series of special procedures to change the nature of the image and increase its beauty. The retouching can be seen in many cases, such as video, photos, etc. A large number of reputable branded cosmetics are digitally digitized using this application, so you can try different types of makeup with different tools on your face and the interesting thing is that all makeup.Creating effects on photos is a bit difficult and time consuming, and to apply each effect you have to spend a lot of time and effort to be able to achieve the result, you can easily set a set of special effects on your photos within seconds, remove wrinkles from your face and eliminate different types pimples and generally make your face more beautiful than usual", },
        { id: 3, listedCampaigns: 'Celebs - Celebrity Look Alikes', creatorPic: CreatorPic, subtitle: "clickcoin.com/airbrushapp-best-photo-editor", appDescription: "To modify and install images and add effects to them, and it is easy for the average user, the program contains a set of wonderful effects and filters in addition to the wonderful and easy-to-use format .It helps in the possibility of lightening the image, resizing the image or cropping the image, in addition to writing in the Arabic language on the images, because the program supports the Arabic language and the program has many advantages.It is one of the most powerful and best programs and applications for editing and improving professional images that improve images and remove blemishes and anything unwanted in the image using artificial intelligence technology and without the need to learn, a method of modification and without any prior experience in how to deal with image improvement programs, and the program allows you to change the shape of The entire face, and the ability to change the size and shape of each (nose, eyes, mouth, eyebrows, eyelashes), remove pimples and dark circles, clear the skin, and even add makeup such as lipstick, eyeshadow, powder, mascara, and change the color of the eyes and everything related to makeup tools In an easy and simple way. It contains all paid tools, add-ons, and features, and you can use them for free.Photo retouching includes a series of special procedures to change the nature of the image and increase its beauty. The retouching can be seen in many cases, such as video, photos, etc. A large number of reputable branded cosmetics are digitally digitized using this application, so you can try different types of makeup with different tools on your face and the interesting thing is that all makeup.Creating effects on photos is a bit difficult and time consuming, and to apply each effect you have to spend a lot of time and effort to be able to achieve the result, you can easily set a set of special effects on your photos within seconds, remove wrinkles from your face and eliminate different types pimples and generally make your face more beautiful than usual", appPromote: "To modify and install images and add effects to them, and it is easy for the average user, the program contains a set of wonderful effects and filters in addition to the wonderful and easy-to-use format .It helps in the possibility of lightening the image, resizing the image or cropping the image, in addition to writing in the Arabic language on the images, because the program supports the Arabic language and the program has many advantages.It is one of the most powerful and best programs and applications for editing and improving professional images that improve images and remove blemishes and anything unwanted in the image using artificial intelligence technology and without the need to learn, a method of modification and without any prior experience in how to deal with image improvement programs, and the program allows you to change the shape of The entire face, and the ability to change the size and shape of each (nose, eyes, mouth, eyebrows, eyelashes), remove pimples and dark circles, clear the skin, and even add makeup such as lipstick, eyeshadow, powder, mascara, and change the color of the eyes and everything related to makeup tools In an easy and simple way. It contains all paid tools, add-ons, and features, and you can use them for free.Photo retouching includes a series of special procedures to change the nature of the image and increase its beauty. The retouching can be seen in many cases, such as video, photos, etc. A large number of reputable branded cosmetics are digitally digitized using this application, so you can try different types of makeup with different tools on your face and the interesting thing is that all makeup.Creating effects on photos is a bit difficult and time consuming, and to apply each effect you have to spend a lot of time and effort to be able to achieve the result, you can easily set a set of special effects on your photos within seconds, remove wrinkles from your face and eliminate different types pimples and generally make your face more beautiful than usual", },
        // Add more user objects as needed
    ]);

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

    const cardsdata = [
        {
          imageSrc: Vectr1,
          title: "Total Earnings",
          dolarnumbers: "75%",
        },
        {
          imageSrc: Vector2,
          title: "Generated Traffic",
          dolarnumbers: "50",
        },
        {
          imageSrc: Vector3,
          title: "Promoted by",
          dolarnumbers: "60",
          smallText: "Content Creators"
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
                            Back to Campaigns
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
                            <Col xs={24} md={24}>
                                <Row style={{ padding: "10px" }}>
                                    <Col xs={24} md={10}>
                                        <div className="">
                                            <Image
                                                preview={false}
                                                alt={"Failed to load image"}
                                                src={user.creatorPic}
                                                className="forimg-border"
                                            />
                                            <div>
                                                <h4 className="heading-inner-medium" style={{ padding: "10px 0" }}>{user?.listedCampaigns}</h4>
                                                <h5 className="heading-inner-text">{user?.subtitle}</h5>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col xs={24} md={14}>
                                        <Row gutter={[20, 10]} style={{}}>
                                            {cardsdata.map((item, index) => (
                                                <Col xs={12} lg={8} key={index}>
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
                                    </Col>

                                </Row>
                                <Row style={{ padding: "20px 10px" }}>
                                    <Col md={24}>
                                        <h6 className="fs-18">About</h6>
                                        <p>{user.appDescription}</p>
                                    </Col>
                                </Row>
                                <Row style={{ padding: "20px 10px" }}>
                                    <Col md={24}>
                                        <h6 className="fs-18">Steps to Promote</h6>
                                        <p>{user.appPromote}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </>
                )}

                <br />
                <br />

            </div>
        </Layout>
    );
}
export default CampaignView;

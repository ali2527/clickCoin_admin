import React, { useState } from "react";
import { Image, Row, Col } from "antd";

const ImageGrid = ({ smallImages }) => {
  const smallImageHeight = 100; // Adjust the height of small images here (in pixels)
  const spacing = 16; // Adjust the spacing between small images here (in pixels)
  const largeImageHeight = smallImages.length * (smallImageHeight + spacing);
  const [selectedImage, setSelectedImage] = useState(smallImages[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <Row gutter={8}>
        <Col span={5}>
        <Row gutter={[0, 25]}>
          {smallImages.map((image, index) => (
            <Col span={24} key={index}>
              <Image preview={false} className="border-radius-20"
                src={image}
                style={{
                  // height: smallImageHeight,
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => handleImageClick(image)}
              />
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={19}  className="bigproductimg">
        <Image preview={false} className="border-radius-15"
          src={selectedImage}
          style={{
            // height: largeImageHeight,
            objectFit: "cover",
            cursor: "pointer",
            
          }}
        />
      </Col>
      
    </Row>
  );
};

export default ImageGrid;

import { useState, useEffect } from "react";
import ImageUploader from "./ImageUploader";

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(3,400px)",
    gridGap: 1,
  },
};

const BaseUploader = ({ config, onUpload }) => {
  const [imageData, setImageData] = useState(
    new Array(config.uploadParts).fill({})
  );

  useEffect(() => {
    onUpload(imageData);
  }, [imageData]);

  const handleSingleUpload = (response, index) => {
    const currentData = [...imageData];
    currentData[index] = response;
    setImageData(currentData);
  };

  return (
    <div style={styles.container}>
      {imageData.map((item, index) => (
        <ImageUploader
          key={index}
          onImageUploaded={(response) => handleSingleUpload(response, index)}
        />
      ))}
    </div>
  );
};

export default BaseUploader;

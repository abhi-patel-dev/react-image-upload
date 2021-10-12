import { useState, useEffect } from "react";

const styles = {
  container: {
    width: 500,
    height: 225,
    display: "flex",
    border: "1px dashed black",
  },
  preview: {
    display: "flex",
    flex: 1,
  },
};

const ImageUploader = ({ onImageUploaded, uploaderType = "dnd" }) => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageData, setImageData] = useState({});

  useEffect(() => {
    !!imageData && onImageUploaded(imageData);
  }, [imageData]);

  const handleFileChange = (files) => {
    const file = files[0];
    const blobUrl = URL.createObjectURL(file);
    setImageData({
      url: blobUrl,
      fileName: file.name,
      fileSize: file.size,
      lastModifiedAt: file.lastModified,
    });
    setImageUploaded(true);
  };

  const handleDropEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileChange(e.dataTransfer.files);
  };

  const stopEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div>
      {!imageUploaded && uploaderType == "btn" && (
        <input
          type="file"
          accept="image/*"
          onInput={(event) => handleFileChange(event.target.files)}
        />
      )}
      {!imageUploaded && uploaderType == "dnd" && (
        <div
          style={styles.container}
          onDragOver={(e) => stopEvent(e)}
          onDragEnter={(e) => stopEvent(e)}
          onDrop={(e) => handleDropEvent(e)}
        >
          Drop here
        </div>
      )}
      {imageUploaded && (
        <div style={styles.container}>
          <img
            src={imageData.url}
            height="100"
            width="100"
            style={{ objectFit: "cover" }}
          />
          <div>
            <p>
              <strong>Name</strong>: {imageData.fileName}
            </p>
            <p>
              <strong>Size</strong>: {imageData.fileSize}
            </p>
            <button
              onClick={() => {
                setImageUploaded(false);
                setImageData(null);
              }}
            >
              Reupload
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

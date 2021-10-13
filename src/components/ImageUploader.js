import { useState, useEffect, useRef } from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: 400,
    height: 350,
    background: "#f9f9f3",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    // background:'red'
  },
  parentSize: {
    width: "100%",
    height: "100%",
  },
  preview: {},
  details: {
    padding: "5px",
    background: "red",
  },
};

const ImageUploader = ({ onImageUploaded }) => {
  const [imageData, setImageData] = useState({});
  const [imageUploaded, setImageUploaded] = useState(false);
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  const fileInputRef = useRef();

  useEffect(() => {
    !!imageData && onImageUploaded(imageData);
  }, [imageData]);

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (files) => {
    if (!files) return;
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
    <div
      style={styles.container}
      onDragOver={(e) => stopEvent(e)}
      onDragEnter={(e) => stopEvent(e)}
      onDrop={(e) => handleDropEvent(e)}
    >
      {!imageUploaded && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: 40, height: 40 }}
            viewBox="0 0 20 20"
            fill="#6d28d9"
          >
            <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
            <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
          </svg>
          <p>Drag your image here</p>
          <button onClick={handleChooseFile} className="btn">
            Choose File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onInput={(e) => handleFileChange(e.target.files)}
          />
        </>
      )}
      {imageUploaded && (
        <div
          style={{
            ...styles.parentSize,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={imageData.url}
            style={{
              ...styles.parentSize,
              objectFit: "contain",
              transition: "all 300ms",
            }}
          />
          <div
            style={{
              position: "absolute",
              background: "rgba(0,0,0,0.8)",
              zIndex: 100,
              bottom: 0,
              top: !detailsExpanded ? "85%" : "50%",
              ...styles.parentSize,
              color: "whitesmoke",
              transition: "top 200ms",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0px 15px",
              }}
            >
              <p style={{ flex: 2 }}>Image Details</p>
              {!detailsExpanded && (
                <svg
                  onClick={() => setDetailsExpanded(!detailsExpanded)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  style={{ width: 30, height: 30, cursor: "pointer" }}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
                  />
                </svg>
              )}
              {detailsExpanded && (
                <svg
                  onClick={() => setDetailsExpanded(!detailsExpanded)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  style={{ width: 30, height: 30, cursor: "pointer" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                  />
                </svg>
              )}
            </div>

            <div style={{padding: "0px 15px",fontSize:'13px',fontWeight:'lighter'}}>
              <p><strong>Name:</strong> {imageData.fileName}</p>
              <p><strong>Size:</strong> {imageData.fileSize}</p>
              <p><strong>Last Modified:</strong> {new Date(imageData.lastModifiedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

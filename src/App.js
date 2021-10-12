import BaseUploader from "./components/BaseUploader";

function App() {
  const uploaderConfig = {
    uploadParts: 6,
    showPreview: true, // not bound to anything right now
    uploaderType: "dnd", // TODO: use this as enum while using typescript
  };

  const handleImageUploadEvent = (response) => {
    // code to process uploaded images
    console.log(response);
  };

  return (
    <div>
      <BaseUploader config={uploaderConfig} onUpload={handleImageUploadEvent} />
    </div>
  );
}

export default App;

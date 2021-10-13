import BaseUploader from "./components/BaseUploader";
import './App.css';

function App() {
  const uploaderConfig = {
    uploadParts: 6,
    showPreview: true // TODO: use this as enum while using typescript
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

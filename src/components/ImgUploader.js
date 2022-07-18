import { useRef } from "react";
import { Form } from "react-bootstrap";

export default function ImgUploader({
  onFileSelectError,
  onFileSelectSuccess,
}) {
  const fileInput = useRef(null);

  function handleImgInput(e) {
    const file = e.target.files[0];

    if (file.size > 1024 * 1024)
      onFileSelectError({ error: "File size cannot exceed more than 1MB" });
    else {
      const localURL = window.URL.createObjectURL(file);
      onFileSelectSuccess(localURL);
    }
  }

  return (
    <Form.Group className="mb-3">
      <Form.Label>Have a pic ? Upload here 👇</Form.Label>
      <Form.Control
        name="img"
        onChange={handleImgInput}
        onClick={() => fileInput.current && fileInput.current.click()}
        type="file"
        accept="image/*"
      />
    </Form.Group>
  );
}

import { Button, Modal, Form, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost } from "../features/posts/postSlice";
import ImgUploader from "./ImgUploader";

const fabStyle = {
  position: "fixed",
  bottom: "40px",
  right: "40px",
  cursor: "pointer",
  width: "70px",
  borderRadius: "100%",
  height: "70px",
  boxShadow: "3px 3px 5px #aaaaaa",
};

export default function CreatePost({ type, id }) {
  const dispatch = useDispatch();

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === id)
  );

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(
    type === "edit"
      ? {
          title: post.title,
          content: post.content,
        }
      : {
          title: "",
          content: "",
        }
  );
  const [selectedFile, setSelectedFile] = useState("");
  const [error, setError] = useState({
    title: "",
    content: "",
  });
  const [change, setChange] = useState("");

  function handleClose() {
    setError({
      title: "",
      content: "",
    });
    setChange("");
    setShow(false);
  }
  function handleShow() {
    setShow(true);
  }

  function handleOnChange(e) {
    const { name, value } = e.target;
    setFormData((prevFields) => {
      return {
        ...prevFields,
        [name]: value,
      };
    });
  }

  function handleSubmit(e) {
    setError({
      title: "",
      content: "",
    });
    setChange("");

    e.preventDefault();
    if (type === "edit") {
      if (formData.title === post.title && formData.content === post.content) {
        setChange("Did you even make a change?!! 🤨 ");
      } else {
        dispatch(
          updatePost({
            id: id,
            title: formData.title,
            content: formData.content,
            img: selectedFile,
          })
        );
        handleClose();
      }
    } else {
      if (formData.title === "") setError({ title: "provide a title 😾!" });
      else if (formData.content === "")
        setError({ content: "where content?! 😾" });
      else {
        dispatch(
          addPost({
            title: formData.title,
            content: formData.content,
            img: selectedFile,
          })
        );
        setFormData({
          title: "",
          content: "",
        });
        setSelectedFile("");
        handleClose();
      }
    }
  }

  return (
    <>
      {type === "edit" ? (
        <div onClick={handleShow}>Edit</div>
      ) : (
        <Button style={fabStyle} onClick={handleShow}>
          <FontAwesomeIcon icon={faPencil} size="lg" />
        </Button>
      )}

      <Modal
        style={{
          padding: "0",
        }}
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header as="h5">
          {type === "edit"
            ? "Made a typo or ... ✏️? "
            : " Whats on your mind ? 🤔"}
        </Modal.Header>
        <Modal.Body>
          {error.title && <Alert variant="warning">{error.title}</Alert>}
          {error.content && <Alert variant="warning">{error.content}</Alert>}
          {change && <Alert variant="warning">{change}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                name="title"
                value={formData.title}
                onChange={handleOnChange}
                required
                placeholder="give a catchy title ✨"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                name="content"
                as="textarea"
                onChange={handleOnChange}
                value={formData.content}
                required
                placeholder="content goes here... ✍️"
              />
            </Form.Group>
            {type === "edit" ? (
              ""
            ) : (
              <ImgUploader
                onFileSelectSuccess={(file) => setSelectedFile(file)}
                onFileSelectError={({ error }) => alert(error)}
              />
            )}

            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Nevermind...
              </Button>
              <Button onClick={handleSubmit} variant="success">
                {type === "edit" ? "Update it!" : "Post it!"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

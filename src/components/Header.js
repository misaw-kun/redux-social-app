import { Container, Navbar } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar expand="md">
      <Container>
        <Navbar.Brand
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            padding: "5px",
            transform: "rotate(-2deg)",
            boxShadow: "6px 6px 0px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            alt=""
            src={require("../assets/img/logo192.png")}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          redux_social
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">John Doe</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

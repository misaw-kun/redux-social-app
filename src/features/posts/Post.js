import { Card, Container, Dropdown, Image, Row } from "react-bootstrap";
import styles from "./Post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faHeart,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { deletePost } from "../../features/posts/postSlice";
import CreatePost from "../../components/CreatePost";

export function Post({ id, img, title, content }) {
  const dispatch = useDispatch();
  return (
    <Container>
      <Row className="col-sm-8 offset-sm-2">
        <Card id={styles.post}>
          <Card.Header
            id={styles.header}
            className="d-flex justify-content-between"
          >
            <div className="d-flex">
              <div className="mr-2">
                <Image
                  className={styles.author}
                  roundedCircle
                  src={require("../../assets/img/user1.jpg")}
                />
              </div>
              <div>
                <h5 className="mb-0">
                  <a href="#" className={`${styles.link} text-dark`}>
                    John Doe
                  </a>
                  <p className="mb-0 text-muted">5m ago</p>
                </h5>
              </div>
            </div>
            <div>
              <Dropdown>
                <Dropdown.Toggle id={styles.dropdown} variant="outline">
                  <FontAwesomeIcon icon={faEllipsisV} size="lg" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <CreatePost type="edit" id={id} />
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      dispatch(
                        deletePost({
                          id,
                        })
                      )
                    }
                  >
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Card.Header>
          <Card.Body style={{ padding: "10px" }}>
            <Card.Text
              as="h5"
              style={{
                fontWeight: "bold",
              }}
            >
              {title}
            </Card.Text>
            <Card.Text>{content}</Card.Text>
            {img ? (
              <Card.Img className={styles.image} variant="top" src={img} />
            ) : (
              ""
            )}
          </Card.Body>
          <Card.Footer id={styles.footer} className="mt-3">
            <div className="d-flex justify-content-between mt-2">
              <div className="d-flex align-items-center">
                <FontAwesomeIcon
                  className="text-danger"
                  icon={faHeart}
                  size="lg"
                />
                <p className={`mb-0 ${styles.stats}`}>
                  Liked by{" "}
                  <a className={`${styles.link} text-dark`}>John Doe</a> &{" "}
                  <a className={`${styles.link} text-dark`}> 25 others</a>
                </p>
              </div>
              <a href="#" className="text-dark">
                <FontAwesomeIcon icon={faShare} size="lg" />
              </a>
            </div>
          </Card.Footer>
        </Card>
      </Row>
    </Container>
  );
}

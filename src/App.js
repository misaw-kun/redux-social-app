import Header from "./components/Header";
import { Container, Row, Stack } from "react-bootstrap";
import CreatePost from "./components/CreatePost";

import { Post } from "./features/posts/Post";
import { useSelector } from "react-redux";

function App() {
  const posts = useSelector((state) => state.posts);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Header />
      </Row>
      <Row className="justify-content-md-center mt-4">
        <Stack gap={3}>
          {posts.map((post, index) => (
            <Post
              key={index}
              id={post.id}
              title={post.title}
              content={post.content}
              img={post.img}
            />
          ))}
        </Stack>
      </Row>
      <CreatePost />
    </Container>
  );
}

export default App;

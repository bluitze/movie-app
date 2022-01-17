import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
  Navbar,
  Row,
} from 'react-bootstrap';
import '../css/App.css';

const App = () => {
  const [title, setTitle] = useState();
  const [getMovie, { loading, data }] = useLazyQuery(GET_MOVIE);

  if (loading) {
    return <h2>Loading....</h2>;
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>OMDb Search</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="p-2">
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Movie Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Button
                variant="primary"
                type="submit"
                onClick={() => getMovie({ variables: { title } })}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      {data ? (
        <Container className="p-2">
          <Card key={data.omdbMovie.imdbID} className="p-2">
            <Row>
              <Col>
                <Card.Img
                  variant="top"
                  src={data.omdbMovie.Poster}
                  alt={data.omdbMovie.Title}
                />
              </Col>
              <Col>
                <Card.Body>
                  <Card.Title>{data.omdbMovie.Title}</Card.Title>
                  <hr />
                  <Card.Text>{data.omdbMovie.Plot}</Card.Text>
                </Card.Body>
              </Col>
              <Col>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>Rating: {data.omdbMovie.Rated}</ListGroupItem>
                  <ListGroupItem>Released: {data.omdbMovie.Year}</ListGroupItem>
                  <ListGroupItem>
                    Runtime: {data.omdbMovie.Runtime}
                  </ListGroupItem>
                  <ListGroupItem>Genre: {data.omdbMovie.Genre}</ListGroupItem>
                  <ListGroupItem>
                    Starring: {data.omdbMovie.Actors}
                  </ListGroupItem>
                  <ListGroupItem>
                    Director(s): {data.omdbMovie.Director}
                  </ListGroupItem>
                  <ListGroupItem>
                    Writer(s): {data.omdbMovie.Writer}
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </Card>
        </Container>
      ) : (
        <Container>
          <h1>Please Enter a Movie Title</h1>
        </Container>
      )}
    </>
  );
};

export default App;

const GET_MOVIE = gql`
  query GetMovie($title: String!) {
    omdbMovie(title: $title) {
      imdbID
      Actors
      Director
      Genre
      Plot
      Poster
      Rated
      Runtime
      Title
      Writer
      Year
    }
  }
`;

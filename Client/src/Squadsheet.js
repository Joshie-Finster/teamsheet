import React, { useState, useEffect, useRef } from "react";
import "./Squadsheet.scss";
import {
  Accordion,
  List,
  Container,
  Segment,
  Grid,
  Form,
  Message,
} from "semantic-ui-react";

const positions = [
  { key: "s", text: "Striker", value: "Striker" },
  { key: "m", text: "Midfield", value: "Mid" },
  { key: "d", text: "Defence", value: "Defence" },
  { key: "g", text: "Goalie", value: "goalkeeper" },
  { key: "b", text: "Bench/Sub/Backup", value: "sub" },
];

const Squadsheet = (props) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [apiRes, setApiRes] = useState("");

  useEffect(() => {
    setName("");
    setPosition("");
  }, []);

  const handleSubmit = () => {
    const postURL = "/players";
    fetch(postURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        position: position,
      }),
    })
      .then((res) => res.text())
      .then((res) => setApiRes(res));

    setName("");
    setPosition("");
  };
  return (
    <Container fluid className="squadsheet">
      <Segment>
        <Form onSubmit={handleSubmit}>
          <Message
            negative={apiRes === "Player already in database. Choose new name"}
            positive={apiRes === "New Player Added"}
          >
            <Message.Header>{apiRes}</Message.Header>
          </Message>
          <Form.Group inline fluid>
            <Form.Input
              required
              label="Name"
              placeholder="Your name goes here"
              onChange={(e, { value }) => setName(value)}
              value={name}
            />
            <Form.Select
              required
              label="Position"
              placeholder="What position?"
              options={positions}
              onChange={(e, { value }) => setPosition(value)}
              value={position}
            />
            <Form.Button
              color="blue"
              disabled={!name || !position}
              type="submit"
            >
              Sign Up
            </Form.Button>
          </Form.Group>
        </Form>
      </Segment>
      <Segment>
        <List></List>
      </Segment>
    </Container>
  );
};

export default Squadsheet;

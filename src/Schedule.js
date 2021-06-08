import React, { useState } from "react";
import "./App.scss";
import { Accordion, Container, Table, Grid, Segment } from "semantic-ui-react";
const fetch = require("node-fetch");

const Schedule = (props) => {
  const [divTable] = useState(props.divTable);
  const [fixList] = useState(props.fixList);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (titleProps) => {
    const { index } = titleProps;
    const { currentIndex } = activeIndex;
    const newIndex = currentIndex === index ? -1 : index;

    setActiveIndex(newIndex);
    console.log(activeIndex)
  };

  return (
    <Container className="schedule">
      <Grid stackable columns={2}>
        <Grid.Column>
          <Accordion >
            <Segment raised className="divcontainer">
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={handleClick}
              >
                <h1> Division Table</h1>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <Table
                  basic
                  collapsing
                  celled
                  unstackable
                  compact="very"
                  className="divtable"
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Team</Table.HeaderCell>
                      <Table.HeaderCell>GP</Table.HeaderCell>
                      <Table.HeaderCell>W</Table.HeaderCell>
                      <Table.HeaderCell>L</Table.HeaderCell>
                      <Table.HeaderCell>D</Table.HeaderCell>
                      <Table.HeaderCell>GF</Table.HeaderCell>
                      <Table.HeaderCell>GA</Table.HeaderCell>
                      <Table.HeaderCell>GD</Table.HeaderCell>
                      <Table.HeaderCell>PTS</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {divTable.map((i) => (
                      <Table.Row>
                        <Table.Cell className="divTeam ">{i.Team}</Table.Cell>
                        <Table.Cell>{i.GP}</Table.Cell>
                        <Table.Cell>{i.W}</Table.Cell>
                        <Table.Cell>{i.L}</Table.Cell>
                        <Table.Cell>{i.D}</Table.Cell>
                        <Table.Cell>{i.GF}</Table.Cell>
                        <Table.Cell>{i.GA}</Table.Cell>
                        <Table.Cell>{i.GD}</Table.Cell>
                        <Table.Cell>{i.PTS}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Accordion.Content>
            </Segment>
          </Accordion>
        </Grid.Column>
        <Grid.Column>
          <Segment raised className="fixtures">
            <h1>Fixture list</h1>
            <Table
              basic
              collapsing
              striped
              compact="very"
              unstackable
              className="fixturelist"
            >
              <Table.Row className="titleRow">
                <Table.HeaderCell>Home</Table.HeaderCell>
                <Table.HeaderCell>Score</Table.HeaderCell>
                <Table.HeaderCell>Away</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Time/Status</Table.HeaderCell>
              </Table.Row>

              <Table.Body>
                {fixList
                  .filter(
                    (i) =>
                      (i.Home === "Well Done, He's 13") |
                      (i.Away === "Well Done, He's 13")
                  )
                  .map((i) => (
                    <Table.Row className="row">
                      <Table.Cell className="fixHome">{i.Home}</Table.Cell>
                      <Table.Cell className="fixScore">{i.Score}</Table.Cell>
                      <Table.Cell className="fixAway">{i.Away}</Table.Cell>
                      <Table.Cell className="fixDate">{i.Date}</Table.Cell>
                      <Table.Cell className="fixTS">
                        {i["Time/Status"]}
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Schedule;

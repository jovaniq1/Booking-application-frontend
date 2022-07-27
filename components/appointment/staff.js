import { Container, Card, Header } from 'semantic-ui-react';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  cardContainer: {
    paddingTop: 50,
    textAlign: 'center',
  },
};

const Staff = ({ staff }) => (
  <Container>
    <Header>Staff</Header>

    {staff.map((person) => (
      <Container key={person} style={styles.container}>
        <Card className="card">
          <Card.Content>
            <Card.Header>{person}</Card.Header>
            <Card.Description>
              Steve wants to add you to the group <strong>best friends</strong>
            </Card.Description>
          </Card.Content>
        </Card>
      </Container>
    ))}
  </Container>
);
export default Staff;

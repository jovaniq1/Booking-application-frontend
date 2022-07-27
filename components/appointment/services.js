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
const Services = ({ services }) => (
  <Container>
    <Header>Services</Header>

    {services.map((service) => (
      <Container key={service} style={styles.container}>
        <Card>
          <Card.Content>
            <Card.Header>{service}</Card.Header>
            <Card.Description>
              Steve wants to add you to the group <strong>best friends</strong>
            </Card.Description>
          </Card.Content>
        </Card>
      </Container>
    ))}
  </Container>
);

export default Services;

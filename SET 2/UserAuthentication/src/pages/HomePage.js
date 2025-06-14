import { Button, Group, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ maxWidth: 500, margin: 'auto', paddingTop: 100 }}>
      <Title order={1} align="center" mb="xl">Welcome</Title>
      <Text align="center" mb="xl">Please login or sign up to continue</Text>
      <Group position="center">
        <Button component={Link} to="/login" variant="outline">
          Login
        </Button>
        <Button component={Link} to="/signup">
          Sign Up
        </Button>
      </Group>
    </div>
  );
}

export default HomePage;
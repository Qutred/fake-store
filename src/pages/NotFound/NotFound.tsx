import { Container, Box, useMantineTheme, Title } from '@mantine/core';

const NotFound = () => {
  const theme = useMantineTheme();
  return (
    <Container
      strategy='block'
      fluid
      style={{
        height: '100vh',
        width: '100%',
        backgroundColor: theme.colors.red[7],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.white,
      }}
    >
      <Box
        style={{
          padding: theme.spacing.xs,
        }}
      >
        <Title order={1}>404 Page not found</Title>
      </Box>
    </Container>
  );
};

export default NotFound;

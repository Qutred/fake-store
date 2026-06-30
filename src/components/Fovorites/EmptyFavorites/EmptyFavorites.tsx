import { Button, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useMantineTheme } from '@mantine/core';
import { FaHeartCircleXmark } from 'react-icons/fa6';

const EmptyFavorites = () => {
  const theme = useMantineTheme();
  return (
    <Stack align='center' justify='center' py='5rem' gap='md'>
      <FaHeartCircleXmark size={80} color={theme.colors.gray[4]} />
      <Title order={2}>Your Favorites is Empty</Title>
      <Text c='dimmed'>
        Looks like you haven't added any products to your Favorites yet.
      </Text>
      <Button component={Link} to='/' color='red' size='md' mt='xs'>
        Back to Home Page
      </Button>
    </Stack>
  );
};

export default EmptyFavorites;

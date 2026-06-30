import { Button, Stack, Text, Title } from '@mantine/core';
import { FaShoppingBasket } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useMantineTheme } from '@mantine/core';

const EmptyCart = () => {
  const theme = useMantineTheme();
  return (
    <Stack align='center' justify='center' py='5rem' gap='md'>
      <FaShoppingBasket size={80} color={theme.colors.gray[4]} />
      <Title order={2}>Your Cart is Empty</Title>
      <Text c='dimmed'>
        Looks like you haven't added any products to your cart yet.
      </Text>
      <Button component={Link} to='/' color='red' size='md' mt='xs'>
        Start Shopping
      </Button>
    </Stack>
  );
};

export default EmptyCart;

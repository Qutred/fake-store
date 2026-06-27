import {
  Flex,
  Text,
  ActionIcon,
  Badge,
  useMantineTheme,
  Box,
  Container,
} from '@mantine/core';
import { FaShoppingCart, FaHeart, FaUser, FaStore } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store';

const HeaderComponent = () => {
  const theme = useMantineTheme();
  const favorites = useAppStore((state) => state.favorites);
  const cartItems = useAppStore((state) => state.cartItems);
  const totalCartItemsAmount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
  const isLoggedIn = false;

  return (
    <Container
      strategy='block'
      fluid
      style={{ width: '100%', backgroundColor: theme.colors.red[7] }}
    >
      <Box
        component='header'
        style={{
          height: 60,
          padding: theme.spacing.xs,
        }}
      >
        <Flex justify='space-between' align='center' style={{ height: '100%' }}>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Flex align='center' gap='xs'>
              <FaStore size={24} color={theme.white} />
              <Text size='lg' fw={700} style={{ color: theme.white }}>
                FakeStore
              </Text>
            </Flex>
          </Link>

          <Flex align='center' gap='md'>
            <Box style={{ position: 'relative' }}>
              <ActionIcon component='a' href='/cart' variant='transparent'>
                <FaHeart size={20} color={theme.white} />
              </ActionIcon>
              {favorites.length > 0 && (
                <Badge
                  color='yellow'
                  variant='filled'
                  size='xs'
                  style={{ position: 'absolute', top: -4, right: -8 }}
                >
                  {favorites.length}
                </Badge>
              )}
            </Box>

            <Box style={{ position: 'relative' }}>
              <ActionIcon component='a' href='/cart' variant='transparent'>
                <FaShoppingCart size={20} color={theme.white} />
              </ActionIcon>
              {totalCartItemsAmount > 0 && (
                <Badge
                  color='yellow'
                  variant='filled'
                  size='xs'
                  style={{ position: 'absolute', top: -4, right: -8 }}
                >
                  {totalCartItemsAmount}
                </Badge>
              )}
            </Box>
            {!isLoggedIn && (
              <ActionIcon component='a' href='/login' variant='transparent'>
                <FaUser size={20} color={theme.white} />
              </ActionIcon>
            )}
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default HeaderComponent;

import productsApi from '@/api/productsApi/productsApi';
import { useAppStore } from '@/store';
import {
  ActionIcon,
  Alert,
  Anchor,
  AspectRatio,
  Badge,
  Button,
  Card,
  Container,
  Group,
  Image,
  Loader,
  LoadingOverlay,
  NumberFormatter,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { LuCircleAlert } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const favorites = useAppStore((state) => state.favorites);
  const theme = useMantineTheme();
  const toggleFavorites = useAppStore((state) => state.toggleFavorites);
  const addToCart = useAppStore((state) => state.addToCart);

  let {
    data: products = [],
    isFetching: isProductsFetching,
    isError: isProductsError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await productsApi.getProducts(),
  });

  let actualProducts = products.filter((product) =>
    favorites.includes(product.id),
  );

  const handleAddToggleFavorites = (id: number) => {
    toggleFavorites(id);
  };

  const handleAddToCart = (id: number) => {
    addToCart(id);
  };

  return (
    <Container py='xl' mih={'100%'} px='xs'>
      {isProductsError ? (
        <Alert
          variant='light'
          title='Something went wrong'
          icon={<LuCircleAlert />}
        ></Alert>
      ) : isProductsFetching ? (
        <LoadingOverlay
          visible={isProductsFetching}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
      ) : actualProducts.length === 0 || favorites.length === 0 ? (
        <Alert
          variant='light'
          title="You haven't added any favorites yet"
          icon={<LuCircleAlert />}
        ></Alert>
      ) : (
        <>
          <Title
            order={1}
            mb={'2rem'}
            style={{
              color: theme.colors.red[7],
              borderBottom: `2px solid ${theme.colors.red[7]}`,
              paddingBottom: '1rem',
            }}
          >
            Favorites
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
            {actualProducts.map((product) => (
              <Card shadow='sm' padding='lg' withBorder key={product.id}>
                <Card.Section>
                  <Anchor component={Link} to={`/products/${product.id}`}>
                    <AspectRatio ratio={1080 / 720} maw={300} mx='auto'>
                      <Image
                        fit='contain'
                        src={product.image}
                        alt={product.title}
                      />
                    </AspectRatio>
                  </Anchor>
                </Card.Section>

                <Group justify='space-between' mt='md' mb='xs'>
                  <Anchor component={Link} to={`/products/${product.id}`}>
                    <Text
                      fw={500}
                      style={{
                        color: theme.colors.red[5],
                      }}
                    >
                      {product.title}
                    </Text>
                  </Anchor>

                  <Badge>{product.category}</Badge>
                </Group>

                <Text
                  size='sm'
                  c='dimmed'
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    marginBottom: '1rem',
                  }}
                >
                  {product.description}
                </Text>
                <Stack mt='auto'>
                  <NumberFormatter
                    prefix='$ '
                    value={product.price}
                    style={{
                      fontSize: '1.5rem',
                    }}
                  />
                  <Group>
                    <Button
                      style={{ flex: 1 }}
                      onClick={() => handleAddToCart(product.id)}
                    >
                      Add to cart
                    </Button>
                    <ActionIcon
                      variant='default'
                      radius='md'
                      size={36}
                      aria-label='Like'
                      color={theme.colors.red[7]}
                      onClick={() => handleAddToggleFavorites(product.id)}
                    >
                      {favorites.includes(product.id) ? (
                        <FaHeart color={theme.colors.red[7]} />
                      ) : (
                        <FaRegHeart color={theme.colors.red[7]} />
                      )}
                    </ActionIcon>
                  </Group>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </>
      )}
    </Container>
  );
};

export default Favorites;

import productsApi from '@/api/productsApi/productsApi';
import { useAppStore } from '@/store';
import {
  Container,
  Anchor,
  Breadcrumbs,
  Card,
  Image,
  Title,
  Text,
  Badge,
  Group,
  Stack,
  Loader,
  Alert,
  Center,
  Flex,
  NumberFormatter,
  Button,
  ActionIcon,
  useMantineTheme,
  Grid,
  Spoiler,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useMatches, useParams } from 'react-router-dom';

const items = [
  { title: 'Main', href: '/' },
  { title: 'Products', href: '/products' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const ProductCard = () => {
  let params = useParams();
  const matches = useMatches();
  const theme = useMantineTheme();
  const favorites = useAppStore((state) => state.favorites);
  const toggleFavorites = useAppStore((state) => state.toggleFavorites);
  const addToCart = useAppStore((state) => state.addToCart);

  const handleAddToggleFavorites = (id: number) => {
    toggleFavorites(id);
  };

  const handleAddToCart = (id: number) => {
    addToCart(id);
  };

  const {
    data: product = null,
    isFetching: isProductFetching,
    isError: isProductError,
  } = useQuery({
    queryKey: ['product', params.id],
    queryFn: async () => await productsApi.getProduct(Number(params.id)),
  });

  if (isProductFetching) {
    return (
      <Container py='xl' mih={'100%'}>
        <Center>
          <Loader size='xl' />
          <Text mt='sm' size='sm' color='dimmed'>
            Loading product...
          </Text>
        </Center>
      </Container>
    );
  }

  if (isProductError) {
    return (
      <Container py='xl' mih={'100%'}>
        <Center>
          <Alert title='Error' color='red'>
            Failed to load product. Please try again later.
          </Alert>
        </Center>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container py='xl' mih={'100%'}>
        <Center>
          <Alert title='Not Found' color='yellow'>
            Product not found
          </Alert>
        </Center>
      </Container>
    );
  }

  return (
    <Container py='xl' mih={'100%'} px='xs'>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Card shadow='sm' radius='md' withBorder p='xl' mt='xl'>
        <Grid mb='xl'>
          <Grid.Col span={4}>
            <Image
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
              style={{ objectFit: 'contain' }}
            />
          </Grid.Col>
          <Grid.Col span={8}>
            <Stack gap='xs'>
              <Flex mb='md'>
                <Badge variant='light'>{product.category}</Badge>
              </Flex>
              <Title size='h3' fw={600}>
                {product.title}
              </Title>

              <NumberFormatter
                prefix='$ '
                value={product.price}
                style={{
                  fontSize: '1.5rem',
                }}
              />
              <Spoiler maxHeight={80} showLabel='Show more' hideLabel='Hide'>
                {product.description}
              </Spoiler>
              <Group>
                <Button onClick={() => handleAddToCart(product.id)}>
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
                  {favorites.includes(product.id) ?
                    <FaHeart color={theme.colors.red[7]} />
                  : <FaRegHeart color={theme.colors.red[7]} />}
                </ActionIcon>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
      </Card>
    </Container>
  );
};

export default ProductCard;

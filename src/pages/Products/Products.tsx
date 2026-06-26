import productsApi from '@/api/productsApi/productsApi';
import { useAppStore } from '@/store';
import {
  SimpleGrid,
  Container,
  Card,
  Image,
  Text,
  Button,
  Group,
  Badge,
  Alert,
  Loader,
  Box,
  NumberFormatter,
  Stack,
  useMantineTheme,
  ActionIcon,
  Menu,
  Chip,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { FaFilter, FaHeart, FaRegHeart } from 'react-icons/fa';
import { LuCircleAlert } from 'react-icons/lu';

const Products = () => {
  const theme = useMantineTheme();
  const [activeCategorie, setActiveCategorie] = useState<string>('all');
  const [activePriceFilter, setActivePriceFilter] = useState<
    'cheap' | 'expensive'
  >('cheap');
  const favorites = useAppStore((state) => state.favorites);
  const toggleFavorites = useAppStore((state) => state.toggleFavorites);

  const {
    data: products = [],
    isFetching: isProductsFetching,
    isError: isProductsError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await productsApi.getProducts(),
  });

  const categories = useMemo(() => {
    let categories = Array.from(
      new Set(products.map((product) => product.category)),
    );
    categories.push('all');
    return categories;
  }, [products]);

  const handleCategorieChange = (categorie: string | null) => {
    if (categorie) {
      setActiveCategorie(categorie);
    }
  };

  let filteredProducts =
    activeCategorie === 'all' ? products : (
      products.filter((product) => {
        return product.category.toLowerCase() === activeCategorie.toLowerCase();
      })
    );

  filteredProducts = filteredProducts.sort((a, b) => {
    if (activePriceFilter === 'cheap') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const handleAddToggleFavorites = (id: number) => {
    toggleFavorites(id);
  };

  return (
    <Container py='xl' mih={'100%'}>
      {isProductsError ?
        <Alert
          variant='light'
          title='Something went wrong'
          icon={<LuCircleAlert />}
        ></Alert>
      : isProductsFetching ?
        <Box
          component={'div'}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Loader />
        </Box>
      : filteredProducts.length === 0 ?
        <Alert
          variant='light'
          title='No products found'
          icon={<LuCircleAlert />}
        ></Alert>
      : <>
          <Box
            mb='2rem'
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              paddingBottom: '1rem',
              borderBottom: `1px solid ${theme.colors.red[7]}`,
            }}
          >
            <Menu shadow='md' width={200}>
              <Menu.Target>
                <Button>
                  <Group>
                    <FaFilter />
                    <Text>{activeCategorie}</Text>
                  </Group>
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                {categories.map((categorie) => (
                  <Menu.Item
                    key={categorie}
                    onClick={() => handleCategorieChange(categorie)}
                  >
                    {categorie}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
            <Chip.Group
              value={activePriceFilter}
              onChange={setActivePriceFilter}
            >
              <Group justify='center'>
                <Chip value='cheap'>From cheap to expensive</Chip>
                <Chip value='expensive'>From expensive to cheap</Chip>
              </Group>
            </Chip.Group>
          </Box>
          <SimpleGrid cols={3}>
            {filteredProducts.map((product) => (
              <Card shadow='sm' padding='lg' withBorder key={product.id}>
                <Card.Section>
                  <Image src={product.image} height={160} alt={product.title} />
                </Card.Section>

                <Group justify='space-between' mt='md' mb='xs'>
                  <Text
                    fw={500}
                    style={{
                      color: theme.colors.red[5],
                    }}
                  >
                    {product.title}
                  </Text>
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
                    <Button style={{ flex: 1 }}>Buy</Button>
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
              </Card>
            ))}
          </SimpleGrid>
        </>
      }
    </Container>
  );
};

export default Products;

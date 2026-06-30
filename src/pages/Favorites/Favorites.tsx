import productsApi from '@/api/productsApi/productsApi';
import EmptyFavorites from '@/components/Fovorites/EmptyFavorites/EmptyFavorites';
import FavoritesItem from '@/components/Fovorites/FavoritesItem/FavoritesItem';
import { useAppStore } from '@/store';
import {
  Alert,
  Container,
  LoadingOverlay,
  SimpleGrid,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { LuCircleAlert } from 'react-icons/lu';

const Favorites = () => {
  const favorites = useAppStore((state) => state.favorites);
  const theme = useMantineTheme();

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
        <EmptyFavorites />
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
              <FavoritesItem key={product.id} favoriteItem={product} />
            ))}
          </SimpleGrid>
        </>
      )}
    </Container>
  );
};

export default Favorites;

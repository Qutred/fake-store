import productsApi from '@/api/productsApi/productsApi';
import { useAppStore } from '@/store';
import {
  Alert,
  Container,
  Grid,
  LoadingOverlay,
  Stack,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { LuCircleAlert } from 'react-icons/lu';
import SuccessOrder from '@/components/Cart/SuccesOrder/SuccessOrder';
import { OrderedItem } from '@/types/cart';
import EmptyCart from '@/components/Cart/EmptyCart/EmptyCart';
import CartItem from '@/components/Cart/CartItem/CartItem';
import CartSummary from '@/components/Cart/CartSummary/CartSummary';

const Cart = () => {
  const theme = useMantineTheme();
  const [orderedItems, setOrderedItems] = useState<OrderedItem[]>([]);
  const [isOrdered, setIsOrdered] = useState(false);

  const cartItems = useAppStore((state) => state.cartItems);
  const clearCart = useAppStore((state) => state.clearCart);

  const {
    data: products = [],
    isFetching: isProductsFetching,
    isError: isProductsError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await productsApi.getProducts(),
  });

  const cartProductDetails = cartItems
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(
      (item): item is (typeof products)[0] & { quantity: number } =>
        item !== null,
    );

  const handleOrderAll = () => {
    if (cartProductDetails.length === 0) return;

    setOrderedItems(
      cartProductDetails.map((item) => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
    );
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return <SuccessOrder orderedItems={orderedItems} />;
  }

  return (
    <Container py='xl' mih='100%' size='xl'>
      {isProductsError ? (
        <Alert
          variant='light'
          title='Something went wrong'
          icon={<LuCircleAlert />}
          color='red'
        />
      ) : isProductsFetching ? (
        <LoadingOverlay
          visible={isProductsFetching}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
      ) : cartProductDetails.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <Title
            order={1}
            mb='2rem'
            style={{
              color: theme.colors.red[7],
              borderBottom: `2px solid ${theme.colors.red[7]}`,
              paddingBottom: '1rem',
            }}
          >
            Shopping Cart
          </Title>

          <Grid gap='xl'>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack gap='md'>
                {cartProductDetails.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <CartSummary
                cartProductDetails={cartProductDetails}
                handleOrderAll={handleOrderAll}
              />
            </Grid.Col>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Cart;

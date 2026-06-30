import { Product } from '@/types/product';
import {
  Button,
  Card,
  Group,
  NumberFormatter,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';

type CartSummaryProps = {
  handleOrderAll: () => void;
  cartProductDetails: (Product & { quantity: number })[];
};
const CartSummary = ({
  handleOrderAll,
  cartProductDetails,
}: CartSummaryProps) => {
  const theme = useMantineTheme();

  const totalItemsCount = cartProductDetails.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const totalPrice = cartProductDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Card
      p='lg'
      radius='md'
      withBorder
      style={{ position: 'sticky', top: '2rem' }}
    >
      <Title order={3} mb='md'>
        Order Summary
      </Title>
      <Stack gap='sm' mb='xl'>
        <Group justify='space-between'>
          <Text c='dimmed'>Total Items</Text>
          <Text fw={500}>{totalItemsCount}</Text>
        </Group>
        <Group justify='space-between'>
          <Text c='dimmed'>Shipping</Text>
          <Text fw={500} c='green.6'>
            Free
          </Text>
        </Group>
        <hr
          style={{
            border: 'none',
            borderTop: `1px solid ${theme.colors.gray[3]}`,
            margin: 0,
          }}
        />
        <Group justify='space-between'>
          <Text fw={700} size='lg'>
            Total Price
          </Text>
          <Text fw={700} size='lg' c='red.7'>
            <NumberFormatter prefix='$' value={totalPrice} decimalScale={2} />
          </Text>
        </Group>
      </Stack>

      <Button color='red' size='lg' fullWidth onClick={handleOrderAll}>
        Order All
      </Button>
    </Card>
  );
};

export default CartSummary;

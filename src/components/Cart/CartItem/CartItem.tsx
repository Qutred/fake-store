import {
  Card,
  Grid,
  Anchor,
  AspectRatio,
  Image,
  Stack,
  Group,
  Badge,
  Text,
  NumberFormatter,
  ActionIcon,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { type Product } from '@/types/product';
import { useAppStore } from '@/store';

type CartItemProps = {
  item: Product & { quantity: number };
};

const CartItem = ({ item }: CartItemProps) => {
  const decrementQuantity = useAppStore((state) => state.decrementQuantity);
  const incrementQuantity = useAppStore((state) => state.incrementQuantity);
  const removeFromCart = useAppStore((state) => state.removeFromCart);

  return (
    <Card key={item.id} p='md' radius='md' withBorder>
      <Grid align='center' gap='md'>
        <Grid.Col span={{ base: 12, sm: 2 }}>
          <Anchor component={Link} to={`/products/${item.id}`}>
            <AspectRatio ratio={1} maw={80} mx='auto'>
              <Image fit='contain' src={item.image} alt={item.title} />
            </AspectRatio>
          </Anchor>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Stack gap='3xs'>
            <Anchor
              component={Link}
              to={`/products/${item.id}`}
              underline='hover'
              c='dark'
              fw={600}
              size='sm'
            >
              {item.title}
            </Anchor>
            <Group>
              <Badge variant='light' size='xs'>
                {item.category}
              </Badge>
            </Group>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Group justify='space-between' align='center'>
            <Stack gap='none' align='center' style={{ minWidth: 60 }}>
              <Text size='xs' c='dimmed'>
                Price
              </Text>
              <Text size='sm' fw={500}>
                <NumberFormatter
                  prefix='$'
                  value={item.price}
                  decimalScale={2}
                />
              </Text>
            </Stack>
            <Group gap='xs' align='center'>
              <ActionIcon
                variant='subtle'
                color='gray'
                onClick={() => decrementQuantity(item.id)}
                aria-label='Decrease quantity'
              >
                <FaMinus size={10} />
              </ActionIcon>
              <Text fw={700} w={20} style={{ textAlign: 'center' }}>
                {item.quantity}
              </Text>
              <ActionIcon
                variant='subtle'
                color='gray'
                onClick={() => incrementQuantity(item.id)}
                aria-label='Increase quantity'
              >
                <FaPlus size={10} />
              </ActionIcon>
            </Group>
            <Stack gap='none' align='center' style={{ minWidth: 70 }}>
              <Text size='xs' c='dimmed'>
                Total
              </Text>
              <Text size='sm' fw={700} c='red.7'>
                <NumberFormatter
                  prefix='$'
                  value={item.price * item.quantity}
                  decimalScale={2}
                />
              </Text>
            </Stack>
            <ActionIcon
              variant='subtle'
              color='red'
              onClick={() => removeFromCart(item.id)}
              aria-label='Delete item'
            >
              <FaTrash size={14} />
            </ActionIcon>
          </Group>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default CartItem;

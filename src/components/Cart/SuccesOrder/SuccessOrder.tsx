import { OrderedItem } from '@/types/cart';
import {
  Button,
  Card,
  Container,
  Group,
  NumberFormatter,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

type SuccessOrderProps = {
  orderedItems: OrderedItem[];
};

const SuccessOrder = ({ orderedItems }: SuccessOrderProps) => {
  const theme = useMantineTheme();

  const navigate = useNavigate();

  return (
    <Container py='5rem' size='sm'>
      <Card shadow='xl' padding='xl' radius='md' withBorder>
        <Stack align='center' gap='md'>
          <FaCheckCircle size={60} color={theme.colors.green[6]} />
          <Title order={2} style={{ textAlign: 'center' }}>
            Order Placed Successfully!
          </Title>
          <Text c='dimmed' style={{ textAlign: 'center' }}>
            Thank you for your purchase. Your order has been received and is
            being processed.
          </Text>

          <Paper
            withBorder
            p='md'
            w='100%'
            radius='sm'
            bg={theme.colors.gray[0]}
          >
            <Text fw={700} mb='xs'>
              Receipt Summary
            </Text>
            <Stack gap='xs'>
              {orderedItems.map((item, idx) => (
                <Group key={idx} justify='space-between'>
                  <Text size='sm' style={{ maxWidth: '70%' }} truncate='end'>
                    {item.title}{' '}
                    <Text component='span' c='dimmed'>
                      x{item.quantity}
                    </Text>
                  </Text>
                  <Text size='sm' fw={500}>
                    <NumberFormatter
                      prefix='$'
                      value={item.price * item.quantity}
                      decimalScale={2}
                    />
                  </Text>
                </Group>
              ))}
              <Group
                justify='space-between'
                style={{
                  borderTop: `1px solid ${theme.colors.gray[3]}`,
                  paddingTop: theme.spacing.xs,
                }}
              >
                <Text fw={700}>Total Paid</Text>
                <Text fw={700} c='red.7'>
                  <NumberFormatter
                    prefix='$'
                    value={orderedItems.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0,
                    )}
                    decimalScale={2}
                  />
                </Text>
              </Group>
            </Stack>
          </Paper>

          <Button
            variant='filled'
            color='red'
            leftSection={<FaArrowLeft />}
            onClick={() => navigate('/')}
            mt='md'
          >
            Continue Shopping
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default SuccessOrder;

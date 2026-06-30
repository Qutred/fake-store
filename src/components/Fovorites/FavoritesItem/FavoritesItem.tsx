import { useAppStore } from '@/store';
import { Product } from '@/types/product';
import {
  ActionIcon,
  Anchor,
  AspectRatio,
  Badge,
  Button,
  Card,
  Group,
  Image,
  NumberFormatter,
  Stack,
  Text,
} from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface FavoritesItemProps {
  favoriteItem: Product;
}

const FavoritesItem = ({ favoriteItem }: FavoritesItemProps) => {
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
  return (
    <Card shadow='sm' padding='lg' withBorder key={favoriteItem.id}>
      <Card.Section>
        <Anchor component={Link} to={`/products/${favoriteItem.id}`}>
          <AspectRatio ratio={1080 / 720} maw={300} mx='auto'>
            <Image
              fit='contain'
              src={favoriteItem.image}
              alt={favoriteItem.title}
            />
          </AspectRatio>
        </Anchor>
      </Card.Section>

      <Group justify='space-between' mt='md' mb='xs'>
        <Anchor component={Link} to={`/products/${favoriteItem.id}`}>
          <Text
            fw={500}
            style={{
              color: theme.colors.red[5],
            }}
          >
            {favoriteItem.title}
          </Text>
        </Anchor>

        <Badge>{favoriteItem.category}</Badge>
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
        {favoriteItem.description}
      </Text>
      <Stack mt='auto'>
        <NumberFormatter
          prefix='$ '
          value={favoriteItem.price}
          style={{
            fontSize: '1.5rem',
          }}
        />
        <Group>
          <Button
            style={{ flex: 1 }}
            onClick={() => handleAddToCart(favoriteItem.id)}
          >
            Add to cart
          </Button>
          <ActionIcon
            variant='default'
            radius='md'
            size={36}
            aria-label='Like'
            color={theme.colors.red[7]}
            onClick={() => handleAddToggleFavorites(favoriteItem.id)}
          >
            {favorites.includes(favoriteItem.id) ? (
              <FaHeart color={theme.colors.red[7]} />
            ) : (
              <FaRegHeart color={theme.colors.red[7]} />
            )}
          </ActionIcon>
        </Group>
      </Stack>
    </Card>
  );
};

export default FavoritesItem;

import React from 'react';
import {
  Container,
  Box,
  useMantineTheme,
  Flex,
  ActionIcon,
  Text,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { FaGithub, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const theme = useMantineTheme();
  return (
    <Container
      strategy='block'
      fluid
      style={{ width: '100%', backgroundColor: theme.colors.red[7] }}
    >
      <Box
        component='footer'
        style={{
          padding: theme.spacing.xs,
        }}
      >
        <Flex justify='center' align='center' gap='sm'>
          <Text style={{ color: theme.white }}>Made by</Text>
          <Link
            target='_blank'
            to='https://github.com/Qutred'
            style={{
              textDecoration: 'none',
              color: theme.white,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ActionIcon variant='transparent'>
              <FaGithub size={20} color={theme.white} />
            </ActionIcon>
            <Text>Qutred</Text>
          </Link>
        </Flex>
      </Box>
    </Container>
  );
};

export default Footer;

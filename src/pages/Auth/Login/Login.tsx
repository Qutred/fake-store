import { useAppStore } from '@/store';
import {
  Button,
  Container,
  LoadingOverlay,
  Paper,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { LuLock, LuUser } from 'react-icons/lu';
import { useMutation } from '@tanstack/react-query';
import authApi from '@/api/authApi/authApi';
import { notifications } from '@mantine/notifications';
import { isAxiosError } from 'axios';
import { useMantineTheme } from '@mantine/core';

const Login = () => {
  const navigate = useNavigate();
  const login = useAppStore((state) => state.login);
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) => (value.length < 2 ? 'Username is too short' : null),
      password: (value) => (value.length < 3 ? 'Password is too short' : null),
    },
  });

  const { mutate: handleSubmit, isPending } = useMutation({
    mutationFn: async (values: typeof form.values) =>
      await authApi.login(values.username, values.password),
    mutationKey: ['auth/login'],
    onSuccess: (data) => {
      login(data.token);
      notifications.update({
        id: 'login-request',
        color: 'green',
        title: 'Success',
        message: 'You are logged in',
        loading: false,
        autoClose: 2000,
      });
      navigate('/');
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        notifications.hide('login-request');
        notifications.show({
          title: 'Auth error',
          message: error?.response?.data || 'Something went wrong',
          color: 'red',
          autoClose: 2000,
        });
      }
    },
  });

  return (
    <Container size={420} my={40} pos={'relative'}>
      <LoadingOverlay
        visible={isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Paper withBorder shadow='xs' p={30} radius='md'>
        <Title
          ta='center'
          mb='xl'
          style={{
            color: theme.colors.red[6],
          }}
        >
          Welcome back!
        </Title>

        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack gap='md'>
            <TextInput
              label='Username'
              placeholder='Your username'
              leftSection={<LuUser size={16} />}
              {...form.getInputProps('username')}
            />

            <TextInput
              label='Password'
              placeholder='••••••••'
              leftSection={<LuLock size={16} />}
              type='password'
              {...form.getInputProps('password')}
            />

            <Button
              type='submit'
              fullWidth
              mt='md'
              style={{
                backgroundColor: theme.colors.red[6],
              }}
            >
              Sign in
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;

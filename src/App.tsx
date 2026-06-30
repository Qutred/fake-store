import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './routes/Router';
import { mantineTheme } from './settings/theme/theme';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={mantineTheme}>
        <Router />
        <Notifications />
      </MantineProvider>
    </QueryClientProvider>
  );
}

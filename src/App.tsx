import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './routes/Router';
import { mantineTheme } from './settings/theme/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={mantineTheme}>
        <Router />
      </MantineProvider>
    </QueryClientProvider>
  );
}

'use client';

import { Provider as JotaiProvider } from 'jotai';
import type { ReactNode } from 'react';

// react-query 를 이 레벨에서 쓰고 있지 않다면 QueryClientProvider도 여기서
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();

const SectorsClientShell = ({ children }: { children: ReactNode }) => {
  return (
    <JotaiProvider>
      {/* <QueryClientProvider client={queryClient}> */}
      {children}
      {/* </QueryClientProvider> */}
    </JotaiProvider>
  );
};

export default SectorsClientShell;

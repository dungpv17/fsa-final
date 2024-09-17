import MainErrorFallback from "@/components/error/main";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function AppProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = React.useState(() => new QueryClient({}));
  return (
    <React.Suspense fallback={<div className="">Loading app load ...</div>}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {import.meta.env.DEV && <ReactQueryDevtools />}
          <Toaster />
          {children}
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
}

export default AppProvider;

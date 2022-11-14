import { BrowserRouter } from "react-router-dom";

import { useAppSelector } from "store/hooks";
import { selectErrorMessage } from "features/app/appSlice";

import "./App.scss";

import ErrorBanner from "components/molecules/ErrorBanner/ErrorBanner";

import { AppRoutes } from "routes";

import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  const errorMessage = useAppSelector(selectErrorMessage);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools /> */}
      <div className="App font-body text-main-100 font-medium text-base">
        {errorMessage && <ErrorBanner />}
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;

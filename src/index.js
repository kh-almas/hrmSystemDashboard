import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";

// ** Import custom components for redux **
import { Provider } from "react-redux";
import MainRoutes from "./routes";
import store from "./store";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// setup fake backend

const Root = () => {
    const queryClient = new QueryClient();
  return (
    <div className="App">
      <Provider store={store}>
          <QueryClientProvider client={queryClient}>
              <MainRoutes />
          </QueryClientProvider>
      </Provider>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);

serviceWorker.unregister();

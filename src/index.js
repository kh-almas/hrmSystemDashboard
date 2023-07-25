import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "./i18n";
import * as serviceWorker from "./serviceWorker";

// ** Import custom components for redux **
import { Provider } from "react-redux";
import store from "./store";
import MainRoutes from "./routes";

// setup fake backend

const Root = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <MainRoutes />
      </Provider>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);

serviceWorker.unregister();

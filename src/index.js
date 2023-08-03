import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";

// ** Import custom components for redux **
import { Provider } from "react-redux";
import MainRoutes from "./routes";
import store from "./store";

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

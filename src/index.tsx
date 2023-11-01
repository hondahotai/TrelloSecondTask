import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/global.css";
import App from "./components/app/App";
import {Provider} from "react-redux";
import store, {persistor} from "./state/store";
import {PersistGate} from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
  </React.StrictMode>,
);

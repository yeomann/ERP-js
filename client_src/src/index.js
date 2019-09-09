import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
import WebfontLoader from "@dr-kobros/react-webfont-loader";
import { Provider } from "react-redux";
import configureStore from "./store";

import * as serviceWorker from "./serviceWorker";

const store = configureStore();
const rootEl = document.getElementById("root");
// https://stackoverflow.com/questions/45481429/how-to-async-load-material-ui-fonts
// webfontloader configuration object. *REQUIRED*.
const webFontConfig = {
  google: {
    families: ["Material Icons"]
  },
  custom: {
    families: ["FontAwesome"],
    urls: ["https://use.fontawesome.com/releases/v5.0.6/css/all.css"]
  },
  timeout: 1000
  // active: RenderApplication // invoked when fonts are active
};
// Callback receives the status of the general webfont loading process. *OPTIONAL*
const callback = status => {
  // I could hook the webfont status to for example Redux here.
};
// Create a reusable render method that we can call more than once
let render = () => {
  // Dynamically import our main App component, and render it
  const App = require("./App").default;

  ReactDOM.render(
    <Provider store={store}>
      <WebfontLoader config={webFontConfig} onStatus={callback}>
        <App />
      </WebfontLoader>
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  const renderApp = render;
  const renderError = error => {
    const RedBox = require("redbox-react").default;
    ReactDOM.render(<RedBox error={error} />, rootEl);
  };

  // In development, we wrap the rendering function to catch errors,
  // and if something breaks, log the error and render it to the screen
  render = () => {
    try {
      renderApp();
    } catch (error) {
      console.error(error);
      renderError(error);
    }
  };

  // Whenever the App component file or one of its dependencies
  // is changed, re-import the updated component and re-render it
  module.hot.accept("./App", () => {
    setTimeout(render);
  });
}
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();

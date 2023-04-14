import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { KeyboardShortcutProvider } from "./KeyboardShortcut";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <KeyboardShortcutProvider>
      <App />
    </KeyboardShortcutProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";

import { Frame } from "./frame";
const rootElement = document.getElementById("root");

const url =
  "https://blog.afex.africa/uploads/AFEX_2024_Annual_Commodities_Outlook_107c392c9d.pdf";

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Frame url={url} title='PDF' />
    </React.StrictMode>
  );
}

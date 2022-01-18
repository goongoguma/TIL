import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import View from "./View";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <View />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

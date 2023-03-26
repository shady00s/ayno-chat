import React, { useRef, useMemo, useState } from "react";
import SocketClientManager from "./sockets/message_socket";
import { HelmetProvider } from "react-helmet-async";
import AppRouters from "./router";
import SocketContext from "./context/socketContext";
import { Provider } from "react-redux";
import {store} from "./redux/store";
function App() {
  const socket = useRef(SocketClientManager.socketInit());

  return (
    <SocketContext.Provider value={socket.current}>
      <Provider store={store}>
        <HelmetProvider>
          <AppRouters />
        </HelmetProvider>
      </Provider>
    </SocketContext.Provider>
  );
}

export default App;

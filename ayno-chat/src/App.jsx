import React, { useRef, useMemo, useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import AppRouters from "./router";
import SocketContext from "./context/socketContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { io } from "socket.io-client";
function App() {

  const socket = useRef(io("http://192.168.1.4:8080", { transports: ['websocket'] }))
  useEffect(() => {

    if (!socket.current.connected) {
      socket.current.connect()
    }
  }, [socket.current])
  return (
    <Provider store={store}>
      <SocketContext.Provider value={socket.current}>
        <HelmetProvider>
          <AppRouters />
        </HelmetProvider>
      </SocketContext.Provider>
    </Provider>
  );


}

export default App;

import React,{useRef,useMemo,useState} from "react";
import SocketClientManager from "./sockets/message_socket";
import { HelmetProvider } from 'react-helmet-async';
import AppRouters from './router';
import SocketContext from "./context/socketContext";


function App() {


  const socket = useRef( SocketClientManager.socketInit())

  return (
    
      <SocketContext.Provider value={socket.current}>
    <HelmetProvider>

      <AppRouters />
    </HelmetProvider>
    </SocketContext.Provider >



  );
}

export default App;

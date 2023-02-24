import React,{useRef,useMemo,useState} from "react";
import SocketClientManager from "./sockets/message_socket";
import { HelmetProvider } from 'react-helmet-async';
import AppRouters from './router';
import SocketContext from "./context/socketContext";


function App() {


  const socket = useRef(new SocketClientManager().socketInit())
  const socketSaved = useMemo(()=>(socket.current),[socket.current])
  return (
      <SocketContext.Provider value={socketSaved}>
     
    <HelmetProvider>

      <AppRouters />
    </HelmetProvider>

    </SocketContext.Provider >


  );
}

export default App;

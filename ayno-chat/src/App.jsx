import React,{useRef,useMemo,useState} from "react";
import SocketClientManager from "./sockets/message_socket";
import { HelmetProvider } from 'react-helmet-async';
import AppRouters from './router';
import SocketContext from "./context/socketContext";
import { UserAxiosInstanceComponent } from "./axios/inestance";


function App() {


  const socket = useRef( SocketClientManager.socketInit())

  return (
    
      <SocketContext.Provider value={socket.current}>
    <HelmetProvider>
    <UserAxiosInstanceComponent>

      <AppRouters />
    </UserAxiosInstanceComponent>
    </HelmetProvider>
    </SocketContext.Provider >



  );
}

export default App;

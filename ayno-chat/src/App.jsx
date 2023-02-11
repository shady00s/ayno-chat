
import React from "react";

import SocketClientManager from "./sockets/message_socket";
import { HelmetProvider } from 'react-helmet-async';
import AppRouters from './router';


function App() {


  return (
    <>
    
      <HelmetProvider>
      
      <AppRouters/>


      </HelmetProvider>

    </>
    
   
  );
}

export default App;


import React from "react";

import SocketClientManager from "./sockets/message_socket";
import { HelmetProvider } from 'react-helmet-async';
import AppRouters from './router';
import HomeScreen from "./home/screen/home-screen";


function App() {


  return (
    <HelmetProvider>
      <AppRouters />
    </HelmetProvider>

  );
}

export default App;

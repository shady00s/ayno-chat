import React, { useRef, useMemo, useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import AppRouters from "./router";
import SocketContext from "./context/socketContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { io } from "socket.io-client";
import LoadingScreen from "./reusable-components/loading/loading_screen";
import LoadingComponent from "./reusable-components/loading/loading_component";
function App() {
  const [socketVal,setSocketVal]=useState(null)
  //const socket = useRef(null)
  useEffect(()=>{
    if(socketVal === null){
      const socketInit = io("https://ayno-chat-api.onrender.com", { transports: ['websocket'] })
      setSocketVal(()=>socketInit)

    }
  },[socketVal])
  const socket = useMemo(()=> socketVal ,[socketVal])
    console.log(socket);
  if(!socket){
    return(<LoadingComponent/>)
  }
    return (
      <Provider store={store}>
        <SocketContext.Provider value={socket}>
          <HelmetProvider>
            <AppRouters />
          </HelmetProvider>
        </SocketContext.Provider>
      </Provider>
    );

  


}

export default App;

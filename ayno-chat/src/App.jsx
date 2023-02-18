import React,{useRef,useMemo,useState} from "react";
import SocketClientManager from "./sockets/message_socket";
import { HelmetProvider } from 'react-helmet-async';
import AppRouters from './router';
import SocketContext from "./context/socketContext";
import UserContext from './context/userContext';


function App() {

  const socket = useRef(SocketClientManager.socketInit())
  const [user,setUser] = useState({name:'',profileImagePath:''})

  const socketSaved = useMemo(()=>(socket.current),[socket.current])
  const userValue = useMemo(()=>({user,setUser}),[user,setUser])
  return (
    <SocketContext.Provider value={socketSaved}>
      <UserContext.Provider value={userValue}>

    <HelmetProvider>
      <AppRouters />
    </HelmetProvider>
    </UserContext.Provider>

    </SocketContext.Provider >

  );
}

export default App;

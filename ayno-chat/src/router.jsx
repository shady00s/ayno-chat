import {Route,BrowserRouter as Router, Routes } from "react-router-dom"
import HomeScreen from './home/screen/home-screen';
import LoadingScreen from "./reusable-components/loading/loading_screen";
import IntroScreen from './registration/screens/intro_screen';
import PrivateRoute from "./private_route";
import { useRef ,useMemo} from "react";
import SocketClientManager from "./sockets/message_socket";
import SocketContext from './context/socketContext';
const socketRef = SocketClientManager.socketInit()
const AppRouters = () => {
    
    const socket = useRef(socketRef)
   let socketVal = useMemo(()=>socket,[socket])

    return (
       

                    <SocketContext.Provider value={socketVal.current}>
           <Router>
                <Routes>

                    
                    <Route element={<LoadingScreen/>} path="/ayno-chat/"/>
                    <Route exact  element={<IntroScreen/>} path="/ayno-chat/register"/>
                    <Route element={<PrivateRoute/>}>
                    
           
                    <Route exact  element={<HomeScreen/>} path="/ayno-chat/home"/>
                    
                    </Route>
                </Routes>
           </Router>
                    </SocketContext.Provider>
     
    )
}

export default AppRouters
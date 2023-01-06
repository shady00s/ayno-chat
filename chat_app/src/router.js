import {Route,BrowserRouter as Router, Routes } from "react-router-dom"
import HomeScreen from './home/screen/home-screen';
import LoadingScreen from "./reusable-components/loading_screen";
import IntroScreen from './registration/screens/intro_screen';
import PrivateRoute from "./private_route";


const AppRouters = () => {
    
    
    return (
       

           <Router>
                <Routes>
                    <Route element={<LoadingScreen/>} path="/ayno-chat/"/>
                    <Route exact  element={<IntroScreen/>} path="/ayno-chat/register"/>
                    <Route element={<PrivateRoute/>}>
                    
           
                    <Route exact  element={<HomeScreen/>} path="/ayno-chat/home"/>
                  
                    </Route>
                </Routes>
           </Router>
     
    )
}

export default AppRouters
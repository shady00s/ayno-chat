import {Route,BrowserRouter as Router, Routes } from "react-router-dom"
import HomeScreen from './home/screen/home-screen';
import LoadingScreen from "./reusable-components/loading/loading_screen";
import IntroScreen from './registration/screens/intro_screen';
import PrivateRoute from "./private_route";
import { ErrorPage } from './home/screen/error_screen';
import { useState,useMemo } from "react";

const AppRouters = () => {   
    
    return (
       
                   
           <Router>
                <Routes>

                    <Route element={<LoadingScreen/>} path="/"/>
                    <Route path="/ayno-chat/"  element={<LoadingScreen/>}/>
                    <Route element={<IntroScreen/>} path="/ayno-chat/register"/>
                    <Route element={<PrivateRoute/>}>
                    <Route element={<HomeScreen/> } path="/ayno-chat/home"/>
                    </Route>
                    <Route element={<ErrorPage/>} path="*"/>
                </Routes>
           </Router>
     
    )
}

export default AppRouters
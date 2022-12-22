import { createBrowserRouter,Router,RouterProvider } from "react-router-dom"
import HomeScreen from './home/screen/homeScreen';
import IntroScreen from './registration/intro_screen';
const AppRouters = () => {

    const router = createBrowserRouter([
        {
            path: "/ayno-chat/",

            element: <IntroScreen />
        },
        {
            path:"/ayno/home",
            element:<HomeScreen/>
        }
    ])
    return (
       

            <RouterProvider router={router}/>
     
    )
}

export default AppRouters
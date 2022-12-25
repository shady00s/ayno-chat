import { createBrowserRouter,RouterProvider } from "react-router-dom"
import HomeScreen from './home/screen/home-screen';
import IntroScreen from './registration/screens/intro_screen';
const AppRouters = () => {

    const router = createBrowserRouter([
        {
            path: "/ayno-chat/",

            element: <IntroScreen />
        },
        {
            path:"/ayno-chat/home",
            element:<HomeScreen />
        }
    ])
    return (
       

            <RouterProvider router={router}/>
     
    )
}

export default AppRouters
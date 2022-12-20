import { createBrowserRouter,Router,RouterProvider } from "react-router-dom"
import HomeScreen from './home/screen/homeScreen';
import IntroScreen from './registration/intro_screen';
const AppRouters = () => {

    const router = createBrowserRouter([
        {
            path: "/",

            element: <IntroScreen />
        },
        {
            path:"/home",
            element:<HomeScreen/>
        }
    ])
    return (
       

            <RouterProvider router={router}/>
     
    )
}

export default AppRouters
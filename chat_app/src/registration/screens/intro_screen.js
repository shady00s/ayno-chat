import SubmitButton from "../components/submit_button"
import RegistrationComponent from "../components/registeration_component"
import SignInComponent from "../components/signin_component"
import { useState } from 'react';

export default function IntroScreen() {

    const visibleContainer = "-translate-y-46 duration-400 transition-all ease-in"
    const hiddenContainer = "-translate-y-1/3 opacity-0 invisible  duration-300 transition-all ease-in"
    const [close, setClose] = useState(false)
    return (<>
        {/* main container */}
        <main className="w-full h-screen m-auto overflow-hidden flex justify-center items-center  animate-changeColor bg-400% bg-gradient">

            {/* registeration container */}
            <div className="bg-background w-11/12  sm:w-9/12 m-auto h-[90%] rounded-3xl  overflow-scroll">
                <div>
                    <img className="w-36 m-6" src={"./images/logo.png"} />
                </div>

                <section className="flex justify-center items-center flex-wrap  w-full">
                    {/* intro section */}
                    <div className="flex flex-col md:border-b-0   border-b-2 border-b-slate-700 md:border-b-slate-700 items-center md:w-6/12 w-11/12 md:border-r-2 md:border-r-slate-700 p-2  m-auto md:h-4/5">
                        <h1 className="text-3xl  xl:text-6xl md:p-4 p-8 text-slate-300">
                            Chat any one with no information needed.
                        </h1>
                        <span className="text-slate-500 p-8">No email or phone number needed just write your nickname and set password and chat with anoynus people</span>

                    </div>

                    {/* signup and registration section */}
                    <div className="p-10  w-full  md:w-6/12">
                        <SignInComponent />
                    </div>
                </section>

            </div>
        </main>
    </>)
}




import SelectAvatarComponent from "../../reusable-components/select_avatar_component"
import InputTextComponent from "../../registration/components/input_text_component"
const SettingsComponent = () => {
    return (
        <>
            <div className="absolute  bg-background w-full h-full left-12 z-40">
                <h1 className="text-slate-200 text-xl p-5 mb-5 border-b-2 pb-4 border-b-slate-800">Settings</h1>

                <div className="flex h-full w-full justify-evenly flex-wrap overflow-y-auto">
                     {/* personal info */}
                <div className="   w-full flex flex-wrap h-5/6 overflow-y-auto">
                   
                    <div className=" flex flex-wrap flex-col md:w-5/12 w-full  justify-start items-start ml-8 mb-5">
                        
                        <h2 className=" mb-12 text-2xl text-slate-200 ">Personal Info</h2>
                        <span className="ml-6 text-slate-600">you can change your name and password</span>
                        <div className="ml-2  flex flex-col justify-start items-start">
                            <InputTextComponent />
                            <InputTextComponent />
                        
                        </div>
                        

                    </div>

                    <div className="w-6/12 min-w-min p-1">
                        <h2 className="text-slate-200 text-2xl ">Change Avatar</h2>
                        <div className="ml-8 mt-2">
                            <SelectAvatarComponent />
                            </div>
                        </div>

                    
               
                </div>
                      

                </div>

               


            </div>

        </>
    )
}

export default SettingsComponent
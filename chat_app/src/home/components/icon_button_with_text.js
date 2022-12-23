import React from "react"

export default function IconButtonWithText(props) {
    const IconTag = React.lazy(() => import(`react-feather/dist/icons/${props.icon}.js`))

    const activeIconStyle = props.isActive === true ? 'text-gray-100' : 'text-gray-400';


    return (


        <div className="flex p-1 rounded-md justify-center items-center cursor-pointer hover:bg-slate-800 " >
            <div className="w-5 h-5 m-1 flex justify-center items-center">
                <React.Suspense>

                    <IconTag className={activeIconStyle} />
                </React.Suspense>
            </div>

            {<h1 className={` xl:block p-1  hidden ${activeIconStyle}`}>{props.name}</h1>}

        </div>
    )
}
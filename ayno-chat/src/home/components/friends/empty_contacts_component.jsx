import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";

import { faBed } from '@fortawesome/free-solid-svg-icons';

export const EmptyContactComponent = ()=>{
    library.add(faBed)

    return(
        <>
            <div className="flex justify-center items-center flex-col p-2 ">
                            <FontAwesomeIcon className='text-slate-700 pb-8' icon="bed" size='2x'/>
            
                            <h1 className="text-white">Add new Contacts</h1>
                <p className=" text-slate-500" >Search for new friends in search bar above to start conversation</p>
            </div>
        
        </>
    )
}

export default EmptyContactComponent
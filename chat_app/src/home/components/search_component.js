import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ApiCall from './../api_call';

const SearchComponent= (props)=>{
    library.add(faMagnifyingGlass)

    return(
        <>
            <div className="bg-slate-800 p-2 flex justify-evenly items-center m-1 rounded-sm">
                <input onClick={props.onInputClick} onChange={props.searchResult} className="p-2 bg-transparent w-9/12 h-4/6 text-slate-300" type={"text"} placeholder={"Search for friends here."}/>
                <FontAwesomeIcon
                onClick={props.searchSubmit}
                icon="magnifying-glass"  className='pl-3 pr-3 pt-2 pb-2 text-slate-100 cursor-pointer hover:transition-all bg-slate-700 rounded-md hover:bg-slate-50 hover:text-slate-800'/>
            </div>
        </>
    )
}

export default SearchComponent
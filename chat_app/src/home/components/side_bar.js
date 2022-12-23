import '../style/side_bar.css'
import IconButtonWithText from './icon_button_with_text'


const navButtons = [
    
    {name:"Contacts",icon:"user"},
    {name:"Groups",icon:"users"},
    {name:"Settings",icon:"sliders"},
    {name:"Log-out",icon:"log-out"},

]
export default function  Sidebar(){
    
    return (
        <div className=" SidebarComponent h-home-content">
                {navButtons.map((item,index)=>
                    <div key={item.name} className='pb-4 pr-2 pl-1 '>

                        <IconButtonWithText  isActive={false}  key={item.name}  icon={item.icon} name={item.name}/>
                    </div>
   )}
                
        </div>
    )
}





export function CounterComponent(props){
    let number = parseInt(props.number) > 99 ? "99+": props.number
        return (
            <div className="bg-sky-900 w-[1.3rem] h-[1.3rem] rounded-full flex justify-center  animate-pulse">
             <span  className="text-[9px] text-center m-auto text-white">{number}</span>
            </div>
        )
    }
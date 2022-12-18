import ChatMessageComponent from './chat_message_component';
import TextInputContainer from './text_input_component';

export default function MessageComponent(){
    return(
        <div style={{height:"88%"}} className='ml-2 flex w-10/12 flex-col xl:w-5/12 bg-subBackGround overflow-y-auto'>
            <ChatMessageComponent isUser={false}/>
            <ChatMessageComponent isUser={true}/>

            <ChatMessageComponent isUser={false}/>
            <ChatMessageComponent isUser={true}/> 
            <ChatMessageComponent isUser={true}/>
            <ChatMessageComponent isUser={true}/>
            <ChatMessageComponent isUser={true}/>
            <ChatMessageComponent isUser={true}/>
            <ChatMessageComponent isUser={true}/>
            <ChatMessageComponent isUser={true}/>

            <TextInputContainer/>
        </div>
    )
}
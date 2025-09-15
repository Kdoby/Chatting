import "./Chatting.css";
import ChatInput from "../component/ChatInput";
import ChatLog from "../component/ChatLog";

export default function ChattingRoomView (){
    return (
        <div className={"chatting_wrapper"}>
            <ChatLog />
            <ChatInput />
        </div>
    );
}
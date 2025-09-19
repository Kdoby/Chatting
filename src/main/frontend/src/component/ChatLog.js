import ChatBubble from "./ChatBubble";
import MyChatBubble from "./MyChatBubble";
import ChatHeader from "./ChatHeader";

export default function ChatLog () {
    return (
        <div className={"ChatLog_wrapper"}>
            <ChatHeader />
            <ChatBubble />
            <MyChatBubble />
        </div>
    );
}
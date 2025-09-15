import ChatBubble from "./ChatBubble";
import MyChatBubble from "./MyChatBubble";

export default function ChatLog () {
    return (
        <div className={"ChatLog_wrapper"}>
            <ChatBubble />
            <MyChatBubble />
        </div>
    );
}

export default function MyChatBubble ({message, formatTime}) {
    return (
        <div style={{display: "flex", justifyContent: "flex-end"}}>
            <div className={"MyChatBubble_wrapper"}>
                <div className={"ChatBubble_time"}>
                    <p>{formatTime(message.sendTime)}</p>
                </div>
                <div className={"ChatBubble_text"}>{message.message}</div>
            </div>
        </div>

    );
}
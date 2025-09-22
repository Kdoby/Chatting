
export default function MyChatBubble ({message, formatTime}) {
    return (
        <div style={{display: "flex", justifyContent: "flex-end"}}>
            <div className={"MyChatBubble_wrapper"}>
                <div className={"ChatBubble_time"}>
                    <p>{formatTime(message.sendTime)}</p>
                </div>
                {message.type === "CHAT" && <div className={"ChatBubble_text"}>{message.message}</div>}
                <div>
                    {message.type === "IMAGE" &&
                        message.images.map((image, idx) => (<img src={`http://localhost:8080${image}`} alt="imageMessage" className={"ChatBubble_img"}></img>))}
                </div>
            </div>
        </div>

    );
}
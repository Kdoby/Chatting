import getGridStyle from "./ChatBubble";

export default function MyChatBubble ({message, formatTime}) {
    if (!message) return null;

    return (
        <div style={{display: "flex", justifyContent: "flex-end"}}>
            <div className={"MyChatBubble_wrapper"}>
                <div className={"ChatBubble_time"}>
                    <p>{formatTime(message.sendTime)}</p>
                </div>
                {message.type === "CHAT" && <div className={"ChatBubble_text"}>{message.message}</div>}
                {message.type === "IMAGE" &&
                    <div style={getGridStyle(message.images.length)}>
                        {message.images.map((image, idx) => (
                            <div className={"ChatBubble_imgDiv"}>
                                <img src={`http://localhost:8080${image}`} alt="imageMessage" className={"ChatBubble_img"}></img>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>

    );
}

export default function ChatBubble ({message, formatTime}) {
    return (
        <div style={{display: "flex", justifyContent: "flex-start"}}>
            <div className={"ChatBubble_wrapper"}>
                <img src={"images/defaultProfile.png"} alt={"profileimg"}/>
                <div style={{margin: "0 10px"}}>
                    <p style={{margin: "10px 0", fontSize: "14px"}}>{message.senderNickname}</p>
                    {message.type === "CHAT" && <div className={"ChatBubble_text"}>{message.message}</div>}
                    <div>
                        {message.type === "IMAGE" &&
                            message.images.map((image, idx) => (<img src={`http://localhost:8080${image}`} alt="imageMessage" className={"ChatBubble_img"}></img>))}
                    </div>
                </div>
                <div className={"ChatBubble_time"}>
                    <p>{formatTime(message.sendTime)}</p>
                </div>
            </div>
        </div>
    );
}
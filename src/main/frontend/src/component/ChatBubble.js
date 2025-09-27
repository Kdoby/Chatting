const getGridStyle = (count) => {
    if (count === 1)
        return {display: "grid", gridTemplateColumns: "1fr"};
    if (count === 2)
        return {display: "grid", gridTemplateColumns: "1fr 1fr"};
    if (count === 3)
        return {display: "grid", gridTemplateColumns: "1fr 1fr 1fr"};
    return {display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr"};
};

export default function ChatBubble ({message, formatTime}) {
    if (!message) return null;

    return (
        <div style={{display: "flex", justifyContent: "flex-start"}}>
            <div className={"ChatBubble_wrapper"}>
                <img src={"images/defaultProfile.png"} alt={"profileimg"}/>
                <div style={{margin: "0 10px"}}>
                    <p style={{margin: "10px 0", fontSize: "14px"}}>{message.senderNickname}</p>
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
                <div className={"ChatBubble_time"}>
                    <p>{formatTime(message.sendTime)}</p>
                </div>
            </div>
        </div>
    );
}
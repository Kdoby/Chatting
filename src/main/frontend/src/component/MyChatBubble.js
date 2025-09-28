import {useState} from "react";

const getGridStyle = (count) => {
    if (count === 1)
        return {display: "grid", gridTemplateColumns: "1fr"};
    if (count === 2)
        return {display: "grid", gridTemplateColumns: "1fr 1fr"};
    return {display: "grid", gridTemplateColumns: "1fr 1fr 1fr"};
};

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
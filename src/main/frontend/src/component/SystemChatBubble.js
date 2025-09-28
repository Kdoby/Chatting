
export default function SystemChatBubble ({message}) {
    if (!message) return null;

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div className={"SystemChatBubble_wrapper"}>
                {message.message}
            </div>
        </div>

    );
}
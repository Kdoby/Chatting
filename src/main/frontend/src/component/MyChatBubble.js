
export default function MyChatBubble () {
    return (
        <div style={{display: "flex", justifyContent: "flex-end"}}>
            <div className={"MyChatBubble_wrapper"}>
                <div className={"ChatBubble_time"}>
                    <p>오후 5:30</p>
                </div>
                <div className={"ChatBubble_text"}>채팅 내용~~~~</div>
            </div>
        </div>

    );
}
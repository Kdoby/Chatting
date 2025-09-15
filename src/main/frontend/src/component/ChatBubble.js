
export default function ChatBubble () {
    return (
        <div style={{display: "flex", justifyContent: "flex-start"}}>
            <div className={"ChatBubble_wrapper"}>
                <img src={"images/defaultProfile.png"} alt={"profileimg"}/>
                <div style={{margin: "0 10px"}}>
                    <p style={{margin: "10px 0", fontSize: "14px"}}>도담</p>
                    <div className={"ChatBubble_text"}>채팅 내용이다이ㅏㄷㄷ이ㅏ이디ㅏ무어야뭔기준으로 줄이 바뀌는거야미ㅓ이ㅏ머dsssssssssssssssssssssssssssssssssssssssssssssssssssssdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</div>
                </div>
                <div className={"ChatBubble_time"}>
                    <p>오후 5:30</p>
                </div>
            </div>
        </div>
    );
}
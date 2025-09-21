
export default function MyChatBubble ({message}) {
    function toAmPmLabel(st) {
        const m = /T(\d{2}):(\d{2})/.exec(st); // T뒤의 HH:mm만 뽑기
        if(!m) return;
        const hh = Number(m[1]);
        const mm = m[2];
        const ampm = hh < 12 ? '오전' : '오후';
        const hour12 = (hh % 12) || 12;
        return `${ampm} ${hour12}:${mm}`;
    }
    return (
        <div style={{display: "flex", justifyContent: "flex-end"}}>
            <div className={"MyChatBubble_wrapper"}>
                <div className={"ChatBubble_time"}>
                    <p>{toAmPmLabel(message.sendTime)}</p>
                </div>
                <div className={"ChatBubble_text"}>{message.message}</div>
            </div>
        </div>

    );
}
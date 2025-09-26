import {useEffect, useRef} from "react";
import MyChatBubble from "./MyChatBubble";
import ChatBubble from "./ChatBubble";

// 오전 hh:mm 형태
const formatTime = (t) => {
    const d = new Date(t);
    const h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, "0");
    const ampm = h < 12 ? "오전" : "오후";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${ampm} ${h12}:${m}`;
}

export default function ChatLogDetail ({ userInfo, messages}) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth', block: 'end'});
    }, [messages.length]);

    return (
        <div style={{overflowY: "auto"}}>
            {messages.map((m, idx) => {
                return (
                    (m.senderNickname === 'system')
                        ? <div key={idx}>{m.message}</div>
                        : (m.senderNickname === userInfo.nickname)
                            ? <MyChatBubble message={m} formatTime={formatTime}/>
                            : <ChatBubble message={m} formatTime={formatTime}/>
                );
            })}
            <div ref={bottomRef}/>
        </div>
    );
}
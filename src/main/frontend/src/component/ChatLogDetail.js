import {useEffect, useRef} from "react";
import MyChatBubble from "./MyChatBubble";
import ChatBubble from "./ChatBubble";
import SystemChatBubble from "./SystemChatBubble";

// 오전 hh:mm 형태
const formatTime = (t) => {
    const d = new Date(t);
    const h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, "0");
    const ampm = h < 12 ? "오전" : "오후";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${ampm} ${h12}:${m}`;
}

export default function ChatLogDetail ({ userInfo, messages, endTime, startTime, onPick, systemOn}) {
    const bottomRef = useRef(null);
    const msgRefs = useRef({}); // messageId(or sendTime) → DOM node

    useEffect(() => { // 새로운 메시지 추가되면 맨 아래로
        bottomRef.current?.scrollIntoView({behavior: 'smooth', block: 'end'});
    }, [messages.length]);

    useEffect(() => {
        console.log("startTime: ", startTime);
        if (startTime && msgRefs.current[startTime]) {
            msgRefs.current[startTime].scrollIntoView({
                behavior: "smooth",
                block: "center", // 중앙에 오도록
            });
        }
    }, [startTime]);
    return (
        <div style={{ overflowY: "auto", backgroundColor: "#BCCCDC"}}>
            {messages?.map((m, idx) => {
                if (!m) return null; // m이 undefined인 경우 방어
                return (
                    <div key={m.chatId} ref={(el) => {
                        if (el) msgRefs.current[m.sendTime] = el;
                    }} onClick={() => onPick(m.sendTime)}
                    >
                        {m?.senderNickname === "system" ? (
                            systemOn && <SystemChatBubble message={m}/>
                        ) : m?.senderNickname === userInfo?.nickname ? (
                            <MyChatBubble message={m} formatTime={formatTime}/>
                        ) : (
                            <ChatBubble message={m} formatTime={formatTime}/>
                        )}

                    </div>
                );
            })}
            <div ref={bottomRef}/>
        </div>
    );
}
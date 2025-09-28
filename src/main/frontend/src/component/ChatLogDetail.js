import {useEffect, useMemo, useRef, useState} from "react";
import { Virtuoso } from "react-virtuoso";
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
    const virtuosoRef = useRef(null);
    const [atBottom, setAtBottom] = useState(true);

    // systemOn이 false면 시스템 메세지 걸러내기
    const visibleMessages = useMemo(() => {
        if(systemOn) return messages || [];
        return (messages || []).filter(m => m?.senderNickname !== "system");
    }, [messages, systemOn]);

    // sendTime으로 idx 매핑 => 특정 메세지 위치로 이동
    const idxBySendTime = useMemo(() => {
        const map = new Map();
        visibleMessages.forEach((m, i) => m?.sendTime && map.set(m.sendTime, i));
        return map;
    }, [visibleMessages]);

    // startTime에 대한 위치로 스크롤
    useEffect(() => {
        if (!startTime || !virtuosoRef.current) return;
        const idx = idxBySendTime.get(startTime);
        if (idx != null) {
            virtuosoRef.current.scrollToIndex({
                index: idx,
                align: "center",
                behavior:"smooth",
            });
        }
    }, [startTime, idxBySendTime]);

    return (
        <div style={{
            position: "relative",
            height: "100%",
            overflowY: "hidden", // Virtuoso 자체 스크롤 사용
            backgroundColor: "#BCCCDC",
        }}>
            <Virtuoso
                ref={virtuosoRef}
                data={visibleMessages}
                style={{height: "100%"}}
                followOutput="auto" // 스크롤 바닥으로 유지
                computeItemKey={(index, m) => m?.chatId ?? `${m?.sendTime ?? "unknown"}-${index}`}
                itemContent={(index, m) => {
                    if (!m) return null; // m이 undefined인 경우 방어

                    const isSystem = m?.senderNickname === "system";
                    const isMe = m?.senderNickname === userInfo?.nickname;

                    if (isSystem) {
                        return <div onClick={() => onPick(m.sendTime)}>
                                    <SystemChatBubble message={m}/>
                                </div>
                    }
                    return isMe ? (
                        <div onClick={() => onPick(m.sendTime)}>
                            <MyChatBubble message={m} formatTime={formatTime}/>
                        </div>
                    ) : (
                        <div onClick={() => onPick(m.sendTime)}>
                            <ChatBubble message={m} formatTime={formatTime}/>
                        </div>
                    );
                }}
                atBottomStateChange={setAtBottom}
            />
            {!atBottom && (
                <button className="scroll-btn" onClick={() => virtuosoRef.current.scrollToIndex({ index: messages.length - 1 })}>
                    최신 메시지 보기
                </button>
            )}
        </div>
    );
}
import ChatBubble from "./ChatBubble";
import MyChatBubble from "./MyChatBubble";
import ChatHeader from "./ChatHeader";
import api from "../api";
import {useEffect, useRef, useState} from "react";

// 오전 hh:mm 형태
const formatTime = (t) => {
    const d = new Date(t);
    const h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, "0");
    const ampm = h < 12 ? "오전" : "오후";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${ampm} ${h12}:${m}`;
}

export default function ChatLog ({ userInfo, roomId, roomName, participants, memberCount, messages, deleteChattingRoom }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth', block: 'end'});
    }, [messages.length]);

    return (
        <div className={"ChatLog_wrapper"}>
            <ChatHeader roomId={roomId} roomName={roomName} participants={participants} memberCount={memberCount}
                deleteChattingRoom={deleteChattingRoom} />
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
            </div>
            <div ref={bottomRef}/>
        </div>
    );
}
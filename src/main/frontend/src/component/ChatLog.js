import ChatBubble from "./ChatBubble";
import MyChatBubble from "./MyChatBubble";
import ChatHeader from "./ChatHeader";
import api from "../api";
import {useState} from "react";

export default function ChatLog ({userInfo, roomName, participants, memberCount, messages}) {

    return (
        <div className={"ChatLog_wrapper"}>
            <ChatHeader roomName={roomName} participants={participants} memberCount={memberCount}/>
            {messages.map((m, idx) => {
                return (
                    (m.senderNickname === 'system')
                        ? <div>{m.message}</div>
                        : (m.senderNickname === userInfo.nickname)
                            ? <MyChatBubble message={m} />
                            : <ChatBubble message={m}/>
                );
            })}
        </div>
    );
}
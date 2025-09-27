import ChatBubble from "./ChatBubble";
import MyChatBubble from "./MyChatBubble";
import ChatHeader from "./ChatHeader";
import api from "../api";
import {useEffect, useRef, useState} from "react";
import ChatLogDetail from "./ChatLogDetail";

export default function ChatLog ({ userInfo, roomId, roomName, participants, memberCount, messages, deleteChattingRoom }) {

    return (
        <div className={"ChatLog_wrapper"}>
            <ChatHeader roomId={roomId} roomName={roomName} participants={participants} memberCount={memberCount}
                deleteChattingRoom={deleteChattingRoom} />
            <ChatLogDetail userInfo={userInfo} messages={messages} onPick={() => {}}/>
        </div>
    );
}
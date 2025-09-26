import React, {useState} from "react";
import {type} from "@testing-library/user-event/dist/type";
import MyChatBubble from "./MyChatBubble";
import ChatBubble from "./ChatBubble";
import formatTime from "./ChatLog";
import ChatLogDetail from "./ChatLogDetail";

export default function SetContent ({userInfo, onNext, messages, end, start}) {
    const [startTime, setStartTime] = useState(start);
    const [endTime, setEndTime] = useState(end);


    console.log("setContent.js startTime: ", startTime);
    const handlePick = (sendTime) => {
    };

    return (
        <div className={"AddForm_wrapper"}>
            <p>Please select the scope of content to summarize</p>
            <ChatLogDetail userInfo={userInfo} messages={messages} startTime={startTime} endTime={endTime}/>
            <button onClick={() => onNext()}>Next</button>
        </div>
    );
}
import React, {useState} from "react";
import {type} from "@testing-library/user-event/dist/type";
import MyChatBubble from "./MyChatBubble";
import ChatBubble from "./ChatBubble";
import formatTime from "./ChatLog";
import ChatLogDetail from "./ChatLogDetail";

export default function SetContent ({userInfo, onNext, messages, end, start}) {
    const [startTime, setStartTime] = useState(start.split(".")[0]);
    const [endTime, setEndTime] = useState(end.split(".")[0]);

    console.log("setContent.js startTime: ", startTime);
    console.log("setContent.js endTime: ", endTime);

    const handlePick = (sendTime) => {
        // start 선택된 값이 없거나 / 둘다 채워진 상태면 starttime부터 다시 설정
        if (startTime === '' || (startTime !== '' && endTime !== '')) {
            setStartTime(sendTime.split(".")[0]);
            setEndTime('');
            return;
        }
        // start만 선택된 상태면 endtime설정, sendTime이 start보다 더 이전이면 바꿔저장
        if(startTime !== '' && endTime === '') {
            if(sendTime < startTime) {
                setEndTime(startTime);
                setStartTime(sendTime.split(".")[0]);
            } else {
                setEndTime(sendTime.split(".")[0]);
            }
        }
    };
    if (!messages || messages.length === 0) {
        return <div className="AddForm_wrapper">로딩 중...</div>;
    }
    return (
        <div className={"AddForm_wrapper"}>
            <p>Please select the scope of content to summarize</p>
            <div>
                <div>startting point: {startTime}</div>
                <div>ending point: {endTime}</div>
            </div>
            <ChatLogDetail userInfo={userInfo} messages={messages} startTime={startTime} endTime={endTime} onPick={handlePick}/>
            <button onClick={() => onNext(startTime, endTime)}>Next</button>
        </div>
    );
}
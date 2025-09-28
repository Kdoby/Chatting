import React, {useState} from "react";
import {type} from "@testing-library/user-event/dist/type";
import MyChatBubble from "./MyChatBubble";
import ChatBubble from "./ChatBubble";
import formatTime from "./ChatLog";
import ChatLogDetail from "./ChatLogDetail";

const fmtKR = (d, opts = {}) =>
    new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', ...opts }).format(d);

const dayName = (d) => ['일','월','화','수','목','금','토'][d.getDay()];

const datePart = (d) => `${d.getMonth()+1}월 ${d.getDate()}일(${dayName(d)})`;
const timePart = (d) => fmtKR(d, { hour: '2-digit', minute: '2-digit', hour12: false });

const formatRangeS = (startISO) => {
    const s = new Date(startISO);

    return `${datePart(s)} ${timePart(s)} → `;
};
const formatRange = (startISO, endISO) => {
    const s = new Date(startISO);
    const e = new Date(endISO);

    const sameDay = s.toDateString() === e.toDateString();

    if (sameDay) {
        return `${datePart(s)} ${timePart(s)}–${timePart(e)}`;
    }
    return `${datePart(s)} ${timePart(s)} → ${datePart(e)} ${timePart(e)}`;
};

export default function SetContent ({userInfo, onNext, messages, end, start, loading, onPrev}) {
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
            <p style={{ margin: "10px 0 0", }}>Please select the scope of content to summarize</p>
            <div>
                <div style={{ margin: "10px 0", fontWeight:"bold", }}
                >{endTime === '' ? formatRangeS(startTime) : formatRange(startTime, endTime)}</div>
            </div>
            <ChatLogDetail userInfo={userInfo} messages={messages} startTime={startTime} endTime={endTime} onPick={handlePick} systemOn={false}/>

            <div style={{display: "grid", gridTemplateColumns:"1fr 1fr", gap:"10px"}}>
                <button style={{  width:"100%", margin:"auto", padding:"8px",
                                  background:"white", border:"1px solid gray", borderRadius: "10px"}}
                        onClick={onPrev}>Prev</button>
                <button style={{  width:"100%", margin:"auto", padding:"8px",
                                  background:"white", border:"1px solid gray", borderRadius: "10px"}}
                        onClick={() => onNext(startTime, endTime)} disabled={loading || !startTime || !endTime}>Next</button>
            </div>
            {loading && (
                <div className="loaderOverlay" aria-live="polite" role="status">
                    <div className="loaderText">요약 생성 중...</div>
                </div>
            )}
        </div>
    );
}
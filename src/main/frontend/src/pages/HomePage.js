import Archive from '../archive/Archive';
import LeftHeader from "../component/LeftHeader";
import ChattingRoomView from "../chatting/ChattingRoomView";

import React, { useState } from 'react';

export default function HomePage({ type }) {
    const [leftType, setLeftType] = useState(type);
    return(
        <div style={{ display: "flex", width: "100%", height: "100vh" }}>
            <LeftHeader setLeftType={setLeftType} />

            { leftType === "archive" ? <Archive className={"chatting_wrapper"} /> : <></>}
            { leftType === "chatting" ? <ChattingRoomView /> : <></>}
        </div>
    );
}
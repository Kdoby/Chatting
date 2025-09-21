import Archive from '../archive/Archive';
import LeftHeader from "../component/LeftHeader";
import ChattingRoomView from "../chatting/ChattingRoomView";

import api from '../api';

import React, { useState, useEffect } from 'react';

export default function HomePage({ type }) {
    const [leftType, setLeftType] = useState(type);
    const [userInfo, setUserInfo] = useState('');

    // 유저 정보 조회
    const fetchUserInfo = async () => {
        try {
            const res = await api.get("/v1/member/me");

            //alert("userInfo 조회 상태: " +  res.data.message);
            setUserInfo(res.data.data); // 결과를 상태에 저장
        } catch (err) {
            console.error("검색 에러:", err);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, [])

    return(
        <div style={{ display: "flex", width: "100%", height: "100vh" }}>
            <LeftHeader setLeftType={setLeftType} userInfo={userInfo} />

            { leftType === "archive" ? <Archive className={"chatting_wrapper"} /> : <></>}
            { leftType === "chatting" ? <ChattingRoomView /> : <></>}
        </div>
    );
}
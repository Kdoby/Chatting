import Archive from '../archive/Archive';
import LeftHeader from "../component/LeftHeader";
import ChattingRoomView from "../chatting/ChattingRoomView";

import api from '../api';

import React, { useState, useEffect } from 'react';

export default function HomePage({ type }) {
    const [leftType, setLeftType] = useState(type);
    const [userInfo, setUserInfo] = useState('');
    const [roomId, setRoomId] = useState(null);
    const [myArchiveList, setMyArchiveList] = useState([]);

    // 유저 정보 조회
    const fetchUserInfo = async () => {
        try {
            const res = await api.get("/v1/member/me");
            console.log("유저정보 조회: ", userInfo);
            //alert("userInfo 조회 상태: " +  res.data.message);
            setUserInfo(res.data.data); // 결과를 상태에 저장
        } catch (err) {
            console.error("검색 에러:", err);
        }
    };

    // 내 아카이브 목록 조회
    const fetchMyArchive = async () => {
        try {
            const res = await api.get("/v1/archive/list");

            setMyArchiveList(res.data.data); // 결과를 상태에 저장
            console.log(res.data.data);
        } catch (err) {
            console.error("검색 에러:", err);
        }
    };

    // 채팅방 삭제
    const deleteChattingRoom = async() => {
        if( !window.confirm("채팅방을 나가시겠습니까?") ){
            return;
        }

        try {
            const res = await api.delete("/v1/chatroom/" + roomId);

            setLeftType("archive");
            console.log(res.data);
        } catch (err) {
            console.error("검색 에러:", err);
        }
    };

    useEffect(() => {
        fetchUserInfo();
        console.log("fetchMyArchive: ");
        fetchMyArchive();
    }, []);

    return(
        <div style={{ display: "flex", width: "100%", height: "100vh" }}>
            <LeftHeader leftType={leftType} setLeftType={setLeftType} userInfo={userInfo} setRoomId={setRoomId} fetchMyArchive={fetchMyArchive} roomId={roomId} />

            { leftType === "archive" ? <Archive className={"chatting_wrapper"} myArchiveList={myArchiveList} /> : <></>}
            { leftType === "chatting" ? <ChattingRoomView userInfo={userInfo} roomId={roomId} deleteChattingRoom={deleteChattingRoom} /> : <></>}
        </div>
    );
}
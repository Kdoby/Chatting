import api from '../api';

import React, { useState, useEffect, useRef } from "react";

export default function FriendList(){
    const [results, setResults] = useState([]);

    // 받은 친구 요청 조회
    const fetchReceivedFriendRequests = async () => {
        try {
            const res = await api.get("/v1/friend/requests/received");

            setResults(res.data); // 결과를 상태에 저장
        } catch (err) {
            console.error("검색 에러:", err);
        }
    };

    // 친구 요청 수락
    const approveFriendRequest = async (e) => {
        try {
            const res = await api.get("/api/v1/friend/", { addresseeNickname: e });

            setResults(res.data); // 결과를 상태에 저장
        } catch (err) {
            console.error("검색 에러:", err);
        }
    };

    return (
    <>
        <div className={"ChattingRoom_wrapper"}>
            <div className={"ChattingRoom_img"}>

            </div>
            <div className={"ChattingRoom_info"}>
                <div>'user'가 친구를 요청하였습니다.</div>
                <button onClick={(e) => approveFriendRequest(e.target.value)}>수락</button>
                <button>거절</button>
            </div>
        </div>
    </>
    );
}
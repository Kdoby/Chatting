import api from '../api';

import React, { useState, useEffect, useRef } from "react";

export default function FriendList(){
    const [alarmList, setAlarmList] = useState([]);

    // 받은 친구 요청 조회
    const fetchReceivedFriendRequests = async () => {
        try {
            const res = await api.get("/v1/friend/requests/received");
            console.log("받은 응답:", res.data);
            setAlarmList(res.data.data); // 결과를 상태에 저장
        } catch (err) {
            console.error("검색 에러:", err);
        }
    };

    // 친구 요청 수락
    const approveFriendRequest = async (e) => {
        try {
            const res = await api.post("/v1/friend/" + e);
            alert("친구 요청을 수락하였습니다.");
            fetchReceivedFriendRequests();
        } catch (err) {
            console.error("검색 에러:", err);
        }
    };

    useEffect(() => {
        fetchReceivedFriendRequests();
    }, [])

    return (
    <div style={{margin:"10px 5px"}}>
    {Array.isArray(alarmList) && alarmList.length > 0 ? (
        <div style={{ overflowY: "auto" }}>
            {alarmList.map((e) => (
            <>
                <div key={e.friendshipId} className="ChattingRoom_wrapper">
                    <div className="ChattingRoom_info">
                        <div style={{ fontSize: "15px" }}>
                            '{e.nickname}'가 친구를 요청하였습니다.
                            <br />
                            <span>
                                <button onClick={() => approveFriendRequest(e.friendshipId)}
                                        style={{ padding:"3px 8px", border:"1px solid gray", borderRadius:"5px",
                                                 backgroundColor: "white", cursor:"pointer", }}
                                >
                                    수락
                                </button>
                            </span>
                        </div>
                    </div>
                </div>

                <hr style={{ margin:"2px auto", width:"95%", color:"black" }}/>
            </>
            ))}
        </div>
    ) : (
        <div>not exist</div>
    )}
    </div>
    );
}
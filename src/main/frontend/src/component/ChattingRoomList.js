import ChattingRoom from "./ChattingRoom";
import AddChattingRoom from "./AddChattingRoom";
import api from'../api';

import React, {useEffect, useState} from "react";

export default function ChattingRoomList({ setLeftType, userInfo }){
    const [chattingList, setChattingList] = useState([]);
    const [showAddChattingRoom, setShowAddChattingRoom] = useState(false);

    // 채팅방 조회
    const fetchChattingList = async () => {
        try {
            const res = await api.get("/v1/chatroom/list");

            setChattingList(res.data.data); // 결과를 상태에 저장
            console.log(res.data.data);
        } catch (err) {
            console.error("검색 에러:", err);
        }
    };

    useEffect(() => {
        fetchChattingList();
    },[])

    return (
    <>
        <div>
            <button style={{width : "100%"}}
                    onClick={() => setShowAddChattingRoom(true)}
            >
                create chatting room
            </button>
            <ChattingRoom setLeftType={setLeftType}/>
            <ChattingRoom setLeftType={setLeftType}/>
            <ChattingRoom setLeftType={setLeftType}/>
        </div>

        {/* 조건부 렌더링 */}
        {showAddChattingRoom && (
            <AddChattingRoom
                onClose={() => setShowAddChattingRoom(false)}
                userInfo={userInfo}
            />
        )}
    </>

    );
}
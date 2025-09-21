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

            console.log(res.data.data);
            setChattingList(res.data.data); // 결과를 상태에 저장
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


            <div className="ChattingRoom_wrapper" onClick={() => setLeftType('chatting')}>
                <div className="ChattingRoom_img"></div>
                <div className="ChattingRoom_info">
                    <div>채팅방 이름</div>
                    <div>마지막 메세지...</div>
                </div>
            </div>

            {Array.isArray(chattingList) && chattingList.length > 0 ? (
                <div>
                    {chattingList.map((e) => (
                        <div key={e.roomId} className="ChattingRoom_wrapper" onClick={() => setLeftType('chatting')}>
                            <div className="ChattingRoom_img"></div>
                            <div className="ChattingRoom_info">
                                <div>{e.roomName}</div>
                                <div>마지막 메세지...</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>not exist</div>
            )}

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
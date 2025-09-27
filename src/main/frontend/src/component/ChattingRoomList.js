import AddChattingRoom from "./AddChattingRoom";

import api from'../api';

import React, {useEffect, useState} from "react";

export default function ChattingRoomList({ leftType, setLeftType, userInfo, setRoomId }){
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
    },[]);

    useEffect(() => {
        fetchChattingList();
    }, [leftType])

    useEffect(() => {
        if(!showAddChattingRoom){
            fetchChattingList();
        }
    }, [showAddChattingRoom])

    return (
    <>
        <button style={{ width : "90%", margin:"10px auto", padding:"7px", background:"white",
                         border: "1px solid gray", borderRadius:"10px",
                         boxShadow: "0 0 4px rgba(0,0,0,0.2)", }}
                onClick={() => setShowAddChattingRoom(true)}
        >
            Create Chatting Room
        </button>

        {Array.isArray(chattingList) && chattingList.length > 0 ? (
        <div style={{ overflowY: "auto" }}>
            {chattingList.map((e) => (
            <>
                <div key={e.roomId}
                     className="ChattingRoom_wrapper"
                     onClick={() => {
                        setLeftType('chatting');
                        setRoomId(e.roomId);
                        }}
                     style={{ cursor: "pointer" }}
                >
                    <div className="ChattingRoom_img"></div>
                    <div className="ChattingRoom_info"
                         style={{display:"grid", fridTemplateRows:"1fr 1fr"}}>
                        <div>
                            <span style={{ fontSize:"19px", fontWeight:"bold" }}>{e.roomName} </span>
                            <span style={{ fontSize:"13px" }}>({e.memberCount})</span>
                        </div>
                        <div>
                        {e.members.map((em) => (
                            <span style={{ fontSize:"15px" }}>{em} </span>
                        ))}
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
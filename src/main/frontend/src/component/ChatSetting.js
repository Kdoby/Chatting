import AddChattingRoomMember from "./AddChattingRoomMember";

import React, { useState } from "react";

export default function ChatSetting ({ roomId, roomName, participants, memberCount, onClose, deleteChattingRoom, userInfo }) {
    const [showAddChattingRoomMember, setShowAddChattingRoomMember] = useState(false);

    return (
        <div className="AddChattingRoom">
            <div style={{
                position: "relative", border: "1px solid gray", padding: "10px",
                borderRadius: "15px", backgroundColor: "#F8FAFC",
                width: "40%", height: "80%", textAlign: "center",
            }}>
                {/* 닫기 버튼 */}
                <img
                    src="images/close2.png"
                    onClick={() => onClose(false)}
                    style={{
                        width: "20px", position: "absolute", top: "20px", right: "28px",
                        cursor: "pointer",
                    }}
                />

                {/* 내용 */}
                <div style={{
                    height: "100%", maxHeight: "100%", width: "100%",
                    textAlign: "left", boxSizing: "border-box",
                    padding: "45px 20px 20px",
                    display: "flex", flexDirection: "column",
                }}>
                    <div style={{ textAlign: "center", fontSize: "25px", fontWeight: "bold", marginBottom:"20px" }}>Setting</div>

                    <div style={{ display:"grid", gridTemplateColumns:"1fr 3fr", gap: "20px",
                                  width:"100%", }}>
                        <div>채팅방 이름</div>
                        <div>{roomName}</div>
                        <div>채팅방 멤버</div>
                        <div>
                            {participants.map((e) => (
                                <span key={e}>{e} </span>
                            ))}
                        </div>
                        <div>채팅방 인원</div>
                        <div>{memberCount}</div>
                        <br />

                        <div style={{ gridColumn: "1 / span 2",}}>
                            <button style={{ width: "100%", borderRadius: "5px", padding:"8px",
                                             backgroundColor:"#D9EAFD", border:"1px solid black",
                                             boxShadow: "0 0 4px rgba(0,0,0,0.2)", cursor:"pointer", }}
                                     onClick={() => { console.log("클릭됨"); setShowAddChattingRoomMember(true);}}
                            >
                                친구 초대하기
                            </button>
                        </div>
                        <div style={{ gridColumn: "1 / span 2",}}>
                            <button style={{ width: "100%", borderRadius: "5px", padding:"8px",
                                             backgroundColor:"#9AA6B2", border:"1px solid black",
                                             boxShadow: "0 0 4px rgba(0,0,0,0.2)", cursor:"pointer", }}
                                    onClick={() => deleteChattingRoom()}
                            >
                                채팅방 나가기
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            { showAddChattingRoomMember &&
                <AddChattingRoomMember
                    onClose={() => { setShowAddChattingRoomMember(false); onClose(false); }}
                    userInfo={userInfo}
                    participants={participants}
                    roomId={roomId}
                />}
        </div>
    );
}
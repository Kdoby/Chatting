import './AddChattingRoom.css';

import api from '../api';

import React, { useEffect, useState } from "react";

export default function AddChattingRoomMember({ onClose, userInfo, participants, roomId }) {
    const [friendsList, setFriendsList] = useState([]);
    const [chattingRoomMemberList, setChattingRoomMemberList] = useState([]);

    // 친구 리스트 조회
    const fetchFriendList = async () => {
        try {
            const res = await api.get("/v1/friend/list/" + userInfo.nickname);
            setFriendsList(res.data.data || []); // 결과를 상태에 저장
        } catch (err) {
            console.error("검색 에러:", err);
        }
    };

    useEffect(() => {
        if (!userInfo) return;
        console.log(userInfo);
        fetchFriendList();
    }, [userInfo]);

    // 체크박스 선택 처리
    const handleCheckboxChange = (friendId, nickname, checked) => {
        if (checked) {
            setChattingRoomMemberList((prev) => [
                ...prev,
                { friendId, nickname }
            ]);
        } else {
            setChattingRoomMemberList((prev) =>
                prev.filter((f) => f.friendId !== friendId)
            );
        }
    };

    // 채팅방에 친구 초대하기
    const createRoom = async () => {
        if( !chattingRoomMemberList || chattingRoomMemberList.length < 1 ) {
            alert("채팅방에 초대할 친구를 선택하세요.");
            return;
        }

        const friendIdList = chattingRoomMemberList.map(m => m.friendId);
        try {
            const res = await api.post("/v1/chatroom/" + roomId, { participantsId: friendIdList });

            console.log(res.data.message);
            alert(res.data.message);

            onClose(false);
        } catch (err) {
            console.error("검색 에러:", err);
            alert(err);
        }
    };

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
                    {/* 선택된 닉네임 표시 */}
                    <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
                        선택됨:
                        {chattingRoomMemberList.length > 0 && (
                        <span>
                            {chattingRoomMemberList.map((m) => m.nickname).join(", ")}
                        </span>
                        )}
                    </div>


                    {Array.isArray(friendsList) && friendsList.length > 0 ? (
                        <div style={{ overflowY: "auto" }}>
                            {friendsList
                                // participants 에 없는 친구만 필터링
                                .filter((f) => !participants.includes(f.friendNickname))
                                .map((e) => (
                                    <div
                                        key={e.friendId}
                                        className={"ChattingRoom_wrapper"}
                                        style={{ gridTemplateColumns: "auto auto 9fr" }}
                                    >
                                        <input type="checkbox"
                                               onChange={(event) => handleCheckboxChange(e.friendId, e.friendNickname, event.target.checked)}
                                               style={{margin:"0 10px 0 0"}}
                                        />

                                        <div className={"ChattingRoom_img"} style={{ backgroundColor: "#BCCCDC" }} />
                                        <div className={"ChattingRoom_info"}>
                                            <div style={{margin:"auto 0"}}>{e.friendNickname}</div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div>모든 친구가 채팅방에 존재합니다</div>
                    )}

                    <button style={{ margin: "auto 0 0", padding:"8px", border: "1px solid black",
                                     borderRadius: "8px", backgroundColor:"#D9EAFD", boxShadow: "0 0 4px rgba(0,0,0,0.2)", }}
                            onClick={() => createRoom()}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}

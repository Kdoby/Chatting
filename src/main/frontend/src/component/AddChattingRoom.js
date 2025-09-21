import './AddChattingRoom.css';

import api from '../api';

import React, { useEffect, useState } from "react";

export default function AddChattingRoom({ onClose, userInfo }) {
    const [friendsList, setFriendsList] = useState([]);
    const [chattingRoomMemberList, setChattingRoomMemberList] = useState([]);
    const [roomName, setRoomName] = useState('');
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

    // 친구 리스트 조회
    const createRoom = async () => {
        if( !roomName ) {
            alert("채팅방 이름을 작성하세요.");
            return;
        }
        if( !chattingRoomMemberList ) {
            alert("채팅방을 만들 친구를 선택하세요.");
            return;
        }

        const friendIdList = chattingRoomMemberList.map(m => m.friendId);

        console.log(roomName, friendIdList);
        try {
            const res = await api.post("/v1/chatroom", {
                roomName: roomName,
                participantsId: friendIdList
            });

            console.log(res.data.message);
        } catch (err) {
            console.error("검색 에러:", err);
        }
    };

    return (
        <div className="AddChattingRoom">
            <div style={{
                position: "relative", border: "1px solid gray", padding: "10px",
                borderRadius: "15px", backgroundColor: "white",
                width: "40%", height: "80%", textAlign: "center",
            }}>
                {/* 닫기 버튼 */}
                <img
                    src="images/close.png"
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
                    <div>채팅방 이름</div>
                    <input onChange={(e) => setRoomName(e.target.value)}></input>

                    <br />

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
                            {friendsList.map((e) => (
                                <div
                                    key={e.friendId}
                                    className={"ChattingRoom_wrapper"}
                                    style={{ gridTemplateColumns: "auto auto 9fr" }}
                                >
                                    <input
                                        type="checkbox"
                                        onChange={(event) =>
                                            handleCheckboxChange(
                                                e.friendId,
                                                e.friendNickname,
                                                event.target.checked
                                            )
                                        }
                                    />
                                    <div className={"ChattingRoom_img"} style={{ backgroundColor: "gray" }} />
                                    <div className={"ChattingRoom_info"}>
                                        <div>{e.friendNickname}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>not exist</div>
                    )}

                    <button style={{ margin: "auto 0 0" }}
                            onClick={() => createRoom()}
                    >
                        create
                    </button>
                </div>
            </div>
        </div>
    );
}

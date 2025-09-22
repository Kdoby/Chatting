import '../chatting/Chatting.css';

import api from '../api';

import React, { useState, useEffect } from "react";

export default function FriendList({ userInfo }){
    const [searchInput, setSearchInput] = useState('');
    const [results, setResults] = useState([]);
    const [friendsList, setFriendsList] = useState([]);

    // 친구 추가 요청 보내기
    const handleSearch = async () => {
        try {
            const res = await api.post("/v1/friend", { addresseeNickname: searchInput });

            alert(res.data.data);
            setResults(res.data);
        } catch (err) {
            alert(err.response.data.message);
            console.error("검색 에러:", err);
        }
    };

    // 친구 리스트 조회
    const fetchFriendList = async () => {
        console.log(userInfo.nickname);
        try {
            const res = await api.get("/v1/friend/list/" + userInfo.nickname);

            setFriendsList(res.data.data); // 결과를 상태에 저장
            console.log(res.data.data);
        } catch (err) {
            console.error("검색 에러:", err);
        }
    };

    useEffect(() => {
        if( !userInfo ) { return; }
        fetchFriendList();
    }, [userInfo]);

    return (
    <>
        <div style={{ height: "30px", margin:"10px 0",
                      display: "grid", gridTemplateColumns: "4fr 1fr",
                      backgroundColor: "white" }}>
            <div>
                <input value={searchInput} placeholder="친구 요청"
                       onChange={(e) => setSearchInput(e.target.value)}
                       style={{ width: "80%", padding: "5px 10px", borderWidth: "0", outline: "none" }}
                />
            </div>
            <button onClick={() => handleSearch()}>send</button>
        </div>




        {friendsList ? (
            <div>
            {Array.isArray(friendsList) && friendsList.map((e) => (
                <div key={e.friendId}
                     className={"ChattingRoom_wrapper"}>
                    <div className={"ChattingRoom_img"}>

                    </div>
                    <div className={"ChattingRoom_info"}>
                        <div>{e.friendNickname}</div>
                    </div>
                </div>
            ))}

            </div>
        ) : ( <div>not exist</div> )}
    </>
    );
}

//
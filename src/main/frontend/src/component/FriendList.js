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
        <div style={{ height: "30px", margin:"10px 0", padding:"5px 10px",
                      display: "grid", gridTemplateColumns: "4fr 1fr",
                      backgroundColor: "white" }}>
            <input value={searchInput} placeholder="친구 요청"
                   onChange={(e) => setSearchInput(e.target.value)}
                   style={{ width: "100%", borderWidth: "0", outline: "none", }}
            />
            <button onClick={() => handleSearch()}
                    style={{ border:"1px solid gray", borderRadius:"7px", background:"white",
                             boxShadow: "0 0 4px rgba(0,0,0,0.2)", }}
            >send</button>
        </div>

        {friendsList ? (
            <div style={{ overflowY: "auto" }}>
            {Array.isArray(friendsList) && friendsList.map((e) => (
            <>
                <div key={e.friendId}
                     className={"ChattingRoom_wrapper"}>
                    <div className={"ChattingRoom_img"} style={{ background: "#F8FAFC" }}></div>

                    <div className={"ChattingRoom_info"}>
                        <div style={{margin:"auto 0"}}>{e.friendNickname}</div>
                    </div>
                </div>

                <hr style={{ margin:"2px auto", width:"95%", color:"black" }}/>
            </>
            ))}

            </div>
        ) : ( <div>not exist</div> )}
    </>
    );
}

//
import api from '../api';

import React, { useState  } from "react";

export default function FriendList(){
    const [searchInput, setSearchInput] = useState('');
    const [results, setResults] = useState([]);
    const [friendsList, setFriendsList] = useState([]);

    // 검색 실행 함수
    const handleSearch = async () => {
        try {
            const res = await api.get("/v1/friend", { addresseeNickname: searchInput });

            setResults(res.data); // 결과를 상태에 저장
        } catch (err) {
            console.error("검색 에러:", err);
        }
    };

    // 친구 리스트 조회
    const fetchFriendList = async () => {
        try {
            const res = await api.get("/v1/friend/list");

            setFriendsList(res.data); // 결과를 상태에 저장
        } catch (err) {
            console.error("검색 에러:", err);
        }
    };

    return (
    <>
        <div>
            <form
                onSubmit={handleSearch}
                style={{ height: "30px", margin:"10px 0",
                         display: "grid", gridTemplateColumns: "4fr 1fr",
                         backgroundColor: "white" }}
            >
                <div>
                    <input value={searchInput} placeholder="친구 요청"
                           onChange={(e) => setSearchInput(e.target.value)}
                           style={{ width: "80%", padding: "5px 10px", borderWidth: "0", outline: "none" }}
                    />
                </div>
                <button>send</button>
            </form>
        </div>


        <div className={"ChattingRoom_wrapper"}>
            <div className={"ChattingRoom_img"}>

            </div>
            <div className={"ChattingRoom_info"}>
                <div>친구 이름</div>
            </div>
        </div>
    </>
    );
}
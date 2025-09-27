import EditArchive from "./EditArchive";
import ArchiveDetail from "../archive/ArchiveDetail";

import './AddChattingRoom.css';
import '../chatting/Chatting.css';

import api from '../api';

import React, { useState, useEffect } from "react";

export default function ChatDrawer ({ roomId, onClose }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 0=닫힘, 1=수정
    const [chattingRoomArchiveList, setChattingRoomArchiveList] = useState([]);
    const [showArchiveDetail, setShowArchiveDetail] = useState(false);
    const [archiveId, setArchiveId] = useState('');
    const [selectedArchive, setSelectedArchive] = useState([]);

    // 아카이브 삭제 -> 아직 연결 안 함
    const deleteArchive = async () => {
        try {
            const res = await api.get("/v1/friend/list/");

            console.log(res.data.data);
        } catch (err) {
            console.error("검색 에러:", err);
        }
    };

    // 채팅방의 아카이브 fetch
    const fetchChattingRoomArchiveList = async() => {
        try {
            const res = await api.get("/v1/archive/" + roomId);

            setChattingRoomArchiveList(res.data.data);
            console.log(res.data.data);
        } catch (err) {
            console.error("에러", err);
        }
    }

    useEffect(() => {
        if(!roomId) return;

        fetchChattingRoomArchiveList();
    }, [roomId]);

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
                    <div style={{ textAlign: "center", fontSize: "25px", fontWeight: "bold", marginBottom:"20px" }}>Archive</div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                                  gap: "10px", margin: "10px", overflowY: "scroll", }}>
                        {chattingRoomArchiveList ? (
                            <>
                            {Array.isArray(chattingRoomArchiveList) && chattingRoomArchiveList.map((e) => (
                                <div key={e.archiveId}
                                     style={{ border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left", }}
                                     onClick={() => setSelectedArchive(e)}
                                >
                                    <div style={{ aspectRatio: "1/1", border: "1px solid black", display: "flex",
                                                  justifyContent: "center", alignItems: "center", textAlign: "center",
                                         }}
                                         onClick={() => {
                                            setArchiveId(e.archiveId);
                                            setShowArchiveDetail(true);
                                         }}
                                    >
                                        <img src={`http://localhost:8080${e.thumbnailImage}`}
                                             style={{ width:"100%", height:"100%", objectFit: "contain", }} />
                                    </div>
                                    <div style={{ marginTop: "5px" }}>
                                        <div style={{ fontSize: "14px", display: "flex", alignItems: "center", position: "relative" }}>
                                            <span style={{ fontSize: "13px", color:"gray", }}>{new Date(e.createdAt).toLocaleDateString()}</span>

                                            <div style={{ marginLeft: "auto", position: "relative" }}>
                                                <span style={{ cursor: "pointer" }}>set</span>

                                                <div className="ChatDrawerDropdownMenu_wrapper">
                                                    <ul>
                                                        <li onClick={() => setModalType(1)}>수정</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ fontSize: "15px", fontWeight:"bold" }}>{e.title}</div>
                                    </div>
                                </div>
                            ))}

                            </>
                        ) : ( <div>not exist</div> )}


                    </div>
                </div>
            </div>

            {modalType === 1 && (
                <EditArchive
                    onClose={() => setModalType(0)}
                    selectedArchive={selectedArchive}
                    setSelectedArchive={setSelectedArchive}
                    fetchChattingRoomArchiveList={fetchChattingRoomArchiveList}
                />
            )}

            {/* 조건부 렌더링 */}
            {showArchiveDetail && (
                <ArchiveDetail
                    onClose={() => setShowArchiveDetail(false)}
                    setArchiveId={setArchiveId}
                    archiveId={archiveId}
                />
            )}
        </div>
    );
}
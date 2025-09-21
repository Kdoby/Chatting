import EditArchive from "./EditArchive";

import './AddChattingRoom.css';
import '../chatting/Chatting.css';

import api from '../api';

import React, { useState } from "react";

export default function ChatDrawer ({ onClose }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 0=닫힘, 1=수정

    // 아카이브 삭제 -> 아직 연결 안 함
    const deleteArchive = async () => {
        try {
            const res = await api.get("/v1/friend/list/");

            console.log(res.data.data);
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
                    <div style={{ textAlign: "center", fontSize: "25px", fontWeight: "bold", marginBottom:"20px" }}>Archive</div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                                  gap: "10px", margin: "10px", overflowY: "scroll", }}>
                        <div style={{ border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left", }}>
                            <div style={{ aspectRatio: "1/1", width: "100%", margin: "auto  0", border: "1px solid black", }}></div>
                            <div style={{ marginTop: "5px" }}>
                                <div style={{ fontSize: "15px", display: "flex", alignItems: "center", position: "relative" }}>
                                    <span>2025.09.15</span>

                                    <div style={{ marginLeft: "auto", position: "relative" }}>
                                        <span style={{ cursor: "pointer" }}>set</span>

                                        <div className="ChatDrawerDropdownMenu_wrapper">
                                            <ul>
                                                <li onClick={() => setModalType(1)}>수정</li>
                                                <li onClick={() => setModalType(2)}>삭제</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ fontSize: "20px", fontWeight:"bold" }}>부산 여행~</div>
                            </div>
                        </div>
                        <div style={{ border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left", }}>
                            <div style={{ aspectRatio: "1/1", width: "100%", margin: "auto  0", border: "1px solid black", }}></div>
                            <div style={{ marginTop: "5px" }}>
                                <div style={{ fontSize: "15px", display: "flex", alignItems: "center", position: "relative" }}>
                                    <span>2025.09.15</span>

                                    <div style={{ marginLeft: "auto", position: "relative" }}>
                                        <span style={{ cursor: "pointer" }}>set</span>

                                        <div className="ChatDrawerDropdownMenu_wrapper">
                                            <ul>
                                                <li onClick={() => setModalType(1)}>수정</li>
                                                <li onClick={() => deleteArchive()}>삭제</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ fontSize: "20px", fontWeight:"bold" }}>부산 여행~</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {modalType === 1 && (<EditArchive onClose={() => setModalType(0)}/>)}
        </div>
    );
}
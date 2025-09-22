import './AddChattingRoom.css';
import '../chatting/Chatting.css';

import React, { useState } from "react";

export default function ChatPhotoAlbumDetail ({ onClose }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 0=닫힘, 1=수정

    return (
        <div className="AddChattingRoom"
             style={{backgroundColor: "rgba(0,0,0,0)"}}>
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
                    padding: "0 20px 20px",
                    display: "flex", flexDirection: "column",
                }}>
                    <div style={{
                        height: "100%",           // 부모 높이를 꽉 채움
                        maxHeight: "100%",        // 최대 높이 제한
                        width: "100%",
                        textAlign: "left",
                        boxSizing: "border-box",
                        padding: "45px 20px 20px",
                        display: "flex",
                        flexDirection: "column",
                    }}>

                        <div style={{ width: "100%", height: "80%", backgroundColor: "gray", flexShrink: 0 }} />
                        <br/>
                        <div>
                            Photo Info: 2025-09-20
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
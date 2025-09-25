import './AddChattingRoom.css';
import '../chatting/Chatting.css';

import api from '../api';
import React, { useState, useEffect } from "react";

export default function EditArchive ({ onClose, selectedArchive, setSelectedArchive, fetchChattingRoomArchiveList }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 0=닫힘, 1=수정
    const [archiveTitle, setArchiveTitle] = useState('');
    const [archiveContent, setArchiveContent] = useState('');

    // 아카이브 내용 조회
    const EditArchive = async () => {
        //console.log(selectedArchive.archiveId, archiveTitle, archiveContent);
        try {
            const res = await api.put("/v1/archive", {
                archiveId: selectedArchive.archiveId,
                title: archiveTitle,
                content: archiveContent
            });

            alert(res.data.data);
            fetchChattingRoomArchiveList();
            onClose(false);
        } catch (err) {
            console.error("검색 에러:", err);
        }
    };

    // 아카이브 내용 조회
    const deleteArchive = async () => {
        try {
            const res = await api.put("/v1/archive", {
                archiveId: selectedArchive.archiveId,
                title: archiveTitle,
                content: archiveContent
            });

            alert(res.data.data);
            fetchChattingRoomArchiveList();
            onClose(false);
        } catch (err) {
            console.error("검색 에러:", err);
        }
    };

    useEffect(() => {
        setArchiveContent(selectedArchive.content);
        setArchiveTitle(selectedArchive.title);
    }, [selectedArchive]);


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
                    onClick={() => {
                        setSelectedArchive([]);
                        onClose(false);
                    }}
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
                        <div style={{ width: "100%", height: "50%", border: "1px solid black", flexShrink: 0 }}>
                            {selectedArchive?.images?.length > 0 && (
                                <img src={`http://localhost:8080${selectedArchive.images[0]}`}
                                     alt={selectedArchive.images[0]}
                                     style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                />
                            )}
                        </div>


                        <div style={{ margin: "20px 0 10px", flexShrink: 0, fontSize: "15px", color:"gray" }}>
                            {selectedArchive.createdAt}
                        </div>

                        <div>
                            <input
                                style={{width: "97%", fontSize: "19px", fontWeight:"bold", margin:"0 0 10px 0"}}
                                defaultValue={archiveTitle}
                                onChange={(e) => setArchiveTitle(e.target.value)}
                            />
                        </div>

                        <div style={{ overflowY: "auto", flexGrow: 1, fontSize: "15px" }}>
                            <textarea
                                style={{ width:"97%", height: "90%", overflowY: "auto", flexGrow: 1, fontSize: "15px" }}
                                defaultValue={archiveContent}
                                onChange={(e) => setArchiveContent(e.target.value)}
                            />

                        </div>

                        <button style={{width: "20%", margin:"auto"}}
                                onClick={() => EditArchive()} >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
import './AddChattingRoom.css';
import '../chatting/Chatting.css';

import api from '../api';
import React, { useState, useEffect } from "react";

export default function EditArchive ({ onClose, selectedArchive, setSelectedArchive, fetchChattingRoomArchiveList }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 0=닫힘, 1=수정
    const [archiveTitle, setArchiveTitle] = useState('');
    const [archiveContent, setArchiveContent] = useState('');

    // 아카이브 수정
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

    useEffect(() => {
        setArchiveContent(selectedArchive.content);
        setArchiveTitle(selectedArchive.title);
    }, [selectedArchive]);


    return (
        <div className="AddChattingRoom"
             style={{backgroundColor: "rgba(0,0,0,0)"}}>
            <div style={{
                position: "relative", border: "1px solid gray", padding: "10px",
                borderRadius: "15px", backgroundColor: "#F8FAFC",
                width: "40%", height: "80%", textAlign: "center",
            }}>
                {/* 닫기 버튼 */}
                <img
                    src="images/close2.png"
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
                        height: "100%", maxHeight: "100%", width: "100%", textAlign: "left",
                        boxSizing: "border-box", padding: "45px 20px 20px",
                        display: "flex", flexDirection: "column",
                    }}>
                        <div style={{ width: "100%", height: "50%", border: "1px solid black",
                                      borderRadius:"15px", overflow: "hidden",
                                      flexShrink: 0, backgroundColor: "white" }}>
                            {selectedArchive.thumbnailImage && (
                                <img src={`http://localhost:8080${selectedArchive.thumbnailImage}`}
                                     alt={selectedArchive.thumbnailImage}
                                     style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                />
                            )}
                        </div>


                        <div style={{ margin: "20px 0 10px", flexShrink: 0, fontSize: "15px", color:"gray" }}>
                            createdAt. {new Date(selectedArchive.createdAt).toLocaleDateString()}
                        </div>

                        <div>
                            <input style={{ width: "96%", fontSize: "19px", fontWeight:"bold", margin:"0 0 10px 0",
                                            padding:"5px 10px", border:"1px solid gray", borderRadius:"5px", }}
                                   defaultValue={archiveTitle}
                                   onChange={(e) => setArchiveTitle(e.target.value)}
                            />
                        </div>

                        <div style={{ overflowY: "auto", flexGrow: 1, fontSize: "15px" }}>
                            <textarea
                                style={{ width:"96%", height: "80%", overflowY: "auto", flexGrow: 1, fontSize: "15px",
                                         padding:"5px 10px", border:"1px solid gray", borderRadius:"5px", resize: "none", }}
                                defaultValue={archiveContent}
                                onChange={(e) => setArchiveContent(e.target.value)}
                            />

                        </div>

                        <br/>
                        <button style={{ margin: "auto 0 0", padding:"8px", border:"1px solid black",
                                         borderRadius: "8px", backgroundColor:"#D9EAFD", }}
                                onClick={() => EditArchive()}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
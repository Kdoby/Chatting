import ChatPhotoAlbumDetail from './ChatPhotoAlbumDetail';

import api from '../api';
import React, { useEffect, useState } from "react";

export default function ChatPhotoAlbum ({ roomId, onClose }) {
    const [imgList, setImgList] = useState([]);
    const [showChatPhotoAlbumDetail, setShowChatPhotoAlbumDetail] = useState(false);
    const [chattingRoomPhotoList, setChattingRoomPhotoList] = useState([]);

    // 채팅방의 사진 fetch
    const fetchChattingRoomArchiveList = async() => {
        try {
            const res = await api.get("/v1/chat/images/" + roomId);

            setChattingRoomPhotoList(res.data.data);
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
                    onClick={() => onClose()}
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
                    <div style={{ textAlign: "center", fontSize: "25px", fontWeight: "bold", marginBottom:"20px" }}>Photo</div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                                  gap: "10px", margin: "10px", overflowY: "scroll", }}>

                        {chattingRoomPhotoList ? (
                            <>
                            {Array.isArray(chattingRoomPhotoList) && chattingRoomPhotoList.map((e) => (
                                <div key={e.imageId}
                                     style={{ aspectRatio: "1/1", border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left" }}
                                     onClick={() => setShowChatPhotoAlbumDetail(true)}>
                                    <img src={`http://localhost:8080${e.imagePath}`}
                                         style={{width: "100%"}}
                                    />
                                </div>
                            ))}

                            </>
                        ) : ( <div>not exist</div> )}


                    </div>
                </div>
            </div>
            {/* 조건부 렌더링 */}
            {showChatPhotoAlbumDetail && (
                <ChatPhotoAlbumDetail
                    onClose={() => setShowChatPhotoAlbumDetail(false)}
                />
            )}
        </div>
    );
}
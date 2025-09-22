import ChatPhotoAlbumDetail from './ChatPhotoAlbumDetail';

import React, {useState} from "react";

export default function ChatPhotoAlbum ({onClose}) {
    const [imgList, setImgList] = useState([]);
    const [showChatPhotoAlbumDetail, setShowChatPhotoAlbumDetail] = useState(false);


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
                        <div style={{ aspectRatio: "1/1", border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left" }}
                             onClick={() => setShowChatPhotoAlbumDetail(true)}
                        >
                        </div>
                        <div style={{ aspectRatio: "1/1", border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left" }}
                             onClick={() => setShowChatPhotoAlbumDetail(true)}
                        ></div>
                        <div style={{ aspectRatio: "1/1", border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left" }}
                             onClick={() => setShowChatPhotoAlbumDetail(true)}
                        ></div>
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
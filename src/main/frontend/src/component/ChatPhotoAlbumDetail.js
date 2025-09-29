import './AddChattingRoom.css';
import '../chatting/Chatting.css';

import React from "react";

export default function ChatPhotoAlbumDetail ({ onClose, selectedImagePath }) {
    console.log(selectedImagePath);

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
                    <div style={{ height: "100%", maxHeight: "100%", width: "100%",
                                  textAlign: "left", boxSizing: "border-box", padding: "45px 20px 20px",
                                  display: "flex", flexDirection: "column",
                    }}>

                        <div style={{ width: "100%", height: "100%", flexShrink: 0,
                                      aspectRatio: "1/1", borderRadius:"15px", overflow: "hidden", display: "flex",
                                      justifyContent: "center", alignItems: "center", textAlign: "center",}}
                        >
                            <img src={`http://localhost:8080${selectedImagePath}`}
                                 style={{ width:"100%", height:"100%", objectFit: "contain", }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
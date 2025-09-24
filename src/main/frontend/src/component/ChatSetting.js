import React from "react";

export default function ChatSetting ({ roomId, onClose }) {

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
                    <div style={{ textAlign: "center", fontSize: "25px", fontWeight: "bold", marginBottom:"20px" }}>Setting</div>

                    <div style={{ display:"grid", gridTemplateColumns:"1fr 3fr", gap: "20px",
                                  width:"100%", }}>
                        <div>채팅방 이름</div>
                        <div>name</div>
                        <div>채팅방 인원</div>
                        <div>setting</div>

                        <button style={{ gridColumn: "1 / span 2",
                                         width: "100%", borderRadius: "5px",
                                         padding:"5px"}}>
                            친구 초대하기
                        </button>

                        <button style={{ gridColumn: "1 / span 2",
                                         width: "100%", backgroundColor:"red", color:"white", borderRadius: "5px",
                                         padding:"5px"}}>
                            채팅방 나가기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
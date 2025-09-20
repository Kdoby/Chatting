import React from "react";

import './AddChattingRoom.css';

export default function ChatDrawer ({ onClose }) {

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

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                  gap: "10px", margin: "10px", overflowY: "scroll", }}>
                        <div style={{ border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left", }}>
                            <div style={{ aspectRatio: "1/1", width: "100%", margin: "auto  0", border: "1px solid black", }}></div>
                            <div style={{ marginTop: "5px" }}>
                                <div style={{ fontSize: "15px" }}>2025.09.15</div>
                                <div style={{ fontSize: "20px", fontWeight:"bold" }}>부산 여행~</div>
                            </div>
                        </div>
                        <div style={{ border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left", }}>
                            <div style={{ aspectRatio: "1/1", width: "100%", margin: "auto  0", border: "1px solid black", }}></div>
                            <div style={{ marginTop: "5px" }}>
                                <div style={{ fontSize: "15px" }}>2025.09.15</div>
                                <div style={{ fontSize: "20px", fontWeight:"bold" }}>부산 여행~</div>
                            </div>
                        </div>
                        <div style={{ border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left", }}>
                            <div style={{ aspectRatio: "1/1", width: "100%", margin: "auto  0", border: "1px solid black", }}></div>
                            <div style={{ marginTop: "5px" }}>
                                <div style={{ fontSize: "15px" }}>2025.09.15</div>
                                <div style={{ fontSize: "20px", fontWeight:"bold" }}>부산 여행~</div>
                            </div>
                        </div>
                        <div style={{ border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left", }}>
                            <div style={{ aspectRatio: "1/1", width: "100%", margin: "auto  0", border: "1px solid black", }}></div>
                            <div style={{ marginTop: "5px" }}>
                                <div style={{ fontSize: "15px" }}>2025.09.15</div>
                                <div style={{ fontSize: "20px", fontWeight:"bold" }}>부산 여행~</div>
                            </div>
                        </div>
                        <div style={{ border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left", }}>
                            <div style={{ aspectRatio: "1/1", width: "100%", margin: "auto  0", border: "1px solid black", }}></div>
                            <div style={{ marginTop: "5px" }}>
                                <div style={{ fontSize: "15px" }}>2025.09.15</div>
                                <div style={{ fontSize: "20px", fontWeight:"bold" }}>부산 여행~</div>
                            </div>
                        </div>
                        <div style={{ border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left", }}>
                            <div style={{ aspectRatio: "1/1", width: "100%", margin: "auto  0", border: "1px solid black", }}></div>
                            <div style={{ marginTop: "5px" }}>
                                <div style={{ fontSize: "15px" }}>2025.09.15</div>
                                <div style={{ fontSize: "20px", fontWeight:"bold" }}>부산 여행~</div>
                            </div>
                        </div>
                        <div style={{ border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left", }}>
                            <div style={{ aspectRatio: "1/1", width: "100%", margin: "auto  0", border: "1px solid black", }}></div>
                            <div style={{ marginTop: "5px" }}>
                                <div style={{ fontSize: "15px" }}>2025.09.15</div>
                                <div style={{ fontSize: "20px", fontWeight:"bold" }}>부산 여행~</div>
                            </div>
                        </div>
                        <div style={{ border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left", }}>
                            <div style={{ aspectRatio: "1/1", width: "100%", margin: "auto  0", border: "1px solid black", }}></div>
                            <div style={{ marginTop: "5px" }}>
                                <div style={{ fontSize: "15px" }}>2025.09.15</div>
                                <div style={{ fontSize: "20px", fontWeight:"bold" }}>부산 여행~</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
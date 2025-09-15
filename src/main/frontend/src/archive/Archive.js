import React, { useState } from 'react';

export default function Archive() {
    const [friendChatToggle, setFriendChatToggle] = useState(true);

    return(
        <div style={{
                height: "100%",
                display:"grid",
                gridTemplateRows: "40px 10fr",
                border: "1px solid black"
        }}>
            <div>
                <select defaultValue="newest">
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>

                <input placeholder="친구 검색"/>
            </div>

            <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gridAutoRows: "300px",
                    gap: "10px",
                    margin: "10px",
                    scrollY: "scroll",
                 }}
            >
                <div style={{ border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left" }}>
                    <div style={{width: "100%", height: "200px", margin: "auto  0", border: "1px solid black", }}></div>
                    <div style={{marginTop: "5px"}}>
                        <div style={{ fontSize: "15px" }}>2025.09.15</div>
                        <div style={{ fontSize: "10px", fontWeight:"bold" }}>with 도담, 도연, 유민</div>
                        <div style={{ fontSize: "20px", fontWeight:"bold" }}>부산 여행~</div>
                    </div>
                </div>
                <div style={{ border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left" }}>
                    <div style={{width: "100%", height: "200px", margin: "auto  0", border: "1px solid black", }}></div>
                    <div style={{marginTop: "5px"}}>
                        <div style={{ fontSize: "15px" }}>2025.09.15</div>
                        <div style={{ fontSize: "10px", fontWeight:"bold" }}>with 도담, 도연, 유민</div>
                        <div style={{ fontSize: "20px", fontWeight:"bold" }}>부산 여행2~</div>
                    </div>
                </div>
                <div style={{ border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left" }}>
                    <div style={{width: "100%", height: "200px", margin: "auto  0", border: "1px solid black", }}></div>
                    <div style={{marginTop: "5px"}}>
                        <div style={{ fontSize: "15px" }}>2025.09.15</div>
                        <div style={{ fontSize: "10px", fontWeight:"bold" }}>with 도담, 도연, 유민</div>
                        <div style={{ fontSize: "20px", fontWeight:"bold" }}>부산 여행3~</div>
                    </div>
                </div>
                <div style={{ border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left" }}>
                    <div style={{width: "100%", height: "200px", margin: "auto  0", border: "1px solid black", }}></div>
                    <div style={{marginTop: "5px"}}>
                        <div style={{ fontSize: "15px" }}>2025.09.15</div>
                        <div style={{ fontSize: "10px", fontWeight:"bold" }}>with 도담, 도연, 유민</div>
                        <div style={{ fontSize: "20px", fontWeight:"bold" }}>부산 여행4~</div>
                    </div>
                </div>
                <div style={{ border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left" }}>
                    <div style={{width: "100%", height: "200px", margin: "auto  0", border: "1px solid black", }}></div>
                    <div style={{marginTop: "5px"}}>
                        <div style={{ fontSize: "15px" }}>2025.09.15</div>
                        <div style={{ fontSize: "10px", fontWeight:"bold" }}>with 도담, 도연, 유민</div>
                        <div style={{ fontSize: "20px", fontWeight:"bold" }}>부산 여행5~</div>
                    </div>
                </div>
                <div style={{ border: "1px solid black", textAlign: "center", padding: "13px", textAlign:"left" }}>
                    <div style={{width: "100%", height: "200px", margin: "auto  0", border: "1px solid black", }}></div>
                    <div style={{marginTop: "5px"}}>
                        <div style={{ fontSize: "15px" }}>2025.09.15</div>
                        <div style={{ fontSize: "10px", fontWeight:"bold" }}>with 도담, 도연, 유민</div>
                        <div style={{ fontSize: "20px", fontWeight:"bold" }}>부산 여행6~</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
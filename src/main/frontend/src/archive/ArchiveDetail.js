import './ArchiveDetail.css';

export default function ArchiveDetail({ onClose }) {

    return (
        <div className="ArchiveDetail">
            {/* 왼쪽 버튼 */}
            <img src="images/close.png"
                 style={{ position: "absolute", left: "25%", top: "50%",
                          transform: "translateY(-50%)", width: "30px", cursor: "pointer",
                          zIndex: 1010, }}
            />

            {/* 오른쪽 버튼 */}
            <img src="images/close.png"
                 style={{ position: "absolute", right: "25%", top: "50%",
                          transform: "translateY(-50%)", width: "30px", cursor: "pointer",
                          zIndex: 1010, }}
            />

            {/* ArchiveDetail 본체 */}
            <div style={{ position: "relative", border: "1px solid gray", padding: "10px",
                          borderRadius: "15px", backgroundColor: "white",
                          width: "40%", height: "80%", textAlign: "center", }}
            >
                {/* 닫기 버튼 */}
                <img src="images/close.png"
                     onClick={() => onClose(false)}
                     style={{ width: "20px", position: "absolute", top: "20px", right: "28px",
                              cursor: "pointer", }}
                />

                {/* 내용 */}
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

                    <div style={{ width: "100%", height: "50%", backgroundColor: "gray", flexShrink: 0 }} />

                    <div style={{ margin: "20px 0 10px", flexShrink: 0, fontSize: "15px", color:"gray" }}>2025-09-18</div>

                    <div style={{ overflowY: "auto", flexGrow: 1, fontSize: "15px" }}>
                        SSSSSSSS SSSSSSSSSSSSS sssssssss sssssssssssss sssss sss sssssss
                        ssssss ssssssss sssssssssss sssssssssssssssss ssssssssssss
                        sssssssss sssssssss ssssssss
                        SSSSSSSS SSSSSSSSSSSSS sssssssss sssssssssssss sssss sss sssssss
                        ssssss ssssssss sssssssssss sssssssssssssssss ssssssssssss
                        sssssssss sssssssss ssssssss
                        SSSSSSSS SSSSSSSSSSSSS sssssssss sssssssssssss sssss sss sssssss
                        ssssss ssssssss sssssssssss sssssssssssssssss ssssssssssss
                        sssssssss sssssssss ssssssss
                        SSSSSSSS SSSSSSSSSSSSS sssssssss sssssssssssss sssss sss sssssss
                        ssssss ssssssss sssssssssss sssssssssssssssss ssssssssssss
                        sssssssss sssssssss ssssssss
                    </div>
                </div>

            </div>
        </div>
    );
}

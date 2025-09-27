import React, {useState} from "react";

export default function SummaryResult ({summary, onNext, selectedPhotos, thumbnail}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(summary);
    return (
        <div className={"AddForm_wrapper"}>
            <p>Archive has been created</p>
            <div>
                title:
                <input type={"text"} value={title} onChange={(e) => setTitle(e.target.value)}/>
                <div style={{ display: "flex", overflowX: "auto", padding: "10px", gap: "10px",
                    borderTop: "1px solid #ccc", flexShrink: 0 }}>
                    {selectedPhotos ? (
                        <>
                            {Array.isArray(selectedPhotos) && selectedPhotos.map((e) => (
                                <div key={e.idx}
                                     style={{ aspectRatio: "1/1", border: "1px solid black", display: "flex",
                                         justifyContent: "center", alignItems: "center", textAlign: "center",
                                         cursor:"pointer", position: "relative", minWidth: 0, // grid 아이템이 줄어들 수 있도록
                                     }}>
                                    <img src={`http://localhost:8080${e.path}`}
                                         style={{ width:"100%", height:"100%", objectFit: "contain", }} />
                                    {e.idx === thumbnail && (
                                        <div
                                            style={{
                                                position: "absolute", top: "2px", right: "2px",
                                                backgroundColor: "yellow", fontSize: "12px", padding: "2px"
                                            }}
                                        >
                                            썸네일
                                        </div>
                                    )}
                                </div>
                            ))}

                        </>
                    ) : ( <div>not exist</div> )}

                </div>
                <div>
                    <input type={"text"} value={content} onChange={(e) => setContent(e.target.value)}></input>
                </div>
            </div>
            <button onClick={() => onNext(title, content)}>Next</button>
        </div>
    );
}
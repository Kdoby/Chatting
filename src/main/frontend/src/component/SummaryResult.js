import React, {useState} from "react";

export default function SummaryResult ({summary, onNext, selectedPhotos, thumbnail}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(summary);

    const handleNext = () => {
        if (!title) {
            alert("아카이브 제목을 입력해주세요.");
            return;
        }
        onNext(title, content);
    }
    return (
        <div className={"AddForm_wrapper"}>
            <p>Archive has been created</p>
            <div>
                title:
                <input type={"text"} value={title} placeholder={"제목을 입력해주세요"}
                       onChange={(e) => setTitle(e.target.value)}
                       className={"AddArchive_title"}
                />
                <div style={{ display: "flex", overflowX: "auto", padding: "10px", gap: "10px",
                    borderTop: "1px solid #ccc", flexShrink: 0 }}>
                    {selectedPhotos ? (
                        <>
                            {Array.isArray(selectedPhotos) && selectedPhotos.map((e) => (
                                <div key={e.idx}
                                     style={{ flex: "0 0 auto", width: "100px", height: "100px",
                                         border: "1px solid black", cursor: "pointer", position: "relative", }}>
                                    <img src={`http://localhost:8080${e.path}`}
                                         style={{ width: "100%", height: "100%", objectFit: "cover", }} />
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
            </div>
            <textarea value={content} className={"AddArchive_text"}
                   onChange={(e) => setContent(e.target.value)}></textarea>
            <button onClick={() => handleNext()}>Next</button>
        </div>
    );
}
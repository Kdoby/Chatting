import React, {useState} from "react";

export default function SelectThumb ({thumbnail, onNext, photos, onPrev}) {
    const [thumb, setThumb] = useState(thumbnail); // idx

    const toggleSelect = (idx) => {
        if (thumb === idx) {
            setThumb(null);
        } else {
            setThumb(idx);
        }
    }

    const handleNext = () => {
        if (!thumb) {
            alert("썸네일을 선택해 주세요.");
            return;
        }
        onNext(thumb);
    }

    return (
        <div className={"AddForm_wrapper"}>
            <p>select thumbnail</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px", margin: "10px", overflowY: "scroll", }}>

                {photos ? (
                    <>
                        {Array.isArray(photos) && photos.map((e) => (
                            <div key={e.idx}
                                 style={{ aspectRatio: "1/1", border: "1px solid black", display: "flex",
                                     justifyContent: "center", alignItems: "center", textAlign: "center",
                                     cursor:"pointer", position: "relative", height: "83%"
                                 }}
                                 onClick={() => toggleSelect(e.idx)}>
                                <img src={`http://localhost:8080${e.path}`}
                                     style={{ width:"100%", height:"100%", objectFit: "contain", }} />
                                {thumb === e.idx && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "8px",
                                            right: "8px",
                                            background: "rgba(0,0,0,0.6)",
                                            color: "white",
                                            borderRadius: "50%",
                                            width: "24px",
                                            height: "24px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "16px",
                                        }}
                                    >
                                        ✔
                                    </div>
                                )}
                            </div>
                        ))}

                    </>
                ) : ( <div>not exist</div> )}


            </div>
            <div style={{position: "absolute", bottom: "30px"}}>
                <button className={"button_css"} onClick={onPrev}>Prev</button>
                <button className={"button_css"} onClick={() => handleNext()}>Next</button>
            </div>
        </div>
    );
}
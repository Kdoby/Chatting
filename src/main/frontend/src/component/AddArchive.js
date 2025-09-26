import React, {useEffect, useState} from "react";
import SelectPhotos from "./SelectPhotos";
import SelectThumb from "./SelectThumb";
import SetContent from "./SetContent";

export default function AddArchive ({roomId, userInfo, onClose, messages}) {
    const [step, setStep] = useState(0); // 0: 사진 선택, 1: 썸네일 선택, 2: 내용 설정
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [thumbnail, setThumbnail] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const handlePhotoNext = (list, start, end) => {
        setSelectedPhotos(list);
        setStart(start);
        setEnd(end);
        setStep(1);
    }

    const handleThumbNext = (thumb) => {
        setThumbnail(thumb);
        setStep(2);
    }

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
                    display: "flex", flexDirection: "column", position: "absolute"
                }}>
                    <div style={{fontSize: "xx-large", fontWeight: "500"}}>Create archive</div>
                    {step === 0 && <SelectPhotos roomId={roomId} onNext={handlePhotoNext}/> }
                    {step === 1 &&  <SelectThumb onNext={handleThumbNext} photos={selectedPhotos} thumbnail={thumbnail}/> }
                    {step === 2 && <SetContent userInfo={userInfo} messages={messages} start={start} end={end} />}
                </div>
            </div>
        </div>
    );
}
import React, {useEffect, useState} from "react";
import SelectPhotos from "./SelectPhotos";
import SelectThumb from "./SelectThumb";
import SetContent from "./SetContent";
import api from "../api";
import SummaryResult from "./SummaryResult";

export default function AddArchive ({roomId, userInfo, onClose, messages}) {
    const [step, setStep] = useState(0); // 0: 사진 선택, 1: 썸네일 선택, 2: 내용 설정
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [thumbnail, setThumbnail] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [summary, setSummary] = useState('');

    const handleSummary = async () => {
        try {
            const res = await api.post(`/v1/summary/${roomId}`,
                { start, end });
            console.log("요약 결과: ", res.data);
            setSummary(res.data.data.summary); // 결과를 상태에 저장
            setStep(3);
        } catch (err) {
            console.error("ai 요약 에러:", err);
        }
    };

    const handleAddArchive = async (title, content) => {
        try {
            const images = selectedPhotos.map(p => p.idx);
            const res = await api.post(`/v1/archive`,
                {
                    roomId,
                    title,
                    content,
                    images: images,
                    thumbnailImageId: thumbnail
                });
            setStep(0);
        } catch (err) {
            console.error("아카이브 등록 오류:", err);
        }
    };

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

    const handleContentNext = (startT, endT) => {
        setStart(startT);
        setEnd(endT);
        handleSummary();
    }

    const handleResultNext = (title, content) => {
        handleAddArchive(title, content);
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
                    {step === 2 && <SetContent userInfo={userInfo} messages={messages} start={start} end={end} onNext={handleContentNext}/>}
                    {step === 3 && <SummaryResult summary={summary} selectedPhotos={selectedPhotos} thumbnail={thumbnail} onNext={handleResultNext}/>}
                </div>
            </div>
        </div>
    );
}
import React, {useEffect, useRef, useState} from "react";
import SelectPhotos from "./SelectPhotos";
import SelectThumb from "./SelectThumb";
import SetContent from "./SetContent";
import api from "../api";
import SummaryResult from "./SummaryResult";

export default function AddArchive ({roomId, userInfo, onClose, messages}) {
    const [step, setStep] = useState(0); // 0: 사진 선택, 1: 썸네일 선택, 2: 내용 설정
    const [chattingRoomPhotoList, setChattingRoomPhotoList] = useState([]);
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [thumbnail, setThumbnail] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const alertedRef = useRef(false); // alert 2번 뜨는 문제 방지


    // 채팅방의 사진 fetch
    const fetchChattingRoomPhotoList = async() => {
        try {
            const res = await api.get("/v1/chat/images/" + roomId);
            setChattingRoomPhotoList(res.data.data);
            if (!alertedRef.current && (res.data.data.length < 1)) {
                alertedRef.current = true;
                alert("아카이브를 등록하려면 먼저 채팅에서 이미지를 전송해주세요.");
                onClose();
                return;
            }
            console.log(res.data.data);
        } catch (err) {
            console.error("에러", err);
        }
    }

    useEffect(() => {
        if(!roomId) return;
        alertedRef.current = false;
        fetchChattingRoomPhotoList();
    }, [roomId]);

    const handleSummary = async (start, end) => {
        console.log("AI요약 범위 전달: ", start, end);
        setLoading(true);
        try {
            const res = await api.post(`/v1/summary/${roomId}`,
                { start, end });
            console.log("요약 결과: ", res.data);
            setSummary(res.data.data.summary); // 결과를 상태에 저장
            setStep(3);
        } catch (err) {
            console.error("ai 요약 에러:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddArchive = async (title, content) => {
        try {
            const images = selectedPhotos.map(p => p.idx);
            console.log("roomId: ", roomId, "/ title: ", title, "/ content: ", content, "/ images: ", images, "/ thumbnailImageId: ", thumbnail);
            const res = await api.post(`/v1/archive`,
                {
                    roomId,
                    title,
                    content,
                    images,
                    thumbnailImageId: thumbnail
                });
            setStep(0);
            onClose();
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
        handleSummary(startT, endT);
    }

    const handleResultNext = (title, content) => {
        handleAddArchive(title, content);
    }

    return (
        <div className="AddChattingRoom">
            <div style={{
                position: "relative", border: "1px solid gray", padding: "10px",
                borderRadius: "15px", backgroundColor: "#F8FAFC",
                width: "50%", height: "80%", textAlign: "center",
            }}>
                {/* 닫기 버튼 */}
                <img
                    src="images/close2.png"
                    onClick={onClose}
                    style={{
                        width: "20px", position: "absolute", top: "20px", right: "28px",
                        cursor: "pointer", zIndex: "100"
                    }}
                />

                {/* 내용 */}
                <div style={{
                    height: "100%", maxHeight: "100%", width: "100%",
                                        textAlign: "left", boxSizing: "border-box",
                                        padding: "45px 20px 20px",
                                        display: "flex", flexDirection: "column",
                }}>
                    <div style={{fontSize: "xx-large", fontWeight: "500"}}>Create archive</div>
                    {step === 0 && <SelectPhotos roomId={roomId} onNext={handlePhotoNext} onClose={onClose}
                                                 chattingRoomPhotoList={chattingRoomPhotoList} selectedPhotoList={selectedPhotos} setSelectedPhotoList={setSelectedPhotos}/> }
                    {step === 1 &&  <SelectThumb onNext={handleThumbNext} onPrev={() => setStep(0)} photos={selectedPhotos} thumbnail={thumbnail}/> }
                    {step === 2 && <SetContent userInfo={userInfo} messages={messages} start={start} end={end} onNext={handleContentNext} onPrev={() => setStep(1)} loading={loading}/>}
                    {step === 3 && <SummaryResult summary={summary} selectedPhotos={selectedPhotos} thumbnail={thumbnail} onNext={handleResultNext} onPrev={() => setStep(2)}/>}
                </div>
            </div>
        </div>
    );
}
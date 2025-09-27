import React, {useEffect, useRef, useState} from "react";
import api from "../api";

export default function SelectPhotos ({roomId, onNext, onClose}) {
    const [chattingRoomPhotoList, setChattingRoomPhotoList] = useState([]);
    const [selectedPhotoList, setSelectedPhotoList] = useState([]);
    const alertedRef = useRef(false); // alert 2번 뜨는 문제 방지

    // 채팅방의 사진 fetch
    const fetchChattingRoomArchiveList = async() => {
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
        fetchChattingRoomArchiveList();
    }, [roomId]);

    // 이미지 선택/해제
    const toggleSelect = (idx, path, sendTime) => {
        setSelectedPhotoList(prev => {
            const exists = prev.some(photo => photo.idx === idx);
            return exists
                ? prev.filter(photo => photo.idx !== idx)     // idx 기준으로 제거
                : [...prev, { idx, path, sendTime }];         // 추가
        });
    };

    // 이미지 날짜 범위 추출 (채팅 요약 범위에 사용)
    const handleNext = () => {
        if (selectedPhotoList.length < 1) {
            alert("업로드할 이미지를 한 개 이상 선택해주세요");
            return;
        }
        const sorted = [...selectedPhotoList].sort((a, b) => a.idx - b.idx);
        const startTime = sorted[0].sendTime;
        const endTime = sorted[sorted.length - 1].sendTime;
        console.log("selectPhotos start : ", startTime);
        onNext(sorted, startTime, endTime);
    };

    return (
        <div className={"AddForm_wrapper"}>
            <p>select photos</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px", margin: "10px", overflowY: "scroll"}}>

                {chattingRoomPhotoList ? (
                    <>
                        {Array.isArray(chattingRoomPhotoList) && chattingRoomPhotoList.map((e) => (
                            <div key={e.imageId}
                                 style={{ aspectRatio: "1/1", border: "1px solid black", display: "flex",
                                     justifyContent: "center", alignItems: "center", textAlign: "center",
                                     cursor:"pointer", position: "relative", minWidth: 0, // grid 아이템이 줄어들 수 있도록
                                 }}
                                 onClick={() => toggleSelect(e.imageId, e.imagePath, e.sendTime)}>
                                <img src={`http://localhost:8080${e.imagePath}`}
                                     style={{ width:"100%", height:"100%", objectFit: "contain", }} />
                                {selectedPhotoList.some(photo => photo.idx === e.imageId) && (
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
            <button onClick={handleNext}>Next</button>
        </div>
    );
}
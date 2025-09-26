import React, {useEffect, useState} from "react";
import api from "../api";

export default function SelectPhotos ({roomId, onNext}) {
    const [chattingRoomPhotoList, setChattingRoomPhotoList] = useState([]);
    const [selectedPhotoList, setSelectedPhotoList] = useState([]);

    // 채팅방의 사진 fetch
    const fetchChattingRoomArchiveList = async() => {
        try {
            const res = await api.get("/v1/chat/images/" + roomId);

            setChattingRoomPhotoList(res.data.data);
            console.log(res.data.data);
        } catch (err) {
            console.error("에러", err);
        }
    }

    useEffect(() => {
        if(!roomId) return;

        fetchChattingRoomArchiveList();
    }, [roomId]);

    // 이미지 선택/해제
    const toggleSelect = (idx, path) => {
        if (selectedPhotoList.some(photo => photo.idx === idx)) { // 선택 해제
            setSelectedPhotoList(selectedPhotoList.filter((i) => i !== idx));
        } else { // 선택 추가
            setSelectedPhotoList([...selectedPhotoList, {idx, path}]);
        }
    };

    // 이미지 날짜 범위 추출 (채팅 요약 범위에 사용)
    const handleNext = () => {
        const sorted = [...selectedPhotoList].sort((a, b) => a.idx - b.idx);
        const startTime = sorted[0].sendTime;
        const endTime = sorted[sorted.length - 1].sendTime;
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
                                 onClick={() => toggleSelect(e.imageId, e.imagePath)}>
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
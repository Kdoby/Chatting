import React, {useEffect, useState} from "react";

import api from "../api";
import {TokenStore} from "../TokenStore";

export default function ChatInput ({roomId, stompClient, OpenAddArchive}) {
    const [input, setInput] = useState('');
    const [files, setFiles] = useState([]); // 이미지 배열(묶음으로 보낼 시 배열로 저장)
    const [previews, setPreviews] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isSending, setIsSending] = useState(false);

    const sendMessage = () => {
        if (stompClient.current && input) {
            stompClient.current.send(
                `/pub/chat.send/${roomId}`,
                {Authorization: `Bearer ${TokenStore.getToken()}`},
                JSON.stringify({ message: input, type: "CHAT" })
            );
            setInput('');
        }
    };

    const sendImageFiles = async () => {
        if (files.length === 0) return;
        const form = new FormData();
        files.forEach(f => form.append("files", f));

        try {
            setProgress(0);
            await api.post(`/v1/chat/uploads/${roomId}`, form, {
                headers: {"Content-Type": "multipart/form-data"},
                onUploadProgress: (e) => {
                    if (!e.total) return;
                    setProgress(Math.round((e.loaded * 100) / e.total));
                }
            });
            // 서버가 브로드캐스트함
            setFiles([]);
            setProgress(0);
        } catch (err) {
            console.error("이미지 업로드 실패: ", err);
            alert("이미지 업로드에 실패했습니다.");
            setProgress(0);
        }
    };

    const handleFileChange = (e) => {
        const selected = Array.from(e.target.files || []);

        /* 개수, 용량 제한
        const MAX_COUNT = 10;
        const MAX_SIZE = 10 * 1024 * 1024;
        */

        // 기존 선택 파일 + 추가 선택 팡일 + 중복 제거
        setFiles(prev => {
            const merged = [...prev];
            selected.forEach(file => {
                /* 용량 제한시 초과 리턴
                if (file.size > MAX_SIZE) return;
                 */

                // 중복 찾기
                const dupli = merged.some(
                    f => f.name === file.name &&
                        f.size === file.size &&
                        f.lastModified === file.lastModified
                );
                if (!dupli) merged.push(file);
            });
            return merged;
        });
        e.target.value = "";
    };

    // 전송 전 미리보기 파일 삭제
    const removeFile = (idx) => {
        setFiles(prev => prev.filter((_, i) => i !== idx));
    };

    // 수정필요
    const handleSendMessage = async (e) => {
        console.log("메세지 전송 버튼 클릭");
        e.preventDefault();
        if (isSending) return;

        const hasText = input.trim().length > 0;
        const hasFiles = files.length >0;
        // 아무 입력 없을 경우 보내지않음
        if (!hasText && !hasFiles) return;

        setIsSending(true);
        try {
            if (hasFiles && hasText) { // 이미지파일과 텍스트 둘다 전송시 이미지 -> 텍스트 순차전송
                await sendImageFiles();
                await sendMessage();
            } else if (hasFiles) { // 이미지 파일만 전송시
                await sendImageFiles();
            } else { // 텍스트만 전송시
                await sendMessage();
            }
        } catch (err) {
            console.error(err);
            alert("전송 중 오류가 발생했습니다.");
        } finally {
            setIsSending(false);
        }
    };

    // files 변경될 때마다 preview URL 생성, 이전에 생성한 URL 정리
    useEffect(() => {
        const next = files.map(file => ({
            url: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
            lastModified: file.lastModified,
        }));

        // 교체
        setPreviews(prev => {
            // 이전 URL들 해제
            prev.forEach(p => URL.revokeObjectURL(p.url));
            return next;
        });

        // 언마운트/재랜더 전 정리
        return () => {
            next.forEach(p => URL.revokeObjectURL(p.url));
        };
    }, [files]);

    return (
        <div style={{width: "100%", minWidth: 0}}>
            <div className="previews">
                {previews.map((p, i) => (
                    <div key={p.url} className={"filePreview"}>
                        <img src={p.url} alt={p.name} style={{maxHeight: 120}} />
                        {p.name} ({Math.round(p.size/1024)} KB)
                        <img
                            src={"images/close2.png"}
                            onClick={() => removeFile(i)}
                            style={{
                                width: "20px",
                                cursor: "pointer",
                            }}
                            alt={"취소"}
                        />
                    </div>
                ))}
                {progress > 0 && <span>{progress}%</span>}
            </div>
            <form className={"ChatInput_wrapper"} onSubmit={handleSendMessage}>
                <input type={"text"}
                       id={"message"}
                       name={"text"}
                       value={input}
                       className={"ChatInput_message"}
                       onChange={(e) => setInput(e.target.value)}
                />
                <input type={"file"}
                       id={"imageUpload"}
                       name={"file"}
                       accept={"image/*"}
                       style={{display: "none"}}
                       onChange={handleFileChange}
                       multiple
                />
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <label htmlFor={"imageUpload"} style={{width: "30%", height: "30%", cursor: "pointer"}}>
                        <img src={"images/uploadImg.png"} alt={"이미지 업로드"}
                             style={{width: "100%", height: "100%"}}
                        />
                    </label>
                    <div style={{width: "30%", height: "30%", cursor: "pointer"}}>
                        <img src={"images/uploadArchive.png"}
                             alt={"아카이브 생성"}
                             style={{width: "30%", height: "30%"}}
                             onClick={() => OpenAddArchive()}
                             style={{width: "100%", height: "100%"}}
                        />
                    </div>
                </div>
                <button type={"submit"} disabled={isSending || (!input.trim() && files.length === 0)}
                        style={{cursor: "pointer"}}>전송</button>
            </form>
        </div>

    );
}
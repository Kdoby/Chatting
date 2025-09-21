import React, {useState} from "react";
import axios from "axios";
import api from "../api";
import {TokenStore} from "../TokenStore";

export default function ChatInput ({roomId, stompClient}) {
    const [input, setInput] = useState('');
    const [files, setFiles] = useState([]); // 이미지 배열(묶음으로 보낼 시 배열로 저장)

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
        e.preventDefault();

        // 아무 입력 없을 경우 보내지않음
        if (!input && files.length === 0) {
            return;
        }
        sendMessage();
        /*
        const formData = new FormData();

        formData.append("text", input ?? "");
        if (files && files.length > 0) {
            files.forEach((file) => {
               formData.append("files", file);
            });
        }

        try {
            const response = await axios.post("", formData ,{
                headers: {"Content-Type": "multipart/form-data"},
            });
        } catch (err) {
            console.error("전송 실패:", err);
        }
         */
    };

    return (
        <div>
            <div className="previews">
                {files.map((f, i) => (
                    <div key={i}>
                        {f.name} ({Math.round(f.size/1024)} KB)
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
                <label htmlFor={"imageUpload"}>
                    <img src={"images/uploadImg.png"} alt={"이미지 업로드"}
                         style={{width: "60%", height: "60%"}}
                    />
                </label>

                <button type={"submit"}>전송</button>
            </form>
        </div>

    );
}
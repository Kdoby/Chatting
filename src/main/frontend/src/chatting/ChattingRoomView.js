import "./Chatting.css";
import ChatInput from "../component/ChatInput";
import ChatLog from "../component/ChatLog";
import api from "../api";
import {useEffect, useRef, useState} from "react";
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {TokenStore} from "../TokenStore";

export default function ChattingRoomView ({ roomId, userInfo }){
    const stompClient = useRef(null); // 웹소켓 연결 객체
    const [messages, setMessages] = new useState([]);// 메세지 리스트
    const [roomInfo, setRoomInfo] = useState([]);

    // 웹소켓 연결
    const connect = () => {
        const socket = new SockJS("http://localhost:8080/ws");
        /* const socket = new WebSocket("ws://localhost:8080/ws"); */
        stompClient.current = Stomp.over(socket);
        const headers = {Authorization: `Bearer ${TokenStore.getToken()}`};
        stompClient.current.connect(headers, frame => {
            console.log("Connected: " + frame);

            // 같은 구독이 중복되지 않도록 id 지정
            stompClient.current.subscribe(
                `/sub/chat/room/${roomId}`,
                message => {
                    const msg = JSON.parse(message.body);
                    setMessages((prev) => [...prev, msg]);
                },
                { id: "chat-sub-" + roomId }
            );
        });
        /* stompClient.current.connect({}, () => {
            stompClient.current.subscribe(`/sub/chatroom/${roomId}`,
                (message) => {
                const newMessage = JSON.parse(message.body);
                setMessages((prev) => [...prev, newMessage]);
                });
        }); */
    };

    // 웹소켓 연결 해제
    const disconnect = () => {
        if (stompClient.current) {
            stompClient.current.disconnect();
        }
    };

    // 채팅방 정보 조회 (int roomId, string roomName, List<String> participants, int memberCount)
    const fetchChattingInfo = async () => {
        try {
            const res = await api.get(`/v1/chatroom/${roomId}`);
            console.log("채팅방 정보 조회: ", res.data.data);
            setRoomInfo(res.data.data);
        } catch (err) {
            console.error("검색 에러:", err);
        }
    };

    // 기존 채팅 메시지 기록 불러오기
    const fetchChattingLog = async () => {
        try {
            const res = await api.get(`/v1/chat/list/${roomId}`);
            console.log(res.data.data);
            setMessages(res.data.data);
        } catch (err) {
            console.error("채팅로그 불러오기 에러:", err);
        }
    };


    useEffect(() => {
        connect();
        fetchChattingInfo();
        fetchChattingLog();
        // 컴포넌트 언마운트 시 웹소켓 연결 해제
        return () => disconnect();
    },[])



    return (
        <div className={"chatting_wrapper"}>
            <ChatLog userInfo={userInfo} roomId={roomId} roomName={roomInfo.roomName} participants={roomInfo.participants} memberCount={roomInfo.memberCount} messages={messages}/>
            <ChatInput roomId={roomId} stompClient={stompClient}/>
        </div>
    );
}
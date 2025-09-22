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
    const subIdRef = useRef(null); // 구독 ID보관 (중복 구독 방지)
    const isMountedRef = useRef(false); // 언마운트 후 setState 방지
    const [messages, setMessages] = useState([]);// 메세지 리스트
    const [roomInfo, setRoomInfo] = useState([]);

    // 웹소켓 / STOMP 연결
    const connect = () => {
        // 이미 연결된 경우 연결x
        if (stompClient.current?.connected) return;

        const socket = new SockJS("http://localhost:8080/ws");
        stompClient.current = Stomp.over(socket);

        const headers = {Authorization: `Bearer ${TokenStore.getToken()}`};

        stompClient.current.connect(headers, frame => {
            if (!isMountedRef.current) return;

            console.log("Connected: " + frame);
            // 같은 구독이 중복되지 않도록 id 지정
            stompClient.current.subscribe(
                `/sub/chat/room/${roomId}`,
                message => {
                    try{
                        const msg = JSON.parse(message.body);
                        setMessages((prev) => [...prev, msg]);
                    } catch (e) {
                        console.error("메세지 파싱 실패: ", e);
                    }
                },
                { id: "chat-sub-" + roomId }
            );
        }, (error) => {
            console.warn("STOMP 연결 실패: ", error);
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
        const client = stompClient.current;
        if (client) {
            try {
                if (subIdRef.current) {
                    try {
                        client.unsubscribe(subIdRef.current);
                    } catch (_) {}
                    subIdRef.current = null;
                }
                client.disconnect(() => {
                    console.log("STOMP disconnected");
                });
            } catch (e) {
                console.warn("disconnect 에러: ", e);
            }
        }
        stompClient.current = null;
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

    // 가시성 변경시 재연결
    useEffect(() => {
        const onVisibility = () => {
            if (document.visibilityState === "visible") {
                if (!stompClient.current?.connected) connect();
            }
        };
        document.addEventListener("visibilitychange", onVisibility);
        return () => document.removeEventListener("visibilitychange", onVisibility);
    }, [roomId]);

    // 마운트/언마운트 + roomId 변경되면 재연결/재조회
    useEffect(() => {
        isMountedRef.current = true;

        connect();
        fetchChattingInfo();
        fetchChattingLog();

        return () => {
            isMountedRef.current = false;
            disconnect();
        };
    }, [roomId]);

    return (
        <div className={"chatting_wrapper"}>
            <ChatLog userInfo={userInfo} roomId={roomId} roomName={roomInfo.roomName} participants={roomInfo.participants} memberCount={roomInfo.memberCount} messages={messages}/>
            <ChatInput roomId={roomId} stompClient={stompClient}/>
        </div>
    );
}
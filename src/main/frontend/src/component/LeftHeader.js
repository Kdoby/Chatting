import HeaderProfile from "./HeaderProfile";
import ChattingRoomList from "./ChattingRoomList";
import FriendList from "./FriendList";
import AlarmList from "./AlarmList";

import "./LeftHeader.css";

import React, { useState } from 'react';

export default function LeftHeader({ leftType, setLeftType, userInfo, setRoomId, fetchMyArchive }) {
    const [friendChatAlarmToggle, setFriendChatAlarmToggle] = useState('friend');

    return (
        <div className={"header_wrapper"}>
            <HeaderProfile userInfo={userInfo}/>

            <button className={"header_archive"}
                    onClick={() => {
                        setLeftType('archive');
                        fetchMyArchive();
                    }}
                    style={{ width: "100%"}}
            >
                archive
            </button>
            <div className={"header_menu"}>
                <button className={"header_friend"}
                        onClick={() => setFriendChatAlarmToggle('friend')}
                >
                    friend
                </button>
                <button className={"header_chat"}
                        onClick={() => setFriendChatAlarmToggle('chat')}
                >
                    chat
                </button>
                <button className={"header_alarm"}
                        onClick={() => setFriendChatAlarmToggle('alarm')}
                >
                    alarm
                </button>
            </div>
            <div style={{height:"80vh", display:"flex", flexDirection:"column", }}>
                { friendChatAlarmToggle === 'friend' ? ( <FriendList userInfo={userInfo} /> ) : ( <></> )}
                { friendChatAlarmToggle === 'chat' ? ( <ChattingRoomList leftType={leftType} setLeftType={setLeftType} userInfo={userInfo} setRoomId={setRoomId}/> ) : ( <></> )}
                { friendChatAlarmToggle === 'alarm' ? ( <AlarmList /> ) : ( <></> )}
            </div>
        </div>
    );
}
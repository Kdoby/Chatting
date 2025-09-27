import HeaderProfile from "./HeaderProfile";
import ChattingRoomList from "./ChattingRoomList";
import FriendList from "./FriendList";
import AlarmList from "./AlarmList";

import "./LeftHeader.css";

import React, { useState } from 'react';

export default function LeftHeader({ leftType, setLeftType, userInfo, setRoomId, fetchMyArchive }) {
    const [friendChatAlarmToggle, setFriendChatAlarmToggle] = useState('friend');

    return (
        <div className={"header_wrapper"} style={{ background: "linear-gradient(to bottom, #F8FAFC, #D9EAFD, #BCCCDC)" }}>
            <HeaderProfile userInfo={userInfo}/>

            <img src="images/archive.png"
                 style={{ weight:"100%", height:"25px" }}
                 onClick={() => {
                     setLeftType('archive');
                     fetchMyArchive();
                 }}
            />
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr"}}>
                <img src="images/friend.png"
                     style={{ height:"25px", margin:"auto" }}
                     onClick={() => setFriendChatAlarmToggle('friend')}/>
                <img src="images/chat.png"
                     style={{ height:"25px", margin:"auto" }}
                     onClick={() => setFriendChatAlarmToggle('chat')}/>
                <img src="images/alarm.png"
                     style={{ height:"25px", margin:"auto" }}
                     onClick={() => setFriendChatAlarmToggle('alarm')}/>
            </div>
            <div style={{height:"80vh", display:"flex", flexDirection:"column", }}>
                { friendChatAlarmToggle === 'friend' ? ( <FriendList userInfo={userInfo} /> ) : ( <></> )}
                { friendChatAlarmToggle === 'chat' ? ( <ChattingRoomList leftType={leftType} setLeftType={setLeftType} userInfo={userInfo} setRoomId={setRoomId}/> ) : ( <></> )}
                { friendChatAlarmToggle === 'alarm' ? ( <AlarmList /> ) : ( <></> )}
            </div>
        </div>
    );
}
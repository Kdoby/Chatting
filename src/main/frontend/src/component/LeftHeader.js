import HeaderProfile from "./HeaderProfile";
import ChattingRoomList from "./ChattingRoomList";
import FriendList from "./FriendList";
import AlarmList from "./AlarmList";

import "./LeftHeader.css";

import React, { useState } from 'react';

export default function LeftHeader({ leftType, setLeftType, userInfo, setRoomId, fetchMyArchive, roomId }) {
    const [friendChatAlarmToggle, setFriendChatAlarmToggle] = useState('friend');

    return (
        <div className={"header_wrapper"} style={{ background: "linear-gradient(to bottom, #F8FAFC, #D9EAFD, #BCCCDC)" }}>
            <HeaderProfile userInfo={userInfo}/>


            <div style={{ width:"90%", textAlign:"center", margin:"5px auto 5px", borderRadius : "5px", padding:"5px 0" }}>
                <img src={leftType === 'archive' ? "images/archiveT.png" : "images/archiveF.png"}
                     style={{ height:"25px", margin:"auto", cursor: 'pointer'}}
                     onClick={() => {
                         setLeftType('archive');
                         fetchMyArchive();
                     }}
                />
            </div>

            <div style={{ width:"90%", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
                <img src={friendChatAlarmToggle === 'friend' ? "images/friendT.png" : "images/friendF.png"}
                     style={{ height:"25px", margin:"auto", cursor: 'pointer'}}
                     onClick={() => setFriendChatAlarmToggle('friend')}/>
                <img src={friendChatAlarmToggle === 'chat' ? "images/chatT.png" : "images/chatF.png"}
                     style={{ height:"25px", margin:"auto", cursor: 'pointer'}}
                     onClick={() => setFriendChatAlarmToggle('chat')}/>
                <img src={friendChatAlarmToggle === 'alarm' ? "images/alarmT.png" : "images/alarmF.png"}
                     style={{ height:"25px", margin:"auto", cursor: 'pointer'}}
                     onClick={() => setFriendChatAlarmToggle('alarm')}/>
            </div>
            <div style={{height:"80vh", display:"flex", flexDirection:"column", }}>
                { friendChatAlarmToggle === 'friend' ? ( <FriendList userInfo={userInfo} /> ) : ( <></> )}
                { friendChatAlarmToggle === 'chat' ? ( <ChattingRoomList leftType={leftType} setLeftType={setLeftType} userInfo={userInfo} setRoomId={setRoomId} roomId={roomId}/> ) : ( <></> )}
                { friendChatAlarmToggle === 'alarm' ? ( <AlarmList /> ) : ( <></> )}
            </div>
        </div>
    );
}
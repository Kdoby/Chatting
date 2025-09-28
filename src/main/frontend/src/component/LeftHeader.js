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


            <div style={{ width:"100%", textAlign:"center", margin:"5px 0 15px" }}>
                <img src="images/archive.png"
                     style={{ height:"25px", margin:"auto",cursor:"pointer",  }}
                     onClick={() => {
                         setLeftType('archive');
                         fetchMyArchive();
                     }}
                />
            </div>

            <div style={{ width:"90%", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
                <img src="images/friend.png"
                     style={{ height:"25px", margin:"auto", cursor:"pointer",  }}
                     onClick={() => setFriendChatAlarmToggle('friend')}/>
                <img src="images/chat.png"
                     style={{ height:"25px", margin:"auto", cursor:"pointer",  }}
                     onClick={() => setFriendChatAlarmToggle('chat')}/>
                <img src="images/alarm.png"
                     style={{ height:"25px", margin:"auto", cursor:"pointer",  }}
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
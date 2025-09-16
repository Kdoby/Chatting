import HeaderProfile from "./HeaderProfile";
import ChattingRoomList from "./ChattingRoomList";
import FriendList from "./FriendList";
import AlarmList from "./AlarmList";

import "./LeftHeader.css";

import React, { useState } from 'react';

export default function LeftHeader({ setLeftType }) {
    const [friendChatAlarmToggle, setFriendChatAlarmToggle] = useState('friend');

    return (
        <div className={"header_wrapper"}>
            <HeaderProfile />

            <button className={"header_archive"}
                    onClick={() => setLeftType('archive')}
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
            { friendChatAlarmToggle === 'friend' ? ( <FriendList /> ) : ( <></> )}
            { friendChatAlarmToggle === 'chat' ? ( <ChattingRoomList setLeftType={setLeftType} /> ) : ( <></> )}
            { friendChatAlarmToggle === 'alarm' ? ( <AlarmList /> ) : ( <></> )}

        </div>
    );
}
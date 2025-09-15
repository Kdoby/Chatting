import HeaderProfile from "./HeaderProfile";
import "./LeftHeader.css";
import ChattingRoomList from "./ChattingRoomList";
import FriendList from "./FriendList";

import React, { useState } from 'react';

export default function LeftHeader({ setLeftType }) {
    const [friendChatToggle, setFriendChatToggle] = useState(true);

    return (
        <div className={"header_wrapper"}>
            <HeaderProfile />

            <button className={"header_archive"}
                    onClick={() => setLeftType('archive')}
            >
                archive
            </button>
            <div className={"header_menu"}>
                <button className={"header_friend"}
                        onClick={() => setFriendChatToggle(true)}
                >
                    friend
                </button>
                <button className={"header_chat"}
                        onClick={() => setFriendChatToggle(false)}
                >
                    chat
                </button>
            </div>
            { friendChatToggle ? (
                <FriendList />
            ) : (
                <ChattingRoomList setLeftType={setLeftType} />
            )}

        </div>
    );
}
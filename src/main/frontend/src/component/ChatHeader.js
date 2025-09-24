import ChatBubble from "./ChatBubble";
import MyChatBubble from "./MyChatBubble";
import DropdownMenu from "./DropdownMenu";
import ChatDrawer from "./ChatDrawer";
import ChatPhotoAlbum from "./ChatPhotoAlbum";
import ChatSetting from "./ChatSetting";

import { useState } from "react";

export default function ChatHeader ({ roomId, roomName, participants, memberCount, deleteChattingRoom }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 0=닫힘, 1=archive, 2=photo

    return (
        <div style={{display: "relative"}}>
            <div className={"ChatHeader_wrapper"}>
                <div className={"ChattingRoom_img"}>

                </div>
                <div className={"ChattingRoom_info"}>
                    <div>{roomName}</div>
                    <div><img src={"images/user.png"} alt={"채팅인원"}/>{memberCount}</div>
                </div>
                <div className={"ChatHeader_menuDiv"}>
                    <img src={"images/menu.png"} alt={"메뉴"} onClick={() => setIsMenuOpen(prev => !prev)}/>
                </div>
            </div>
            {isMenuOpen && (<DropdownMenu setModalType={setModalType} closeMenu={() => setIsMenuOpen(false)}/>)}
            {modalType === 1 && (<ChatDrawer roomId={roomId} onClose={() => setModalType(0)}/>)}
            {modalType === 2 && (<ChatPhotoAlbum roomId={roomId} onClose={() => setModalType(0)}/>)}
            {modalType === 3 && (<ChatSetting roomId={roomId} onClose={() => setModalType(0)} deleteChattingRoom={deleteChattingRoom}/>)}
        </div>

    );
}
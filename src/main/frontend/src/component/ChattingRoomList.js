export default function ChattingRoomList({ setLeftType }){
    return (
    <>
        <div className={"ChattingRoom_wrapper"} onClick={() => setLeftType('chatting')} >
            <div className={"ChattingRoom_img"}>

            </div>
            <div className={"ChattingRoom_info"}>
                <div>채팅방 이름</div>
                <div>마지막 메세지...</div>
            </div>
        </div>
        <div className={"ChattingRoom_wrapper"} onClick={() => setLeftType('chatting')} >
            <div className={"ChattingRoom_img"}>

            </div>
            <div className={"ChattingRoom_info"}>
                <div>채팅방 이름</div>
                <div>마지막 메세지...</div>
            </div>
        </div>
    </>
    );
}
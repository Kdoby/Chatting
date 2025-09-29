import ChatHeader from "./ChatHeader";
import ChatLogDetail from "./ChatLogDetail";

export default function ChatLog ({ userInfo, roomId, roomName, participants, memberCount, messages, deleteChattingRoom }) {

    return (
        <div className={"ChatLog_wrapper"}>
            <ChatHeader roomId={roomId} roomName={roomName} participants={participants} memberCount={memberCount}
                deleteChattingRoom={deleteChattingRoom} userInfo={userInfo} />
            <ChatLogDetail userInfo={userInfo} messages={messages} onPick={() => {}} systemOn={true}/>

        </div>
    );
}
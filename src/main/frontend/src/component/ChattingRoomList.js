import ChattingRoom from "./ChattingRoom";

export default function ChattingRoomList({ setLeftType }){
    return (
        <div>
            <ChattingRoom setLeftType={setLeftType}/>
            <ChattingRoom setLeftType={setLeftType}/>
            <ChattingRoom setLeftType={setLeftType}/>
        </div>

    );
}
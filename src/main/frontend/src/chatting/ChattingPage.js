import LeftHeader from "../component/LeftHeader";
import ChattingRoomView from "./ChattingRoomView";

export default function ChattingPage(){
    return (
        <div style={{display: "flex", height: "100vh", width: "100vw"}}>
            <LeftHeader />
            <ChattingRoomView />
        </div>
    );
}
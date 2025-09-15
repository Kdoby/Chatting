import HeaderProfile from "./HeaderProfile";
import "./LeftHeader.css";
import ChattingRoom from "./ChattingRoom";

export default function LeftHeader() {
    return (
        <div className={"header_wrapper"}>
            <HeaderProfile />
            <div className={"header_archive"}>
                archive
            </div>
            <div className={"header_menu"}>
                <div className={"header_friend"}>friend</div>
                <div className={"header_chat"}>chat</div>
            </div>
            <ChattingRoom />
        </div>
    );
}
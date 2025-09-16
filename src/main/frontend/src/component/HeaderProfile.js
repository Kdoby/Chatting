import "./LeftHeader.css";

export default function HeaderProfile() {
    return (
        <div className={"profile_wrapper"}>
            <img src="images/defaultProfile.png" alt="profileimg"></img>
            <p>유저이름</p>
            <button>로그아웃</button>
        </div>
    );
}
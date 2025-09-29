import Logout from "../login/Logout";
import "./LeftHeader.css";

import React from "react";

export default function HeaderProfile({ userInfo} ) {
    return (
        <div className={"profile_wrapper"}>
            <img src="images/defaultProfile.png" alt="profileimg"></img>
            <p>{userInfo.nickname}</p>
            <Logout />
        </div>
    );
}
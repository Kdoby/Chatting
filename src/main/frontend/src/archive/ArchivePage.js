import SubMenu from './SubMenu';
import Archive from './Archive';

import React, { useState } from 'react';

export default function ArchivePage() {

    return(
        <div style={{ width: "100%", height: "100%" }}>
            <div
                style={{
                    width: "100%", height: "100%",
                    display:"grid",
                    gridTemplateColumns: "1fr 4fr"
                    }}
            >
                <div style={{backgroundColor:"yellow", margin: "20px 5px 20px 15px"}}>
                    <SubMenu />
                </div>


                <div style={{ margin: "20px 15px" }}>
                    <Archive />
                </div>
            </div>
        </div>
    );
}
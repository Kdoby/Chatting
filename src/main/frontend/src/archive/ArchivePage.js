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
                    <div style={{backgroundColor:"yellow"}}>
                        <div style={{
                                display:"grid",
                                gridTemplateRows: "1fr 9fr",
                        }}>

                            <div>프로필</div>

                            <div style={{
                                     display:"grid",
                                     gridTemplateRows: "30px 30px",
                            }}>
                                <div>archive</div>
                                <div><span>friend</span> <span>chat</span></div>
                                <div>chat list


                                </div>
                            </div>

                        </div>
                    </div>

                    <div style={{backgroundColor:"red", scrollY: "auto"}}>

                    </div>

            </div>
        </div>
    );
}
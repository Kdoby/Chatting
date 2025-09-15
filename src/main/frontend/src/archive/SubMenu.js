import React, { useState } from 'react';

export default function SubMenu() {
    const [friendChatToggle, setFriendChatToggle] = useState(true);

    return(
        <div style={{
                height: "100%",
                display:"grid",
                gridTemplateRows: "50px 10fr",
        }}>

            <div style={{ width: "100%", display:"grid", gridTemplateColumns: "1fr 3fr", gap: "10px" }}>
                <div style={{ width: "100%", height:"100%", backgroundColor: "blue", }}></div>

                <div style={{ margin:"auto 0" }}>user</div>
            </div>

            <div style={{
                     margin: "10px 0 0 0",
                     display:"grid",
                     gridTemplateRows: "30px 30px",
            }}>
                <button style={{ height: "100%", width:"100%", border: "1px solid black",
                              display: "flex", justifyContent: "center", alignItems: "center", }}>
                Archive
                </button>

                <div style={{ height: "100%", width:"100%", display:"grid", gridTemplateColumns: "1fr 1fr", }}>
                    <button onClick={() => setFriendChatToggle(true)}
                            style={{ height: "100%", width:"100%", margin: "auto", border: "1px solid black",
                                  display: "flex", justifyContent: "center", alignItems: "center",
                                }}
                    >
                    Friends
                    </button>
                    <button onClick={() => setFriendChatToggle(false)}
                            style={{ height: "100%", width:"100%", margin: "auto", border: "1px solid black",
                                  display: "flex", justifyContent: "center", alignItems: "center", }}
                    >
                        chat
                    </button>
                </div>
                <div style={{ height: "100%", width:"100%", paddingTop: "4px", border: "1px solid black",
                              scrollY:"auto",
                }}>
                    { friendChatToggle ? (
                    // friend
                    <>
                        <div style={{ padding: "4px 8px"}}>
                            <div style={{ width: "100%", height: "55px", border: "1px solid black",
                                          display: "grid", gridTemplateColumns: "1fr 3fr", gap: "10px"
                            }}>
                                <div style={{backgroundColor:"blue"}}></div>
                                <div style={{ margin: "auto 0"}}>friend 1</div>
                            </div>
                        </div>
                        <div style={{ padding: "4px 8px"}}>
                            <div style={{ width: "100%", height: "55px", border: "1px solid black",
                                          display: "grid", gridTemplateColumns: "1fr 3fr", gap: "10px"
                            }}>
                                <div style={{backgroundColor:"blue"}}></div>
                                <div style={{ margin: "auto 0"}}>friend 2</div>
                            </div>
                        </div>
                        <div style={{ padding: "4px 8px"}}>
                            <div style={{ width: "100%", height: "55px", border: "1px solid black",
                                          display: "grid", gridTemplateColumns: "1fr 3fr", gap: "10px"
                            }}>
                                <div style={{backgroundColor:"blue"}}></div>
                                <div style={{ margin: "auto 0"}}>friend 3</div>
                            </div>
                        </div>
                        <div style={{ padding: "4px 8px"}}>
                            <div style={{ width: "100%", height: "55px", border: "1px solid black",
                                          display: "grid", gridTemplateColumns: "1fr 3fr", gap: "10px"
                            }}>
                                <div style={{backgroundColor:"blue"}}></div>
                                <div style={{ margin: "auto 0"}}>friend 4</div>
                            </div>
                        </div>
                    </>
                    ) : (

                    // chat
                    <>
                        <div style={{ padding: "4px 8px"}}>
                            <div style={{ width: "100%", height: "55px", border: "1px solid black",
                                          display: "grid", gridTemplateColumns: "1fr 3fr", gap: "10px"
                            }}>
                                <div style={{backgroundColor:"blue"}}></div>
                                <div style={{ margin: "auto 0"}}>chat 1</div>
                            </div>
                        </div>
                        <div style={{ padding: "4px 8px"}}>
                            <div style={{ width: "100%", height: "55px", border: "1px solid black",
                                          display: "grid", gridTemplateColumns: "1fr 3fr", gap: "10px"
                            }}>
                                <div style={{backgroundColor:"blue"}}></div>
                                <div style={{ margin: "auto 0"}}>chat 2</div>
                            </div>
                        </div>
                        <div style={{ padding: "4px 8px"}}>
                            <div style={{ width: "100%", height: "55px", border: "1px solid black",
                                          display: "grid", gridTemplateColumns: "1fr 3fr", gap: "10px"
                            }}>
                                <div style={{backgroundColor:"blue"}}></div>
                                <div style={{ margin: "auto 0"}}>chat 3</div>
                            </div>
                        </div>
                    </>
                    )}



                </div>
            </div>

        </div>
    );
}
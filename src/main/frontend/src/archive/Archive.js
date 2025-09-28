import ArchiveDetail from "./ArchiveDetail";

import api from '../api'

import React, { useState, useEffect } from 'react';

export default function Archive({ myArchiveList }) {
    const [friendChatToggle, setFriendChatToggle] = useState(true);
    const [showArchiveDetail, setShowArchiveDetail] = useState(false);
    const [SelectedArchiveId, setSelectedArchiveId] = useState('');


    return(
        <div style={{ height: "100%", width:"83%", margin:"auto", background: "#F8FAFC", }}>
            <div style={{ margin: "10px", overflowY: "auto",
                          display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", }}
            >

                {Array.isArray(myArchiveList) && myArchiveList.length > 0 ? (
                    <>
                        {myArchiveList.map((e) => (
                            <div key={e.archiveId}
                                 style={{ border: "1px solid gray", borderRadius:"15px", background:"white",
                                          textAlign: "center", padding: "13px", textAlign:"left",
                                          boxShadow: "0 0 4px rgba(0,0,0,0.2)", }}
                                 onClick={() => {
                                    setSelectedArchiveId(e.archiveId);
                                    setShowArchiveDetail(true);
                                 }}
                            >
                                <div style={{ aspectRatio: "1/1", width: "100%", margin: "auto  0",
                                              border: "1px solid gray", borderRadius:"13px", overflow: "hidden",
                                              boxShadow: "0 0 4px rgba(0,0,0,0.2)", }}>
                                    <img src={`http://localhost:8080/uploads/${e.thumbnailImage}`}
                                         style={{ width:"100%", height:"100%", objectFit: "contain", }} />
                                </div>
                                <div style={{ marginTop: "5px" }}>
                                    <div style={{ fontSize: "14px", color: "gray" }}>
                                        {new Date(e.createdAt).toLocaleDateString()}
                                    </div>
                                    <div style={{ fontSize: "13px" }}>
                                        {e.members.map((em) => (
                                            <span key={em}> {em}</span>
                                        ))}
                                    </div>
                                    <div style={{ fontSize: "23px", fontWeight:"bold" }}>{e.title}</div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div>not exist</div>
                )}


            </div>
        {/* 조건부 렌더링 */}
        {showArchiveDetail && (
            <ArchiveDetail
                onClose={() => setShowArchiveDetail(false)}
                setArchiveId={setSelectedArchiveId}
                archiveId={SelectedArchiveId}
            />
        )}

        </div>
    );
}
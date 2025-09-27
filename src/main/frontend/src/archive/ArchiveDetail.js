import './ArchiveDetail.css';

import api from '../api';

import { useState, useEffect } from 'react';

export default function ArchiveDetail({ onClose, setArchiveId, archiveId }) {
    const [archiveDetail, setArchiveDetail] = useState([]);
    const [selectedImage, setSelectedImage] = useState([]);
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        if(!archiveId || archiveId == '') return;

        console.log(archiveId);
        fetchArchiveDetail();
    }, [archiveId]);

    useEffect(() => {
        if(!selectedImage) return;

        console.log(selectedImage);
    }, [selectedImage]);

    // 아카이브 내용 조회
    const fetchArchiveDetail = async () => {
        try {
            const res = await api.get("v1/archive/content/" + archiveId);

            setArchiveDetail(res.data.data);
            setImageList(res.data.data.images);
            setSelectedImage(Object.keys(res.data.data.images)[0]);
            console.log(res.data.data);
        } catch (err) {
            console.error("검색 에러:", err);
        }
    };


    return (
        <div className="ArchiveDetail">
            {/* ArchiveDetail 본체 */}
            <div style={{ position: "relative", border: "1px solid gray", padding: "10px",
                          borderRadius: "15px", backgroundColor: "#F8FAFC",
                          width: "40%", height: "80%", textAlign: "center", }}
            >
                {/* 닫기 버튼 */}
                <img src="images/close2.png"
                     onClick={() => {
                        setArchiveId('');
                        onClose(false);
                     }}
                     style={{ width: "20px", position: "absolute", top: "20px", right: "28px",
                              cursor: "pointer", }}
                />

                {/* 내용 */}
                <div style={{
                    height: "100%", maxHeight: "100%", width: "100%",
                    textAlign: "left", boxSizing: "border-box", padding: "45px 20px 20px",
                    display: "flex", flexDirection: "column",
                }}>

                    <div style={{ width: "100%", height: "50%", flexShrink: 0, backgroundColor: "white",
                                  border: "1px solid gray", borderRadius:"15px", overflow: "hidden", }}>
                        <img src={`http://localhost:8080${selectedImage}`} alt={selectedImage}
                             style={{ width:"100%", height:"100%", objectFit: "contain", }}
                        />
                    </div>


                    {/* 썸네일 리스트 */}
                    <div style={{ display: "flex", overflowX: "auto", padding: "10px", gap: "10px",
                                  overflow: "hidden", flexShrink: 0 }}>
                    {imageList && Object.keys(imageList).map((path, isThumbnail) => (
                    <div key={path}
                         style={{ flex: "0 0 auto", width: "70px", height: "70px",
                                  border: "1px solid gray", borderRadius:"15px", overflow: "hidden",
                                  cursor: "pointer", position: "relative", backgroundColor: "white", }}
                         onClick={() => setSelectedImage(path)}
                    >
                        <img src={`http://localhost:8080${path}`} alt={path}
                             style={{ width: "100%", height: "100%", objectFit: "cover", }}
                        />
                        {imageList[path] && imageList[path] === true && (
                        <span style={{ position: "absolute", top: "2px", right: "2px",
                                     backgroundColor: "yellow", fontSize: "7px", padding: "2px"
                        }}>
                            썸네일
                        </span>
                        )}
                    </div>
                    ))}
                    </div>


                    <div style={{ overflowY: "auto", flexGrow: 0 }}>
                        <span style={{fontSize: "15px", color:"gray"}}>{new Date(archiveDetail.createdAt).toLocaleDateString()}</span>
                        <br />
                        <span style={{fontSize: "25px", fontWeight:"bold"}}>{archiveDetail.title}</span>
                        <br/>
                        <span style={{fontSize: "15px"}}>{archiveDetail.content}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

import styles from './Login.module.css';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


export default function Signup() {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [nickname, setNickname] = useState('');
    const [pw, setPw] = useState('');
    const [pwConfirm, setPwConfirm] = useState('');
    const [email, setEmail] = useState('');


    const doSignup = async () => {
        if( !checkID() ){ return; }

        console.log(id, pw, pwConfirm, email, nickname);
        try {
            await axios.post('/api/v1/auth', {  // '/auth/login' 으로 요청
                username: id,
                password: pw,
                nickname
            });

            alert("회원가입 성공");
            navigate('/login');

        } catch (err) {
            console.error('에러 발생: ', err);
            alert("회원가입 실패");
        }
    };

    const checkID = () => {
        if (!nickname) {
            alert("닉네임을 입력하세요.");
            return false;
        }

        if (!id) {
            alert("아이디를 입력하세요.");
            return false;
        }

        if (!pw) {
            alert("비밀번호를 입력하세요.");
            return false;
        }

        return true;
    };

    return (
        <div className="login_pg">
            <div className="logbox">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    doSignup();
                }}>
                    <div style={{ width:"100%", margin:"30px 0" }}>
                        <div style={{textAlign: "left", fontSize: "40px", fontWeight: "bold"}}>Welcome!</div>
                        <br />

                        <label htmlFor="nickname">Nickname</label>
                        <br />

                        <input onChange={(e) => setNickname(e.target.value)}
                               style={{ height:"35px", width:"100%", border:"2px solid black", borderRadius:"10px", margin:"20px 0"}}
                        />
                    </div>

                    <div style={{ width:"100%", margin:"30px 0" }}>
                        <label htmlFor="id">ID</label>
                        <br />

                        <input onChange={(e) => setId(e.target.value)}
                               style={{ height:"35px", width:"100%", border:"2px solid black", borderRadius:"10px", margin:"20px 0"}}
                        />
                    </div>

                    <div style={{ width:"100%", margin:"30px 0" }}>
                        <label htmlFor="pw">PASSWORD</label>
                        <br />

                        <input onChange={(e) => setPw(e.target.value)}
                               style={{ height:"35px", width:"100%", border:"2px solid black", borderRadius:"10px", margin:"20px 0"}}
                        />
                    </div>

                    <div>
                        <input type="submit" value="SIGN UP" />
                        <div style={{ margin:"10px", textAlign:"center" }}>
                            <Link to="/login">LOG-IN</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

/*
<div style={{ width:"100%", margin:"50px 0" }}>
                        <label htmlFor="id">ID</label>
                        <br />

                        <input style={{ height:"40px", width:"100%", border:"2px solid black", borderRadius:"10px", margin:"20px 0"}}></input>
                        <button type="button" onClick={checkID}>Duplicate Check</button>
                    </div>

                    <div style={{ width:"100%", margin:"50px 0" }}>
                        <label htmlFor="pw">PASSWORD</label>
                        <br />

                        <input style={{ height:"40px", width:"100%", border:"2px solid black", borderRadius:"10px", margin:"20px 0"}}></input>
                    </div>

                    <div style={{ width:"100%", margin:"50px 0" }}>
                        <label htmlFor="pwConfirm">PASSWORD CHECK</label>
                        <br />

                        <input style={{ height:"40px", width:"100%", border:"2px solid black", borderRadius:"10px", margin:"20px 0"}}></input>
                    </div>

                    <div style={{ width:"100%", margin:"50px 0" }}>
                        <label htmlFor="email">E-MAIL</label>
                        <br />

                        <input style={{ height:"40px", width:"100%", border:"2px solid black", borderRadius:"10px", margin:"20px 0"}}></input>
                    </div>

                    <div>
                        <input type="submit" value="SIGN UP" />
                    </div>
*/

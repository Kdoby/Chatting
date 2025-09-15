import Login from '../login/Login';
import Signup from '../login/Signup';

export default function AuthPage({ type }) {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div style={{
                margin: 0,
                padding: 0,
                height: "100%"
            }}>
                <div style={{ width: "30%", margin: "auto" }}>
                    {type === "login" ? <Login /> : <></>}
                    {type === "signup" ? <Signup /> : <></>}
                </div>
            </div>
        </div>
    );
}

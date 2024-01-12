import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setIsloggedin }) => {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        fetch("http://api.718281.com:8088/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ id, pw }),
        })
            .then((res) => res.json())
            .then((data) => {
                document.cookie =
                    "name=" + data.name + "; Domain=.718281.com; Path=/";

                switch (data.result) {
                    case "already_login":
                        alert("이미 로그인 하셨습니다.");
                        break;
                    case "no_user":
                        alert("id 혹은 pw가 틀렸습니다.");
                        break;
                    case "login_success":
                        setIsloggedin(true);
                        navigate("/");
                        break;
                    case "invaild_value":
                        alert("id 혹은 pw를 입력해 주세요.");
                        break;
                    default:
                        alert("서버에 오류가 생겼습니다. 잠시 후 시도하세요.");
                        break;
                }
            })
            .catch((error) => {
                console.error("로그인 요청 중 에러 발생:", error);
            });
    };

    return (
        <div className="Logincontainer">
            <h1 className="title">회원 로그인</h1>
            <div className="form-container">
                <label className="label">
                    ID:
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="input"
                    />
                </label>
                <label className="label">
                    PW:
                    <input
                        type="password"
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        className="input"
                    />
                </label>
                <div className="Loginbutton-container">
                    <button
                        type="button"
                        onClick={() => handleLogin()}
                        className="Loginbutton"
                    >
                        로그인
                    </button>
                </div>
                <div className="signup-link-container">
                    <span className="signup-link-text">회원이 아니신가요?</span>
                    <Link to="/signup" className="signup-link">
                        회원가입
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;

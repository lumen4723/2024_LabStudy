import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch("http://api.oppspark.net:8088/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ id, pw }),
        })
            .then((res) => {
                // // 쿠키값 확인 코드
                console.log(res.headers.get("Set-Cookie"));
                return res.json();
            })
            .then((data) => {
                switch (data.result) {
                    case "already_login":
                        console.log(data.result);
                        alert("이미 로그인 하셨습니다.");
                        break;
                    case "no_user":
                        console.log(data.result);
                        alert("id 혹은 pw가 틀렸습니다.");
                        break;
                    case "login_success":
                        console.log(data.result);
                        navigate("/");
                        break;
                    case "invaild_value":
                        console.log(data.result);
                        alert("id 혹은 pw를 입력해 주세요.");
                        break;
                    default:
                        console.log(data.log);
                        alert("서버에 오류가 생겼습니다. 잠시 후 시도하세요.");
                        break;
                }
            })
            .catch((error) => {
                console.error("로그인 요청 중 에러 발생:", error);
            });
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(
                "http://api.oppspark.net:8088/logout",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );

            if (response.ok) {
                alert("로그아웃 성공!");
                navigate("/");
            } else {
                alert("로그아웃 실패. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("로그아웃 요청 중 에러 발생:", error);
        }
    };

    return (
        <div className="container">
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
                <div className="button-container">
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="button"
                    >
                        로그인
                    </button>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="button"
                    >
                        로그아웃
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

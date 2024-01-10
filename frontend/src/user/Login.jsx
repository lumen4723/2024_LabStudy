import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch("http://localhost:8088/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ id, pw }),
        })
            .then((res) => {
                // 쿠키값 확인 코드
                console.log(res.headers.get("Set-Cookie"));
                return res.json();
            })
            .then((data) => {
                if (data.result === "already_login") {
                    navigate("/");
                    console.log(data.result);
                } else if (data.result === "login_success") {
                    navigate("/");
                    console.log(data.result);
                } else if (data.result === "no_user") {
                    alert("id 혹은 pw가 맞지 않습니다.");
                }
            })
            .catch((error) => {
                console.error("로그인 요청 중 에러 발생:", error);
            });
    };

    const handleLogout = async () => {
        await fetch("http://coin.oppspark.net:8088/login", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).catch((error) => {
            console.error("로그아웃 요청 중 에러 발생:", error);
        });
        alert("로그아웃 성공!");
        navigate("/");
    };

    return (
        <div>
            <label>
                ID:
                <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
            </label>
            <br />
            <label>
                PW:
                <input
                    type="password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                />
            </label>
            <br />
            <button type="button" onClick={handleLogin}>
                로그인
            </button>
            <button type="button" onClick={handleLogout}>
                로그아웃
            </button>
            <Link to="/signup">
                <button type="button">회원가입</button>
            </Link>
        </div>
    );
};

export default Login;

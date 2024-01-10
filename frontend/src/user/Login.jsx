import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

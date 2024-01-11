import "./Signup.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [pw, setPw] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        await fetch("http://localhost:8088/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, username, pw }),
        })
            .then((res) => res.json())
            .then((data) => {
                switch (data.result) {
                    case "already_exist":
                        alert("이미 존재하는 아이디입니다.");
                        break;
                    case "data_too_long":
                        alert("id 혹은 pw가 너무 깁니다.");
                        break;
                    case "register_success":
                        alert("회원가입 되었습니다. 로그인 후 이용해 주세요.");
                        navigate("/login");
                        break;
                    case "invaild_value":
                        alert("id 혹은 pw를 입력해 주세요.");
                        break;
                    case "register_fail":
                        alert("회원가입에 실패하였습니다.");
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
        <div className="container">
            <label>ID: </label>
            <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />

            <label>Username: </label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label>Password: </label>
            <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
            />

            <button onClick={() => handleSignup()}>회원가입</button>
        </div>
    );
};

export default Signup;

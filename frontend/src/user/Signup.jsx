import "./Signup.css";

import React, { useState } from "react";

const Signup = () => {
    const [formData, setFormData] = useState({
        id: "",
        username: "",
        pw: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSignup = async () => {
        const response = await fetch("http://coin.oppspark.net:8088/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .catch((error) => {
                console.log("회원가입 오류");
            })
            .then((data) => {
                if (data.result === "invaild_value") {
                    alert("id 또는 password 값을 입력하세요. ");
                    console.log(data.result);
                }
                if (data.result === "register_success") {
                    alert("회원가입 완료되었습니다. 로그인하세요.");
                    navigator("/login");
                }
            });
    };

    return (
        <div className="signup">
            <label>
                ID:
                <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    name="pw"
                    value={formData.pw}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <button onClick={handleSignup}>회원가입</button>
        </div>
    );
};

export default Signup;

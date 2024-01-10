import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch("http://localhost:8088/logout", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    alert("로그아웃 성공!");
                    navigate("/", { replace: true });
                } else {
                    alert("로그아웃 실패. 다시 시도해주세요.");
                }
            })
            .catch((error) => {
                console.error("로그아웃 요청 중 에러 발생:", error);
            });
    };

    return handleLogout();
};

export default Logout;

import { useNavigate } from "react-router-dom";

const Logout = ({ setIsloggedin }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch("http://api.718281.com:8088/logout", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    setIsloggedin(false);
                    navigate("/");
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

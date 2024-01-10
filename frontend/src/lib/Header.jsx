import "./Header.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // js-cookie 라이브러리를 사용
// import { useCookies } from "react-cookie";

const Header = () => {
    const [username, setUsername] = useState(null);

    // const cookieValue = Cookies.get("name");
    // if (cookieValue) {
    //     setUsername(cookieValue);
    // }

    useEffect(() => {
        const cookieValue = Cookies.get("name");
        if (cookieValue) {
            setUsername(cookieValue);
        }
    }, []);

    return (
        <div className="HeaderDIV">
            <header>
                <Link to="http://localhost:3000/">
                    <h1>코인라이프</h1>
                </Link>
                <ul className="menu">
                    <li>
                        <Link to="/coinchart">코인차트</Link>
                    </li>
                    <li>
                        <Link to="/freeboard">자유게시판</Link>
                    </li>
                    <li>
                        <Link to="/qnaboard">질문게시판</Link>
                    </li>
                </ul>

                <ul className="sign">
                    {username ? (
                        <>
                            <li>
                                환영합니다 <br />
                                {username}님!
                            </li>
                            <li>
                                <Link to="/logout">로그아웃</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">로그인</Link>
                            </li>
                            <li>
                                <Link to="/signup">회원가입</Link>
                            </li>
                        </>
                    )}
                </ul>
            </header>
            <hr />
        </div>
    );
};

export default Header;

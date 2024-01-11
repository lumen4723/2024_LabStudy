import "./Header.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ isloggedin }) => {
    const [username, setUsername] = useState("nowloading...");

    useEffect(() => {
        const cookieValue = Cookies.get("name");
        console.log(cookieValue);
        if (cookieValue) {
            setUsername(cookieValue);
        }
    }, [isloggedin]);

    return (
        <div className="HeaderDIV">
            <header>
                <Link to="/">
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
                    {isloggedin ? (
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

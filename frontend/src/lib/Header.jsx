import './Header.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    return (

        <div classname = "HeaderDIV">
            <header>
                <Link to="http://localhost:3000/">
                    <h1>코인라이프</h1>
                </Link>
                <ul>
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

                <div className="list"></div>
                <div className="sign">
                    <Link to="/login">
                        <p>로그인</p>
                    </Link>
                </div>
            </header>
            <hr />
        </div>
    );
};

export default Header;
import "./Qnaboard.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Qnaboard = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("http://localhost:8088/qna", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    data.sort((a, b) => b.id - a.id);
                    console.log(data);
                    setPosts(data);
            })
            .catch((error) => {
                console.error(
                "게시글 목록을 불러오는 중 오류 발생:", error
                );
            });
        };
        fetchPosts();
    }, []);

    return (
        <div className="qnaboard">
            <h1 className="qnatitle">질문 게시글 목록</h1>
            <ul className="post-list">
                {posts.map((post) => (
                    <li className="post" key={post.id}>
                        <Link
                            className="detailbtn"
                            to={`/qnaboard/${post.id}`}
                        >
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link className="writebtn" to="/qnaboard/write">
                새 질문 쓰기
            </Link>
        </div>
    );
};

export default Qnaboard;

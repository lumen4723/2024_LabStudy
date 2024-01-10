import "./Freeboard.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Freeboard = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("http://localhost:8088/free", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setPosts(data);
                })
                .catch((error) => {
                    console.error(
                        "게시글 목록을 불러오는 중 오류 발생:",
                        error
                    );
                });
        };
        fetchPosts(); // fetchPosts 함수 호출
    }, []);

    return (
        <div className="freeboard">
            <h1 className="freetitle">게시글 목록</h1>
            <ul className="post-list">
                {posts.map((post) => (
                    <li className="post" key={post.id}>
                        <Link
                            className="detailbtn"
                            to={`/freeboard/${post.id}`}
                        >
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link className="writebtn" to="/freeboard/write">
                새 글 쓰기
            </Link>
        </div>
    );
};

export default Freeboard;

import "./Freeboard.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Freeboard = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        await fetch("http://api.718281.com:8088/free", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
            })
            .catch((error) => {
                console.error("게시글 목록을 불러오는 중 오류 발생:", error);
            });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="freeboard">
            <h1 className="freetitle">게시글 목록</h1>
            <ul className="post-list">
                {posts.map((post) => (
                    <li className="postfree" key={post.id}>
                        <Link
                            className="detailbtn"
                            to={`/freeboard/${post.id}`}
                        >
                            {post.title}
                        </Link>
                        <Link
                            className="detailbtn"
                            to={`/freeboard/${post.id}`}
                        >
                            {post.content}
                        </Link>
                        <span className="author">{post.userid}</span>
                        <span className="created">{post.created}</span>
                        <span className="view">{post.view}</span>
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

import "./Freeboard.css";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Freeboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
        const response = await fetch('http://api.oppspark.net:8088/free', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
            setPosts(data);
        }).catch((error) => {
            console.error('게시글 목록을 불러오는 중 오류 발생:', error);
        })
    };
    fetchPosts(); // fetchPosts 함수 호출
}, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  return (
    <div>
      <h1>게시글 목록</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/freeboard/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Freeboard;

import "./FreeboardDetail.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FreeboardDetail = () => {
  const [title, setTitle] = useState("nowloading...");
  const [content, setContent] = useState("nowloading...");
  const [author, setAuthor] = useState("nowloading...");
  const [created, setCreated] = useState("nowloading...");
  const [view, setView] = useState("nowloading...");

  const [titleC, setTitleComment] = useState("nowloading...");
  const [contentC, setContentComment] = useState("nowloading...");
  const [authorC, setAuthorComment] = useState("nowloading...");
  const [createdC, setCreatedComment] = useState("nowloading...");

  const navigate = useNavigate();

  const { id: boardid } = useParams();
  const [comments, setComments] = useState([]);

  const getfboard = async ({ id }) => {
    await fetch(`http://api.oppspark.net:8088/free/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(id);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTitle(data.title);
        setAuthor(data.userid);
        setCreated(data.created);
        setView(data.view);
        setContent(data.content);
      })
      .catch((error) => {
        console.error("게시글 정보를 불러오는 중 에러 발생:", error);
      });
  };

  useEffect(() => {
    if (boardid) {
      console.log("1 : " + boardid);
      getfboard({ id: boardid });
      getcomment({ id: boardid }); // getcomment 함수 호출 추가
    } else {
      // console.log("2 : " + boardid);
      alert("잘못된 접근입니다.");
    }
  }, [boardid]);

  const getcomment = async ({ id }) => {
    await fetch(`http://api.oppspark.net:8088/free/${id}/comment`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComments(data); // 가져온 댓글로 'comments' 상태를 업데이트
      })
      .catch((error) => {
        console.error("댓글 정보를 불러오는 중 에러 발생:", error);
      });
  };

  const updateComments = (newComments) => {
    setComments(newComments);
  };

  return (
    <div className="freeboarddetail">
      <div>
        <h1>{title}</h1>
        <p>{content}</p>
        <p>작성자: {author}</p>
        <p>작성 시간: {created}</p>
        <p>조회수: {view}</p>
      </div>

      <hr></hr>
        <p>댓글 입력하기</p>

      <hr></hr>

    <h3>댓글</h3>
    
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>작성자: {comment.userid}</p>
            <p>작성 시간: {comment.created}</p>
            <p>작성 내용{comment.content}</p>
            <hr></hr>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeboardDetail;

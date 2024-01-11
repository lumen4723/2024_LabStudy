import "./QnaboardDetail.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const QnaboardDetail = () => {
  const [title, setTitle] = useState("nowloading...");
  const [content, setContent] = useState("nowloading...");
  const [author, setAuthor] = useState();
  const [created, setCreated] = useState();
  const [view, setView] = useState();

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const { id: boardid } = useParams();

  const getfboard = async ({ id }) => {
    await fetch(`http://localhost:8088/qna/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle(data[0].title);
        setAuthor(data[0].userid);
        setCreated(data[0].created);
        setView(data[0].view);
        setContent(data[0].question);
      })
      .catch((error) => {
        console.error("게시글 정보를 불러오는 중 에러 발생:", error);
      });
  };

  const getcomment = async ({ id }) => {
    await fetch(
      `http://localhost:8088/qna/${id}
    /answer`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error("댓글 정보를 불러오는 중 에러 발생:", error);
      });
  };

  useEffect(() => {
    if (boardid) {
      getfboard({ id: boardid });
      getcomment({ id: boardid });
    } else {
      alert("잘못된 접근입니다.");
    }
  }, [boardid]);

  const commentUpload = async ({ boardid, comment }) => {
    console.log("보내는 값:", { boardid, comment });

    await fetch(`http://localhost:8088/qna/${boardid}/answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ comment: comment }),
    })
      .then((res) => res.json())
      .then((data) => {
        switch (data.result) {
          case "no_session":
            alert("로그인을 하고 작성하세요.");
            navigate("/login");
            break;
          case "qna_success":
            alert("답변이 등록되었습니다.");
            navigate(`/qnaboard/detail/${boardid}`);
            break;
          default:
            alert("알 수 없는 에러가 발생했습니다.");
            break;
        }
      })
      .catch((error) => {
        console.error("댓글 업로드 중 에러 발생:", error);
      });
  };

  return (
    <div className="qnaboarddetail">
      <div>
        <h1>{title}</h1>
        <p>{content}</p>
        <p>작성자: {author}</p>
        <p>작성 시간: {created}</p>
        <p>조회수: {view}</p>

        <Link to={`/qnaboard/edit/${boardid}`}>
          <button type="button" className="post_edit">
            개시글 수정
          </button>
        </Link>
      </div>

      <hr></hr>
      {comments.length === 0 && (
        <>
          <p>답변 입력하기</p>

          <textarea
            id="comment_txt"
            name="comment"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <button
            className="comment_edit"
            onClick={() => commentUpload({ boardid, comment })}
          >
            답변 등록
          </button>
        </>
      )}

      <h3>ANSWER</h3>

      <div className="qnaComment">
        {comments.map((comm) => (
          <div key={comm.id}>
            <p>작성자: {comm.userid}</p>
            <p>작성 시간: {comm.created}</p>
            <p>작성 내용{comm.answer}</p>
            <hr></hr>
          </div>
        ))}
      </div>
    </div>
  );
};
export default QnaboardDetail;

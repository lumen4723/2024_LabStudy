import "./FreeboardDetail.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const FreeboardDetail = () => {
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
        await fetch(`http://localhost:8088/free/${id}`, {
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
                setContent(data[0].content);
            })
            .catch((error) => {
                console.error("게시글 정보를 불러오는 중 에러 발생:", error);
            });
    };

    const getcomment = async ({ id }) => {
        await fetch(`http://localhost:8088/free/${id}/comment`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
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
        await fetch(`http://localhost:8088/free/${boardid}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ content: comment }),
        })
            .then((res) => res.json())
            .then((data) => {
                switch (data.result) {
                    case "no_session":
                        alert("로그인을 하고 작성하세요.");
                        navigate("/login");
                        break;
                    case "invaild_value":
                        alert("댓글을 입력하세요.");
                        break;
                    case "invaild_session":
                        alert("로그인을 하고 작성하세요.");
                        navigate("/login");
                        break;
                    case "data_too_long":
                        alert("댓글이 너무 깁니다.");
                        break;
                    case "fcompost_success":
                        alert("댓글이 작성되었습니다.");
                        navigate(`/freeboard/${boardid}`);
                        break;
                    case "fcompost_fail":
                        alert("댓글 작성에 실패했습니다.");
                        navigate(`/freeboard/${boardid}`);
                        break;
                    default:
                        alert(
                            "서버 오류가 있습니다. 잠시 후 다시 작성해 주세요."
                        );
                        navigate(`/freeboard/${boardid}`);
                        break;
                }
            })
            .catch((error) => {
                console.error("게시글 수정 중 에러 발생", error);
            });
    };

    return (
        <div className="freeboarddetail">
            <div className="post">
                <h1 className="title">{title}</h1>
                <hr />
                <p>{content}</p>
                <hr />
                <p>작성자: {author}</p>
                <p>작성 시간:{new Date(created).toLocaleDateString('ko-KR')} {new Date(created).toLocaleTimeString('ko-KR')}</p>
                
                <p>조회수: {view}</p>

                <Link className="post_edit" to={`/freeboard/edit/${boardid}`}>
                    개시글 수정
                </Link>
            </div>

            <hr />
            <p>댓글 입력하기</p>

            <textarea
                id="comment_txt"
                name="comment"
                onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <button
                className="comment_post"
                onClick={() => commentUpload({ boardid, comment })}
            >
                댓글 등록
            </button>

            <hr />

            <h3>댓글</h3>

            <div className="freeComment-list">
                {comments.map((comm) => (
                    <div className="freeComment" key={comm.id}>
                        <p>작성자: {comm.userid}</p>

                       
                        
                        <p>작성 시간: {new Date(comm.created).toLocaleDateString('ko-KR')} {new Date(comm.created).toLocaleTimeString('ko-KR')}</p>
                        <p>작성 내용: {comm.content}</p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FreeboardDetail;

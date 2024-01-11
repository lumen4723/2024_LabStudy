import "./QnaboardDetail.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const QnaboardDetail = () => {
    const [title, setTitle] = useState("nowloading...");
    const [content, setContent] = useState("nowloading...");
    const [author, setAuthor] = useState("nowloading...");
    const [created, setCreated] = useState("nowloading...");
    const [view, setView] = useState("nowloading...");

    const [titleC, setTitleComment] = useState("nowloading...");
    const [contentC, setContentComment] = useState("nowloading...");
    const [authorC, setAuthorComment] = useState("nowloading...");
    const [createdC, setCreatedComment] = useState("nowloading...");
    const [commentCount, setCommentCount] = useState(0);

    const navigate = useNavigate();

    const { id: boardid } = useParams();
    const [comments, setComments] = useState([]);

    const id = boardid;

    const getfboard = async ({ id }) => {
        await fetch(`http://localhost:8088/qna/${id}`, {
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
        await fetch(`http://localhost:8088/qna/${id}/answer`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setComments(data); // 가져온 댓글로 'comments' 상태를 업데이트
                setCommentCount(data.length); // 댓글 개수 업데이트
            })
            .catch((error) => {
                console.error("댓글 정보를 불러오는 중 에러 발생:", error);
            });
    };

    const updateComments = (newComments) => {
        setComments(newComments);
    };

    const handleSubmit = async ({ id }) => {
        const response = await fetch(`http://localhost:8088/qna/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
        })
            .then((res) => {
                console.log("handleSubmit : " + id);
                return res.json();
            })
            .then((data) => {
                switch (data.result) {
                    case "no_session":
                        console.log(data.result);
                        alert("로그인을 하고 작성하세요.");
                        break;
                    case "invaild_value":
                        console.log(data.result);
                        alert("타이틀 또는 내용을 입력하세요.");
                        break;
                    case "data_too_long":
                        console.log(data.result);
                        alert("내용이 너무 깁니다.");
                        break;
                    case "qnaput_success":
                        console.log(data.result);
                        alert("게시글이 작성되었습니다.");
                        navigate("/qnaboard");
                        break;
                    case "qnaput_fail":
                        console.log(data.result);
                        alert("게시글 작성에 실패했습니다.");
                        break;
                    default:
                        console.log(data.result);
                        alert(
                            "서버 오류가 있습니다. 잠시 후 다시 작성해 주세요."
                        );
                }
            })
            .catch((error) => {
                console.error("게시글 수정 중 에러 발생", error);
            });
    };

    const commentUpload = async ({ id }) => {
        const response = await fetch(`http://localhost:8088/qna/${id}/answer`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ comments }),
        })
            .then((res) => {
                console.log("commentUpload : " + id);
                return res.json();
            })
            .then((data) => {
                switch (data.result) {
                    case "no_session":
                        console.log(data.result);
                        alert("로그인을 하고 작성하세요.");
                        break;
                    case "invaild_value":
                        console.log(data.result);
                        alert("내용을 입력하세요.");
                        break;
                    case "data_too_long":
                        console.log(data.result);
                        alert("내용이 너무 깁니다.");
                        break;
                    case "qnaput_success":
                        console.log(data.result);
                        alert("게시글이 작성되었습니다.");
                        navigate("/qnaboard");
                        break;
                    case "qnaput_fail":
                        console.log(data.result);
                        alert("댓글 작성에 실패했습니다.");
                        break;
                    default:
                        console.log(data.result);
                        alert(
                            "서버 오류가 있습니다. 잠시 후 다시 작성해 주세요."
                        );
                }
            })
            .catch((error) => {
                console.error("게시글 수정 중 에러 발생", error);
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

                <Link to={`/qnaboard/edit/${id}`}>
                    <button type="button" className="post_edit">
                        게시글 수정
                    </button>
                </Link>
            </div>

            <hr></hr>
            <p>답변 입력하기</p>

            <textarea
                id="comment_txt"
                name="comment"
                onChange={(e) => setContentComment()}
            ></textarea>

            <div className="comment_edit">
                {commentCount < 1 ? (
                    <button onClick={commentUpload}> 답변 작성 </button>
                ) : (
                    <p>답변은 한 개까지만 작성 가능합니다.</p>
                )}
            </div>

            <hr></hr>

            <h3>ANSWER</h3>

            <div className="qnaComment">
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

export default QnaboardDetail;

import "./QnaboardEdit.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const QnaboardEdit = () => {
    const [title, setTitle] = useState("nowloading...");
    const [content, setContent] = useState("nowloading...");
    const { id: postid } = useParams();
    const navigate = useNavigate();

    const editVaildCheck = async ({ boardid }) => {
        await fetch(`http://localhost:8088/qna/${boardid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.result === "edit_vaild") {
                    navigate(`/qnaboard/edit/${boardid}`);
                    return true;
                } else {
                    console.log(data.result);
                    alert("게시글 수정 권한이 없습니다.");
                    navigate(`/qnaboard/${boardid}`);
                    return false;
                }
            })
            .catch((error) => {
                console.error("게시글 정보를 불러오는 중 에러 발생:", error);
            });
    };

    const fetchPost = async ({ id }) => {
        await fetch(`http://localhost:8088/qna/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setTitle(data[0].title);
                setContent(data[0].question);
            })
            .catch((error) => {
                console.error("게시글 정보를 불러오는 중 에러 발생:", error);
            });
    };

    useEffect(() => {
        if (postid) {
            if (editVaildCheck({ boardid: postid })) {
                fetchPost({ id: postid });
            }
        } else {
            alert("잘못된 접근입니다.");
        }
    }, [postid]);

    const handleSubmit = async ({ postid }) => {
        console.log({postid})
        await fetch(`http://localhost:8088/qna/${postid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ content }),
        })
            .then((res) => res.json())
            .then((data) => {
                switch (data.result) {
                    case "no_session":
                        alert("로그인을 하고 작성하세요.");
                        navigate("/login");
                        break;
                    case "invaild_value":
                        alert("내용을 입력하세요.");
                        break;
                    case "data_too_long":
                        alert("내용이 너무 깁니다.");
                        break;
                    case "qnaedit_success":
                        alert("게시글이 수정되었습니다.");
                        navigate("/qnaboard");
                        break;
                    case "qnaedit_fail":
                        alert("게시글 수정에 실패했습니다.");
                        break;
                    case "no_authority":
                        alert("게시글 수정 권한이 없습니다.");
                        navigate("/qnaboard");
                        break;
                    default:
                        alert(
                            "서버 오류가 있습니다. 잠시 후 다시 작성해 주세요."
                        );
                }
            })
            .catch((error) => {
                console.error("게시글 수정 중 에러 발생", error);
            });
    };

    const handlDelete = async ({ postid }) => {
        const response = await fetch(`http://localhost:8088/qna/${postid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => {
                console.log("handDelete : " + postid);
                return res.json();
            })
            .then((data) => {
                switch (data.result) {
                    case "no_session":
                        console.log(data.result);
                        alert("로그인 후 이용해 주세요.");
                        break;
                    case "no_authority":
                        console.log(data.result);
                        alert("삭제 권한이 없습니다.");
                        break;
                    case "qnadelete_fail":
                        console.log(data.result);
                        alert("삭제에 실패했습니다.");
                        break;
                    case "qnadelete_success":
                        console.log(data.result);
                        alert("삭제되었습니다.");
                        navigate("/qnaboard");
                        break;
                    default:
                        console.log(data.result);
                        alert(
                            "서버에 오류가 있습니다. 잠시 후 다시 삭제하세요."
                        );
                        break;
                }
            })
            .catch((error) => {
                console.error("게시글 수정 중 에러 발생", error);
            });
    };

    return (
        <div className="qnaboardedit">
            <text type="text" id="title_txt" name="title">
                {title}
            </text>
            <textarea
                id="content_edit"
                name="content"
                onChange={(e) => setContent(e.target.value)}
                value={content}
            ></textarea>
            <div className="button_container">
                <button
                    className="post_edit"
                    onClick={() => handleSubmit({ postid })}
                >
                    {" "}
                    수정{" "}
                </button>
                <button
                    className="post_del"
                    onClick={() => handlDelete({ postid })}
                >
                    {" "}
                    삭제{" "}
                </button>
            </div>
        </div>
    );
};

export default QnaboardEdit;

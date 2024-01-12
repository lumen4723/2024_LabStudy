import "./QnaboardWrite.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const QnaboardWrite = () => {
    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");

    const navigate = useNavigate();

    const vaild_write = async () => {
        await fetch("http://api.718281.com:8088/vaildlogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.result === "already_login") {
                } else {
                    alert("로그인을 하고 작성하세요.");
                    navigate("/qnaboard");
                }
            })
            .catch((error) => {
                console.error("로그인 확인 중 에러 발생:", error);
            });
    };

    useEffect(() => {
        vaild_write();
    }, []);

    const handleSubmit = async ({ title, question }) => {
        await fetch("http://api.718281.com:8088/qna", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ title, question }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                switch (data.result) {
                    case "no_session":
                        alert("로그인을 하고 작성하세요.");
                        navigate("/login");
                        break;
                    case "invaild_value":
                        alert("타이틀 또는 내용을 입력하세요.");
                        break;
                    case "data_too_long":
                        console.log(data.result);
                        alert("내용이 너무 깁니다.");
                        break;
                    case "qna_success":
                        console.log(data.result);
                        alert("게시글이 작성되었습니다.");
                        navigate("/qnaboard");
                        break;
                    case "qna_fail":
                        console.log(data.result);
                        alert("게시글 작성에 실패했습니다.");
                        navigate("/qnaboard");
                        break;
                    default:
                        console.log(data.result);
                        alert(
                            "서버 오류가 있습니다. 잠시 후 다시 작성해 주세요."
                        );
                }
            })
            .catch((error) => {
                console.error("게시글 업로드 중 에러 발생:", error);
            });
    };

    return (
        <div className="qnaboardwrite">
            <input
                type="text"
                id="title_txt"
                name="title"
                placeholder="제목"
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                id="question_write"
                name="question"
                placeholder="내용을 입력하세요."
                onChange={(e) => setQuestion(e.target.value)}
            ></textarea>
            <button
                className="post_submit"
                onClick={() => handleSubmit({ title, question })}
            >
                작성
            </button>
        </div>
    );
};

export default QnaboardWrite;

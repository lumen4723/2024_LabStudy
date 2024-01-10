import "./FreeboardDetail.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FreeboardDetail = () => {
    const [title, setTitle] = useState("nowloading...");
    const [content, setContent] = useState("nowloading...");
    const [author, setAuthor] = useState("nowloading...");
    const [created, setCreated] = useState("nowloading...");
    const [view, setView] = useState("nowloading...");
    const navigate = useNavigate();
    const { id: boardid } = useParams();

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
            // console.log("1 : " + boardid);
            getfboard({ id: boardid });
        } else {
            // console.log("2 : " + boardid);
            alert("잘못된 접근입니다.");
        }
    }, [boardid]);

    return (
        <div className="freeboarddetail">
            <div className="title">{title}</div>

            <div className="author">{author}</div>
            <div className="created">{created}</div>
            <div className="view">{view}</div>

            <div className="content">{content}</div>
        </div>
    );
};

export default FreeboardDetail;

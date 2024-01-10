import "./FreeboardEdit.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FreeboardEdit = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [id, setPostId] = useState(null);
    const navigate = useNavigate();

    const fetchPost = async ( {id} ) => {
        console.log("fetchPost 실행");
        console.log(id);
        const response = await fetch(`http://coin.oppspark.net:8088/free/${id}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            console.log(id);
            return res.json();
        }).then((data) => {
            setTitle(data.title);
            setContent(data.content);
        }).catch((error) => {
            console.error('게시글 정보를 불러오는 중 에러 발생:', error);
        });
    };
    
    //페이지 로딩 시 id가 존재하면 해당 게시글의 정보를 불러옴
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const postId = params.get('id');
        console.log("useEffect load");
        if (postId) {;
          setPostId(postId);
          fetchPost(postId);
        }
        console.log(postId);
      }, []);

    const handleSubmit = async ( {id} ) => { 
        const response = await fetch(`http://coin.oppspark.net:8088/free/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
        }).then((data) => {
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
                case "freeput_success":
                    console.log(data.result);
                    alert("게시글이 작성되었습니다.");
                    navigate('/freeboard');
                    break;
                case "freeput_fail":
                    console.log(data.result);
                    alert("게시글 작성에 실패했습니다.");
                    break;
                default:
                    console.log(data.result);
                    alert("서버 오류가 있습니다. 잠시 후 다시 작성해 주세요.");
            }
        }).then((res) => {
            return res.json();
        }).catch((error) => {
            console.error("게시글 수정 중 에러 발생",error);
        });
    };

    const handlDelete = async ( {id} ) => { 
        const response = await fetch(`http://coin.oppspark.net:8088/free/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((data) => {
            if(data.result === "no_authority") {
                console.log(data.result);
                alert("삭제 권한이 없습니다.");
            }
            if(data.result === "freedel_success") {
                console.log(data.result);
                alert("삭제가 완료되었습니다.");
                navigate('/freeboard');
            }
        }).catch((error) => {
            console.error("게시글 수정 중 에러 발생",error);
        });
    };
    
    return (
        <div className="freeboardedit">
            <div>
                <input type = 'text' id = 'title_txt' name = 'title'/>
            </div>
            <div>
                <textarea id = 'content_txt' name = 'content' onChange={(e) => setContent(e.target.value)}>
                </textarea>
            </div>
            <div className= "post_edit">
                <button onClick= {() => handleSubmit(id)}> 포스트 수정 </button>
            </div>
            <div className = "post_del">
                <button onClick= {() => handlDelete(id)}> 포스트 삭제 </button>
            </div>
        </div>
    );
};

export default FreeboardEdit;

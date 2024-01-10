import "./FreeboardWrite.css";
import { useNavigate } from "react-router-dom";

const FreeboardWrite = () => {
    const navigate = useNavigate();
    const handleSubmit = async () => {
        const title = document.getElementById("title_txt").value;
        const content = document.getElementById("content_txt").value;

        const response = await fetch("http://localhost:8088/free", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ title, content }),
             })
            .then((res) => {
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
                    case "freepost_success":
                        console.log(data.result);
                        alert("게시글이 작성되었습니다.");
                        navigate("/freeboard");
                        break;
                    case "freepost_fail":
                        console.log(data.result);
                        alert("게시글 작성에 실패했습니다.");
                        break;
                    default:
                        console.log(data.result);
                        alert("서버 오류가 있습니다. 잠시 후 다시 작성해 주세요.");
                }
            })
            .catch((error) => {
                console.error("게시글 업로드 중 에러 발생:", error);
            });
    };

    return (
        <div className="freeboardwrite">
            <div>
                <input
                    type="text"
                    id="title_txt"
                    name="title"
                    placeholder="제목"
                />
            </div>
            <div>
                <textarea
                    id="content_txt"
                    name="content"
                    placeholder="내용을 입력하세요."
                ></textarea>
            </div>
            <div className="post_submit">
                <button onClick={handleSubmit}> 포스트 등록 </button>
            </div>
        </div>
    );
};

export default FreeboardWrite;

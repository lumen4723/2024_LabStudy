import "./FreeboardWrite.css";
import { useNavigate } from 'react-router-dom';

const FreeboardWrite = () => {
    const navigate = useNavigate();
    const handleSubmit = async () => {
        const title = document.getElementById('title_txt').value;
        const content = document.getElementById('content_txt').value;

        const response = await fetch('http://coin.oppspark.net:8088/free', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content }) 
        }).then((data) => {
            if(data.result === "invaild_value")
            {
                alert("타이틀 또는 내용을 입력하세요.");
                console.log(data.result);
            }
            if(data.result === "freepost_success")
            {
                alert("게시글이 업로드 되었습니다.");
                navigate('/');
                console.log(data.result);
            }
        }).catch((error) => {
            console.error("게시글 업로드 중 에러 발생:", error);
        })
    };

    return (
        <div className="freeboardwrite">
            <div>
                <input type = 'text' id = 'title_txt' name = 'title' placeholder="제목"/>
            </div>
            <div>
                <textarea id = 'content_txt' name = 'content' placeholder="내용을 입력하세요.">
                </textarea>
            </div>
            <div className= "post_submit">
                <button onClick= {handleSubmit}> 포스트 등록 </button>
            </div>
        </div>
    );
};

export default FreeboardWrite;

import "./FreeboardWrite.css";

const FreeboardWrite = () => {
    // 포스트 등록 버튼을 클릭했을 때의 동작을 정의하는 함수
    const handleSubmit = async () => {
        const title = document.getElementById('title_txt').value;
        const contents = document.getElementById('content_txt').value;

        const response = await fetch('http://coin.oppspark.net/free/write', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, contents }) 
        });

        if (response.ok) {
            // 응답이 성공적이면 실행되는 코드
            alert('포스트가 성공적으로 등록되었습니다.');
        } else {
            // 응답이 실패하면 실행되는 코드
            alert('포스트 등록에 실패했습니다.');
        }
    };

    return (
        <div className="freeboardwrite">
            <div>
                <input type = 'text' id = 'title_txt' name = 'title' placeholder="제목"/>
            </div>
            <div>
                <textarea id = 'content_txt' name = 'contents' placeholder="내용을 입력하세요.">
                </textarea>
            </div>
            <div className= "post_submit">
                {/* 버튼 클릭 시 handleSubmit 함수를 실행하도록 수정 */}
                <button onClick= {handleSubmit}> 포스트 등록 </button>
            </div>
        </div>
    );
};

export default FreeboardWrite;

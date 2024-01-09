import "./FreeboardEdit.css";

const FreeboardEdit = () => {
    const handleSubmit = async ( {id} ) => {
        const response = await fetch(`http://coin.oppspark.net:8088/free/${id}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            console.log(id);
            return res.json();
        })
    };
    
    return (
        <div className="freeboardedit">
            <div>
                <input type = 'text' id = 'title_txt' name = 'title' placeholder="제목"/>
            </div>
            <div>
                <textarea id = 'content_txt' name = 'content' placeholder="내용을 입력하세요.">
                </textarea>
            </div>
            <div className= "post_edit">
                <button onClick= {handleSubmit}> 포스트 수정 </button>
            </div>
        </div>
    );
};

export default FreeboardEdit;

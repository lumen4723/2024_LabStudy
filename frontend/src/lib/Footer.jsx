import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <hr />
      <div className="content">
        <p>
          <span>사용된 언어: Node.js, React</span><br/>
          <span>프론트엔드 멤버: 강다은, 강동협, 안제혁</span><br/>
          <span>백엔드 멤버: 하민우, 박준규</span><br/>
          <span>총괄 매니저: 하민우</span><br/>
          <h3>겨울방학 프로젝트</h3>
        </p>
      </div>
      <div>
      <img
          className="logo"
          src="https://cdn.imweb.me/thumbnail/20171223/5a3e047a398e9.png"
          alt="경성대학교 로고"
        />
      </div>
    </footer>
  );
};

export default Footer;
import "./Footer.css";

import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const toggleInfo = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  return (
    <footer>
      <div>
        <hr className="footerHr"/>
      <button onClick={toggleInfo} className={`triangle-button ${isInfoVisible ? 'down' : ''}`}></button>
      {isInfoVisible && (
        <div className="footerContent">
          <p className="footerP">
            <span className="footerSpan">사용된 언어: Node.js, React</span><br/>
            <span className="footerSpan">프론트엔드 멤버: 강다은, 강동협, 안제혁</span><br/>
            <span className="footerSpan">백엔드 멤버: 하민우, 박준규</span><br/>
            <span className="footerSpan"> 총괄 매니저: 하민우</span><br/>
            <span className="footerH3">겨울방학 프로젝트</span>
              <img
                  className="logo"
                  src="https://cdn.imweb.me/thumbnail/20171223/5a3e047a398e9.png"
                  alt="경성대학교 로고"
              />
          </p>
        </div>
      )}
      </div>
      <span style={{ fontSize: '12px', opacity: '0.8' }}>코인 좀 아는 사람들</span>
    </footer>
  );
};

export default Footer;

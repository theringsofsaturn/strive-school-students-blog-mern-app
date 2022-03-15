import "./header.css";
import titleLogo from "../../assets/blog1.png"
const Header = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        <img  
        className="headerImgTitle"
        src={titleLogo} 
        alt="" />
        {/* <span className="headerTitleSm">Strive School Students</span> */}
        {/* <span className="headerTitleLg">BLOG</span> */}
      </div>
      {/* <div>
      <img
        className="headerImg"
        src="https://strive.school/assets/generics/covers/fullstack.png"
        alt=""
      />
      </div> */}
      
    </div>
  );
};

export default Header;

import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Strive School Students</span>
        <span className="headerTitleLg">BLOG</span>
      </div>
      <div>
      <img
        className="headerImg"
        src="https://strive.school/assets/generics/covers/fullstack.png"
        alt=""
      />
      </div>
      
    </div>
  );
};

export default Header;

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./sidebar.css";

const Sidebar = () => {
  const [cats, setCats] = useState([]); // Set the categories state to an empty array. This will be filled with the category data.

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("http://localhost:3001/api/categories");
      // console.log("Categories Data fetched in the Sidebar", res.data);
      setCats(res.data);
    };
    getCats();
  }, []); // Empty array as we only want to run this once.

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT US</span>
        <img
          src="https://app.strive.school/assets/images/strive_logo_color.svg"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
        {cats.map((category) => (
            <Link to={`/?cat=${category.name}`} className="link">
            <li className="sidebarListItem">{category.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

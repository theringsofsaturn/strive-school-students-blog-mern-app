import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./singlePost.css";

const SinglePost = () => {
  const location = useLocation(); // Get the location from the URL. If we console log the location, we'll see the pathname with the post id "post/123456"
  // console.log("Location Path", location);
  const path = location.pathname.split("/")[2]; // Split the pathname by "/" and get the third element of the array -> [2] index. This is the post id. -> e.g. "/post/123456" -> ["before /", "post", "123456"] -> "123456"

  // **************** STATES ********************
  const [post, setPost] = useState({}); // Set the post state to an empty object. This will be filled with the post data.
  const [title, setTitle] = useState(""); // Set the title state to an empty string. This will be filled with the post title.
  const [desc, setDesc] = useState(""); // Set the description state to an empty string. This will be filled with the post description.

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:3001/api/posts/" + path);
      // console.log("Response for Single Post", res);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]); // When the path changes, we want to fetch again.

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {/* If there's post image, show it, if not, just don't show any image */}
        {post.photo && (
          <img className="singlePostImg" src={post.photo} alt="" />
        )}
        <h1 className="singlePostTitle">
          {post.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">{post.username}</b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">{post.desc}</p>
      </div>
    </div>
  );
};

export default SinglePost;

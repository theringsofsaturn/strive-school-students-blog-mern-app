import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import "./singlePost.css";

const SinglePost = () => {
  const location = useLocation(); // Get the location from the URL. If we console log the location, we'll see the pathname property with the post id "post/123456" value
  // console.log("Location Path", location);
  const path = location.pathname.split("/")[2]; // Split the pathname by "/" and get the third element of the array -> [2] index. This is the post id. -> e.g. "/post/123456" -> ["before /", "post", "123456"] -> "123456"

  // **************** STATES ********************
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const { user } = useContext(Context);
  const publicFolder = "http://localhost:3001/images/";

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

  // DELETE the post on clicking the trash button
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/posts/${post._id}`, {
        data: { username: user.username }, // We can send this data directly because we are using Delete method, not Post. We can write data here. It will not work as with Post method above: + path, { username: user.username }
      });
      window.location.replace("/"); // After deleting the post, we want to go back to the home page.
    } catch (err) {}
  };

  // UPDATE the post on clicking the edit button
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {/* If there's post image, show it, if not, just don't show any image */}
        {post.photo && (
          <img
            src={publicFolder + post.photo}
            alt=""
            className="singlePostImg"
          />
        )}
        {/* If it's in update mode, show title as an input field and text area to edit, not the <h1>*/}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          // And if it's not in update mode, show the h1 title
          <h1 className="singlePostTitle">
            {post.title}
            {/* If the post's username is the same as the logged in user, then we can edit or delete the post. Also if there's no user (user?) it will not check for any username after, so we will not have any error */}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            {/* When we click on the username it will redirect to the Homepage with a search query of the username. This will show the posts of that user. */}
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{post.desc}</p>
        )}
      </div>
    </div>
  );
};

export default SinglePost;

import { Link } from "react-router-dom";
import "./post.css";

// Taking the {post} from the props in the Posts.jsx component
const Post = ({ post }) => {
  const publicFolder = "/images/"; //Images in /api/images/
  return (
    <div className="post">
      {/* If there's post image, show it, if not, just don't show any image */}
      {post.photo && (
        <img className="postImg" src={publicFolder + post.photo} alt="" />
      )}
      <div className="postInfo">
        <div className="postCats">
          {/* For each category in the categories array, render this span ({category.name}) */}
          {post.categories.map((category) => (
            <span className="postCat">{category.name}</span>
          ))}
        </div>
        {/* When click on the title, it will redirect to the post page */}
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
};

export default Post;

import Post from "../post/Post";
import "./posts.css";

const Posts = () => {
  return (
    <div className="posts">
     <Post img="https://www.scnsoft.com/blog-pictures/cover-pics/react_js.png" />
      <Post img="https://c4.wallpaperflare.com/wallpaper/619/468/16/node-js-javascript-wallpaper-preview.jpg" />
      <Post img="https://wallpapercave.com/wp/wp8725088.jpg"/>
      <Post img="https://raygun.com/blog/wp-content/uploads/2015/04/express1.png"/>
      <Post img="https://daqxzxzy8xq3u.cloudfront.net/wp-content/uploads/2019/04/21032431/redux-cover-imgage-1024x768.jpg"/>
    </div>
  );
};

export default Posts;

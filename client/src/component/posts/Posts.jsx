import Post from "../post/Post";
import "./posts.css";

// Taking the {posts} from the props in the Homepage component
const Posts = ({ posts }) => {
  console.log("Posts Data fetched in Posts Component", posts);
  return (
    //********** NEW DYNAMIC CODE *********
    <div className="posts">
      {/* For each post in the posts array, render a Post Component */}
      {posts.map((post) => (
        <Post post={post} />
        // {post} is returning the single Post with properties such as:
        // categories: []
        // desc: "lorem ipsum..."
        // title: "Title of the post"
        // username: "theringsofsaturn"

        // "" Pass this {post} data to the Post component, to get this properties there.
      ))}
    </div>

    // ******* OLD STATIC CODE ********
    // <div className="posts">
    //  <Post img="https://www.scnsoft.com/blog-pictures/cover-pics/react_js.png" />
    //   <Post img="https://c4.wallpaperflare.com/wallpaper/619/468/16/node-js-javascript-wallpaper-preview.jpg" />
    //   <Post img="https://wallpapercave.com/wp/wp8725088.jpg"/>
    //   <Post img="https://raygun.com/blog/wp-content/uploads/2015/04/express1.png"/>
    //   <Post img="https://daqxzxzy8xq3u.cloudfront.net/wp-content/uploads/2019/04/21032431/redux-cover-imgage-1024x768.jpg"/>
    // </div>
  );
};

export default Posts;

import { useLocation } from "react-router";
import Header from "../../component/header/Header";
import Posts from "../../component/posts/Posts";
import Sidebar from "../../component/sidebar/Sidebar";
import "./homepage.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Homepage = () => {
  // ************** STATES **************
  const [posts, setPosts] = useState([]); // Set the post state to an empty object. This will be filled with the post data.
  const { search } = useLocation(); // Get the search query from the url.

  useEffect(() => {
      // *************** FETCHING POSTS ********************
    // When we want to use axios, we need a variable to store the response, as we are using async/await
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:3001/api/posts" + search);
      setPosts(res.data);
      // console.log("Posts Data Fetched in the Homepage", res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
         {/* {posts} is the data we get from the api, stored in the state ==> 
         I pass it as props to Posts Component  */}
        <Posts posts={posts} /> 
        <Sidebar />
      </div>
    </>
  );
};

export default Homepage;

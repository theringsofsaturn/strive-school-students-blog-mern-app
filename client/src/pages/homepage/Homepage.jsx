import { useLocation } from "react-router";
import Header from "../../component/header/Header";
import Posts from "../../component/posts/Posts";
import Sidebar from "../../component/sidebar/Sidebar";
import "./homepage.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    // When we want to use axios, we need a variable to store the response, as we are using async/await
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:3001/api/posts" + search);
      setPosts(res.data);
      console.log("Posts Data *****",res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
};

export default Homepage;

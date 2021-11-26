import { Link } from "react-router-dom";
import "./singlePost.css";

const singlePost = () => {
  <div className="singlePost">
    <div className="singlePostWrapper">
      <img
        className="singlePostImg"
        src="https://www.topsinfosolutions.com/wp-content/uploads/2020/07/mern-stack.png"
        alt=""
      />
      <h1 className="singlePostTitle">
        Lorem ipsum dolor
        <div className="singlePostEdit">
          <i className="singlePostIcon far fa-edit"></i>
          <i className="singlePostIcon far fa-trash-alt"></i>
        </div>
      </h1>
      <div className="singlePostInfo">
        <span>
          Author:
          <b className="singlePostAuthor">
            <Link className="link" to="/posts?username=Safak">
              Safak
            </Link>
          </b>
        </span>
        <span>1 day ago</span>
      </div>
      <p className="singlePostDesc">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
        quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
        Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
        quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
        Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
        quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
        Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
        quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
        Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
        quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
        Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos!
        <br />
        <br />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
        quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
        Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
        quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
        Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
        quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
        Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos!
        Lorem, ipsum dolor sit amet consectetur.
      </p>
    </div>
  </div>;
};

export default singlePost;

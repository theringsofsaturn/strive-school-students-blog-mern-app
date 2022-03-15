import "./write.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Post request to server with these required data
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    // We will not send the above directly, because we can upload any image here. In this case, if there's an image, create a formData and a filename.
    // **Note** For the filename, it should be some random number, we can use any id or we can use a basic one, like using the date. If we don't do this, the user can upload the same image multiple times, different images with the same name, and we want to prevent that.
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      // When we click the + button, it will take the file and add a filename.
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    // After uploading the image, we can finally post.
    try {
      const res = await axiosInstance.post("/posts", newPost);
      // After posting the new post, we want to go the Single Page (Post page)
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="write">
      {/* If there's an image, it will create an URL of this file and we will be able to see it above the text as a cover in Write page. */}
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            // Event targeting the image to upload when we choose one (single file, the first one)
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            // When we type in the title, it will change the state.
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            // When we type in the description, it will change the state.
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
